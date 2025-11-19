import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Feed } from './pages/Feed';
import { Profile } from './pages/Profile';
import { Upload } from './pages/Upload';
import { Auth } from './pages/Auth';
import { User } from './types';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <div className="min-h-screen text-white font-sans selection:bg-neon selection:text-black flex flex-col">
        <Navbar user={user} onLogout={handleLogout} />
        
        <Routes>
          <Route path="/" element={!user ? <Landing /> : <Navigate to="/feed" />} />
          <Route path="/auth" element={!user ? <Auth onLogin={handleLogin} /> : <Navigate to="/feed" />} />
          
          {/* Protected Routes */}
          <Route path="/feed" element={user ? <Feed /> : <Navigate to="/auth" />} />
          <Route path="/profile/:id" element={user ? <Profile /> : <Navigate to="/auth" />} />
          <Route path="/upload" element={user ? <Upload user={user} /> : <Navigate to="/auth" />} />
          
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>

        {/* Footer Bar */}
        <footer className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 h-12 flex items-center justify-center text-gray-500 text-xs z-50 shadow-[0_-5px_15px_rgba(0,0,0,0.5)]">
           © 2023 FaceExpo. The Future of Fandom.
        </footer>
      </div>
    </Router>
  );
};

export default App;