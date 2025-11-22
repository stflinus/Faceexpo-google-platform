
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { MockService } from '../services/mockService';
import { User, Post } from '../types';
import { Button } from '../components/Button';
import { FoldingFan } from '../components/FoldingFan';
import { PostCard } from '../components/PostCard';

interface ProfileProps {
  currentUser: User;
}

export const Profile: React.FC<ProfileProps> = ({ currentUser }) => {
  const { id } = useParams<{ id: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [isFanned, setIsFanned] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const user = await MockService.getUser(id);
      const userPosts = await MockService.getArtistPosts(id);
      if (user) {
          setProfileUser(user);
          // Check if current user is already a fan of this profile
          setIsFanned(currentUser.fannedArtistIds.includes(user.id));
      }
      setPosts(userPosts);
      setLoading(false);
    };
    fetchData();
  }, [id, currentUser.fannedArtistIds]);

  const handleToggleFan = async (artistId: string = profileUser?.id || '') => {
    if (!profileUser || !artistId) return;

    const result = await MockService.toggleFan(currentUser.id, artistId);
    
    // Update local user state
    if (result.isFanned) {
        if (!currentUser.fannedArtistIds.includes(artistId)) {
            currentUser.fannedArtistIds.push(artistId);
        }
    } else {
        currentUser.fannedArtistIds = currentUser.fannedArtistIds.filter(id => id !== artistId);
    }

    // Update Profile UI
    if (artistId === profileUser.id) {
        setProfileUser(prev => prev ? ({ ...prev, fanCount: result.newFanCount }) : null);
        setIsFanned(result.isFanned);
    }

    // Update posts in the feed below
    setPosts(prev => prev.map(p => {
        if(p.artistId === artistId) {
            return { ...p, fanCount: result.newFanCount };
        }
        return p;
    }));
  };

  if (loading) return <div className="pt-32 text-center drop-shadow-md text-xl font-bold">Loading Profile...</div>;
  if (!profileUser) return <div className="pt-32 text-center drop-shadow-md text-xl font-bold">User not found.</div>;

  const isOwnProfile = currentUser.id === profileUser.id;

  return (
    <div className="min-h-screen pt-20 pb-20">
        {/* Header Cover */}
        <div className="h-48 bg-gradient-to-r from-gray-900/90 to-black/90 relative backdrop-blur-sm border-y border-white/10">
            <div className="absolute -bottom-16 left-4 md:left-8 flex items-end">
                <img 
                    src={profileUser.avatarUrl} 
                    alt={profileUser.username} 
                    className="w-32 h-32 rounded-full border-4 border-black bg-gray-800 shadow-xl"
                />
            </div>
        </div>

        <div className="px-4 md:px-8 pt-20 max-w-6xl mx-auto bg-black/40 rounded-b-3xl pb-8 backdrop-blur-sm">
            <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div>
                    <h1 className="text-4xl font-black drop-shadow-lg">{profileUser.username}</h1>
                    <p className="text-neon font-bold text-sm tracking-wider mb-4 drop-shadow-lg">{profileUser.role}</p>
                    <p className="text-gray-100 max-w-md mb-6 font-medium drop-shadow-md">{profileUser.bio || "No bio yet."}</p>
                </div>
                <div className="flex flex-row md:flex-col items-center md:items-end gap-4 w-full md:w-auto justify-between md:justify-start">
                    <div className="text-center md:text-right bg-black/50 p-3 rounded-xl border border-white/10">
                         <span className="block text-3xl font-bold text-white text-neon-glow">{profileUser.fanCount}</span>
                         <span className="text-xs text-gray-400 uppercase tracking-widest">Fans</span>
                    </div>
                    
                    {isOwnProfile ? (
                        <Link to="/tips">
                            <button className="flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,170,0.3)] hover:scale-105 bg-white text-black hover:bg-neon">
                                🚀 Get More Fans
                            </button>
                        </Link>
                    ) : (
                        <button 
                            onClick={() => handleToggleFan(profileUser.id)}
                            className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 shadow-[0_0_15px_rgba(0,255,170,0.3)] hover:scale-110 ${isFanned ? 'bg-neon text-black' : 'bg-black text-neon border border-neon'}`}
                        >
                            <FoldingFan className="w-6 h-6" filled={isFanned} />
                            {isFanned ? 'Fanned' : 'Become a Fan'}
                        </button>
                    )}
                </div>
            </div>

            <div className="border-t border-white/10 mt-8 pt-8">
                <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                  <span className="w-2 h-8 bg-neon rounded-full inline-block"></span>
                  Showcase Reel
                </h2>
                {posts.length === 0 ? (
                    <div className="text-gray-300 text-center py-10 border-2 border-dashed border-white/20 rounded-xl bg-black/20">
                        No uploads yet.
                    </div>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {posts.map(post => (
                            <PostCard key={post.id} post={post} currentUser={currentUser} onToggleFan={handleToggleFan} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};
