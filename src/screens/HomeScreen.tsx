import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin } from 'lucide-react';
import GlassContainer from '../components/GlassContainer.tsx';
import InteractiveSkillsBubble from '../components/InteractiveSkillsBubble.tsx';
import { skills } from '../data/skills.ts';

const HomeScreen: React.FC = () => {
  const contactItems = [
    { 
      icon: Mail, 
      label: 'Email', 
      url: 'mailto:jihwang@kaist.ac.kr',
      action: 'email'
    },
    { 
      icon: Github, 
      label: 'GitHub', 
      url: 'https://github.com/lollipop719',
      action: 'link'
    },
    { 
      icon: Linkedin, 
      label: 'LinkedIn', 
      url: 'https://www.linkedin.com/in/jihoonhwang/',
      action: 'link'
    },
  ];

  return (
    <div className="px-6 py-5 overflow-y-auto">
      <div className="pt-5">
        {/* Profile section */}
        <GlassContainer
          padding="p-8"
          margin="mb-6"
          opacity={0.2}
          className="text-center"
        >
          {/* Profile image */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="w-36 h-36 mx-auto mb-6 rounded-full border-3 border-primary-500/30 overflow-hidden"
            style={{
              background: 'linear-gradient(135deg, rgba(52, 152, 219, 0.3) 0%, rgba(155, 89, 182, 0.3) 100%)',
            }}
          >
            <img
              src="/assets/images/profile.jpg"
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-3xl font-bold text-primary-500 mb-2"
          >
            Jihoon Hwang - 황지훈
          </motion.h1>

          {/* Title */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-lg text-primary-500/80 mb-6"
          >
            jihwang@kaist.ac.kr
          </motion.p>

          {/* Bio */}
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-base leading-relaxed text-primary-500/70 max-w-2xl mx-auto"
          >
            Hello! 😀
            I am currently an undergraduate student at KAIST, studying Computer Science.
            I am passionate about wide varieties of fields - not only coding, but also design, and startups.
            In terms of coding, I have experience in developing both front and backend. Check out my depth of skillsets below!
          </motion.p>
        </GlassContainer>

        {/* Skills section */}
        <GlassContainer
          padding="p-6"
          margin="mb-6"
          opacity={0.2}
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="text-2xl font-bold text-primary-500 mb-2"
          >
            Skills & Technologies
          </motion.h2>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.55, duration: 0.5 }}
            className="text-sm text-primary-500/60 mb-4"
          >
            Click and drag to explore!
          </motion.p>
          <InteractiveSkillsBubble skills={skills} />
        </GlassContainer>

        {/* Contact section */}
        <GlassContainer
          padding="p-6"
          margin="mb-24"
          opacity={0.2}
          className="text-center"
        >
          <motion.h2
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
            className="text-2xl font-bold text-primary-500 mb-4"
          >
            Let's Connect
          </motion.h2>
          <div className="flex justify-evenly">
            {contactItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7 + index * 0.1, duration: 0.5 }}
                >
                  <a
                    href={item.url}
                    target={item.action === 'link' ? '_blank' : undefined}
                    rel={item.action === 'link' ? 'noopener noreferrer' : undefined}
                    className="block"
                  >
                    <GlassContainer
                      padding="p-4"
                      borderRadius="rounded-xl"
                      opacity={0.05}
                      className="flex flex-col items-center cursor-pointer hover:opacity-20 transition-opacity duration-200"
                    >
                      <Icon
                        size={24}
                        className="text-primary-500/80 mb-2"
                      />
                      <span className="text-xs text-primary-500/70">
                        {item.label}
                      </span>
                    </GlassContainer>
                  </a>
                </motion.div>
              );
            })}
          </div>
        </GlassContainer>
      </div>
    </div>
  );
};

export default HomeScreen;
