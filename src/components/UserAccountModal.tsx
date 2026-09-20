import React, { useState } from 'react';
import {
  X,
  User as UserIcon,
  LogOut,
  Brain,
  Plus,
  Trash2,
  Check,
  ShieldCheck,
  LifeBuoy,
  Edit2,
  Save,
  Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface UserAccountModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOpenSupport: () => void;
}

export const UserAccountModal: React.FC<UserAccountModalProps> = ({
  isOpen,
  onClose,
  onOpenSupport
}) => {
  const {
    user,
    userProfile,
    signOutUser,
    updatePreferredName,
    memories,
    addMemory,
    deleteMemory
  } = useAuth();

  const [activeTab, setActiveTab] = useState<'profile' | 'memories'>('profile');
  const [preferredNameInput, setPreferredNameInput] = useState(
    userProfile?.preferredName || user?.displayName?.split(' ')[0] || ''
  );
  const [isEditingName, setIsEditingName] = useState(false);
  const [savingName, setSavingName] = useState(false);

  // New Memory input
  const [newMemoryText, setNewMemoryText] = useState('');
  const [newMemoryCategory, setNewMemoryCategory] = useState('Personal');
  const [addingMemory, setAddingMemory] = useState(false);

  if (!isOpen || !user) return null;

  const handleSaveName = async () => {
    if (!preferredNameInput.trim()) return;
    setSavingName(true);
    try {
      await updatePreferredName(preferredNameInput);
      setIsEditingName(false);
    } catch (err) {
      console.error(err);
    } finally {
      setSavingName(false);
    }
  };

  const handleAddMemory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemoryText.trim()) return;
    setAddingMemory(true);
    try {
      await addMemory(newMemoryText, newMemoryCategory);
      setNewMemoryText('');
    } catch (err) {
      console.error(err);
    } finally {
      setAddingMemory(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl bg-[#090B12] border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="relative px-6 py-5 border-b border-white/[0.08] flex items-center justify-between bg-white/[0.02]">
          <div className="flex items-center gap-3">
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || 'User'}
                className="w-10 h-10 rounded-full border border-cyan-500/40 object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400">
                <UserIcon className="w-5 h-5" />
              </div>
            )}
            <div>
              <h3 className="text-base font-bold text-white font-['Syne',sans-serif]">
                {user.displayName || 'AIRA User'}
              </h3>
              <p className="text-xs text-slate-400 font-mono">{user.email}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                signOutUser();
                onClose();
              }}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 text-xs font-medium transition-colors"
              title="Sign Out"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/[0.06] transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-white/[0.08] bg-slate-950/40 px-6 pt-2">
          <button
            onClick={() => setActiveTab('profile')}
            className={`pb-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'profile'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <UserIcon className="w-3.5 h-3.5" />
            <span>Account & Identity</span>
          </button>
          <button
            onClick={() => setActiveTab('memories')}
            className={`pb-3 px-4 text-xs font-medium border-b-2 transition-colors flex items-center gap-2 ${
              activeTab === 'memories'
                ? 'border-cyan-400 text-cyan-400 font-semibold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Brain className="w-3.5 h-3.5" />
            <span>Synced Companion Memories</span>
            {memories.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full text-[10px] bg-cyan-500/20 text-cyan-300 font-mono">
                {memories.length}
              </span>
            )}
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {activeTab === 'profile' ? (
            <div className="space-y-6">
              {/* Preferred Name Card */}
              <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.08] space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono uppercase tracking-wider text-slate-400">
                    Companion Greeting Preference
                  </span>
                  {!isEditingName && (
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="inline-flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      <Edit2 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  )}
                </div>

                {isEditingName ? (
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={60}
                      value={preferredNameInput}
                      onChange={(e) => setPreferredNameInput(e.target.value)}
                      placeholder="Enter how AIRA should address you"
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-900 border border-cyan-500/40 text-xs text-white focus:outline-none"
                    />
                    <button
                      onClick={handleSaveName}
                      disabled={savingName || !preferredNameInput.trim()}
                      className="px-3.5 py-2 rounded-lg bg-cyan-500 text-slate-950 font-semibold text-xs inline-flex items-center gap-1 hover:bg-cyan-400 transition-colors"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                    <button
                      onClick={() => setIsEditingName(false)}
                      className="px-3 py-2 rounded-lg bg-slate-800 text-slate-300 text-xs hover:bg-slate-700"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <div className="text-lg font-bold text-white font-['Syne',sans-serif]">
                      “Hello, {userProfile?.preferredName || preferredNameInput || 'Friend'}!”
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                      Active Tone
                    </span>
                  </div>
                )}
                <p className="text-xs text-slate-400">
                  AIRA uses this name during voice greetings and dynamic conversational follow-ups.
                </p>
              </div>

              {/* Firestore Security & Metadata Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.08] space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-slate-500">
                    Database Provider
                  </span>
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <ShieldCheck className="w-4 h-4 text-emerald-400" />
                    <span>Firebase Firestore (aira-628db)</span>
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Secured with strict Eight Pillars rule architecture and owner isolation.
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/50 border border-white/[0.08] space-y-1.5">
                  <span className="text-[11px] font-mono uppercase text-slate-500">
                    Firebase Auth UID
                  </span>
                  <div className="text-xs font-mono text-cyan-300 truncate">
                    {user.uid}
                  </div>
                  <p className="text-[11px] text-slate-400">
                    Verified Google Account identity token.
                  </p>
                </div>
              </div>

              {/* Support Quick Link */}
              <div className="p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 flex items-center justify-between">
                <div className="space-y-0.5">
                  <p className="text-xs font-semibold text-white">Need help or encountering a bug?</p>
                  <p className="text-[11px] text-slate-400">
                    Contact lead support at <strong className="text-cyan-300 font-mono">biren.business1@gmail.com</strong>
                  </p>
                </div>
                <button
                  onClick={() => {
                    onClose();
                    onOpenSupport();
                  }}
                  className="px-3 py-1.5 rounded-lg bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/30 text-xs font-medium inline-flex items-center gap-1.5 transition-colors"
                >
                  <LifeBuoy className="w-3.5 h-3.5" />
                  <span>Open Desk</span>
                </button>
              </div>
            </div>
          ) : (
            /* Synced Companion Memories */
            <div className="space-y-6">
              <div className="p-4 rounded-xl bg-slate-900/60 border border-white/[0.08] space-y-3">
                <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                  <Plus className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Store New Assistant Memory</span>
                </h4>
                <form onSubmit={handleAddMemory} className="space-y-3">
                  <div className="flex flex-col sm:flex-row gap-3">
                    <input
                      type="text"
                      required
                      maxLength={1000}
                      value={newMemoryText}
                      onChange={(e) => setNewMemoryText(e.target.value)}
                      placeholder="e.g. Remember that I prefer concise 2-sentence responses"
                      className="flex-1 px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
                    />
                    <select
                      value={newMemoryCategory}
                      onChange={(e) => setNewMemoryCategory(e.target.value)}
                      className="px-3 py-2 rounded-lg bg-slate-950 border border-white/10 text-xs text-white focus:outline-none"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Preferences">Preferences</option>
                      <option value="Work">Work</option>
                      <option value="Reminders">Reminders</option>
                    </select>
                    <button
                      type="submit"
                      disabled={addingMemory || !newMemoryText.trim()}
                      className="px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-cyan-500 hover:from-violet-500 hover:to-cyan-400 text-xs font-semibold text-white disabled:opacity-50 inline-flex items-center justify-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Memory List */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-slate-400">
                    Stored Cloud Memories ({memories.length})
                  </h4>
                  <span className="text-[11px] text-slate-500 font-mono">
                    Firestore Path: users/{user.uid}/memories
                  </span>
                </div>

                {memories.length === 0 ? (
                  <div className="py-8 text-center border border-dashed border-white/10 rounded-xl space-y-2">
                    <Brain className="w-6 h-6 text-slate-600 mx-auto" />
                    <p className="text-xs text-slate-400">No cloud memories stored yet.</p>
                    <p className="text-[11px] text-slate-500">
                      Add a preference above or speak “Remember this for me” to AIRA on Android.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
                    {memories.map((mem) => (
                      <div
                        key={mem.id}
                        className="p-3 rounded-lg bg-white/[0.03] border border-white/[0.06] flex items-center justify-between gap-3 text-xs group hover:border-cyan-500/30 transition-colors"
                      >
                        <div className="space-y-1 flex-1">
                          <p className="text-slate-200">{mem.text}</p>
                          <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono">
                            <span className="px-1.5 py-0.5 rounded bg-white/[0.05] text-cyan-400">
                              {mem.category}
                            </span>
                            <span>•</span>
                            <span>ID: {mem.id}</span>
                          </div>
                        </div>
                        <button
                          onClick={() => deleteMemory(mem.id)}
                          className="p-1.5 rounded-md text-slate-500 hover:text-red-400 hover:bg-red-500/10 transition-colors opacity-80 group-hover:opacity-100"
                          title="Delete Memory"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
