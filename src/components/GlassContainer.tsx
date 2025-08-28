import React from 'react';
import { motion } from 'framer-motion';

interface GlassContainerProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  padding?: string;
  margin?: string;
  borderRadius?: string;
  opacity?: number;
}

const GlassContainer: React.FC<GlassContainerProps> = ({
  children,
  className = '',
  onClick,
  padding = 'p-6',
  margin = '',
  borderRadius = 'rounded-2xl',
  opacity = 0.1,
}) => {
  const baseClasses = `glass-container ${padding} ${margin} ${borderRadius} ${className}`;
  
  const container = (
    <div
      className={baseClasses}
      style={{
        background: `linear-gradient(135deg, rgba(255, 255, 255, ${opacity * 1.5}) 0%, rgba(255, 255, 255, ${opacity}) 100%)`,
      }}
    >
      {children}
    </div>
  );

  if (onClick) {
    return (
      <motion.div
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className="cursor-pointer"
      >
        {container}
      </motion.div>
    );
  }

  return container;
};

export default GlassContainer;
