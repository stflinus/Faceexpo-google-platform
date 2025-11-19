import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

export const Landing: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden">
      
      <div className="z-10 text-center max-w-4xl px-6 py-12 bg-black/40 backdrop-blur-sm rounded-3xl border border-white/10 shadow-2xl">
        <h1 className="text-6xl md:text-8xl font-black mb-6 tracking-tighter leading-tight drop-shadow-xl">
          DISCOVER <span className="text-neon drop-shadow-[0_0_10px_rgba(0,255,170,0.8)]">TALENT</span>. <br/>
          BE A <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">FAN</span>.
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-200 mb-10 max-w-2xl mx-auto font-light drop-shadow-md">
          The social platform where "Likes" don't exist. 
          Build a loyal fanbase, support real artists, and shape culture.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
          <Link to="/auth">
            <Button className="text-lg px-10 py-4 shadow-[0_0_20px_rgba(0,255,170,0.3)]">Start Exploring</Button>
          </Link>
          <Link to="/auth">
             <Button variant="outline" className="text-lg px-10 py-4 bg-black/50 border-white text-white hover:bg-neon hover:text-black hover:border-neon">I am an Artist</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};