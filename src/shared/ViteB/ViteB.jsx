import React from 'react';
import './ViteB.css'; // Make sure to create and link this CSS file

const ViteB = () => {
    return (
        <div className="viteb-container">
            {/* Background Gradient Overlay */}
            <div className="background-gradient-overlay"></div>

            {/* Content Wrapper */}
            <div className="content-wrapper">
                {/* Top Buttons */}
                <div className="top-buttons">
                    <button className="get-started-button">
                        Get started
                    </button>
                    <button className="github-button">
                        <svg className="github-icon" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 0.297c-6.627 0-12 5.373-12 12c0 5.302 3.438 9.8 8.207 11.387c0.599 0.111 0.819-0.26 0.819-0.577c0-0.285-0.011-1.04-0.017-2.04c-3.337 0.724-4.042-1.61-4.042-1.61c-0.546-1.387-1.332-1.756-1.332-1.756c-1.087-0.744 0.083-0.729 0.083-0.729c1.205 0.085 1.838 1.239 1.838 1.239c1.07 1.835 2.809 1.305 3.492 0.999c0.108-0.778 0.419-1.305 0.762-1.605c-2.665-0.304-5.466-1.333-5.466-5.932c0-1.312 0.469-2.387 1.236-3.221c-0.124-0.304-0.536-1.524 0.118-3.176c0 0 1.008-0.322 3.301 1.23a11.49 11.49 0 016 0c2.292-1.552 3.297-1.23 3.297-1.23c0.655 1.652 0.243 2.872 0.118 3.176c0.77 0.835 1.233 1.909 1.233 3.221c0 4.609-2.807 5.624-5.479 5.923c0.43 0.372 0.813 1.102 0.813 2.222c0 1.606-0.014 2.899-0.014 3.293c0 0.319 0.213 0.691 0.825 0.575C20.565 22.096 24 17.592 24 12.297c0-6.627-5.373-12-12-12z"></path>
                        </svg>
                        GitHub
                    </button>
                </div>

                {/* Vite Logo and connecting lines */}
                <div className="logo-section">
                    <div className="lines-left">
                        <span className="file-label file-label-jsx">.jsx</span>
                        <span className="file-label file-label-svelte">.svelte</span>
                        <span className="file-label file-label-sass">.sass</span>
                    </div>
                    <div className="vite-logo-wrapper">
                        {/* This is a placeholder. You'd replace this with the actual Vite logo SVG or image. */}
                        {/* For a gradient/3D effect, you might use a complex SVG or CSS. */}
                        <div className="vite-logo-placeholder"></div>
                    </div>
                    <div className="lines-right">
                        {/* Potentially more file labels or output indicators here */}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViteB;