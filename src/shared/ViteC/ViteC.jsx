import React from 'react';
import './ViteC.css'; // We will create this file for the styles

const ViteC = () => {
    return (
        <div className="vite-container">
            {/* Main content, like the logo */}
            <div className="logo-box">
                {/* We can place the Vite logo here */}
                <div className="vite-logo-placeholder"></div>
            </div>

            {/* Background animated elements */}
            <div className="animated-line line-1"></div>
            <div className="animated-line line-2"></div>
            <div className="animated-line line-3"></div>

            {/* <div className="text-label jsx">.jsx</div>
            <div className="text-label svelte">.svelte</div>
            <div className="text-label sass">.sass</div> */}
        </div>
    );
};

export default ViteC;