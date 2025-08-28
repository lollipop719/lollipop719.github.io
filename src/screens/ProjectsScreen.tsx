import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { projects } from '../data/projects.ts';
import { Project } from '../types/index.ts';
import GlassContainer from '../components/GlassContainer.tsx';

const ProjectsScreen: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState(() => {
    // Get the saved category from localStorage, default to 'Coding'
    const savedCategory = localStorage.getItem('selectedProjectCategory');
    return savedCategory || 'Coding';
  });
  const categories = ['Coding', 'Startup', 'Art'];

  // Save selected category to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('selectedProjectCategory', selectedCategory);
  }, [selectedCategory]);

  const currentProjects = projects[selectedCategory] || [];

  return (
    <div className="px-6 py-5 overflow-y-auto">
      <div className="pt-5">
        {/* Header */}
        <GlassContainer
          padding="p-6"
          margin="mb-6"
          opacity={0.3}
          className="text-center"
        >
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-primary-500 mb-2"
          >
            Projects
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-base text-primary-500"
          >
            Explore my work across different domains
          </motion.p>
        </GlassContainer>

        {/* Category selector */}
        <GlassContainer
          padding="p-2"
          margin="mb-6"
          opacity={0.3}
          className="flex justify-evenly"
        >
          {categories.map((category) => {
            const isSelected = selectedCategory === category;
            return (
              <motion.button
                key={category}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedCategory(category)}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary-500/20 text-primary-500 font-semibold' 
                    : 'text-primary-500/60 hover:text-primary-500/80'
                }`}
              >
                {category}
              </motion.button>
            );
          })}
        </GlassContainer>

        {/* Projects grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-24">
          <AnimatePresence mode="wait">
            {currentProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  return (
    <GlassContainer
      padding="p-5"
      opacity={0.3}
      className="h-full flex flex-row gap-4"
    >
      {/* Project image */}
      <div className="flex-shrink-0 w-32 h-32 rounded-xl overflow-hidden">
        {project.imageUrl ? (
          <img
            src={project.imageUrl}
            alt={project.title}
            className="w-full h-full object-cover"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
        ) : null}
        <div
          className={`w-full h-full flex items-center justify-center ${
            project.imageUrl ? 'hidden' : ''
          }`}
          style={{
            background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.3) 0%, rgba(155, 89, 182, 0.3) 100%)',
            border: '1px solid rgba(44, 62, 80, 0.2)',
          }}
        >
          <div className="text-2xl text-primary-500">📷</div>
        </div>
      </div>

      {/* Project content */}
      <div className="flex-1 flex flex-col">
        {/* Project title */}
        <h3 className="text-lg font-bold text-primary-500 mb-2">
          {project.title}
        </h3>

        {/* Project description */}
        <p className="text-sm text-primary-500/70 leading-relaxed mb-3 flex-1">
          {project.description}
        </p>

                 {/* Technologies */}
         <div className="flex flex-wrap gap-2 mb-3">
           {project.technologies.slice(0, 3).map((tech) => (
             <span
               key={tech}
               className="px-2 py-1 text-xs rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-500/80"
             >
               {tech}
             </span>
           ))}
         </div>

         {/* Links */}
         <div className="flex flex-wrap gap-2">
           {project.githubUrl && project.githubUrl !== 'N/A' && (
             <a
               href={project.githubUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="px-3 py-1 text-xs rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-500/80 hover:bg-primary-500/20 transition-colors duration-200 flex items-center gap-1"
             >
               <span>📁</span>
               GitHub
             </a>
           )}
           {project.liveUrl && project.liveUrl !== 'N/A' && (
             <a
               href={project.liveUrl}
               target="_blank"
               rel="noopener noreferrer"
               className="px-3 py-1 text-xs rounded-lg bg-primary-500/10 border border-primary-500/20 text-primary-500/80 hover:bg-primary-500/20 transition-colors duration-200 flex items-center gap-1"
             >
               <span>🌐</span>
               Live Demo
             </a>
           )}
         </div>
      </div>
    </GlassContainer>
  );
};

export default ProjectsScreen;
