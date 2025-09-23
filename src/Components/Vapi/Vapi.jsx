import React from 'react';

const Vapi = () => {
  return (
    <div className="bg-black flex items-center justify-center min-h-screen">
      <div className="flex space-x-2 md:space-x-4 lg:space-x-6">
        {['V', 'A', 'P', 'I'].map((char, index) => (
          <span
            key={index}
            className="
              text-transparent // Make text transparent
              font-extrabold font-sans // Use a bold, sans-serif font for structure
              text-7xl md:text-8xl lg:text-9xl
              relative
              after:content-[attr(data-char)] // Use data-char for pseudo-element content
              after:absolute after:inset-0
              after:bg-gradient-to-r from-gray-700 via-gray-500 to-gray-700 // Base gradient
              after:bg-[length:2px_100%] // Small stripes (width 2px)
              after:mask-image-[linear-gradient(to_right,_rgba(0,0,0,0.5)_1px,_transparent_1px)] // Mask for vertical lines (concept)
              after:mask-size-[4px_100%]
              after:animate-pulse // Slight subtle animation for glow
              text-white // Fallback for browsers not supporting advanced masking/clipping
            "
            style={{
              // Fallback text-shadow if masking is too complex or not fully supported
              textShadow: `
                0 0 1px rgba(255,255,255,0.05),
                0 0 2px rgba(255,255,255,0.05),
                0 0 4px rgba(255,255,255,0.05)
              `,
              WebkitBackgroundClip: 'text', // Clip background to text shape
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent', // Make text fill transparent
              // Attempting to simulate fine lines with repeated background and background-clip: text
              backgroundImage: 'repeating-linear-gradient(90deg, #333 0px, #333 1px, transparent 1px, transparent 2px)',
              backgroundSize: '2px 100%',
              lineHeight: '1', // Adjust line height to prevent gaps
              filter: 'brightness(1.2) contrast(1.5)', // Adjust for glow and contrast
            }}
            data-char={char} // Pass character to pseudo-element
          >
            {char} {/* This character is technically transparent */}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Vapi;