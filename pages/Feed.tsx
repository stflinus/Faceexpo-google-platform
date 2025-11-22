
import React, { useEffect, useState } from 'react';
import { PostCard } from '../components/PostCard';
import { MockService } from '../services/mockService';
import { Post, User } from '../types';

interface FeedProps {
  user: User;
}

export const Feed: React.FC<FeedProps> = ({ user }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFeed = async () => {
      try {
        const data = await MockService.getFeed();
        setPosts(data);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    loadFeed();
  }, []);

  const handleToggleFan = async (artistId: string) => {
      // Call API to toggle fan status
      const result = await MockService.toggleFan(user.id, artistId);
      
      // Update local user's list of fanned artists so other components are aware
      if (result.isFanned) {
          if (!user.fannedArtistIds.includes(artistId)) {
              user.fannedArtistIds.push(artistId);
          }
      } else {
          user.fannedArtistIds = user.fannedArtistIds.filter(id => id !== artistId);
      }
      
      // Optimistic update locally for specific artist cards in view
      setPosts(prev => prev.map(p => {
          if(p.artistId === artistId) {
              return { ...p, fanCount: result.newFanCount };
          }
          return p;
      }));
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-0 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-8 bg-black/30 backdrop-blur-md p-4 rounded-xl border border-white/5">
         <h1 className="text-3xl font-bold text-white drop-shadow-md">Discovery Feed</h1>
         <div className="flex gap-2">
            <span className="bg-black/50 border border-neon/30 text-neon px-3 py-1 rounded-full text-xs font-bold cursor-pointer hover:bg-neon hover:text-black transition-colors shadow-[0_0_10px_rgba(0,255,170,0.2)]">Trending</span>
            <span className="bg-black/50 border border-gray-600 text-gray-300 px-3 py-1 rounded-full text-xs font-bold cursor-pointer hover:border-white hover:text-white transition-colors">New</span>
         </div>
      </div>

      {loading ? (
        <div className="flex justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon shadow-[0_0_15px_rgba(0,255,170,0.6)]"></div>
        </div>
      ) : (
        <div className="space-y-6">
          {posts.map(post => (
            <PostCard key={post.id} post={post} currentUser={user} onToggleFan={handleToggleFan} />
          ))}
          
          <div className="text-center pt-8 pb-8">
            <p className="text-black font-semibold text-sm bg-white/20 inline-block px-4 py-1 rounded-full backdrop-blur-sm">You've reached the end of the simulation.</p>
          </div>
        </div>
      )}
    </div>
  );
};
