import React, { useEffect, useRef } from "react";
import p5 from "p5";

const Home = () => {
  const sketchRef = useRef();

  const mainContainerStyle = {
    border: "1px solid #2d2f44",
    background: "rgba(13, 15, 27, 0.5)",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.2)",
    backdropFilter: "blur(10px)",
  };

  const cardStyle = {
    border: "1px solid #2d2f44",
    backgroundColor: "#1a1e36",
  };

  useEffect(() => {
    let myP5;

    const sketch = (p) => {
      let rectangles = [];
      let cr = 1;
      let cols, rows;
      let size = 80;
      let mouseTrail = [];

      class Rectangle {
        constructor(x, y, w, h) {
          this.x = x;
          this.y = y;
          this.w = w;
          this.h = h;
          this.color = p.color(50, 50, 50, 120);
        }

        collided(mx, my, r) {
          if (
            mx > this.x - r &&
            mx < this.x + this.w + r &&
            my > this.y - r &&
            my < this.y + this.h + r
          ) {
            this.color = p.color(20, 80, 150, 200);
          } else {
            this.color = p.color(50, 50, 50, 120);
          }
        }

        drawRect() {
          p.stroke(0, 0, 0, 50);
          p.strokeWeight(1);
          p.fill(this.color);
          p.rect(this.x, this.y, this.w, this.h);
        }
      }

      p.setup = () => {
        p.createCanvas(window.innerWidth, window.innerHeight).parent(
          sketchRef.current
        );
        cols = p.width / size;
        rows = p.height / size;
        for (let i = 0; i < cols; i++) {
          rectangles[i] = [];
          for (let j = 0; j < rows; j++) {
            rectangles[i][j] = new Rectangle(i * size, j * size, size, size);
          }
        }
      };

      p.draw = () => {
        p.clear();
        for (let i = 0; i < cols; i++) {
          for (let j = 0; j < rows; j++) {
            rectangles[i][j].collided(p.mouseX, p.mouseY, cr);
            rectangles[i][j].drawRect();
          }
        }
        mouseTrail.push(p.createVector(p.mouseX, p.mouseY));
        if (mouseTrail.length > 20) {
          mouseTrail.shift();
        }
        p.noStroke();
        for (let i = 0; i < mouseTrail.length; i++) {
          let pos = mouseTrail[i];
          let alpha = p.map(i, 0, mouseTrail.length, 0, 150);
          let diameter = p.map(i, 0, mouseTrail.length, 5, 20);
          p.fill(0, 150, 255, alpha);
          p.ellipse(pos.x, pos.y, diameter, diameter);
        }
        p.fill(255, 255, 255, 200);
        p.ellipse(p.mouseX, p.mouseY, 20, 20);
      };

      p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, window.innerHeight);
      };
    };

    myP5 = new p5(sketch);

    return () => {
      myP5.remove();
    };
  }, []);

  return (
    <div className="relative min-h-screen w-screen overflow-hidden">
      {/* Background Canvas */}
      <div ref={sketchRef} className="absolute inset-0 -z-10"></div>

      {/* Main content container with backdrop-filter */}
      <div
        style={mainContainerStyle}
        className="relative main-container max-w-7xl w-full p-4 md:p-8 rounded-3xl grid grid-cols-1 gap-8 z-10 mx-auto my-auto"
      >
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - Content and experiences */}
          <div className="flex flex-col justify-center">
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
              Commerce with a clever twist
            </h1>
            <p className="text-gray-400 text-lg mb-6">
              Turn your storefront into a conversion engine
            </p>
            <p className="text-gray-500 text-sm mb-6">
              From smarter product search to perfect product recs, use AI to
              help you work faster, sell more, and keep customers coming back.
            </p>
            <a
              href="#"
              className="inline-flex items-center text-blue-400 hover:text-blue-300 transition-colors"
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
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
          {/* Right Column - Visual Builder */}
          <div className="flex flex-col">
            <div style={cardStyle} className="card rounded-xl overflow-hidden shadow-lg p-6">
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
                        className="text-gray-700"
                        strokeWidth="6"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                      />
                      <circle
                        className="text-green-500"
                        strokeWidth="6"
                        strokeDasharray="283"
                        strokeDashoffset="0"
                        strokeLinecap="round"
                        stroke="currentColor"
                        fill="transparent"
                        r="45"
                        cx="50"
                        cy="50"
                        transform="rotate(-90 50 50)"
                      />
                      <text
                        x="50"
                        y="50"
                        className="text-white text-xl font-bold"
                        textAnchor="middle"
                        alignmentBaseline="middle"
                      >
                        100%
                      </text>
                    </svg>
                  </div>
                </div>
                <div className="w-2/3 pl-4">
                  <div className="flex items-center mb-2">
                    <span className="h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    <p className="text-xs text-gray-400">
                      Missing required properties
                    </p>
                  </div>
                  <div className="flex items-center mb-2">
                    <span className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></span>
                    <p className="text-xs text-gray-400">
                      Missing recommended properties
                    </p>
                  </div>
                  <div className="flex items-center">
                    <span className="h-2 w-2 rounded-full bg-green-500 mr-2"></span>
                    <p className="text-xs text-gray-400">
                      Content for approval
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between mt-4 text-xs font-semibold text-gray-400">
                <a
                  href="#"
                  className="border-b-2 border-blue-400 text-blue-400 pb-2"
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
                  className="w-full p-2 rounded-md bg-gray-800 text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Product Number"
                  className="w-full p-2 rounded-md bg-gray-800 text-white text-sm"
                />
                <input
                  type="text"
                  placeholder="Product Title"
                  className="w-full p-2 rounded-md bg-gray-800 text-white text-sm"
                />
                <textarea
                  placeholder="Product Description"
                  className="w-full p-2 rounded-md bg-gray-800 text-white text-sm h-20"
                ></textarea>
              </div>
            </div>
          </div>
        </div>

        {/* Stacking Cards Section */}
        <div className="relative mt-24 min-h-[250vh] flex flex-col items-center">
          {/* Card 1 */}
          <div
            className="w-full max-w-4xl sticky top-16 p-8 rounded-3xl"
            style={cardStyle}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Card One: Our Philosophy
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              We believe in creating elegant, powerful solutions that are as
              simple to use as they are effective. Our philosophy centers on
              innovation, user experience, and measurable results.
            </p>
          </div>

          {/* Card 2 */}
          <div
            className="w-full max-w-4xl sticky top-24 p-8 mt-16 rounded-3xl"
            style={cardStyle}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Card Two: Our Process
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              From initial concept to final deployment, our process is
              collaborative and transparent. We work with you to understand your
              goals and build a solution that exceeds your expectations.
            </p>
          </div>

          {/* Card 3 */}
          <div
            className="w-full max-w-4xl sticky top-32 p-8 mt-16 rounded-3xl"
            style={cardStyle}
          >
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Card Three: Our Results
            </h2>
            <p className="text-gray-400 text-base md:text-lg">
              Our success is measured by your success. We provide comprehensive
              analytics and support to ensure our solutions deliver tangible
              results and a significant return on investment.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;