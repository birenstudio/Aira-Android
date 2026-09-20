import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  User,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  orderBy,
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
import { productConfig } from '../config/airaConfig';

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
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  authError: string | null;
  supportEmail: string;
  memories: UserMemory[];
  supportRequests: SupportRequest[];
  signInWithGoogle: () => Promise<void>;
  signOutUser: () => Promise<void>;
  updatePreferredName: (name: string) => Promise<void>;
  addMemory: (text: string, category: string) => Promise<void>;
  deleteMemory: (memoryId: string) => Promise<void>;
  submitSupportRequest: (subject: string, message: string, category: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState<string | null>(null);
  const [memories, setMemories] = useState<UserMemory[]>([]);
  const [supportRequests, setSupportRequests] = useState<SupportRequest[]>([]);

  const supportEmail = productConfig.contactEmail || 'biren.business1@gmail.com';

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthError(null);

      if (currentUser) {
        const userDocRef = doc(db, 'users', currentUser.uid);
        try {
          const snapshot = await getDoc(userDocRef);
          if (snapshot.exists()) {
            setUserProfile(snapshot.data() as UserProfile);
          } else {
            // New user registration in Firestore
            const initialProfile: Record<string, any> = {
              uid: currentUser.uid,
              email: currentUser.email || '',
              displayName: currentUser.displayName?.slice(0, 100) || 'AIRA User',
              photoURL: currentUser.photoURL?.slice(0, 500) || '',
              preferredName: currentUser.displayName?.split(' ')[0]?.slice(0, 60) || 'Friend',
              createdAt: serverTimestamp(),
              updatedAt: serverTimestamp()
            };

            await setDoc(userDocRef, initialProfile);
            setUserProfile(initialProfile as UserProfile);
          }
        } catch (err) {
          handleFirestoreError(err, OperationType.GET, `users/${currentUser.uid}`);
        }
      } else {
        setUserProfile(null);
        setMemories([]);
        setSupportRequests([]);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Listen to User Memories in Firestore
  useEffect(() => {
    if (!user) return;

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

  // Listen to User Support Requests in Firestore
  useEffect(() => {
    if (!user) return;

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

  const signInWithGoogle = async () => {
    setAuthError(null);
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err: any) {
      console.error('Google Sign-In Error:', err);
      // Format friendly message
      if (err.code === 'auth/popup-closed-by-user') {
        setAuthError('Sign-in cancelled by user.');
      } else if (err.code === 'auth/popup-blocked') {
        setAuthError('Sign-in popup was blocked by your browser. Please allow popups.');
      } else {
        setAuthError(err.message || 'Failed to sign in with Google.');
      }
    }
  };

  const signOutUser = async () => {
    try {
      await signOut(auth);
    } catch (err: any) {
      console.error('Sign-Out Error:', err);
    }
  };

  const updatePreferredName = async (name: string) => {
    if (!user) return;
    const sanitizedName = name.trim().slice(0, 60);
    const userDocRef = doc(db, 'users', user.uid);
    try {
      await updateDoc(userDocRef, {
        preferredName: sanitizedName,
        updatedAt: serverTimestamp()
      });
      setUserProfile((prev) => prev ? { ...prev, preferredName: sanitizedName } : null);
    } catch (err) {
      handleFirestoreError(err, OperationType.UPDATE, `users/${user.uid}`);
    }
  };

  const addMemory = async (text: string, category: string) => {
    if (!user) return;
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
    if (!user) return;
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
        authError,
        supportEmail,
        memories,
        supportRequests,
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
