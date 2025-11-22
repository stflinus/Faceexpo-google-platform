
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Logo } from './Logo';
import { User } from '../types';

interface NavbarProps {
  user: User | null;
  onLogout: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ user, onLogout }) => {
  const navigate = useNavigate();

  return (
    <nav className="fixed top-0 left-0 right-0 h-20 bg-black z-50 flex items-center justify-between px-4 md:px-8 shadow-lg shadow-black/50 border-b border-neon/20">
      <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105 origin-left">
        <Logo className="h-12 w-auto" />
      </Link>

      <div className="hidden md:flex items-center bg-white/10 rounded-full px-4 py-2 w-1/3 border border-white/10 focus-within:border-neon transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white/60" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search Artists..." 
          className="bg-transparent border-none outline-none text-white placeholder-white/50 ml-2 w-full font-medium"
        />
      </div>

      <div className="flex items-center gap-4">
        <Link to="/about" className="text-white font-bold text-sm hover:text-neon transition-colors">About</Link>
        <Link to="/tips" className="text-white font-bold text-sm hover:text-neon transition-colors">Tips</Link>

        {user ? (
          <>
            <Link to="/feed" className="text-white font-bold hover:text-neon transition-colors hidden sm:block">Feed</Link>
            <Link to="/contest" className="text-white font-bold hover:text-neon transition-colors hidden sm:block">Contest</Link>
             {user.role === 'ARTIST' && (
                <Link to="/upload" className="bg-neon text-black px-4 py-2 rounded-full font-bold text-sm hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,255,170,0.4)]">
                  + Upload
                </Link>
             )}
            <Link to="/settings" className="text-white font-bold text-sm hover:text-neon transition-colors hidden md:block">
              Settings
            </Link>
            <div className="relative group cursor-pointer" onClick={() => navigate(`/profile/${user.id}`)}>
              <img src={user.avatarUrl} alt="Profile" className="w-10 h-10 rounded-full border-2 border-neon" />
            </div>
            <button onClick={onLogout} className="text-white font-bold text-sm hover:text-neon transition-colors">
              Logout
            </button>
          </>
        ) : (
          <div className="flex gap-2">
            <Link to="/auth" className="text-white font-bold text-sm px-4 py-2 border border-white/30 rounded-full hover:bg-white hover:text-black transition-all">
              Login
            </Link>
            <Link to="/auth" className="bg-neon text-black font-bold text-sm px-5 py-2 rounded-full hover:scale-105 transition-transform shadow-[0_0_10px_rgba(0,255,170,0.4)]">
              Join
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};
