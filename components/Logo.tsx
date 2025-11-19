
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "w-10 h-10" }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      {/* Left 'e' */}
      <path 
        d="M40 45 H 15 A 12 12 0 1 1 35 60"
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round"
        fill="none"
      />
      {/* Right 'e' */}
      <path 
        d="M85 45 H 60 A 12 12 0 1 1 80 60" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round"
        fill="none"
      />
      
      {/* Smile */}
      <path 
        d="M25 80 Q 50 95, 75 80" 
        stroke="currentColor" 
        strokeWidth="8" 
        strokeLinecap="round"
      />
    </svg>
  );
};
