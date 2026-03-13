import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface SlideData {
  url: string;
  note: string;
}

interface ImageSliderProps {
  slides: SlideData[];
  interval?: number;
  className?: string;
}

export default function ImageSlider({ slides, interval = 5000, className = "" }: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, interval);
    return () => clearInterval(timer);
  }, [slides.length, interval]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={slides[currentIndex].url}
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
            alt={slides[currentIndex].note}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent pointer-events-none" />
          
          {/* Note overlay */}
          <div className="absolute bottom-12 left-0 right-0 px-6 text-center z-20">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="inline-block bg-black/40 backdrop-blur-md border border-white/10 rounded-xl px-6 py-3"
            >
              <p className="text-white text-sm md:text-lg font-medium tracking-wide drop-shadow-lg">
                {slides[currentIndex].note}
              </p>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>
      
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-30">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`h-1.5 rounded-full transition-all ${idx === currentIndex ? 'bg-indigo-500 w-8' : 'bg-white/50 w-2 hover:bg-white/80'}`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
