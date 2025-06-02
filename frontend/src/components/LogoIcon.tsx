import React from 'react';

interface LogoIconProps {
  size?: number;
  className?: string;
}

export default function LogoIcon({ size = 24, className = '' }: LogoIconProps) {
  return (
    <svg 
      width={size} 
      height={size} 
      viewBox="0 0 32 32" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{ marginRight: '8px' }}
    >
      {/* Main parking meter head */}
      <circle cx="16" cy="11" r="8" fill="#3498DB"/>
      
      {/* Clock/gauge display */}
      <circle cx="16" cy="11" r="6" fill="white"/>
      <circle cx="16" cy="11" r="5" fill="#3498DB"/>
      
      {/* Clock indicator */}
      <line x1="16" y1="7" x2="16" y2="9" stroke="white" strokeWidth="1" strokeLinecap="round"/>
      
      {/* P letter in center */}
      <text x="16" y="14" textAnchor="middle" fill="white" fontSize="6" fontWeight="bold" fontFamily="Arial">P</text>
      
      {/* Orbital ring */}
      <ellipse cx="16" cy="11" rx="10" ry="6" fill="none" stroke="#3498DB" strokeWidth="1.5" opacity="0.7"/>
      <circle cx="10" cy="14" r="1" fill="#3498DB"/>
      
      {/* Meter pole */}
      <rect x="14" y="19" width="4" height="10" fill="#3498DB" rx="2"/>
      
      {/* M letter at bottom */}
      <text x="16" y="27" textAnchor="middle" fill="#3498DB" fontSize="8" fontWeight="bold" fontFamily="Arial">M</text>
    </svg>
  );
} 