import React, { useState } from 'react';
import { User } from '../types';
import { Button } from '../components/Button';
import { MockService } from '../services/mockService';

interface SettingsProps {
  user: User;
  onUpdateUser: (user: User) => void;
}

export const Settings: React.FC<SettingsProps> = ({ user, onUpdateUser }) => {
  const [username, setUsername] = useState(user.username);
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl);
  const [bio, setBio] = useState(user.bio || '');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleRandomizeAvatar = () => {
    const randomId = Math.floor(Math.random() * 1000);
    setAvatarUrl(`https://picsum.photos/200/200?random=${randomId}`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      const updatedUser = await MockService.updateUser(user.id, {
        username,
        avatarUrl,
        bio
      });
      onUpdateUser(updatedUser);
      setMessage({ type: 'success', text: 'Profile updated successfully!' });
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to update profile. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-xl mx-auto pb-20">
      <div className="bg-black/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-3xl font-bold mb-8 text-center text-white">Account Settings</h1>

        {message && (
          <div className={`mb-6 p-4 rounded-lg text-center font-bold ${message.type === 'success' ? 'bg-neon/20 text-neon border border-neon/50' : 'bg-red-500/20 text-red-400 border border-red-500/50'}`}>
            {message.text}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Avatar Section */}
          <div className="flex flex-col items-center gap-4">
            <div className="relative group">
              <img 
                src={avatarUrl} 
                alt="Avatar Preview" 
                className="w-32 h-32 rounded-full border-4 border-neon object-cover shadow-[0_0_20px_rgba(0,255,170,0.3)]"
              />
              <div className="absolute inset-0 rounded-full bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                <span className="text-white text-xs font-bold">Preview</span>
              </div>
            </div>
            <div className="flex gap-2">
                <button 
                  type="button" 
                  onClick={handleRandomizeAvatar}
                  className="text-xs bg-white/10 text-white px-3 py-1 rounded-full hover:bg-white hover:text-black transition-colors border border-white/20"
                >
                  🎲 Randomize
                </button>
            </div>
          </div>

          {/* Inputs */}
          <div className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-wider">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600 transition-colors"
                placeholder="Your display name"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-wider">Avatar URL</label>
              <input 
                type="text" 
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600 transition-colors"
                placeholder="https://..."
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-wider">Bio</label>
              <textarea 
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={3}
                className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600 transition-colors"
                placeholder="Tell us about yourself..."
              />
            </div>
          </div>

          <Button type="submit" className="w-full py-3 shadow-lg shadow-neon/20" isLoading={isLoading}>
            Save Changes
          </Button>
        </form>
      </div>
    </div>
  );
};