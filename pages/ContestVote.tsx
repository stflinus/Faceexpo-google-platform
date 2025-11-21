
import React, { useEffect, useState } from 'react';
import { MockService } from '../services/mockService';
import { ContestEntry } from '../types';
import { Button } from '../components/Button';

export const ContestVote: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'ALL' | 'BEST_IN_SHOW' | 'FUNNIEST_VIDEO'>('ALL');
  const [entries, setEntries] = useState<ContestEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [votedEntries, setVotedEntries] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Initialize voted entries from local storage to persist state across reloads
    try {
        const storedVotes = localStorage.getItem('faceexpo_votes');
        if (storedVotes) {
            const parsed = JSON.parse(storedVotes);
            if (Array.isArray(parsed)) {
                setVotedEntries(new Set(parsed));
            }
        }
    } catch (e) {
        console.error("Failed to parse votes or access localStorage", e);
    }

    const fetchEntries = async () => {
      setLoading(true);
      try {
          const allEntries = await MockService.getContestEntries(activeCategory === 'ALL' ? undefined : activeCategory);
          setEntries(allEntries);
      } catch (error) {
          console.error("Failed to load entries", error);
      } finally {
          setLoading(false);
      }
    };
    fetchEntries();
  }, [activeCategory]);

  const handleVote = async (entryId: string) => {
    if (votedEntries.has(entryId)) return;
    
    // Update local state and storage immediately
    const newVotedSet = new Set(votedEntries).add(entryId);
    setVotedEntries(newVotedSet);
    
    try {
        localStorage.setItem('faceexpo_votes', JSON.stringify(Array.from(newVotedSet)));
    } catch (e) {
        console.error("Failed to save votes to localStorage", e);
    }

    // Optimistic UI update for vote count
    setEntries(prev => prev.map(e => {
        if (e.id === entryId) {
            return { ...e, votes: e.votes + 1 };
        }
        return e;
    }));

    // Persist to backend
    await MockService.voteForEntry(entryId);
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
           <h1 className="text-4xl md:text-6xl font-black mb-4 uppercase italic text-white drop-shadow-[0_0_10px_rgba(0,255,170,0.8)]">
             The <span className="text-neon">Arena</span>
           </h1>
           <p className="text-gray-300 text-lg max-w-2xl mx-auto">
             Cast your votes. Decide the destiny of the next big star.
           </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12 sticky top-20 z-30 bg-black/50 backdrop-blur-xl p-4 rounded-full border border-white/10 w-fit mx-auto">
            <button 
                onClick={() => setActiveCategory('ALL')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'ALL' ? 'bg-white text-black shadow-[0_0_15px_white]' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
            >
                All Entries
            </button>
            <button 
                onClick={() => setActiveCategory('BEST_IN_SHOW')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'BEST_IN_SHOW' ? 'bg-neon text-black shadow-[0_0_15px_rgba(0,255,170,0.6)]' : 'text-gray-400 hover:text-neon hover:bg-neon/10'}`}
            >
                Best In Show
            </button>
            <button 
                onClick={() => setActiveCategory('FUNNIEST_VIDEO')}
                className={`px-6 py-2 rounded-full font-bold transition-all ${activeCategory === 'FUNNIEST_VIDEO' ? 'bg-sky text-black shadow-[0_0_15px_rgba(135,206,235,0.6)]' : 'text-gray-400 hover:text-sky hover:bg-sky/10'}`}
            >
                Funniest Video
            </button>
        </div>

        {loading ? (
            <div className="flex justify-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neon shadow-[0_0_15px_rgba(0,255,170,0.5)]"></div>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {entries.map(entry => (
                    <div key={entry.id} className="bg-card rounded-2xl overflow-hidden border border-gray-800 hover:border-neon/50 transition-all hover:shadow-[0_0_30px_rgba(0,0,0,0.6)] group flex flex-col h-full">
                        {/* Video Area */}
                        <div className="relative aspect-video bg-black group-hover:opacity-100 transition-opacity">
                            <video 
                                src={entry.videoUrl} 
                                className="w-full h-full object-cover" 
                                controls 
                                playsInline
                                preload="metadata"
                                poster={entry.thumbnailUrl}
                            />
                            <div className={`absolute top-3 left-3 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-black border border-white/10 shadow-lg ${entry.category === 'BEST_IN_SHOW' ? 'bg-neon' : 'bg-sky'}`}>
                                {entry.category === 'BEST_IN_SHOW' ? '🏆 Best In Show' : '😂 Funniest'}
                            </div>
                        </div>

                        {/* Content Area */}
                        <div className="p-5 flex-1 flex flex-col">
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <img src={entry.userAvatar} alt={entry.username} className="w-8 h-8 rounded-full border border-gray-600" />
                                    <span className="font-bold text-sm text-gray-300 group-hover:text-white transition-colors">{entry.username}</span>
                                </div>
                            </div>
                            
                            <h3 className="text-xl font-bold text-white mb-4 line-clamp-2">{entry.title}</h3>
                            
                            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-800">
                                <div className="text-center">
                                    <span className={`block text-2xl font-black leading-none transition-colors ${votedEntries.has(entry.id) ? 'text-neon drop-shadow-[0_0_5px_rgba(0,255,170,0.5)]' : 'text-white'}`}>
                                        {entry.votes}
                                    </span>
                                    <span className="text-[10px] text-gray-500 uppercase tracking-widest">Votes</span>
                                </div>
                                
                                <Button 
                                    onClick={() => handleVote(entry.id)}
                                    disabled={votedEntries.has(entry.id)}
                                    variant={votedEntries.has(entry.id) ? 'outline' : 'primary'}
                                    className={`min-w-[120px] transition-all duration-300 ${
                                        votedEntries.has(entry.id) 
                                        ? 'opacity-100 bg-neon/10 border-neon text-neon cursor-default hover:bg-neon/10 hover:text-neon' 
                                        : 'hover:scale-105'
                                    }`}
                                >
                                    {votedEntries.has(entry.id) ? (
                                        <span className="flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                            Voted
                                        </span>
                                    ) : 'Vote Now'}
                                </Button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        )}
        
        {!loading && entries.length === 0 && (
            <div className="text-center py-20 bg-white/5 rounded-3xl border border-white/10">
                <div className="text-6xl mb-4">🏜️</div>
                <p className="text-xl font-bold text-white mb-2">No entries yet.</p>
                <p className="text-gray-400">Be the first to upload a video in this category!</p>
            </div>
        )}
      </div>
    </div>
  );
};
