import React from "react";
import "./VapiCard.css"; // CSS file import

const VapiCard = () => {
  return (
    <div className="vapi-container">
      {/* Background Video */}
      <video className="bg-video" autoPlay loop muted playsInline>
        <source
          src="https://content.upguard.com/hubfs/website-collateral/see-the-unseen_rev03.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay */}
      <div className="overlay"></div>

      {/* Card Content */}
      <div className="vapi-content">
        <h1>⚡ Vapi AI Platform</h1>
        <p>
          Build, deploy, and scale AI applications faster with powerful APIs and
          a seamless developer experience.
        </p>
        <button>Explore More</button>
      </div>
    </div>
  );
};

export default VapiCard;
