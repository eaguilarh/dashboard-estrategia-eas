import React from 'react';

interface EasLogoProps {
  className?: string;
  size?: number;
}

export const EasLogo: React.FC<EasLogoProps> = ({ className = '', size = 42 }) => {
  return (
    <img
      src="/eas-logo.png"
      alt="EAS Consulting Logo"
      width={size}
      height={size}
      className={`object-contain transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
