import React from 'react';
import { motion } from 'framer-motion';
import { Home, Briefcase } from 'lucide-react';
import GlassContainer from './GlassContainer.tsx';

interface GlassNavigationProps {
  currentIndex: number;
  onNavigate: (index: number) => void;
}

const GlassNavigation: React.FC<GlassNavigationProps> = ({
  currentIndex,
  onNavigate,
}) => {
  const navItems = [
    { icon: Home, label: 'Home', index: 0 },
    { icon: Briefcase, label: 'Projects', index: 1 },
  ];

  return (
    <div className="flex justify-center pt-10 pb-5">
      <GlassContainer
        padding="px-6 py-3"
        borderRadius="rounded-full"
        opacity={0.3}
        className="flex items-center space-x-10"
      >
        {navItems.map((item) => {
          const Icon = item.icon;
          const isSelected = currentIndex === item.index;
          
          return (
            <motion.div
              key={item.index}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate(item.index)}
              className="cursor-pointer"
            >
              <motion.div
                className={`flex flex-col items-center px-4 py-2 rounded-full transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary-500/20' 
                    : 'hover:bg-primary-500/10'
                }`}
                layout
              >
                <Icon
                  size={24}
                  className={`${
                    isSelected 
                      ? 'text-primary-500' 
                      : 'text-primary-500/60'
                  }`}
                />
                <span
                  className={`text-xs mt-1 font-medium ${
                    isSelected 
                      ? 'text-primary-500 font-semibold' 
                      : 'text-primary-500/60'
                  }`}
                >
                  {item.label}
                </span>
              </motion.div>
            </motion.div>
          );
        })}
      </GlassContainer>
    </div>
  );
};

export default GlassNavigation;
