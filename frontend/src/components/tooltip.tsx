import React, { ReactNode, useState } from 'react';

interface TooltipProps {
  text: string;
  children: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <div
      className="relative inline-block"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      {children}
      {isVisible && (
        <div
          className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 rounded py-2 px-3 shadow-md bg-white text-sm z-50 border max-w-md"
        >
          {text}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
