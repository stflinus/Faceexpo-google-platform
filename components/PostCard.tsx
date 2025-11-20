
import React, { useState } from 'react';
import { Post } from '../types';
import { Link } from 'react-router-dom';
import { FoldingFan } from './FoldingFan';

interface PostCardProps {
  post: Post;
  onBecomeFan: (artistId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, onBecomeFan }) => {
  const [isFanned, setIsFanned] = useState(false);

  const handleFanClick = () => {
    setIsFanned(true);
    onBecomeFan(post.artistId);
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden mb-6 border border-gray-800 hover:border-neon/50 transition-all duration-300 shadow-lg group">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black">
        <Link to={`/profile/${post.artistId}`} className="flex items-center gap-3">
          <img src={post.artistAvatar} alt={post.artistName} className="w-10 h-10 rounded-full border border-gray-700" />
          <div>
            <h3 className="font-bold text-white hover:text-neon transition-colors">{post.artistName}</h3>
            <span className="text-xs text-gray-400">{post.fanCount} Fans</span>
          </div>
        </Link>
        
        <button 
          onClick={handleFanClick}
          className={`transition-all duration-300 transform p-2 rounded-full hover:scale-150 ${isFanned ? 'scale-110' : 'scale-100'}`}
          title="Become a Fan"
        >
          {/* Fan is always green, no opacity reduction */}
          <FoldingFan className="w-10 h-10 drop-shadow-md" filled={isFanned} />
        </button>
      </div>

      {/* Content */}
      <div className="w-full aspect-square bg-black flex items-center justify-center overflow-hidden relative">
         {post.mediaType === 'image' ? (
             <img src={post.mediaUrl} alt={post.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
         ) : (
             <div className="text-gray-500">Video Placeholder</div>
         )}
         <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black to-transparent opacity-60 pointer-events-none"></div>
      </div>

      {/* Footer */}
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
            <h2 className="text-xl font-bold text-white">{post.title}</h2>
        </div>
        
        <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.map(tag => (
                <span key={tag} className="text-xs text-neon font-mono">#{tag}</span>
            ))}
        </div>

        <div className="flex items-center gap-4 text-sm text-gray-400 border-t border-gray-800 pt-3">
           <button className="flex items-center gap-1 hover:text-white">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
             {post.comments.length} Comments
           </button>
           
           <button className="flex items-center gap-1 hover:text-white ml-auto">
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
             </svg>
             Share
           </button>
        </div>
      </div>
    </div>
  );
};
