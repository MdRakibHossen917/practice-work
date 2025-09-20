import React, { useEffect, useState } from 'react';

const New = () => {
    const [binaryPattern, setBinaryPattern] = useState([]);
    const [coloredDots, setColoredDots] = useState([]);

    useEffect(() => {
        // Create 3D cube-like binary pattern
        const createBinaryPattern = () => {
            const pattern = [];
            const rows = 35;
            const cols = 45;
            
            // Create the cube structure with binary numbers
            for (let row = 0; row < rows; row++) {
                const currentRow = [];
                for (let col = 0; col < cols; col++) {
                    // Create cube-like depth effect
                    const centerX = cols / 2;
                    const centerY = rows / 2;
                    const distanceFromCenter = Math.sqrt(
                        Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2)
                    );
                    
                    // Create 3 cube faces with different depths
                    const cubeDepth = Math.sin(row * 0.3) * Math.cos(col * 0.2) * 3;
                    const opacity = Math.max(0.1, 0.6 - (distanceFromCenter / 40));
                    
                    currentRow.push({
                        value: Math.random() > 0.5 ? '1' : '0',
                        opacity: opacity,
                        depth: cubeDepth,
                        x: col,
                        y: row
                    });
                }
                pattern.push(currentRow);
            }
            setBinaryPattern(pattern);
        };

        // Create colored dots at specific positions
        const createColoredDots = () => {
            const dots = [];
            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ffffff'];
            
            // Add random colored dots throughout the pattern
            for (let i = 0; i < 25; i++) {
                dots.push({
                    id: i,
                    x: Math.random() * 100,
                    y: Math.random() * 100,
                    color: colors[Math.floor(Math.random() * colors.length)],
                    size: Math.random() * 4 + 2,
                    animationDelay: Math.random() * 3,
                    animationDuration: 3 + Math.random() * 4
                });
            }
            setColoredDots(dots);
        };

        createBinaryPattern();
        createColoredDots();

        // Regenerate some binary values periodically
        const interval = setInterval(() => {
            setBinaryPattern(prev => 
                prev.map(row => 
                    row.map(cell => ({
                        ...cell,
                        value: Math.random() > 0.95 ? (Math.random() > 0.5 ? '1' : '0') : cell.value
                    }))
                )
            );
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white overflow-hidden flex items-center justify-center">
            {/* 3D Binary Pattern Background */}
            <div className="absolute inset-0 flex items-center justify-center">
                <div 
                    className="grid gap-0"
                    style={{
                        gridTemplateColumns: `repeat(45, 1fr)`,
                        transform: 'perspective(1000px) rotateX(15deg) rotateY(-10deg)',
                        transformStyle: 'preserve-3d'
                    }}
                >
                    {binaryPattern.flat().map((cell, index) => (
                        <div
                            key={index}
                            className="text-xs font-mono transition-all duration-1000 ease-in-out"
                            style={{
                                color: `rgba(100, 100, 100, ${cell.opacity})`,
                                transform: `translateZ(${cell.depth}px)`,
                                fontSize: '10px',
                                lineHeight: '12px',
                                textAlign: 'center',
                                width: '12px',
                                height: '12px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }}
                        >
                            {cell.value}
                        </div>
                    ))}
                </div>
            </div>

            {/* Colored Floating Dots */}
            <div className="absolute inset-0">
                {coloredDots.map(dot => (
                    <div
                        key={dot.id}
                        className="absolute rounded-full"
                        style={{
                            left: `${dot.x}%`,
                            top: `${dot.y}%`,
                            width: `${dot.size}px`,
                            height: `${dot.size}px`,
                            backgroundColor: dot.color,
                            animation: `float3D ${dot.animationDuration}s ease-in-out infinite`,
                            animationDelay: `${dot.animationDelay}s`,
                            boxShadow: `0 0 20px ${dot.color}40`,
                            zIndex: 10
                        }}
                    />
                ))}
            </div>

            {/* Cube Edge Highlights */}
            <div className="absolute inset-0 pointer-events-none">
                {/* Top face highlight */}
                <div 
                    className="absolute"
                    style={{
                        top: '25%',
                        left: '35%',
                        width: '30%',
                        height: '20%',
                        background: 'linear-gradient(135deg, transparent, rgba(255,255,255,0.05), transparent)',
                        transform: 'perspective(1000px) rotateX(-30deg) rotateY(45deg)',
                        borderRadius: '4px'
                    }}
                />
                
                {/* Left face highlight */}
                <div 
                    className="absolute"
                    style={{
                        top: '35%',
                        left: '25%',
                        width: '25%',
                        height: '30%',
                        background: 'linear-gradient(45deg, transparent, rgba(255,255,255,0.03), transparent)',
                        transform: 'perspective(1000px) rotateX(15deg) rotateY(-45deg)',
                        borderRadius: '4px'
                    }}
                />

                {/* Right face highlight */}
                <div 
                    className="absolute"
                    style={{
                        top: '35%',
                        right: '25%',
                        width: '25%',
                        height: '30%',
                        background: 'linear-gradient(-45deg, transparent, rgba(255,255,255,0.03), transparent)',
                        transform: 'perspective(1000px) rotateX(15deg) rotateY(45deg)',
                        borderRadius: '4px'
                    }}
                />
            </div>

            {/* Ambient Glow Effects */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* Your content can go here */}
            <div className="relative z-20 text-center">
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                    Binary code
                </h1>
                <p className="text-gray-400">
                    Add your components above this binary cube pattern
                </p>
            </div>

            {/* Custom Animations */}
            <style jsx>{`
                @keyframes float3D {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px) scale(1); 
                        opacity: 0.7; 
                    }
                    25% { 
                        transform: translateY(-10px) translateX(5px) scale(1.1); 
                        opacity: 1; 
                    }
                    50% { 
                        transform: translateY(-20px) translateX(0px) scale(0.9); 
                        opacity: 0.8; 
                    }
                    75% { 
                        transform: translateY(-10px) translateX(-5px) scale(1.1); 
                        opacity: 1; 
                    }
                }

                @keyframes pulse {
                    0%, 100% {
                        opacity: 0.3;
                    }
                    50% {
                        opacity: 0.6;
                    }
                }

                .animate-pulse {
                    animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default New;