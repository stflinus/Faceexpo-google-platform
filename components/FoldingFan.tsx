
import React from 'react';

interface FoldingFanProps {
  className?: string;
  filled?: boolean;
}

export const FoldingFan: React.FC<FoldingFanProps> = ({ className = "w-6 h-6", filled = false }) => {
  return (
    <svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12L12 12L22 12Z"
        fill={filled ? "currentColor" : "none"}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M12 12L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L19.0711 4.92893" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L4.92893 4.92893" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L21.23 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M12 12L2.77 8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2" fill="currentColor" />
    </svg>
  );
};
