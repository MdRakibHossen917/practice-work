import React from 'react';
import { useSprings, animated } from 'react-spring';
import { useGesture } from 'react-use-gesture';

// Define the number of grid items and their spacing
const items = Array.from({ length: 600 }, (_, i) => i);
const springConfig = { mass: 5, tension: 350, friction: 40 };

const HomeParticles = () => {
  const [springs, api] = useSprings(items.length, i => ({
    x: 0,
    y: 0,
    scale: 1, // Add scale to the initial state
    opacity: 0, // Add opacity to the initial state
    config: springConfig,
  }));

  const bind = useGesture({
    onMove: ({ xy: [mx, my] }) => {
      api.start(i => {
        const row = Math.floor(i / 30);
        const col = i % 30;
        const x = (col * 20) - mx;
        const y = (row * 20) - my;
        const distance = Math.sqrt(x * x + y * y);
        const scale = Math.max(0, 1 - distance / 300);
        const opacity = Math.max(0, 0.1 + (1 - distance / 500) * 0.4);

        return {
          x: x * scale * 0.2, // Trail effect
          y: y * scale * 0.2,
          scale: 1 + scale * 0.5,
          opacity: opacity,
        };
      });
    },
  });

  return (
    <div {...bind()} className="grid-container w-full h-full">
      {springs.map((props, i) => (
        <animated.div
          key={i}
          className="grid-item"
          style={{
            opacity: props.opacity,
            transform: props.x.to((x, y, scale) => `translate3d(${x}px, ${y}px, 0) scale(${scale})`),
          }}
        />
      ))}
    </div>
  );
};

export default HomeParticles;