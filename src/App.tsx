import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import GlassNavigation from './components/GlassNavigation.tsx';
import HomeScreen from './screens/HomeScreen.tsx';
import ProjectsScreen from './screens/ProjectsScreen.tsx';

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(() => {
    // Get the saved tab index from localStorage, default to 0 (Home)
    const savedIndex = localStorage.getItem('currentTabIndex');
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  
  const screens = [
    <HomeScreen key="home" />,
    <ProjectsScreen key="projects" />,
  ];

  // Save current tab index to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentTabIndex', currentIndex.toString());
  }, [currentIndex]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background gradient */}
      <div className="fixed inset-0 bg-gradient-radial from-primary-100 via-primary-200 to-primary-50" />
      
      {/* Floating particles effect */}
      {Array.from({ length: 20 }).map((_, index) => (
        <div
          key={index}
          className="floating-particle"
          style={{
            left: `${(index * 123.4) % 100}%`,
            top: `${(index * 87.6) % 100}%`,
          }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10">
        {/* Top navigation bar */}
        <GlassNavigation
          currentIndex={currentIndex}
          onNavigate={setCurrentIndex}
        />

        {/* Screen content */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {screens[currentIndex]}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default App;
