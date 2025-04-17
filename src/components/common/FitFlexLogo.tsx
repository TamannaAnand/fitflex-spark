
import React from 'react';

interface FitFlexLogoProps {
  className?: string;
}

const FitFlexLogo: React.FC<FitFlexLogoProps> = ({ className = "h-8 w-auto" }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-fitflex-purple to-fitflex-orange">
        FitFlex
      </span>
    </div>
  );
};

export default FitFlexLogo;
