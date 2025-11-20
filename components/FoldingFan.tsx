
import React from 'react';

interface FoldingFanProps {
  className?: string;
  filled?: boolean;
}

export const FoldingFan: React.FC<FoldingFanProps> = ({ className = "w-10 h-10", filled = false }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      className={className} 
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fan"
      style={{ overflow: 'visible' }}
    >
      <defs>
        <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      <g transform="translate(50, 90)" filter={filled ? "url(#neon-glow)" : ""}>
        {/* Fan Segments - Alternating colors for 3D pleated effect */}
        
        {/* Left Side Segments */}
        <path d="M0 0 L-70 -20 L-65 -35 L0 0" fill="#00CC88" stroke="none" />
        <path d="M0 0 L-65 -35 L-55 -48 L0 0" fill="#00FFAA" stroke="none" />
        
        <path d="M0 0 L-55 -48 L-42 -60 L0 0" fill="#00CC88" stroke="none" />
        <path d="M0 0 L-42 -60 L-25 -70 L0 0" fill="#00FFAA" stroke="none" />
        
        <path d="M0 0 L-25 -70 L-10 -75 L0 0" fill="#00CC88" stroke="none" />
        
        {/* Center/Right Side Segments */}
        <path d="M0 0 L-10 -75 L10 -75 L0 0" fill="#00FFAA" stroke="none" />
        
        <path d="M0 0 L10 -75 L25 -70 L0 0" fill="#00CC88" stroke="none" />
        <path d="M0 0 L25 -70 L42 -60 L0 0" fill="#00FFAA" stroke="none" />
        
        <path d="M0 0 L42 -60 L55 -48 L0 0" fill="#00CC88" stroke="none" />
        <path d="M0 0 L55 -48 L65 -35 L0 0" fill="#00FFAA" stroke="none" />
        
        <path d="M0 0 L65 -35 L70 -20 L0 0" fill="#00CC88" stroke="none" />

        {/* Outer Rim Line for definition */}
        <path 
            d="M-70 -20 L-65 -35 L-55 -48 L-42 -60 L-25 -70 L-10 -75 L10 -75 L25 -70 L42 -60 L55 -48 L65 -35 L70 -20" 
            fill="none" 
            stroke="#FFFFFF" 
            strokeWidth="1" 
            opacity="0.6"
        />

        {/* Handle */}
        <circle cx="0" cy="0" r="6" fill="white" />
        <circle cx="0" cy="0" r="3" fill="#00FFAA" />
      </g>
    </svg>
  );
};
