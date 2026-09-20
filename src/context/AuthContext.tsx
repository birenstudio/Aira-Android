import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  User as FirebaseUser
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  deleteDoc
} from 'firebase/firestore';
import {
  auth,
  db,
  googleProvider,
  handleFirestoreError,
  OperationType
} from '../lib/firebase';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { productConfig, downloadConfig, AIRA_DOWNLOAD_URL } from '../config/airaConfig';

export interface AiraUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface UserProfile {
  uid: string;
  email: string;
  displayName?: string;
  photoURL?: string;
  preferredName?: string;
  createdAt?: any;
  updatedAt?: any;
}

export interface UserMemory {
  id: string;
  userId: string;
  text: string;
  category: string;
  createdAt?: any;
}

export interface SupportRequest {
  id: string;
  userId: string;
  userEmail: string;
  subject: string;
  message: string;
  category: string;
  status: 'open' | 'resolved';
  createdAt?: any;
}

interface AuthContextType {
  user: AiraUser | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authLoading: boolean;
  authError: string | null;
  supportEmail: string;
  memories: UserMemory[];
  supportRequests: SupportRequest[];
  // Modal State
  authModalOpen: boolean;
  authModalReason: 'download' | 'general';
  openAuthModal: (reason?: 'download' | 'general') => void;
  closeAuthModal: () => void;
  clearAuthError: () => void;
  // Protected Download State
  isDownloading: boolean;
  downloadStatusMessage: string | null;
  clearDownloadMessage: () => void;
  triggerProtectedDownload: () => Promise<void>;
  verifySession: () => Promise<boolean>;
  // Actions
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updatePreferredName: (name: string) => Promise<void>;
  addMemory: (text: string, category: string) => Promise<void>;
  deleteMemory: (memoryId: string) => Promise<void>;
  submitSupportRequest: (subject: string, message: string, category: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AiraUser | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);

