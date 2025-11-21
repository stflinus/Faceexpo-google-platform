
import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { MockService } from '../services/mockService';
import { User } from '../types';

interface ContestProps {
  user: User;
}

type ContestCategory = 'BEST_IN_SHOW' | 'FUNNIEST_VIDEO';

export const Contest: React.FC<ContestProps> = ({ user }) => {
  const [step, setStep] = useState<'SELECT' | 'PAY' | 'UPLOAD' | 'SUCCESS'>('SELECT');
  const [category, setCategory] = useState<ContestCategory | null>(null);
  const [processing, setProcessing] = useState(false);
  
  // Video Upload & Trimming State
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [startTime, setStartTime] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const navigate = useNavigate();

  const MIN_DURATION = 1; // Minimum 1 second clip
  const MAX_DURATION = 30; // Maximum 30 second clip

  // Cleanup preview URL on unmount or change
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleSelectCategory = (cat: ContestCategory) => {
    setCategory(cat);
    setStep('PAY');
  };

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!category) return;

    setProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 1500));
    setProcessing(false);
    setStep('UPLOAD');
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
      setIsPlaying(true);
    }
  };

  const onLoadedMetadata = () => {
    if (videoRef.current) {
      const duration = videoRef.current.duration;
      if (!isNaN(duration)) {
        setVideoDuration(duration);
        setStartTime(0);
        // Default to max 30s or full video if shorter
        setEndTime(Math.min(duration, MAX_DURATION));
        // Auto play if possible
        videoRef.current.play().catch(() => setIsPlaying(false));
      }
    }
  };

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Loop video within the selected clip range
      if (videoRef.current.currentTime >= endTime) {
        videoRef.current.currentTime = startTime;
        if (isPlaying) {
            videoRef.current.play().catch(() => {});
        }
      }
    }
  };

  const handleStartChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newStart = parseFloat(e.target.value);
    let newEnd = endTime;

    // Prevent Start from crossing End (maintain MIN_DURATION)
    if (newStart >= newEnd - MIN_DURATION) {
        newEnd = Math.min(newStart + MIN_DURATION, videoDuration);
        // If we hit video end and can't maintain min duration, clamp start
        if (newEnd - newStart < MIN_DURATION) {
            return;
        }
    }
    
    // Enforce Max Duration: If dragging Start extends duration beyond MAX, pull End in.
    // Actually, standard behavior is: window stays same size OR end stays fixed unless max exceeded.
    // Here: If (End - Start) > 30, we must move End to (Start + 30).
    if (newEnd - newStart > MAX_DURATION) {
        newEnd = newStart + MAX_DURATION;
    }

    setStartTime(newStart);
    setEndTime(newEnd);
    
    if (videoRef.current) {
      videoRef.current.currentTime = newStart;
    }
  };

  const handleEndChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEnd = parseFloat(e.target.value);
    let newStart = startTime;

    // Prevent End from crossing Start
    if (newEnd <= newStart + MIN_DURATION) {
        newStart = Math.max(0, newEnd - MIN_DURATION);
        if (newEnd - newStart < MIN_DURATION) {
            return;
        }
    }

    // Enforce Max Duration
    if (newEnd - newStart > MAX_DURATION) {
        newStart = newEnd - MAX_DURATION;
    }

    setStartTime(newStart);
    setEndTime(newEnd);
    
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(startTime, newEnd - 0.1);
    }
  };

  const handleUpload = async () => {
    if (!category || !selectedFile) return;
    setProcessing(true);
    
    // Simulate processing/trimming logic
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    try {
      await MockService.submitContestEntry(user.id, category);
      setStep('SUCCESS');
    } catch (error) {
      console.error("Entry failed", error);
    } finally {
      setProcessing(false);
    }
  };

  const clearSelection = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setVideoDuration(0);
    setStartTime(0);
    setEndTime(0);
    setIsPlaying(false);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-20 px-4 md:px-0">
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-7xl font-black mb-4 uppercase italic tracking-tighter drop-shadow-[0_0_15px_rgba(0,255,170,0.5)]">
            Karaoke <span className="text-neon">Showdown</span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Step into the spotlight. Compete for glory. <br/>
            <span className="text-neon font-bold">$1.99</span> Entry Fee. Infinite Fame.
          </p>
          
          {/* Link to Vote Page */}
          <div className="mt-10 flex justify-center">
            <Button 
                onClick={() => navigate('/contest/vote')}
                variant="outline" 
                className="px-10 py-3 text-lg hover:scale-110 transition-transform duration-300 shadow-[0_0_15px_rgba(0,255,170,0.3)]"
            >
                👀 Just here to watch? Vote for Winners →
            </Button>
          </div>
        </div>

        {/* Step 1: Select Category */}
        {step === 'SELECT' && (
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            <div 
              onClick={() => handleSelectCategory('BEST_IN_SHOW')}
              className="group cursor-pointer relative h-80 bg-black/60 backdrop-blur-md rounded-3xl border-2 border-white/10 hover:border-neon transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/800/600?random=50')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="z-20 text-center p-6">
                <div className="bg-neon text-black font-black px-4 py-1 rounded-full text-xs mb-4 inline-block shadow-[0_0_10px_rgba(0,255,170,0.6)]">PRESTIGE</div>
                <h2 className="text-4xl font-black text-white mb-2 italic">BEST IN SHOW</h2>
                <p className="text-gray-300 text-sm">For the true vocalists. Bring your absolute best performance.</p>
              </div>
            </div>

            <div 
              onClick={() => handleSelectCategory('FUNNIEST_VIDEO')}
              className="group cursor-pointer relative h-80 bg-black/60 backdrop-blur-md rounded-3xl border-2 border-white/10 hover:border-sky hover:shadow-[0_0_30px_rgba(135,206,235,0.3)] transition-all duration-500 hover:scale-105 flex flex-col items-center justify-center overflow-hidden shadow-2xl"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90 z-10"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[url('https://picsum.photos/800/600?random=51')] bg-cover bg-center opacity-40 group-hover:opacity-60 transition-opacity"></div>
              <div className="z-20 text-center p-6">
                <div className="bg-sky text-black font-black px-4 py-1 rounded-full text-xs mb-4 inline-block shadow-[0_0_10px_rgba(135,206,235,0.6)]">WILD</div>
                <h2 className="text-4xl font-black text-white mb-2 italic">FUNNIEST VID</h2>
                <p className="text-gray-300 text-sm">Props, costumes, and chaos. Make the fans laugh.</p>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Payment */}
        {step === 'PAY' && (
          <div className="max-w-md mx-auto bg-black/80 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative">
             <button onClick={() => setStep('SELECT')} className="absolute top-6 left-6 text-gray-500 hover:text-white">← Back</button>
             <h2 className="text-2xl font-bold text-center mb-6 mt-4">Secure Entry</h2>
             <div className="flex justify-between items-center mb-8 bg-white/5 p-4 rounded-xl border border-white/5">
                <span className="text-gray-400">Entry Fee</span>
                <span className="text-2xl font-bold text-neon">$1.99</span>
             </div>
             <form onSubmit={handlePayment} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Cardholder Name</label>
                  <input required type="text" placeholder="Jane Doe" className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white focus:border-neon outline-none" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Card Number</label>
                  <input required type="text" placeholder="0000 0000 0000 0000" className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white focus:border-neon outline-none font-mono" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">Expiry</label>
                      <input required type="text" placeholder="MM/YY" className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white focus:border-neon outline-none font-mono" />
                   </div>
                   <div>
                      <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">CVC</label>
                      <input required type="text" placeholder="123" className="w-full bg-black/50 border border-gray-800 rounded-lg p-3 text-white focus:border-neon outline-none font-mono" />
                   </div>
                </div>
                <Button type="submit" className="w-full mt-4 py-3 text-lg" isLoading={processing}>Pay & Continue</Button>
             </form>
             <div className="text-center mt-4 text-xs text-gray-600">Powered by FaceExpo Secure Payments.</div>
          </div>
        )}

        {/* Step 3: Upload & Trim */}
        {step === 'UPLOAD' && (
           <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6">
                  <h2 className="text-3xl font-bold mb-2">Upload Your Entry</h2>
                  <p className="text-neon">Category: {category === 'BEST_IN_SHOW' ? 'Best In Show' : 'Funniest Video'}</p>
              </div>
              
              <input type="file" accept="video/*" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

              {!selectedFile ? (
                <div onClick={triggerFileSelect} className="bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-3xl p-12 hover:border-neon transition-all cursor-pointer group text-center">
                    <div className="mb-4">
                      <svg className="w-16 h-16 mx-auto text-gray-600 group-hover:text-neon transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">Drop your video here</h3>
                    <p className="text-gray-500 text-sm mb-6">MP4, MOV or WEBM (Max 200MB)</p>
                    <Button className="mx-auto px-12">Select Video</Button>
                </div>
              ) : (
                <div className="bg-black/80 backdrop-blur-md p-6 rounded-3xl border border-white/10">
                  {/* Video Preview */}
                  <div className="relative aspect-video bg-black rounded-xl overflow-hidden mb-6 border border-gray-800 shadow-xl group">
                    {previewUrl && (
                      <video 
                        ref={videoRef}
                        src={previewUrl}
                        className="w-full h-full object-contain"
                        onLoadedMetadata={onLoadedMetadata}
                        onTimeUpdate={handleTimeUpdate}
                        controls={false}
                        autoPlay
                        muted={false}
                        loop={false}
                        onClick={togglePlay}
                      />
                    )}
                    {/* Play/Pause Overlay */}
                    <div className={`absolute inset-0 flex items-center justify-center bg-black/20 pointer-events-none transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'opacity-100'}`}>
                        <div className="bg-black/60 p-4 rounded-full backdrop-blur-sm">
                             <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                        </div>
                    </div>
                    <div className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded font-mono border border-white/10 backdrop-blur">
                      Previewing Clip
                    </div>
                  </div>

                  {/* Trimming Controls */}
                  <div className="space-y-6 mb-8 px-2">
                    <div className="flex justify-between items-end text-sm font-bold text-gray-400 mb-2">
                      <div>
                          <span className="block text-xs text-gray-600 uppercase">Start</span>
                          <span className="text-white">{formatTime(startTime)}</span>
                      </div>
                      <div className="text-center">
                          <span className="block text-xs text-neon mb-1">Duration</span>
                          <span className="bg-neon/10 text-neon px-2 py-1 rounded border border-neon/30">
                              {(endTime - startTime).toFixed(1)}s
                          </span>
                      </div>
                      <div className="text-right">
                          <span className="block text-xs text-gray-600 uppercase">End</span>
                          <span className="text-white">{formatTime(endTime)}</span>
                      </div>
                    </div>

                    {/* Timeline Slider */}
                    <div className="relative h-16 bg-gray-900 rounded-lg overflow-hidden border border-gray-700 select-none">
                      {/* Timeline Background Grid */}
                      <div className="absolute inset-0 opacity-30 bg-[linear-gradient(90deg,transparent_0%,transparent_49%,rgba(255,255,255,0.1)_50%,transparent_51%)] bg-[length:20px_100%]"></div>
                      
                      {/* Selected Region */}
                      <div 
                        className="absolute top-0 h-full bg-neon/20 border-l-2 border-r-2 border-neon z-10"
                        style={{ 
                          left: `${videoDuration > 0 ? (startTime / videoDuration) * 100 : 0}%`, 
                          width: `${videoDuration > 0 ? ((endTime - startTime) / videoDuration) * 100 : 0}%` 
                        }}
                      ></div>

                      {/* Playhead */}
                       <div 
                        className="absolute top-0 h-full w-0.5 bg-white z-20 shadow-[0_0_5px_white] transition-all duration-75 ease-linear"
                        style={{ 
                          left: `${videoDuration > 0 ? (currentTime / videoDuration) * 100 : 0}%`, 
                        }}
                      ></div>

                      {/* Range Inputs (Invisible but clickable) */}
                      <input 
                        type="range" 
                        min="0" 
                        max={Math.max(0.1, videoDuration)} 
                        step="0.1"
                        value={startTime}
                        onChange={handleStartChange}
                        className="trim-slider absolute top-0 left-0 w-full h-full z-30"
                        title="Drag to adjust Start Time"
                      />
                      <input 
                        type="range" 
                        min="0" 
                        max={Math.max(0.1, videoDuration)} 
                        step="0.1"
                        value={endTime}
                        onChange={handleEndChange}
                        className="trim-slider absolute top-0 left-0 w-full h-full z-30"
                        title="Drag to adjust End Time"
                      />
                    </div>
                    
                    <p className="text-xs text-center text-gray-500 mt-2">
                      Drag the handles to select your clip (Max 30 seconds).
                    </p>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={clearSelection} className="flex-1">Change Video</Button>
                    <Button onClick={handleUpload} isLoading={processing} className="flex-[2]">Submit Clip</Button>
                  </div>
                </div>
              )}
           </div>
        )}

        {/* Step 4: Success */}
        {step === 'SUCCESS' && (
          <div className="max-w-lg mx-auto text-center bg-black/80 backdrop-blur-md p-12 rounded-3xl border border-neon/30 shadow-[0_0_50px_rgba(0,255,170,0.2)]">
            <div className="w-20 h-20 bg-neon rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_20px_rgba(0,255,170,0.5)]">
              <svg className="w-10 h-10 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-black text-white mb-4">YOU'RE IN!</h2>
            <p className="text-gray-300 mb-8">
              Your video has been submitted to the <strong>{category === 'BEST_IN_SHOW' ? 'Best In Show' : 'Funniest Video'}</strong> category.
              Winners will be announced next Friday.
            </p>
            <div className="flex gap-4 justify-center">
              <Button onClick={() => navigate('/feed')}>Back to Feed</Button>
              <Button variant="outline" onClick={() => navigate('/profile/' + user.id)}>View Profile</Button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
