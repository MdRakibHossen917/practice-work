import { motion } from "framer-motion";
import React from 'react'; // Ensure React is imported

export default function App() {
  // Number of "dots" for the background effect. Increased for more coverage.
  const dotsCount = 100; // More dots for a scattered look
  // Colors for the animated dots/bars
  const colors = ["#8B5CF6", "#F472B6", "#10B981", "#EAB308", "#3B82F6", "#EC4899", "#A855F7", "#F97316"]; 
  
  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden flex flex-col items-center justify-center">
      {/* Absolute Background Pattern */}
      <div className="absolute inset-0 z-0 bg-dark-grid-pattern">
        {/* Placeholder for the geometric cubes. You would replace this with an SVG. */}
        {/* Example: <img src="/path/to/your-cubes.svg" alt="Geometric Cubes" className="absolute top-1/4 left-1/4 w-1/2 h-1/2 opacity-20" /> */}
      </div>

      {/* Animated Scattered Dots (instead of linear bars) */}
      <div className="absolute inset-0 z-10">
        {Array.from({ length: dotsCount }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              backgroundColor: colors[i % colors.length],
              width: `${Math.random() * 4 + 2}px`, // Random width between 2px and 6px
              height: `${Math.random() * 15 + 5}px`, // Random height between 5px and 20px
              left: `${Math.random() * 100}vw`, // Random position across screen width
              top: `${Math.random() * 100}vh`,  // Random position across screen height
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: [0, 1, 0.5, 0], // Fade in, hold, fade out
              scale: [0.5, 1.2, 0.8, 0.5], // Pop and shrink
              y: [`${Math.random() * 50 - 25}px`, `${Math.random() * 50 - 25}px`], // Subtle vertical movement
              x: [`${Math.random() * 50 - 25}px`, `${Math.random() * 50 - 25}px`], // Subtle horizontal movement
            }}
            transition={{
              duration: Math.random() * 3 + 2, // Random duration between 2 and 5 seconds
              repeat: Infinity,
              delay: i * 0.1, // Staggered delay for each dot
              repeatType: "reverse",
            }}
          />
        ))}
      </div>

      {/* Main Content - Navbar, Hero Text, Button */}
      <div className="relative z-20 w-full max-w-7xl flex flex-col items-center">
        {/* Navbar */}
        <header className="flex justify-between items-center p-4 w-full border-b border-gray-800">
          <h1 className="text-2xl font-bold font-mono">VAPI</h1>
          <nav className="space-x-6 hidden md:flex text-gray-400 text-sm">
            <a href="#" className="hover:text-green-400 transition-colors">Custom Agents</a>
            <a href="#" className="hover:text-green-400 transition-colors">Pricing</a>
            <a href="#" className="hover:text-green-400 transition-colors">Docs</a>
            <a href="#" className="hover:text-green-400 transition-colors">Resources</a>
            <a href="#" className="hover:text-green-400 transition-colors">Careers</a>
          </nav>
          <div className="space-x-3 text-sm">
            <button className="px-4 py-1 rounded-full border border-green-500 text-green-500 hover:bg-green-600 hover:text-white transition-colors">
              Open Dashboard
            </button>
            <button className="px-4 py-1 rounded-full bg-green-500 text-white hover:bg-green-600 transition-colors">
              Sign Up
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 flex flex-col items-center justify-center p-6 text-center mt-20">
          <h2 className="text-5xl font-extrabold mb-4 max-w-3xl leading-tight">
            The World's Lowest Latency Voice AI Platform.
          </h2>
          <p className="text-gray-400 text-lg mb-8 max-w-2xl">
            Build, deploy, and manage production-grade conversational AI.
          </p>

          {/* TALK TO VAPI Button (closer to original design) */}
          <button
            aria-label="Talk to vapi"
            className="flex text-center justify-center items-center rounded-full focus-ring transition-all duration-300 uppercase active:scale-95 bg-gray-900 border border-gray-700 text-gray-50 hover:bg-gray-800 focus-ring-tertiary px-8 py-4 tracking-[.07rem] group text-base h-16 w-auto gap-3 relative font-mono font-medium after:absolute after:rounded-[inherit] after:border after:border-white/50 cursor-pointer hover:enabled:bg-gray-800 hover:enabled:border-gray-600 hover:enabled:text-white mt-4"
          >
            <span className="relative grid text-nowrap" style={{ filter: 'blur(var(--blur-amount))', '--blur-amount': '0px', opacity: 1 }}>
              <span className="[grid-column:1] [grid-row:1] block transition-opacity duration-250 group-hover:opacity-0">TALK TO VAPI</span>
              <span className="[grid-column:1] [grid-row:1] opacity-0 transition-opacity duration-250 group-hover:opacity-100">GIVE IT A TRY</span>
            </span>
            {/* SVG icon for the button, adjust classes if needed to fit size */}
            <span>
              <svg height="33" role="presentation" viewBox="0 0 36 33" width="36" xmlns="http://www.w3.org/2000/svg" className="size-5" fill="none">
                <circle className="row-1" cx="13" cy="1.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-1" cx="18" cy="1.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-1" cx="23" cy="1.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-2" cx="13" cy="6.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-2" cx="18" cy="6.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-2" cx="23" cy="6.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-3" cx="13" cy="11.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-3" cx="18" cy="11.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-3" cx="23" cy="11.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-4" cx="13" cy="16.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-4" cx="18" cy="16.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-4" cx="23" cy="16.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-5" cx="13" cy="21.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-5" cx="18" cy="21.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-5" cx="23" cy="21.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-6" cx="18" cy="26.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-7" cx="13" cy="31.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-7" cx="18" cy="31.5" fill="currentColor" r="1.5"></circle>
                <circle className="row-7" cx="23" cy="31.5" fill="currentColor" r="1.5"></circle>
              </svg>
            </span>
          </button>
        </main>

        
        
      </div>
    </div>
  );
}