import React, { useId, useMemo } from 'react';
import { motion } from 'motion/react';

export interface BlackHoleEffectProps {
  className?: string;
  particleCount?: number;
}

export function BlackHoleEffect({
  className = '',
  particleCount = 150,
}: BlackHoleEffectProps) {
  const rawId = useId();
  const filterId = rawId.replace(/[^a-zA-Z0-9_-]/g, '');
  const gradientId = `blackHoleGradient-${filterId}`;
  const glowId = `eventHorizonGlow-${filterId}`;

  // Generate an array of path data objects for the vortex effect
  const paths = useMemo(() => {
    return Array.from({ length: particleCount }, (_, i) => {
      const startAngle = Math.random() * Math.PI * 2; // Random angle around the circle
      const startRadius = 250 + Math.random() * 250; // Start from a wider, more varied radius

      // Calculate the starting point of the path
      const startX = 348 + startRadius * Math.cos(startAngle);
      const startY = 158 + startRadius * Math.sin(startAngle) * 0.5; // Elliptical distribution

      // All paths lead to the center of the black hole
      const endX = 348;
      const endY = 158;

      // Create more pronounced spiral control points for a swirling effect
      const twist = Math.PI / 2 + (Math.random() - 0.5) * Math.PI / 2;
      const cp1Angle = startAngle - twist;
      const cp1Radius = startRadius * 0.7;
      const cp1x = 348 + cp1Radius * Math.cos(cp1Angle);
      const cp1y = 158 + cp1Radius * Math.sin(cp1Angle) * 0.6;

      const cp2Angle = startAngle - twist / 2;
      const cp2Radius = startRadius * 0.3;
      const cp2x = 348 + cp2Radius * Math.cos(cp2Angle);
      const cp2y = 158 + cp2Radius * Math.sin(cp2Angle) * 0.8;

      return {
        id: i,
        d: `M ${startX} ${startY} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${endX} ${endY}`,
        width: 0.25 + Math.random() * 0.5, // Make particles thinner and more varied
        opacity: 0.15 + Math.random() * 0.45, // Vary opacity for depth
        duration: 6 + Math.random() * 8, // Longer duration for a more majestic pull
        delay: Math.random() * 8, // Stagger animations over a longer period
      };
    });
  }, [particleCount]);

  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${className}`}>
      <svg
        className="w-full h-full text-slate-200"
        viewBox="0 0 696 316"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <title>Beautiful Black Hole Effect</title>
        {/* Definitions for gradients */}
        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="rgba(0,0,0,1)" />
            <stop offset="50%" stopColor="rgba(10,10,10,1)" />
            <stop offset="70%" stopColor="rgba(15, 23, 42, 0.8)" />
            <stop offset="100%" stopColor="rgba(15, 23, 42, 0)" />
          </radialGradient>
          <radialGradient id={glowId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 255, 255, 0.18)" />
            <stop offset="40%" stopColor="rgba(168, 85, 247, 0.08)" />
            <stop offset="70%" stopColor="rgba(59, 130, 246, 0.04)" />
            <stop offset="100%" stopColor="rgba(0, 0, 0, 0)" />
          </radialGradient>
        </defs>

        {/* Ambient atmospheric event horizon glow */}
        <circle cx="348" cy="158" r="90" fill={`url(#${glowId})`} />

        {/* The central black hole element */}
        <circle cx="348" cy="158" r="42" fill={`url(#${gradientId})`} />
        <circle cx="348" cy="158" r="6" fill="#0E0E0E" />

        {/* Continuous, non-blinking flowing vortex lines */}
        <motion.g
          animate={{ rotate: 360 }}
          transition={{ duration: 100, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '348px 158px' }}
        >
          {paths.map((path) => (
            <path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeLinecap="round"
              opacity={path.opacity * 0.4}
            />
          ))}
        </motion.g>
      </svg>
    </div>
  );
}

// Main component that sets up a full-screen scene
export function BlackHoleScene({
  title = "Into the Void",
}: {
  title?: string;
}) {
  const words = title.split(" ");

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-black text-white">
      {/* The background effect component */}
      <BlackHoleEffect />

      {/* The centered, animated title with a new glow effect and color gradient */}
      <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="max-w-4xl mx-auto"
        >
          <h1
            className="text-5xl sm:text-7xl md:text-8xl font-bold mb-8 tracking-tighter"
            style={{
              textShadow:
                '0 0 15px rgba(255, 255, 255, 0.4), 0 0 25px rgba(255, 255, 255, 0.2)',
            }}
          >
            {words.map((word, wordIndex) => (
              <span key={wordIndex} className="inline-block mr-4 last:mr-0">
                {word.split("").map((letter, letterIndex) => (
                  <motion.span
                    key={`${wordIndex}-${letterIndex}`}
                    initial={{ scale: 0.5, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{
                      delay: 0.5 + wordIndex * 0.1 + letterIndex * 0.03,
                      type: "spring",
                      stiffness: 150,
                      damping: 15,
                    }}
                    className="inline-block text-transparent bg-clip-text bg-gradient-to-r from-white via-neutral-200 to-neutral-400"
                  >
                    {letter}
                  </motion.span>
                ))}
              </span>
            ))}
          </h1>
        </motion.div>
      </div>
    </div>
  );
}

export default BlackHoleEffect;
