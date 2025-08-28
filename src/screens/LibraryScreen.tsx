import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Star } from 'lucide-react';
import { library } from '../data/library.ts';
import { MediaItem } from '../types';
import GlassContainer from '../components/GlassContainer.tsx';

const LibraryScreen: React.FC = () => {
  const [selectedType, setSelectedType] = useState('Movies');
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null);
  const types = ['Movies', 'Books'];

  const currentItems = library[selectedType] || [];

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
            Library
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="text-base text-primary-500"
          >
            Movies and books that inspired me
          </motion.p>
        </GlassContainer>

        {/* Type selector */}
        <GlassContainer
          padding="p-2"
          margin="mb-6"
          opacity={0.3}
          className="flex justify-evenly"
        >
          {types.map((type) => {
            const isSelected = selectedType === type;
            return (
              <motion.button
                key={type}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedType(type)}
                className={`px-8 py-3 rounded-full transition-all duration-300 ${
                  isSelected 
                    ? 'bg-primary-500/20 text-primary-500 font-semibold' 
                    : 'text-primary-500/60 hover:text-primary-500/80'
                }`}
              >
                {type}
              </motion.button>
            );
          })}
        </GlassContainer>

        {/* Library items grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-24">
          <AnimatePresence mode="wait">
            {currentItems.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
              >
                <LibraryCard 
                  item={item} 
                  type={selectedType}
                  onClick={() => setSelectedItem(item)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selectedItem && (
          <DetailModal 
            item={selectedItem} 
            onClose={() => setSelectedItem(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  );
};

interface LibraryCardProps {
  item: MediaItem;
  type: string;
  onClick: () => void;
}

const LibraryCard: React.FC<LibraryCardProps> = ({ item, type, onClick }) => {
  return (
    <GlassContainer
      padding="p-5"
      opacity={0.3}
      className="h-full flex flex-col cursor-pointer"
      onClick={onClick}
    >
      {/* Cover image placeholder */}
      <div className="flex-1 mb-4 rounded-xl overflow-hidden">
        <div
          className="w-full h-full flex flex-col items-center justify-center"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 152, 0, 0.3) 0%, rgba(244, 67, 54, 0.3) 100%)',
            border: '1px solid rgba(44, 62, 80, 0.2)',
          }}
        >
          <div className="text-4xl text-primary-500 mb-2">
            {type === 'Movies' ? '🎬' : '📚'}
          </div>
          <div className="text-xs text-primary-500 font-medium text-center">
            {item.title}
          </div>
        </div>
      </div>

      {/* Title and creator */}
      <h3 className="text-base font-bold text-primary-500 mb-1 line-clamp-2">
        {item.title}
      </h3>
      <p className="text-xs text-primary-500/60 mb-2">
        {item.creator} • {item.year}
      </p>

      {/* Rating and genre */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center">
          <Star size={16} className="text-yellow-500/80 mr-1" />
          <span className="text-xs font-medium text-primary-500">
            {item.rating}
          </span>
        </div>
        <span className="text-xs text-primary-500/50 truncate">
          {item.genre}
        </span>
      </div>

      {/* Short review preview */}
      <p className="text-xs text-primary-500 leading-relaxed line-clamp-3 flex-1">
        {item.review}
      </p>
    </GlassContainer>
  );
};

interface DetailModalProps {
  item: MediaItem;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="w-full max-w-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <GlassContainer
          padding="p-6"
          opacity={0.3}
          className="relative"
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-primary-500 hover:text-primary-600"
          >
            <X size={24} />
          </button>

          <h2 className="text-2xl font-bold text-primary-500 mb-2 pr-8">
            {item.title}
          </h2>
          <p className="text-base text-primary-500 mb-4">
            {item.creator} • {item.year} • {item.genre}
          </p>

          <div className="flex items-center mb-4">
            <Star className="text-yellow-500/80 mr-2" />
            <span className="text-lg font-semibold text-primary-500">
              {item.rating}
            </span>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-primary-500 mb-2">
              My Review:
            </h3>
            <p className="text-base text-primary-500 leading-relaxed">
              {item.review}
            </p>
          </div>
        </GlassContainer>
      </motion.div>
    </motion.div>
  );
};

export default LibraryScreen;
