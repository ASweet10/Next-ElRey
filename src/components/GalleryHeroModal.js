'use client'
import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const variants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.02, // Slightly larger so no white edges show
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
    zIndex: 1,
  },
  exit: (direction) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.02,
    zIndex: 0,
  }),
}

export default function Modal({ images, index, setIndex, close }) {
  // Store both the index and the direction in one state to ensure they update simultaneously
  const [[currentIndex, direction], setDirectionalIndex] = useState([index, 0]);

  // Sync internal state if parent index changes (e.g., initial open)
  useEffect(() => {
    if (index !== currentIndex) {
      setDirectionalIndex([index, index > currentIndex ? 1 : -1]);
    }
  }, [index]);

  const paginate = (newDirection) => {
    const nextIdx = (index + newDirection + images.length) % images.length;
    // Set direction immediately before updating index
    setDirectionalIndex([nextIdx, newDirection]);
    setIndex(nextIdx);
  };

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') paginate(-1);
      if (e.key === 'ArrowRight') paginate(1);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [index]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
      onClick={close}
    >
      {/* White Container: Reduced padding (p-1) so image fills more space */}
      <div
        className="relative bg-white p-1 md:p-2 rounded-lg max-w-5xl w-full aspect-video shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button - Moved slightly for better visibility over cover images */}
        <button 
          onClick={close} 
          className="absolute top-4 right-4 z-30 bg-white/50 hover:bg-white text-black w-8 h-8 rounded-full flex items-center justify-center font-bold shadow-lg"
        >
          ✕
        </button>

        <div className="relative w-full h-full overflow-hidden rounded-md">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "tween", ease: "easeOut", duration: 0.4 },
                opacity: { duration: 0.2 },
              }}
              className="absolute inset-0"
            >
              <Image
                src={images[index].src}
                alt="Gallery"
                fill
                className="object-cover" // Changed to cover to fill the space
                priority
              />
            </motion.div>
          </AnimatePresence>

          {/* Nav Hover Zones: Absolute on top of the image */}
          <div
            className="group absolute inset-y-0 left-0 w-1/4 z-20 cursor-pointer flex items-center pl-4"
            onClick={() => paginate(-1)}
          >
            <div className="bg-white/90 w-12 h-12 flex justify-center rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-x-2 group-hover:translate-x-0">
              <span className="text-black font-bold text-2xl mt-1">←</span>
            </div>
          </div>

          <div
            className="group absolute inset-y-0 right-0 w-1/4 z-20 cursor-pointer flex items-center justify-end pr-4"
            onClick={() => paginate(1)}
          >
            <div className="bg-white/90 w-12 h-12 flex justify-center rounded-full shadow-xl opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
              <span className="text-black font-bold text-2xl mt-1">→</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}