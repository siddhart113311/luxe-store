'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] w-full overflow-clip bg-black text-white">
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="h-full w-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#111] via-[#000] to-[#000]" />
      </motion.div>

      <div className="relative z-10 h-full w-full grid place-items-center">
        <motion.div style={{ opacity }}
          className="container-padding flex flex-col items-center text-center gap-6">
          <p className="tracking-[0.35em] text-xs uppercase text-[#d6d6d6]">Luxe — Editorial</p>
          <h1 className="text-5xl md:text-7xl leading-tight">
            Timeless Pieces For The Modern Era
          </h1>
          <p className="max-w-[720px] text-sm md:text-base text-[#cfcfcf]">
            Premium silhouettes crafted with precision. Discover this season’s curated edit in monochrome, beige, and gold.
          </p>
          <div className="flex items-center gap-4">
            <a href="#trending" className="inline-flex items-center justify-center rounded-full bg-white text-black px-6 py-3 text-sm md:text-base hover:opacity-90 transition">Shop New Arrivals</a>
            <a href="#story" className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm md:text-base hover:bg-white/5 transition">Explore Story</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


