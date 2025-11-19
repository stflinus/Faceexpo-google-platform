import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MockService } from '../services/mockService';
import { generateDescription } from '../services/geminiService';
import { User } from '../types';

interface UploadProps {
    user: User;
}

export const Upload: React.FC<UploadProps> = ({ user }) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const navigate = useNavigate();

  const handleGenerateAI = async () => {
      if(!title) return alert("Enter a title first!");
      setIsGenerating(true);
      const tagArray = tags.split(',').map(t => t.trim());
      const aiDesc = await generateDescription(title, tagArray);
      setDescription(aiDesc);
      setIsGenerating(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setIsUploading(true);
      
      // Simulate upload
      await MockService.createPost({
          artistId: user.id,
          artistName: user.username,
          artistAvatar: user.avatarUrl,
          title,
          mediaUrl: `https://picsum.photos/800/800?random=${Date.now()}`, // Mock image
          mediaType: 'image',
          tags: tags.split(',').map(t => t.trim()),
      }, user);

      setIsUploading(false);
      navigate(`/profile/${user.id}`);
  };

  return (
    <div className="min-h-screen pt-24 px-4 max-w-xl mx-auto pb-20">
       <div className="bg-black/80 backdrop-blur-md p-8 rounded-3xl border border-white/10 shadow-2xl">
           <h1 className="text-3xl font-bold mb-8 text-center">Upload to Showcase</h1>
           
           <form onSubmit={handleSubmit} className="space-y-6">
               <div className="bg-gray-900/50 border-2 border-gray-700 rounded-xl p-8 text-center border-dashed hover:border-neon transition-colors cursor-pointer group">
                   <div className="text-gray-500 mb-2 group-hover:text-neon transition-colors">
                      <svg className="w-12 h-12 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                      <span className="font-bold">Click to Select File</span>
                   </div>
                   <p className="text-xs text-gray-500">JPG, PNG or MP4 (Max 50MB)</p>
                   <input type="file" className="hidden" /> 
               </div>

               <div>
                   <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-wider">Title</label>
                   <input 
                     type="text" 
                     value={title}
                     onChange={(e) => setTitle(e.target.value)}
                     className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600"
                     placeholder="Name your masterpiece"
                   />
               </div>

               <div>
                   <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-wider">Tags (comma separated)</label>
                   <input 
                     type="text" 
                     value={tags}
                     onChange={(e) => setTags(e.target.value)}
                     className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600"
                     placeholder="cyberpunk, neon, abstract"
                   />
               </div>

                <div>
                   <div className="flex justify-between items-center mb-2">
                        <label className="block text-xs font-bold text-neon uppercase tracking-wider">Description</label>
                        <button 
                            type="button"
                            onClick={handleGenerateAI}
                            disabled={isGenerating}
                            className="text-xs bg-neon/10 text-neon px-3 py-1 rounded-full hover:bg-neon hover:text-black flex items-center gap-1 transition-colors border border-neon/30"
                        >
                            {isGenerating ? 'Thinking...' : '✨ Generate with AI'}
                        </button>
                   </div>
                   <textarea 
                     value={description}
                     onChange={(e) => setDescription(e.target.value)}
                     rows={4}
                     className="w-full bg-black/50 border border-gray-700 rounded-lg p-3 focus:border-neon focus:outline-none text-white placeholder-gray-600"
                     placeholder="Tell the story behind this work..."
                   />
               </div>

               <Button type="submit" className="w-full py-3 shadow-lg shadow-neon/20" isLoading={isUploading}>
                   Publish to Fans
               </Button>
           </form>
       </div>
    </div>
  );
};