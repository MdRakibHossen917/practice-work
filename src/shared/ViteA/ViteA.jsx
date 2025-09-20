import React, { useEffect, useState } from 'react';

const ViteA = () => {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleMouseMove = (e) => {
            setMousePosition({ 
                x: (e.clientX / window.innerWidth) * 100, 
                y: (e.clientY / window.innerHeight) * 100 
            });
        };

        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('scroll', handleScroll);
        
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <div className="relative min-h-screen bg-black text-white font-sans overflow-hidden">
            {/* Dynamic gradient background */}
            <div 
                className="fixed inset-0 transition-all duration-1000 ease-out"
                style={{
                    background: `radial-gradient(ellipse at ${mousePosition.x}% ${mousePosition.y}%, 
                        rgba(139, 92, 246, 0.15) 0%, 
                        rgba(59, 130, 246, 0.1) 25%, 
                        rgba(16, 185, 129, 0.05) 50%, 
                        rgba(0, 0, 0, 0.8) 100%)`
                }}
            />

            {/* Animated grid pattern */}
            <div className="fixed inset-0 opacity-10">
                <div 
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `
                            linear-gradient(rgba(139, 92, 246, 0.3) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(139, 92, 246, 0.3) 1px, transparent 1px)
                        `,
                        backgroundSize: '50px 50px',
                        transform: `translate(${mousePosition.x * 0.1}px, ${mousePosition.y * 0.1}px)`
                    }}
                />
            </div>

            {/* Navigation */}
            <nav className="relative z-50 flex items-center justify-between px-8 py-6">
                <div className="flex items-center space-x-8">
                    {/* Vite Logo */}
                    <div className="flex items-center space-x-3">
                        <div className="relative">
                            <svg width="32" height="32" viewBox="0 0 410 404" fill="none">
                                <path d="M399.641 59.5246L215.643 388.545C211.844 395.338 202.084 395.378 198.228 388.618L10.5817 59.5563C6.38087 52.1896 12.6802 43.2665 21.0281 44.7586L205.223 77.6824C206.398 77.8924 207.601 77.8904 208.776 77.6763L389.119 44.8058C397.439 43.2894 403.768 52.1434 399.641 59.5246Z" fill="url(#paint0_linear)"/>
                                <path d="M292.965 1.5744L156.801 28.2552C154.563 28.6937 152.906 30.5903 152.771 32.8664L144.395 174.33C144.198 177.662 147.258 180.248 150.51 179.498L188.42 170.749C191.967 169.931 195.172 173.055 194.443 176.622L183.18 231.775C182.422 235.487 185.907 238.661 189.532 237.56L212.947 230.446C216.577 229.344 220.065 232.527 219.297 236.242L201.398 322.875C200.278 328.294 207.486 331.249 210.492 326.603L212.5 323.5L323.454 102.072C325.312 98.3645 322.108 94.137 318.036 94.9228L279.014 102.454C275.347 103.161 272.227 99.746 273.262 96.1583L298.731 7.86689C299.767 4.27314 296.636 0.855181 292.965 1.5744Z" fill="url(#paint1_linear)"/>
                                <defs>
                                    <linearGradient id="paint0_linear" x1="6.00017" y1="32.9999" x2="235" y2="344" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#41D1FF"/>
                                        <stop offset="1" stopColor="#BD34FE"/>
                                    </linearGradient>
                                    <linearGradient id="paint1_linear" x1="194.651" y1="8.81818" x2="236.076" y2="292.989" gradientUnits="userSpaceOnUse">
                                        <stop stopColor="#FFEA83"/>
                                        <stop offset="0.0833333" stopColor="#FFDD35"/>
                                        <stop offset="1" stopColor="#FFA800"/>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </div>
                        <span className="text-2xl font-bold">Vite</span>
                    </div>

                    {/* Navigation Links */}
                    <div className="hidden md:flex items-center space-x-8 text-sm">
                        <a href="#" className="hover:text-purple-400 transition-colors">Guide</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">Config</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">Plugins</a>
                        <a href="#" className="hover:text-purple-400 transition-colors">Resources</a>
                        <div className="flex items-center space-x-1">
                            <span>Version</span>
                            <span className="text-purple-400">6.0</span>
                        </div>
                    </div>
                </div>

                {/* Right side buttons */}
                <div className="flex items-center space-x-4">
                    <button className="text-gray-400 hover:text-white transition-colors">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 2C6.477 2 3.584 4.51 3.139 7.896a.75.75 0 0 0 1.492.208C5.012 5.827 7.264 4 10 4s4.988 1.827 5.369 4.104a.75.75 0 0 0 1.492-.208C16.416 4.51 13.523 2 10 2zM10 18c3.523 0 6.416-2.51 6.861-5.896a.75.75 0 0 0-1.492-.208C14.988 14.173 12.736 16 10 16s-4.988-1.827-5.369-4.104a.75.75 0 0 0-1.492.208C3.584 15.49 6.477 18 10 18z" clipRule="evenodd"/>
                        </svg>
                    </button>
                    <button className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Get Started
                    </button>
                    <button className="flex items-center space-x-2 bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clipRule="evenodd"/>
                        </svg>
                        <span>GitHub</span>
                    </button>
                </div>
            </nav>

            {/* Hero Section */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-8 text-center">
                <div 
                    className="mb-8"
                    style={{ transform: `translateY(${scrollY * 0.3}px)` }}
                >
                    <h1 className="text-6xl md:text-8xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-pink-400 to-blue-400 bg-clip-text text-transparent leading-tight">
                        Vite
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-300 mb-4 max-w-2xl">
                        Next Generation Frontend Tooling
                    </p>
                    <p className="text-lg md:text-xl text-gray-400 mb-12 max-w-3xl">
                        Get ready for a development environment that can finally catch up with you.
                    </p>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-4 mb-16">
                    <button className="bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/25">
                        Get Started
                    </button>
                    <button className="border border-gray-600 hover:border-gray-400 px-8 py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:scale-105">
                        Why Vite?
                    </button>
                </div>

                {/* Features grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl">
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-2xl mb-4">⚡</div>
                        <h3 className="text-xl font-semibold mb-2">Instant Server Start</h3>
                        <p className="text-gray-400">On demand file serving over native ESM, no bundling required!</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-2xl mb-4">🔥</div>
                        <h3 className="text-xl font-semibold mb-2">Lightning Fast HMR</h3>
                        <p className="text-gray-400">Hot Module Replacement (HMR) that stays fast regardless of app size.</p>
                    </div>
                    
                    <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:scale-105">
                        <div className="text-2xl mb-4">🛠️</div>
                        <h3 className="text-xl font-semibold mb-2">Rich Features</h3>
                        <p className="text-gray-400">Out-of-the-box support for TypeScript, JSX, CSS and more.</p>
                    </div>
                </div>
            </div>

            {/* Floating particles */}
            <div className="fixed inset-0 pointer-events-none">
                {Array.from({ length: 50 }).map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full opacity-20"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            width: `${Math.random() * 4 + 1}px`,
                            height: `${Math.random() * 4 + 1}px`,
                            backgroundColor: i % 3 === 0 ? '#8b5cf6' : i % 3 === 1 ? '#3b82f6' : '#10b981',
                            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
                            animationDelay: `${Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Custom CSS */}
            <style jsx>{`
                @keyframes float {
                    0%, 100% { 
                        transform: translateY(0px) translateX(0px); 
                        opacity: 0.2; 
                    }
                    25% { 
                        transform: translateY(-20px) translateX(10px); 
                        opacity: 0.4; 
                    }
                    50% { 
                        transform: translateY(-40px) translateX(-5px); 
                        opacity: 0.6; 
                    }
                    75% { 
                        transform: translateY(-20px) translateX(-10px); 
                        opacity: 0.4; 
                    }
                }

                body {
                    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
                }
            `}</style>
        </div>
    );
};

export default ViteA;