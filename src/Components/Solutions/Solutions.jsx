import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const Solutions = () => {
  const sketchRef = useRef();
  const [isLoading, setIsLoading] = useState(true);

  // 🔹 Main container background
  const mainContainerStyle = {
    border: "1px solid #1a1a1a",
    background: "#080808",
    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.9)",
    backdropFilter: "blur(15px)",
  };

  // 🔹 Card background
  const cardStyle = {
    border: "1px solid #1a1a1a",
    backgroundColor: "#0f0f0f",
  };

  useEffect(() => {
    let myP5;
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Simulates a 2-second loading time

    const sketch = (p) => {
      let rectangles = [];
      const size = 45; //box
      let cols, rows;
      const mouseTrail = [];
      let prevMouseX = 0;
      let prevMouseY = 0;
      let isMouseMoving = false;

      // 🔹 Rectangle class (grid background effect)
      class Rectangle {
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.glow = 0;
        }

        update(mx, my, isMoving) {
          if (isMoving) {
            const d = p.dist(mx, my, this.x + this.w / 2, this.y + this.h / 2);
            this.glow =
              d < 150
                ? p.lerp(this.glow, 1.0, 0.2)
                : p.lerp(this.glow, 0.0, 0.1);
          } else {
            const inside =
              mx > this.x &&
              mx < this.x + this.w &&
              my > this.y &&
              my < this.y + this.h;
            this.glow = inside
              ? p.lerp(this.glow, 1.0, 0.2)
              : p.lerp(this.glow, 0.0, 0.1);
          }
        }

        drawRect() {
          const alpha = p.map(this.glow, 0, 1, 10, 255);
          const borderAlpha = p.map(this.glow, 0, 1, 100, 255);
          const fillColor = p.lerpColor(
            p.color(15, 15, 15, 100),
            p.color(30, 30, 30, alpha),
            this.glow
          );

          p.stroke(
            p.lerpColor(
              p.color(50, 50, 50, borderAlpha),
              p.color(150, 150, 255, borderAlpha),
              this.glow
            )
          );
          p.strokeWeight(1);
          p.fill(fillColor);
          p.rect(this.x, this.y, this.w, this.h);
        }
      }

      p.setup = () => {
        p.createCanvas(p.windowWidth, p.windowHeight).parent(sketchRef.current);
        cols = p.floor(p.width / size);
        rows = p.floor(p.height / size);
        for (let i = 0; i < cols; i++) {
          rectangles[i] = [];
          for (let j = 0; j < rows; j++) {
            rectangles[i][j] = new Rectangle(i * size, j * size, size, size);
          }
        }
      };

      p.draw = () => {
        p.background("#080808");

        isMouseMoving = p.dist(p.mouseX, p.mouseY, prevMouseX, prevMouseY) > 1;

        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            rectangles[i][j].update(p.mouseX, p.mouseY, isMouseMoving);
            rectangles[i][j].drawRect();
          }
        }

        if (isMouseMoving) {
          mouseTrail.push(p.createVector(p.mouseX, p.mouseY));
        }
        if (mouseTrail.length > 50) mouseTrail.shift();

        p.noStroke();
        for (let i = 0; i < mouseTrail.length; i++) {
          const pos = mouseTrail[i];
          const alpha = p.map(i, 0, mouseTrail.length, 0, 150);
          const diameter = p.map(i, 0, mouseTrail.length, 5, 30);
          p.fill(30, 100, 200, alpha);
          p.ellipse(pos.x, pos.y, diameter, diameter);
        }

        p.noFill();
        p.stroke(255, 255, 255, 200);
        p.strokeWeight(2);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);

        prevMouseX = p.mouseX;
        prevMouseY = p.mouseY;
      };

      p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        cols = p.floor(p.width / size);
        rows = p.floor(p.height / size);
        rectangles = [];
        for (let i = 0; i < cols; i++) {
          rectangles[i] = [];
          for (let j = 0; j < rows; j++) {
            rectangles[i][j] = new Rectangle(i * size, j * size, size, size);
          }
        }
      };
    };

    if (!isLoading) {
      myP5 = new p5(sketch);
    }

    return () => {
      clearTimeout(timeout);
      if (myP5) myP5.remove();
    };
  }, [isLoading]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-screen h-screen bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="relative w-screen h-screen overflow-hidden">
      {/* 🔹 Background Canvas */}
      <div ref={sketchRef} className="absolute inset-0 -z-10"></div>

      {/* 🔹 Main content container */}
      <div
        style={mainContainerStyle}
        className="relative z-10 w-full max-w-7xl p-4 md:p-8 mx-auto mt-10 grid grid-cols-1 gap-8 rounded-3xl main-container"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column */}
          <div className="flex flex-col justify-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
              Commerce with a clever twist
            </h1>
            <p className="text-gray-300 text-lg mb-6">
              Turn your storefront into a conversion engine
            </p>
            <p className="text-gray-500 text-sm mb-6">
              From smarter product search to perfect product recs, use AI to
              help you work faster, sell more, and keep customers coming back.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              Explore Commerce
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Right Column */}
          <div className="flex flex-col">
            <div
              style={cardStyle}
              className="card rounded-xl overflow-hidden shadow-lg p-6"
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-semibold text-white">
                  Edit product
                </h3>
                <div className="text-right">
                  <p className="text-sm font-semibold text-white">
                    20V Cordless Nail Gun
                  </p>
                  <p className="text-xs text-gray-500">Model: GNG-37</p>
                </div>
              </div>
              {/* Card Content */}
              <div className="flex justify-between items-start">
                <div className="w-1/3 flex flex-col items-center">
                  <p className="text-xs text-gray-500 mb-1">Status:</p>
                  <p className="text-white text-sm font-semibold mb-2">
                    Ready for approval
                  </p>
                  <div className="relative w-16 h-16">
                    <svg
                      className="w-full h-full text-green-500"
                      viewBox="0 0 100 100"
                    >
                      <circle
                        className="text-gray-800"
              {/* Input Fields */}
              <div className="flex justify-between mt-4 text-xs font-semibold text-gray-400">
                <a
                  href="#"
                  className="border-b-2 border-gray-400 text-gray-300 pb-2"
                >
                  Details
                </a>
                <a href="#" className="pb-2">
                  Images
                </a>
                <a href="#" className="pb-2">
                  Documents
                </a>
                <a href="#" className="pb-2">
                  More...
                </a>
              </div>
              <div className="mt-4 space-y-2">
                <p className="text-xs text-gray-500">Base property group</p>
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full p-2 rounded-md bg-black text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Product Number"
                  className="w-full p-2 rounded-md bg-black text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Product Title"
                  className="w-full p-2 rounded-md bg-black text-white text-sm"
                />
                <textarea
                  placeholder="Product Description"
                  className="w-full p-2 rounded-md bg-black text-white text-sm h-20"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mt-8">
          {/* Gerrie Electric Card */}
          <div style={cardStyle} className="card rounded-xl p-6 shadow-lg">
            <div className="flex items-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-8 h-8 text-white mr-2"
              >
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15h-1l-2 2v-4H8v-2h2v-2H8V9h2V7h1v10zm6-2h-2V7h2v8zm-4 2h-2V7h2v10z" />
              </svg>
              <h2 className="text-xl font-semibold text-white">GERRIE</h2>
            </div>
            <p className="text-xl font-semibold text-white mb-2">
              Gerrie Electric powers a digital B2B transformation
            </p>
            <a
              href="#"
              className="inline-flex items-center text-gray-300 hover:text-white transition-colors"
            >
              Read customer story
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Build Better Card */}
          <div
            style={cardStyle}
            className="card rounded-xl p-6 shadow-lg grid grid-cols-1 md:grid-cols-2 gap-4"
          >
            <div className="flex flex-col justify-center">
              <h2 className="text-xl font-semibold text-white mb-2">
                Build better, sell faster
              </h2>
              <p className="text-gray-400 text-sm">
                As a{" "}
                <span className="text-white font-bold">
                  product leader in ecommerce
                </span>
                , I want insights and tools that help me optimize customer
                journeys and deliver value, without slowing down innovation
              </p>
            </div>
            <div className="flex justify-center md:justify-end items-center">
              <img
                className="rounded-full h-32 w-32 object-cover border border-gray-800"
                src="https://placehold.co/200x200/121212/e0e0e0?text=User+Photo"
                alt="Placeholder image of a user"
              />
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
};

export default Solutions;