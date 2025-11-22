
import React, { useState, useEffect } from 'react';
import { Post, Comment, User } from '../types';
import { Link } from 'react-router-dom';
import { FoldingFan } from './FoldingFan';

interface PostCardProps {
  post: Post;
  currentUser: User;
  onToggleFan: (artistId: string) => void;
}

export const PostCard: React.FC<PostCardProps> = ({ post, currentUser, onToggleFan }) => {
  // Initialize with post data, but check user's list for fanned status
  const [isFanned, setIsFanned] = useState(currentUser.fannedArtistIds?.includes(post.artistId) || false);
  const [fanCount, setFanCount] = useState(post.fanCount);
  const [isCommentsOpen, setIsCommentsOpen] = useState(false);
  const [comments, setComments] = useState<Comment[]>(post.comments || []);
  const [newComment, setNewComment] = useState('');
  const [isShareOpen, setIsShareOpen] = useState(false);

  // Sync state if user or post changes externally
  useEffect(() => {
      setIsFanned(currentUser.fannedArtistIds?.includes(post.artistId) || false);
      setFanCount(post.fanCount);
  }, [currentUser, post]);

  const handleFanClick = () => {
    // Optimistic UI Update
    const newStatus = !isFanned;
    setIsFanned(newStatus);
    setFanCount(prev => newStatus ? prev + 1 : prev - 1);
    
    // Call parent to handle API
    onToggleFan(post.artistId);
  };

  const handlePostComment = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newComment.trim()) return;

      const comment: Comment = {
          id: Math.random().toString(36).substr(2, 9),
          userId: currentUser.id,
          username: currentUser.username,
          text: newComment.trim(),
          createdAt: new Date().toISOString()
      };

      setComments([...comments, comment]);
      setNewComment('');
  };

  const handleShare = (platform: string) => {
      const url = window.location.href; // In real app, this would be specific post URL
      const text = `Check out ${post.title} by ${post.artistName} on FaceExpo!`;
      
      let shareUrl = '';
      switch(platform) {
          case 'twitter':
              shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
              break;
          case 'facebook':
              shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
              break;
          case 'email':
              shareUrl = `mailto:?subject=${encodeURIComponent(text)}&body=${encodeURIComponent(url)}`;
              break;
          case 'sms':
              shareUrl = `sms:?body=${encodeURIComponent(text + ' ' + url)}`;
              break;
          case 'copy':
              navigator.clipboard.writeText(url);
              alert('Link copied to clipboard!');
              setIsShareOpen(false);
              return;
      }

      if(shareUrl) {
          window.open(shareUrl, '_blank');
          setIsShareOpen(false);
      }
  };

  return (
    <div className="bg-card rounded-xl overflow-hidden mb-6 border border-gray-800 hover:border-neon/50 transition-all duration-300 shadow-lg group relative">
      {/* Header */}
      <div className="p-4 flex items-center justify-between bg-gradient-to-r from-gray-900 to-black">
        <Link to={`/profile/${post.artistId}`} className="flex items-center gap-3">
          <img src={post.artistAvatar} alt={post.artistName} className="w-10 h-10 rounded-full border border-gray-700" />
          <div>
            <h3 className="font-bold text-white hover:text-neon transition-colors">{post.artistName}</h3>
            <span className="text-xs text-gray-400">{fanCount} Fans</span>
          </div>
        </Link>
        
        {/* Fan Button with Number on Left */}
        <button 
          onClick={handleFanClick}
          className="group flex items-center gap-2 bg-black/30 hover:bg-black/60 border border-transparent hover:border-neon/30 rounded-full px-3 py-1 transition-all duration-300"
          title={isFanned ? "Unfan Artist" : "Become a Fan"}
        >
           {/* Count Number */}
           <span className={`font-mono font-bold text-sm transition-colors ${isFanned ? 'text-neon' : 'text-gray-400 group-hover:text-white'}`}>
             {fanCount}
           </span>

           {/* Fan Icon */}
           <div className={`transition-transform duration-300 transform ${isFanned ? 'scale-110' : 'scale-100 group-hover:scale-110 group-hover:rotate-6'}`}>
             <FoldingFan className="w-8 h-8 drop-shadow-md" filled={isFanned} />
           </div>
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
           <button 
             onClick={() => setIsCommentsOpen(!isCommentsOpen)}
             className={`flex items-center gap-1 hover:text-white transition-colors ${isCommentsOpen ? 'text-neon' : ''}`}
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
             </svg>
             {comments.length} Comments
           </button>
           
           <button 
             onClick={() => setIsShareOpen(true)}
             className="flex items-center gap-1 hover:text-white ml-auto transition-colors"
           >
             <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
             </svg>
             Share
           </button>
        </div>

        {/* Expandable Comments Section */}
        {isCommentsOpen && (
            <div className="mt-4 pt-4 border-t border-gray-800 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="max-h-60 overflow-y-auto mb-4 space-y-3 pr-2 custom-scrollbar">
                    {comments.length === 0 ? (
                        <p className="text-xs text-gray-600 text-center italic">No comments yet. Be the first!</p>
                    ) : (
                        comments.map(comment => (
                            <div key={comment.id} className="bg-white/5 p-3 rounded-lg">
                                <div className="flex justify-between items-baseline mb-1">
                                    <span className="text-neon text-xs font-bold">{comment.username}</span>
                                    <span className="text-[10px] text-gray-500">{new Date(comment.createdAt).toLocaleDateString()}</span>
                                </div>
                                <p className="text-sm text-gray-200">{comment.text}</p>
                            </div>
                        ))
                    )}
                </div>
                
                <form onSubmit={handlePostComment} className="flex gap-2">
                    <input 
                        type="text"
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Add a comment..."
                        className="flex-1 bg-black/50 border border-gray-700 rounded-full px-4 py-2 text-sm text-white focus:border-neon outline-none"
                    />
                    <button 
                        type="submit"
                        disabled={!newComment.trim()}
                        className="bg-neon text-black rounded-full w-8 h-8 flex items-center justify-center font-bold disabled:opacity-50 hover:scale-110 transition-transform"
                    >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </button>
                </form>
            </div>
        )}
      </div>

      {/* Share Modal Overlay */}
      {isShareOpen && (
          <div className="absolute inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-card border border-white/10 rounded-2xl p-6 w-full max-w-xs shadow-[0_0_30px_rgba(0,0,0,0.8)]">
                  <div className="flex justify-between items-center mb-6">
                      <h3 className="font-bold text-lg text-white">Share To</h3>
                      <button onClick={() => setIsShareOpen(false)} className="text-gray-500 hover:text-white">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                      </button>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4">
                       {/* Facebook */}
                       <button onClick={() => handleShare('facebook')} className="flex flex-col items-center gap-2 group">
                           <div className="w-12 h-12 rounded-full bg-[#1877F2] flex items-center justify-center group-hover:scale-110 transition-transform">
                               <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v2.225l-1.501.021c-1.968 0-2.62.475-2.62 2.519v2.496h4.196l-1.055 3.667h-3.141v7.98h-4.347z"/></svg>
                           </div>
                           <span className="text-xs text-gray-400">Facebook</span>
                       </button>

                       {/* Twitter / X */}
                       <button onClick={() => handleShare('twitter')} className="flex flex-col items-center gap-2 group">
                           <div className="w-12 h-12 rounded-full bg-black border border-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                               <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                           </div>
                           <span className="text-xs text-gray-400">Twitter</span>
                       </button>

                       {/* Email */}
                       <button onClick={() => handleShare('email')} className="flex flex-col items-center gap-2 group">
                           <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                           </div>
                           <span className="text-xs text-gray-400">Email</span>
                       </button>

                       {/* SMS */}
                       <button onClick={() => handleShare('sms')} className="flex flex-col items-center gap-2 group">
                           <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center group-hover:scale-110 transition-transform">
                               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" /></svg>
                           </div>
                           <span className="text-xs text-gray-400">SMS</span>
                       </button>

                       {/* Copy Link */}
                       <button onClick={() => handleShare('copy')} className="flex flex-col items-center gap-2 group">
                           <div className="w-12 h-12 rounded-full bg-gray-800 border border-gray-600 flex items-center justify-center group-hover:scale-110 transition-transform">
                               <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                           </div>
                           <span className="text-xs text-gray-400">Copy Link</span>
                       </button>
                  </div>
              </div>
          </div>
      )}
    </div>
  );
};
