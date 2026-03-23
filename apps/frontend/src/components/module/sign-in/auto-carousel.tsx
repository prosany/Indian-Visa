'use client';

import { memo, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const images = [
  '/images/slide1.jpg',
  '/images/slide2.jpg',
  '/images/slide3.jpg',
  '/images/slide4.jpg',
  '/images/slide5.jpg',
];

const shuffleArray = (array: string[]) => {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
};

const AutoCarousel = () => {
  const [shuffled, setShuffled] = useState<string[]>([]);
  const [index, setIndex] = useState(0);

  // Initialize shuffle
  useEffect(() => {
    setShuffled(shuffleArray(images));
  }, []);

  // Auto slide
  useEffect(() => {
    if (shuffled.length === 0) return;

    const interval = setInterval(() => {
      setIndex((prev) => {
        // If last image → reshuffle for next cycle
        if (prev === shuffled.length - 1) {
          const newShuffle = shuffleArray(images);

          // Prevent same image repeating at boundary
          if (newShuffle[0] === shuffled[prev]) {
            [newShuffle[0], newShuffle[1]] = [newShuffle[1], newShuffle[0]];
          }

          setShuffled(newShuffle);
          return 0;
        }

        return prev + 1;
      });
    }, 4000);

    return () => clearInterval(interval);
  }, [shuffled]);

  return (
    <div className='relative w-full h-full overflow-hidden'>
      {shuffled.map((img, i) => (
        <motion.img
          key={img}
          src={img}
          alt='carousel'
          className='absolute inset-0 w-full h-full object-cover'
          initial={false}
          animate={{
            opacity: i === index ? 1 : 0,
            scale: i === index ? 1.05 : 1,
          }}
          transition={{
            opacity: { duration: 1 },
            scale: { duration: 4 },
          }}
        />
      ))}
    </div>
  );
};

export default memo(AutoCarousel);