  // Auth Modal State
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalReason, setAuthModalReason] = useState<'download' | 'general'>('general');

  // Protected Download State
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadStatusMessage, setDownloadStatusMessage] = useState<string | null>(null);
  const [pendingDownloadIntent, setPendingDownloadIntent] = useState(false);

  const supportEmail = productConfig.contactEmail || 'biren.business1@gmail.com';

  const clearAuthError = useCallback(() => setAuthError(null), []);
  const clearDownloadMessage = useCallback(() => setDownloadStatusMessage(null), []);

  const openAuthModal = useCallback((reason: 'download' | 'general' = 'general') => {
    setAuthModalReason(reason);
    setAuthError(null);
    setAuthModalOpen(true);
  }, []);

  const closeAuthModal = useCallback(() => {
    setAuthModalOpen(false);
    setAuthLoading(false);
    setAuthError(null);
  }, []);

  // 1. Session verification method (Never rely on UI state alone)
  const verifySession = useCallback(async (): Promise<boolean> => {
    try {
      if (isSupabaseConfigured && supabase) {
        const { data: { session }, error } = await supabase.auth.getSession();
        if (error || !session?.user) {
          return false;
        }
        return true;
      } else {
        const currentUser = auth.currentUser;
        if (!currentUser) return false;
        // Verify token validity with Firebase Auth
        await currentUser.getIdToken(false);
        return true;
      }
    } catch (err) {
      console.error('Session verification check failed:', err);
      return false;
    }
  }, []);

  // 2. Centralized Protected Download Handler
  const triggerProtectedDownload = useCallback(async () => {
    clearDownloadMessage();

    // Verify session strictly before initiating download
    const isValid = await verifySession();
    if (!isValid) {
      // Capture download intent and open auth modal
      try {
        sessionStorage.setItem('aira_pending_download', 'true');
      } catch (e) {
        /* ignore storage failure */
      }
      setPendingDownloadIntent(true);
      openAuthModal('download');
      return;
    }

    // Authenticated: Proceed with protected download flow
    setIsDownloading(true);
    setDownloadStatusMessage('Preparing AIRA download...');

    try {
      // Brief aesthetic delay for animation
      await new Promise((res) => setTimeout(res, 600));

      const rawUrl = AIRA_DOWNLOAD_URL?.trim();
      if (!rawUrl || rawUrl === '#' || rawUrl.startsWith('#')) {
        setIsDownloading(false);
        setDownloadStatusMessage('AIRA download is temporarily unavailable. Please try again later.');
        return;
      }

      setDownloadStatusMessage('Starting AIRA APK download...');
      
      // Trigger native download
      const anchor = document.createElement('a');
      anchor.href = rawUrl;
      anchor.download = `AIRA-${downloadConfig.latestVersion}.apk`;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);

      setTimeout(() => {
        setIsDownloading(false);
        setDownloadStatusMessage(null);
      }, 4000);
    } catch (err) {
      console.error('Download trigger error:', err);
      setIsDownloading(false);
      setDownloadStatusMessage('AIRA download is temporarily unavailable. Please try again later.');
    }
  }, [verifySession, openAuthModal, clearDownloadMessage]);

  // 3. Setup Authentication Listener (Supabase or Firebase)
  useEffect(() => {
    let unsubscribeFirebase: (() => void) | null = null;
    let unsubscribeSupabase: (() => void) | null = null;

    if (isSupabaseConfigured && supabase) {
      // Supabase Auth Integration
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session?.user) {
          const sUser = session.user;
          const airaUser: AiraUser = {
            uid: sUser.id,
            email: sUser.email || null,
            displayName:
              (sUser.user_metadata?.full_name as string) ||
              (sUser.user_metadata?.name as string) ||
              sUser.email?.split('@')[0] ||
              'AIRA User',
            photoURL:
              (sUser.user_metadata?.avatar_url as string) ||
              (sUser.user_metadata?.picture as string) ||
              null
          };
          setUser(airaUser);
          setUserProfile({
            uid: airaUser.uid,
            email: airaUser.email || '',
            displayName: airaUser.displayName || 'AIRA User',
            photoURL: airaUser.photoURL || ''
          });
        } else {
          setUser(null);
          setUserProfile(null);
        }
        setLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange(
        async (_event, session) => {
          if (session?.user) {
            const sUser = session.user;
            const airaUser: AiraUser = {
              uid: sUser.id,
              email: sUser.email || null,
              displayName:
                (sUser.user_metadata?.full_name as string) ||
                (sUser.user_metadata?.name as string) ||
                sUser.email?.split('@')[0] ||
                'AIRA User',
              photoURL:
                (sUser.user_metadata?.avatar_url as string) ||
                (sUser.user_metadata?.picture as string) ||
                null
            };
            setUser(airaUser);
            setUserProfile({
              uid: airaUser.uid,
              email: airaUser.email || '',
              displayName: airaUser.displayName || 'AIRA User',
              photoURL: airaUser.photoURL || ''
            });
            setAuthModalOpen(false);
          } else {
            setUser(null);
            setUserProfile(null);
          }
          setLoading(false);
        }
      );

      unsubscribeSupabase = () => {
        subscription.unsubscribe();
      };
    } else {
      // Existing Firebase Auth Integration
      unsubscribeFirebase = onAuthStateChanged(auth, async (currentUser: FirebaseUser | null) => {
        if (currentUser) {
          const airaUser: AiraUser = {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL
          };
          setUser(airaUser);
          setAuthError(null);

          // Sync Profile in Firestore
          const userDocRef = doc(db, 'users', currentUser.uid);
          try {
            const snapshot = await getDoc(userDocRef);
            if (snapshot.exists()) {
              setUserProfile(snapshot.data() as UserProfile);
            } else {
              const initialProfile: UserProfile = {
                uid: currentUser.uid,
                email: currentUser.email || '',
                displayName: currentUser.displayName?.slice(0, 100) || 'AIRA User',
                photoURL: currentUser.photoURL?.slice(0, 500) || '',
                preferredName: currentUser.displayName?.split(' ')[0]?.slice(0, 60) || 'Friend',
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
              };
              await setDoc(userDocRef, initialProfile);
              setUserProfile(initialProfile);
            }
          } catch (err) {
            handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
          }
        } else {
          setUser(null);
          setUserProfile(null);
          setMemories([]);
          setSupportRequests([]);
        }
        setLoading(false);
      });
    }

    return () => {
      if (unsubscribeFirebase) unsubscribeFirebase();
      if (unsubscribeSupabase) unsubscribeSupabase();
    };
  }, []);

  // 4. Automatic Continuation of Download Intent After Login
  useEffect(() => {
    if (!user) return;

    let hasPending = false;
    try {
      hasPending = sessionStorage.getItem('aira_pending_download') === 'true';
    } catch (e) {
      /* ignore */
    }

    if (hasPending || pendingDownloadIntent) {
      try {
        sessionStorage.removeItem('aira_pending_download');
      } catch (e) {
        /* ignore */
      }
      setPendingDownloadIntent(false);
      setAuthModalOpen(false);

      // Automatically continue the originally requested APK download
      const timer = setTimeout(() => {
        triggerProtectedDownload();
      }, 500);

      return () => clearTimeout(timer);
    }
  }, [user, pendingDownloadIntent, triggerProtectedDownload]);

  // 5. Firestore Listeners for user memories and support
  useEffect(() => {
    if (!user || isSupabaseConfigured) return;

    const memoriesPath = `users/${user.uid}/memories`;
    const memoriesCollection = collection(db, 'users', user.uid, 'memories');

    const unsubscribe = onSnapshot(
      memoriesCollection,
      (snapshot) => {
        const items: UserMemory[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<UserMemory, 'id'>)
        }));
        setMemories(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, memoriesPath);
      }
    );

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    if (!user || isSupabaseConfigured) return;

    const supportPath = 'support_requests';
    const q = query(collection(db, supportPath), where('userId', '==', user.uid));

    const unsubscribe = onSnapshot(
      q,
      (snapshot) => {
        const items: SupportRequest[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<SupportRequest, 'id'>)
        }));
        setSupportRequests(items);
      },
      (error) => {
        handleFirestoreError(error, OperationType.GET, supportPath);
      }
    );

    return () => unsubscribe();
  }, [user]);

  // 6. Sign In With Google Method
  const signInWithGoogle = async () => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      if (isSupabaseConfigured && supabase) {
        const { error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            redirectTo: window.location.origin
          }
        });
        if (error) throw error;
      } else {
        const result = await signInWithPopup(auth, googleProvider);
        if (result.user) {
          closeAuthModal();
        }
      }
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled by user.');
      } else if (err.code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups.');
      } else {
        setAuthError('Sign-in was not completed. Please try again.');
      }
    } finally {
      setAuthLoading(false);
    }
  };

  // 7. Sign Out Method
  const signOutUser = async () => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
      await signOut(auth);
      setUser(null);
      setUserProfile(null);
      setMemories([]);
      setSupportRequests([]);
      try {
        sessionStorage.removeItem('aira_pending_download');
      } catch (e) {
        /* ignore */
      }
      setPendingDownloadIntent(false);
      clearDownloadMessage();
    } catch (err: any) {
      console.error('Sign-Out Error:', err);
    }
  };

  const updatePreferredName = async (name: string) => {
    if (!user || isSupabaseConfigured) return;
    const sanitizedName = name.trim().slice(0, 60);
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        preferredName: sanitizedName,
        updatedAt: serverTimestamp()
      });
      setUserProfile((prev) => (prev ? { ...prev, preferredName: sanitizedName } : null));
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addMemory = async (text: string, category: string) => {
    if (!user || isSupabaseConfigured) return;
    const memoryId = `mem_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, 'users', user.uid, 'memories', memoryId);
    try {
      await setDoc(docRef, {
        userId: user.uid,
        text: text.trim().slice(0, 1000),
        category: (category || 'General').trim().slice(0, 50),
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `users/${user.uid}/memories/${memoryId}`);
    }
  };

  const deleteMemory = async (memoryId: string) => {
    if (!user || isSupabaseConfigured) return;
    const docRef = doc(db, 'users', user.uid, 'memories', memoryId);
    try {
      await deleteDoc(docRef);
    } catch (err) {
      handleFirestoreError(err, OperationType.DELETE, `users/${user.uid}/memories/${memoryId}`);
    }
  };

  const submitSupportRequest = async (subject: string, message: string, category: string) => {
    if (!user) throw new Error('You must be signed in to submit a support request.');
    const requestId = `req_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    const docRef = doc(db, 'support_requests', requestId);
    try {
      await setDoc(docRef, {
        userId: user.uid,
        userEmail: user.email || 'no-email@aira.internal',
        subject: subject.trim().slice(0, 200),
        message: message.trim().slice(0, 2000),
        category: category,
        status: 'open',
        createdAt: serverTimestamp()
      });
    } catch (err) {
      handleFirestoreError(err, OperationType.CREATE, `support_requests/${requestId}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        userProfile,
        loading,
        authLoading,
        authError,
        supportEmail,
        memories,
        supportRequests,
        authModalOpen,
        authModalReason,
        openAuthModal,
        closeAuthModal,
        clearAuthError,
        isDownloading,
        downloadStatusMessage,
        clearDownloadMessage,
        triggerProtectedDownload,
        verifySession,
        signInWithGoogle,
        signOutUser,
        updatePreferredName,
        addMemory,
        deleteMemory,
        submitSupportRequest
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
