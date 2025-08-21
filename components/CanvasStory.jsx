'use client';

import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const sections = [
  { title: 'T-Shirts', subtitle: 'Cotton. Structure. Purity.' },
  { title: 'Hoodies', subtitle: 'Fleece. Volume. Warmth.' },
  { title: 'Jeans', subtitle: 'Selvedge. Fade. Craft.' },
  { title: 'Shoes', subtitle: 'Leather. Line. Silence.' },
  { title: 'Watches', subtitle: 'Steel. Gold. Time.' },
];

export default function CanvasStory() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] });

  return (
    <section ref={ref} id="story" className="relative min-h-[300svh] bg-beige text-black overflow-clip">
      <div className="sticky top-0 h-screen grid place-items-center">
        {sections.map((s, i) => {
          const start = i / sections.length;
          const end = (i + 1) / sections.length;
          const scale = useTransform(scrollYProgress, [start, end], [1.0, 1.15]);
          const opacity = useTransform(scrollYProgress, [start, end], [1, 0]);
          return (
            <motion.div key={s.title} style={{ scale, opacity }} className="absolute inset-0 grid place-items-center">
              <div className="container-padding text-center">
                <h3 className="text-5xl md:text-7xl">{s.title}</h3>
                <p className="text-black/70 mt-4">{s.subtitle}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}


