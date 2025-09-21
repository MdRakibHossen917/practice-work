import React, { useEffect, useState } from 'react';
import PattViraP5Sketch from '../../Components/PattViraP5Sketch';
 

const New = () => {
    const [binaryPattern, setBinaryPattern] = useState([]);
    const [coloredDots, setColoredDots] = useState([]);

    useEffect(() => {
        // 3D কিউব-এর মতো বাইনারি প্যাটার্ন তৈরি করুন
        const createBinaryPattern = () => {
            const pattern = [];
            const rows = 35;
            const cols = 45;
            
            // বাইনারি সংখ্যা দিয়ে কিউবের কাঠামো তৈরি করুন
            for (let row = 0; row < rows; row++) {
                const currentRow = [];
                for (let col = 0; col < cols; col++) {
                    // কিউবের মতো গভীরতার প্রভাব তৈরি করুন
                    const centerX = cols / 2;
                    const centerY = rows / 2;
                    const distanceFromCenter = Math.sqrt(
                        Math.pow(col - centerX, 2) + Math.pow(row - centerY, 2)
                    );
                    
                    // বিভিন্ন গভীরতা সহ 3টি কিউব ফেস তৈরি করুন
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

        // নির্দিষ্ট অবস্থানে রঙিন ডট তৈরি করুন
        const createColoredDots = () => {
            const dots = [];
            const colors = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6', '#06b6d4', '#ffffff'];
            
            // প্যাটার্ন জুড়ে র্যান্ডম রঙিন ডট যুক্ত করুন
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

        // পর্যায়ক্রমে কিছু বাইনারি মান পুনরুত্পাদন করুন
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
            {/* Patt Vira's p5.js Sketch কে ওভারলে ব্যাকগ্রাউন্ড হিসাবে যোগ করা হয়েছে */}
            {/* z-index: 10 নিশ্চিত করে যে p5.js ক্যানভাস বাইনারি প্যাটার্নের উপরে থাকবে */}
            <div className="absolute inset-0 z-10 pointer-events-none">
                <PattViraP5Sketch />
            </div>
            <div><h1>New fdghdfhdfgdfsd</h1></div>

            {/* 3D বাইনারি প্যাটার্ন ব্যাকগ্রাউন্ড */}
            <div className="absolute inset-0 flex items-center justify-center z-0"> {/* p5.js এর চেয়ে কম z-index */}
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

            {/* রঙিন ভাসমান ডট */}
            <div className="absolute inset-0 pointer-events-none z-20"> {/* p5.js এবং বাইনারি প্যাটার্নের চেয়ে উচ্চতর z-index */}
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
                        }}
                    />
                ))}
            </div>

            {/* কিউব এজ হাইলাইট */}
            <div className="absolute inset-0 pointer-events-none z-20"> {/* ডটগুলির মতো একই z-index */}
                {/* টপ ফেস হাইলাইট */}
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
                
                {/* বাম ফেস হাইলাইট */}
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

                {/* ডান ফেস হাইলাইট */}
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

            {/* অ্যাম্বিয়েন্ট গ্লো ইফেক্ট */}
            <div className="absolute inset-0 pointer-events-none z-20"> {/* ডটগুলির মতো একই z-index */}
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-purple-500/3 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
            </div>

            {/* আপনার কন্টেন্ট এখানে যাবে */}
            <div className="relative z-30 text-center"> {/* কন্টেন্টের জন্য সর্বোচ্চ z-index */}
                <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-white via-gray-300 to-white bg-clip-text text-transparent">
                    Binary code
                </h1>
                <p className="text-gray-400">
                    Add your components above this binary cube pattern
                </p>
            </div>

            {/* কাস্টম অ্যানিমেশন */}
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