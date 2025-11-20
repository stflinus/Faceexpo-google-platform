
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
      {/* Text Group */}
      <text 
        x="0" 
        y="48" 
        fontFamily="'Inter', sans-serif" 
        fontWeight="300" 
        fontSize="60" 
        letterSpacing="-3"
      >
        {/* "face" is white */}
        <tspan fill="white">face</tspan>
        {/* "e" (second e) is white to form the pair of eyes "ee" */}
        <tspan fill="white">e</tspan>
        {/* "xpo" remains neon */}
        <tspan fill="#00FFAA">xpo</tspan>
      </text>

      {/* Smile Curve - White, positioned under the "ee" junction to look like a face */}
      <path 
        d="M 92 58 Q 113 75 134 58" 
        stroke="white" 
        strokeWidth="4" 
        strokeLinecap="round"
      />
    </svg>
  );
};
