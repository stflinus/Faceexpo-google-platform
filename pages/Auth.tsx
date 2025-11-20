
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Logo } from '../components/Logo';
import { MockService } from '../services/mockService';
import { User } from '../types';

interface AuthProps {
  onLogin: (user: User) => void;
}

export const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setLoading(true);
    try {
      // In a real app, we'd distinguish register vs login API calls
      const user = await MockService.login(username);
      onLogin(user);
      navigate('/feed');
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      <div className="w-full max-w-md bg-black/80 backdrop-blur-xl p-8 rounded-3xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]">
        <div className="flex flex-col items-center justify-center mb-8">
          <Logo className="h-20 w-auto" />
        </div>
        
        <h2 className="text-xl font-bold text-center mb-2 text-white">
          {isLogin ? 'Welcome Back' : 'Join the Revolution'}
        </h2>
        <p className="text-center text-gray-400 mb-8 text-sm">
          {isLogin ? 'Access your personalized feed.' : 'Start building your fanbase today.'}
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs font-bold text-neon mb-2 uppercase tracking-widest">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-black/50 border border-gray-700 rounded-lg p-4 text-white focus:border-neon focus:outline-none transition-colors placeholder-gray-600"
              placeholder="Enter your creative handle"
            />
          </div>

          <Button type="submit" className="w-full py-4 text-lg font-black tracking-wide shadow-lg shadow-neon/20" isLoading={loading}>
            {isLogin ? 'ENTER' : 'CREATE ACCOUNT'}
          </Button>
        </form>

        <div className="mt-8 text-center">
          <button 
            onClick={() => setIsLogin(!isLogin)}
            className="text-gray-400 hover:text-white text-sm underline decoration-gray-700 hover:decoration-white underline-offset-4 transition-all"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already a member? Log in"}
          </button>
        </div>
      </div>
    </div>
  );
};
