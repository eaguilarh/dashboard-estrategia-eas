import React from 'react';

interface EasLogoProps {
  className?: string;
  size?: number;
}

export const EasLogo: React.FC<EasLogoProps> = ({ className = '', size = 42 }) => {
  const [hasError, setHasError] = React.useState(false);

  if (hasError) {
    return (
      <div 
        className="flex items-center justify-center bg-blue-600 text-white rounded-lg font-black text-xs select-none"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        EAS
      </div>
    );
  }

  return (
    <img
      src="/eas-logo.png"
      alt="EAS Consulting Logo"
      width={size}
      height={size}
      onError={() => setHasError(true)}
      className={`object-contain transition-transform duration-300 hover:scale-105 ${className}`}
      style={{ width: `${size}px`, height: `${size}px` }}
    />
  );
};
