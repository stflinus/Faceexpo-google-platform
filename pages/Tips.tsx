
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Tips: React.FC = () => {
  const copyLink = () => {
      navigator.clipboard.writeText("https://faceexpo.com");
      alert("Link copied! Ready to paste.");
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-3xl mx-auto">
        
        <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
           <div className="inline-block bg-neon/10 text-neon px-4 py-1 rounded-full text-sm font-bold mb-4 border border-neon/30 shadow-[0_0_10px_rgba(0,255,170,0.3)]">
              Growth Hacking
           </div>
           <h1 className="text-4xl md:text-6xl font-black mb-6 uppercase italic tracking-tighter text-white">
             Tips to Get <span className="text-neon text-neon-glow">More Fans</span>
           </h1>
           <p className="text-white text-xl max-w-2xl mx-auto font-medium">
             FaceExpo is built on community. Here is your blueprint to going <span className="text-neon font-black text-2xl uppercase drop-shadow-[0_0_15px_rgba(0,255,170,0.8)]">VIRAL</span>.
           </p>
        </div>

        <div className="bg-card border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden group hover:border-neon/30 transition-colors duration-500">
             {/* Background decoration */}
             <div className="absolute top-0 right-0 w-64 h-64 bg-neon/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

             <div className="relative z-10">
                 <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                    <span className="text-3xl">🔗</span> 
                    <span>Social Sharing <span className="text-gray-500 font-normal text-sm ml-2">(Start Here)</span></span>
                 </h2>
                 
                 <div className="space-y-8">
                    {/* Primary Action */}
                    <div>
                        <p className="text-lg text-gray-200 mb-4 font-medium leading-relaxed">
                            Share FaceExpo with all your friends on Facebook, Instagram, Twitter/X, Snapchat, and TikTok.
                        </p>
                        
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {/* Facebook */}
                            <a 
                                href="https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Ffaceexpo.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-[#1877F2] text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-[#1877F2]/40"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v2.225l-1.501.021c-1.968 0-2.62.475-2.62 2.519v2.496h4.196l-1.055 3.667h-3.141v7.98h-4.347z"/></svg>
                                Facebook
                            </a>
                            
                            {/* X / Twitter */}
                            <a 
                                href="https://twitter.com/intent/tweet?text=Check%20out%20FaceExpo%2C%20the%20future%20of%20talent%20discovery!&url=https%3A%2F%2Ffaceexpo.com" 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-black border border-gray-700 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:border-white"
                            >
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                                Twitter / X
                            </a>

                            {/* Instagram (Copy) */}
                            <button 
                                onClick={copyLink}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-pink-500/40"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                Instagram
                            </button>

                             {/* TikTok (Copy) */}
                             <button 
                                onClick={copyLink}
                                className="flex items-center justify-center gap-2 px-4 py-3 bg-black border border-gray-700 text-white rounded-xl font-bold hover:scale-105 transition-transform shadow-lg hover:shadow-cyan-500/20 group"
                            >
                                <span className="flex">
                                    <span className="text-[#00f2ea] shadow-[2px_2px_0px_#ff0050]">TikTok</span>
                                </span>
                            </button>
                        </div>
                    </div>

                    <div className="h-px bg-white/10"></div>

                    {/* Detailed List */}
                    <ul className="space-y-4">
                        <li className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-neon font-bold">1</div>
                             <p className="text-gray-300 leading-relaxed pt-1">
                                Post on <strong className="text-white">Instagram Stories</strong> with a swipe-up link and a quick <em>“Check this out!”</em>.
                             </p>
                        </li>
                        <li className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-neon font-bold">2</div>
                             <p className="text-gray-300 leading-relaxed pt-1">
                                Add <strong className="text-neon">FaceExpo</strong> to your bio link on Instagram, TikTok, and X.
                             </p>
                        </li>
                        <li className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-neon font-bold">3</div>
                             <p className="text-gray-300 leading-relaxed pt-1">
                                Share a short teaser video in <strong className="text-white">Facebook groups</strong> (music, talent, creative communities).
                             </p>
                        </li>
                        <li className="flex gap-4">
                             <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 text-neon font-bold">4</div>
                             <p className="text-gray-300 leading-relaxed pt-1">
                                Ask friends to share it on their stories — simple: <br/>
                                <span className="text-white italic block mt-2 p-3 bg-white/5 rounded-lg border-l-2 border-neon">
                                    “Yo, my friend is building the next big talent platform. Check it out!”
                                </span>
                             </p>
                        </li>
                    </ul>

                 </div>
             </div>
        </div>

        <div className="flex justify-center mt-12">
            <Link to="/feed">
                <Button variant="ghost">Back to Feed</Button>
            </Link>
        </div>
      </div>
    </div>
  );
};
