import React, { useEffect, useState } from 'react';

const Vite = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY });
        };

        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    // Create the radiating lines data
    const createLines = () => {
        const lines = [];
        const totalLines = 12;
        
        for (let i = 0; i < totalLines; i++) {
            const angle = (i * 360) / totalLines - 90; // Start from top
            lines.push({
                id: i,
                angle: angle,
                length: 200 + i * 20,
                opacity: 0.3 + (i % 3) * 0.2,
                animationDelay: i * 0.1
            });
        }
        return lines;
    };

    const lines = createLines();
    const technologies = ['.jsx', '.svelte', '.sass'];

    return (
        <div className="relative min-h-screen overflow-hidden">
            {/* Animated gradient background */}
            <div 
                className="absolute inset-0 transition-all duration-700"
                style={{
                    background: `radial-gradient(circle at ${mousePosition.x * 0.1}% ${mousePosition.y * 0.1}%, 
                        #1e1b4b 0%, 
                        #312e81 20%, 
                        #3730a3 40%, 
                        #1e40af 60%, 
                        #1e3a8a 80%, 
                        #1e1b4b 100%)`
                }}
            />

            {/* Top Navigation */}
            <div className="absolute top-0 left-0 right-0 z-20 p-6">
                <div className="flex justify-end gap-4">
                    <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg hover:scale-105 transition-all duration-300">
                        Get started
                    </button>
                    <button className="bg-gray-800/50 backdrop-blur-sm text-white px-6 py-2 rounded-full font-medium border border-gray-600/50 hover:bg-gray-700/50 hover:scale-105 transition-all duration-300 flex items-center gap-2">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                        </svg>
                        GitHub
                    </button>
                </div>
            </div>

            {/* Main Content Container */}
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                {/* Radiating Lines */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {lines.map(line => (
                        <div
                            key={line.id}
                            className="absolute origin-center"
                            style={{
                                transform: `rotate(${line.angle}deg)`,
                                animation: `pulse 3s ease-in-out infinite ${line.animationDelay}s`
                            }}
                        >
                            <div
                                className="w-px bg-gradient-to-r from-transparent via-blue-300 to-transparent"
                                style={{
                                    height: `${line.length}px`,
                                    opacity: line.opacity,
                                    boxShadow: '0 0 10px rgba(59, 130, 246, 0.5)'
                                }}
                            />
                        </div>
                    ))}
                </div>

                {/* Technology Labels */}
                <div className="absolute inset-0 flex items-center justify-center">
                    {technologies.map((tech, index) => (
                        <div
                            key={tech}
                            className="absolute text-white text-sm font-mono bg-gray-800/30 backdrop-blur-sm px-2 py-1 rounded border border-blue-400/30"
                            style={{
                                transform: `rotate(${index * 120 - 60}deg) translateY(-120px) rotate(${-(index * 120 - 60)}deg)`,
                                animation: `float 4s ease-in-out infinite ${index * 0.5}s`
                            }}
                        >
                            {tech}
                        </div>
                    ))}
                </div>

                {/* Central Vite Logo */}
                <div 
                    className="relative z-20"
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div 
                        className={`w-24 h-24 bg-gray-900/50 backdrop-blur-xl rounded-2xl border border-gray-600/30 flex items-center justify-center cursor-pointer transition-all duration-500 ${
                            isHovered ? 'scale-110 shadow-2xl shadow-purple-500/20' : 'scale-100'
                        }`}
                        style={{
                            boxShadow: isHovered ? '0 0 60px rgba(147, 51, 234, 0.3)' : '0 0 30px rgba(0, 0, 0, 0.5)'
                        }}
                    >
                        {/* Vite Logo - Lightning bolt with gradient */}
                        <div className="relative">
                            <svg 
                                width="40" 
                                height="40" 
                                viewBox="0 0 24 24" 
                                className={`transition-all duration-500 ${isHovered ? 'scale-110' : 'scale-100'}`}
                            >
                                <defs>
                                    <linearGradient id="viteGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#41d1ff" />
                                        <stop offset="50%" stopColor="#bd34fe" />
                                        <stop offset="100%" stopColor="#ffdd35" />
                                    </linearGradient>
                                </defs>
                                <path
                                    d="M8.5 2l7 12h-14l7-12z M15.5 22l-7-12h14l-7 12z"
                                    fill="url(#viteGradient)"
                                    className={`transition-all duration-500 ${isHovered ? 'drop-shadow-lg' : ''}`}
                                />
                                {/* Lightning effect */}
                                <path
                                    d="M12 1l-8 14h6v8l8-14h-6v-8z"
                                    fill="url(#viteGradient)"
                                    opacity="0.8"
                                />
                            </svg>
                            
                            {/* Glow effect */}
                            <div 
                                className={`absolute inset-0 rounded-full transition-all duration-500 ${
                                    isHovered ? 'opacity-100 scale-150' : 'opacity-0 scale-100'
                                }`}
                                style={{
                                    background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3) 0%, transparent 70%)',
                                    filter: 'blur(20px)'
                                }}
                            />
                        </div>
                    </div>
                </div>

                {/* Bottom grid icon */}
                <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2">
                    <div className="grid grid-cols-2 gap-1 opacity-30">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div 
                                key={i} 
                                className="w-2 h-2 bg-blue-400 rounded-sm"
                                style={{ animation: `twinkle 2s ease-in-out infinite ${i * 0.2}s` }}
                            />
                        ))}
                    </div>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 20 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-blue-300 rounded-full opacity-40"
                            style={{
                                left: `${20 + (i * 3)}%`,
                                top: `${30 + (i * 2)}%`,
                                animation: `floatParticle ${3 + (i % 3)}s ease-in-out infinite ${i * 0.2}s`
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Custom CSS Animations */}
            <style jsx>{`
                @keyframes pulse {
                    0%, 100% { opacity: 0.2; transform: scaleY(1); }
                    50% { opacity: 0.8; transform: scaleY(1.1); }
                }

                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }

                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }

                @keyframes floatParticle {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px); 
                        opacity: 0.2; 
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px); 
                        opacity: 0.8; 
                    }
                    50% { 
                        transform: translateY(-40px) translateX(0px); 
                        opacity: 1; 
                    }
                    75% { 
                        transform: translateY(-20px) translateX(-10px); 
                        opacity: 0.8; 
                    }
                }
            `}</style>
        </div>
    );
};

export default Vite;