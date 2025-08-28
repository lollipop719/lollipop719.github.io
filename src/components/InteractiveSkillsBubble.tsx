import React, { useState, useRef, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

interface SkillBubble {
  name: string;
  icon: string;
  color: string;
  x: number;
  y: number;
  isHovered: boolean;
}

interface InteractiveSkillsBubbleProps {
  skills: SkillBubble[];
}

const InteractiveSkillsBubble: React.FC<InteractiveSkillsBubbleProps> = ({ skills }) => {
  const [skillBubbles, setSkillBubbles] = useState<SkillBubble[]>(skills);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [viewportOffset, setViewportOffset] = useState({ x: 0, y: 0 });
  const [containerCenter, setContainerCenter] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();

  // Memoize bubble positions to prevent recalculation on every render
  const positionedBubbles = useMemo(() => {
    return skills.map((skill, index) => {
      const row = Math.floor(index / 5);
      const col = index % 5;
      
      let baseX, baseY;
      
      if (row % 2 === 0) {
        baseX = 150 + col * 160;
        baseY = 100 + row * 140;
      } else {
        baseX = 230 + col * 160;
        baseY = 100 + row * 140;
      }
      
      const randomOffsetX = (Math.random() - 0.5) * 40;
      const randomOffsetY = (Math.random() - 0.5) * 30;
      
      return {
        ...skill,
        x: baseX + randomOffsetX,
        y: baseY + randomOffsetY,
        isHovered: false,
      };
    });
  }, [skills]);

  // Initialize bubble positions
  useEffect(() => {
    setSkillBubbles(positionedBubbles);
  }, [positionedBubbles]);

  // Calculate container center
  useEffect(() => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      setContainerCenter({
        x: rect.width / 2,
        y: rect.height / 2,
      });
    }
  }, []);

  // Memoize base sizes to prevent recalculation
  const baseSizes = useMemo(() => {
    const sizeVariations = [60, 80, 100, 70, 90, 65, 85, 75, 95, 70, 80, 90, 65, 85, 75, 100, 70, 80, 90, 65, 85, 75, 95, 70];
    return sizeVariations;
  }, []);

  // Memoize scale calculation function
  const getBubbleScale = useCallback((bubbleX: number, bubbleY: number) => {
    const centerX = containerCenter.x;
    const centerY = containerCenter.y;
    
    const distance = Math.sqrt(
      Math.pow(bubbleX - centerX, 2) + Math.pow(bubbleY - centerY, 2)
    );
    
    // More reasonable scaling parameters with multiple focus levels
    const maxDistance = 200; // Larger focus area for multiple icons
    const minScale = 0.4; // Reasonable minimum scale
    const maxScale = 1.4; // Reasonable maximum scale
    
    // Calculate scale with smooth falloff for multiple focus levels
    const scale = Math.max(minScale, maxScale - (distance / maxDistance) * (maxScale - minScale));
    
    return scale;
  }, [containerCenter]);

  // Optimized event handlers with useCallback
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    setIsDragging(true);
    containerRef.current.style.cursor = 'grabbing';
    
    const rect = containerRef.current.getBoundingClientRect();
    setDragStart({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !containerRef.current) return;
    
    e.preventDefault();
    
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    
    // Use requestAnimationFrame for smooth updates
    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = containerRef.current!.getBoundingClientRect();
      const currentX = e.clientX - rect.left;
      const currentY = e.clientY - rect.top;
      
      const deltaX = currentX - dragStart.x;
      const deltaY = currentY - dragStart.y;
      
      setViewportOffset(prev => ({
        x: prev.x - deltaX,
        y: prev.y - deltaY,
      }));
      
      setDragStart({
        x: currentX,
        y: currentY,
      });
    });
  }, [isDragging, dragStart]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = 'grab';
    }
    // Cancel any pending animation frame
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
  }, []);

  const handleSkillHover = useCallback((index: number, isHovered: boolean) => {
    setSkillBubbles(prev => prev.map((skill, i) => 
      i === index ? { ...skill, isHovered } : skill
    ));
  }, []);

  const handleSkillClick = useCallback((skill: SkillBubble) => {
    console.log('Clicked skill:', skill.name);
  }, []);

  // Memoize the skill bubbles rendering to prevent unnecessary re-renders
  const renderedBubbles = useMemo(() => {
    return skillBubbles.map((skill, index) => {
      const scale = getBubbleScale(skill.x + viewportOffset.x, skill.y + viewportOffset.y);
      const baseSize = baseSizes[index % baseSizes.length];
      const finalSize = baseSize * scale;
      const isInFocus = scale > 0.9; // More inclusive focus threshold for multiple icons
      
      return (
        <motion.div
          key={skill.name}
          className="absolute"
          style={{
            left: skill.x,
            top: skill.y,
          }}
          whileHover={{ scale: 1.02 }} // Minimal hover effect
          onHoverStart={() => handleSkillHover(index, true)}
          onHoverEnd={() => handleSkillHover(index, false)}
          onClick={() => handleSkillClick(skill)}
        >
          <motion.div
            className="skill-bubble flex flex-col items-center justify-center cursor-pointer"
            style={{
              width: finalSize,
              height: finalSize,
              opacity: isInFocus ? 1 : 0.6, // Gradual opacity transition
              zIndex: isInFocus ? 10 : Math.floor(scale * 5),
            }}
            animate={{
              width: finalSize,
              height: finalSize,
            }}
            transition={{ 
              duration: 0.15, // Fast transitions for smooth feel
              scale: { duration: 0.25, ease: "easeOut" }
            }}
          >
            <img
              src={skill.icon}
              alt={skill.name}
              className="w-full h-full object-contain"
              style={{
                filter: isInFocus ? 'none' : 'brightness(0.7) contrast(0.9)', // Gradual filter transition
                transition: 'filter 0.25s ease', // Fast filter transition
                userSelect: 'none',
                WebkitUserSelect: 'none',
                MozUserSelect: 'none',
                msUserSelect: 'none',
                pointerEvents: 'none',
              }}
              draggable={false}
              onError={(e) => {
                console.error(`Failed to load image for ${skill.name}:`, skill.icon);
                // Fallback to a default icon or hide the image
                e.currentTarget.style.display = 'none';
              }}
            />
            {isInFocus && (
              <motion.span
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-xs font-semibold text-primary-500 text-center mt-2 whitespace-nowrap"
                style={{
                  userSelect: 'none',
                  WebkitUserSelect: 'none',
                  MozUserSelect: 'none',
                  msUserSelect: 'none',
                  pointerEvents: 'none',
                }}
              >
                {skill.name}
              </motion.span>
            )}
          </motion.div>
        </motion.div>
      );
    });
  }, [skillBubbles, viewportOffset, getBubbleScale, baseSizes, handleSkillHover, handleSkillClick]);

  // Cleanup animation frame on unmount
  useEffect(() => {
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full h-[550px] relative">
      <div
        ref={containerRef}
        className="w-full h-full glass-container rounded-2xl relative overflow-hidden cursor-grab active:cursor-grabbing"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
        }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div 
          className="relative w-[1000px] h-[800px] p-8"
          style={{
            transform: `translate(${viewportOffset.x}px, ${viewportOffset.y}px)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out',
          }}
        >
          {renderedBubbles}
        </div>
      </div>
    </div>
  );
};

export default InteractiveSkillsBubble;
