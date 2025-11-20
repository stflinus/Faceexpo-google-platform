
import React from 'react';

interface LogoProps {
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ className = "h-10" }) => {
  return (
    <svg 
      viewBox="0 0 240 65" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="FaceExpo Logo"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
           <stop offset="0%" stopColor="#FFFFFF" />
           <stop offset="45%" stopColor="#FFFFFF" />
           <stop offset="45%" stopColor="#00FFAA" />
           <stop offset="100%" stopColor="#00FFAA" />
        </linearGradient>
      </defs>
      
      {/* Text Group */}
      <text 
        x="0" 
        y="48" 
        fontFamily="'Inter', sans-serif" 
        fontWeight="300" 
        fontSize="60" 
        letterSpacing="-3"
      >
        <tspan fill="white">face</tspan>
        <tspan fill="#00FFAA">expo</tspan>
      </text>

      {/* Smile Curve - Positioned under the "ee" junction (approx x=95 to x=135) */}
      <path 
        d="M 92 58 Q 113 75 134 58" 
        stroke="#00FFAA" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  );
};
