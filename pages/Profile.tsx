import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MockService } from '../services/mockService';
import { User, Post } from '../types';
import { Button } from '../components/Button';

export const Profile: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [profileUser, setProfileUser] = useState<User | null>(null);
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      setLoading(true);
      const user = await MockService.getUser(id);
      const userPosts = await MockService.getArtistPosts(id);
      if (user) setProfileUser(user);
      setPosts(userPosts);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  if (loading) return <div className="pt-32 text-center drop-shadow-md text-xl font-bold">Loading Profile...</div>;
  if (!profileUser) return <div className="pt-32 text-center drop-shadow-md text-xl font-bold">User not found.</div>;

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
                     <Button>Become a Fan</Button>
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
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                        {posts.map(post => (
                            <div key={post.id} className="aspect-square bg-gray-900 rounded-xl overflow-hidden relative group cursor-pointer shadow-lg border border-white/5 hover:border-neon/50 transition-all">
                                <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                <div className="absolute inset-0 bg-black/80 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center p-4 text-center">
                                    <h3 className="font-bold text-white text-lg mb-2">{post.title}</h3>
                                    <span className="text-neon text-sm border border-neon px-3 py-1 rounded-full">{post.fanCount} Fans</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    </div>
  );
};