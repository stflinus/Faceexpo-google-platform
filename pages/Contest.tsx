import React, { useState } from 'react';
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
  const navigate = useNavigate();

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

  const handleUpload = async () => {
    if (!category) return;
    setProcessing(true);
    try {
      await MockService.submitContestEntry(user.id, category);
      setStep('SUCCESS');
    } catch (error) {
      console.error("Entry failed", error);
    } finally {
      setProcessing(false);
    }
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
        </div>

        {/* Step 1: Select Category */}
        {step === 'SELECT' && (
          <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
            {/* Best In Show Card */}
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

            {/* Funniest Video Card */}
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
                
                <Button type="submit" className="w-full mt-4 py-3 text-lg" isLoading={processing}>
                  Pay & Continue
                </Button>
             </form>
             
             <div className="text-center mt-4 text-xs text-gray-600">
               Powered by FaceExpo Secure Payments.
             </div>
          </div>
        )}

        {/* Step 3: Upload */}
        {step === 'UPLOAD' && (
           <div className="max-w-xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-2">Upload Your Entry</h2>
              <p className="text-neon mb-8">Category: {category === 'BEST_IN_SHOW' ? 'Best In Show' : 'Funniest Video'}</p>
              
              <div className="bg-gray-900/50 border-2 border-dashed border-gray-700 rounded-3xl p-12 hover:border-neon transition-all cursor-pointer group">
                  <div className="mb-4">
                    <svg className="w-16 h-16 mx-auto text-gray-600 group-hover:text-neon transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">Drop your video here</h3>
                  <p className="text-gray-500 text-sm mb-6">MP4, MOV or WEBM (Max 200MB)</p>
                  <Button onClick={handleUpload} isLoading={processing} className="mx-auto px-12">
                    Select File
                  </Button>
              </div>
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