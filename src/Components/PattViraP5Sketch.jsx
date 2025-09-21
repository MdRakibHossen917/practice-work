import React from 'react';
import { ReactP5Wrapper } from 'react-p5-wrapper';

// Rectangle class টি এখানে সংজ্ঞায়িত করা হয়েছে, যাতে p5.js স্কেচ এটি ব্যবহার করতে পারে।
class Rectangle {
  constructor(p5, x, y, w, h) {
    this.p5 = p5; // p5 ইনস্ট্যান্স স্টোর করা
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.initialColor = [30, 30, 50, 80]; // গ্রিডের প্রাথমিক রঙ (ডার্ক গ্রে, স্বচ্ছ)
    this.hoverColor = [100, 100, 255, 180]; // হোভার করলে নীল রঙ, আধা-স্বচ্ছ
    this.currentColor = [...this.initialColor];
    this.targetColor = [...this.initialColor];
    this.easingFactor = 0.05; // রঙের পরিবর্তনের গতি
  }

  collided(mouseX, mouseY, collisionRadius) {
    let distance = this.p5.dist(mouseX, mouseY, this.x + this.w / 2, this.y + this.h / 2);

    if (distance < collisionRadius + this.w / 2) {
      this.targetColor = this.hoverColor;
    } else {
      this.targetColor = this.initialColor;
    }

    // রঙের মসৃণ পরিবর্তনের জন্য ইজিং (easing) ব্যবহার
    for (let i = 0; i < 4; i++) { // RGBA চারটি মানের জন্য
      this.currentColor[i] += (this.targetColor[i] - this.currentColor[i]) * this.easingFactor;
    }
  }

  drawRect() {
    this.p5.noStroke(); // রেক্ট্যাঙ্গেলে কোনো স্ট্রোক থাকবে না
    this.p5.fill(this.currentColor[0], this.currentColor[1], this.currentColor[2], this.currentColor[3]);
    this.p5.rect(this.x, this.y, this.w, this.h);
  }
}

const PattViraP5Sketch = () => {
  const sketch = (p5) => {
    let rectangles = [];
    let cr = 80; // মাউস ফলো ইফেক্টের ব্যাসার্ধ
    let cols;
    let rows;
    let size = 25; // প্রতিটি গ্রিড রেক্ট্যাঙ্গেলের আকার

    p5.setup = () => {
      // ক্যানভাসটি পুরো ব্রাউজার উইন্ডো জুড়ে তৈরি করা হয়েছে এবং পজিশন সেট করা হয়েছে
      p5.createCanvas(p5.windowWidth, p5.windowHeight).position(0, 0); 
      p5.noStroke(); // সমস্ত রেক্ট্যাঙ্গেলে কোনো স্ট্রোক থাকবে না
      
      cols = p5.ceil(p5.width / size);
      rows = p5.ceil(p5.height / size);
      for (let i = 0; i < cols; i++) {
        rectangles[i] = [];
        for (let j = 0; j < rows; j++) {
          rectangles[i][j] = new Rectangle(p5, i * size, j * size, size, size);
        }
      }
    };

    p5.draw = () => {
      p5.clear(); // ক্যানভাস পরিষ্কার করা হয় যাতে ব্যাকগ্রাউন্ড স্বচ্ছ থাকে
      // p5.background(0, 0, 0, 0); // আপনি চাইলে এটিও ব্যবহার করতে পারেন, তবে p5.clear() বেশি উপযোগী

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          rectangles[i][j].collided(p5.mouseX, p5.mouseY, cr);
          rectangles[i][j].drawRect();
        }
      }

      // ঐচ্ছিক: মাউস যেখানে আছে সেখানে একটি লাল বৃত্ত আঁকা (ডিবাগিং বা ভিজ্যুয়ালের জন্য)
      // p5.fill(255, 0, 0, 100);
      // p5.ellipse(p5.mouseX, p5.mouseY, cr * 2, cr * 2);
    };

    // উইন্ডোর আকার পরিবর্তন হলে ক্যানভাসও যাতে স্বয়ংক্রিয়ভাবে পরিবর্তিত হয়
    p5.windowResized = () => {
      p5.resizeCanvas(p5.windowWidth, p5.windowHeight);
      cols = p5.ceil(p5.width / size);
      rows = p5.ceil(p5.height / size);
      rectangles = []; // ক্যানভাস রিসাইজ হলে গ্রিড পুনরায় তৈরি করা
      for (let i = 0; i < cols; i++) {
        rectangles[i] = [];
        for (let j = 0; j < rows; j++) {
          rectangles[i][j] = new Rectangle(p5, i * size, j * size, size, size);
        }
      }
    };
  };

  return <ReactP5Wrapper sketch={sketch} />;
};

export default PattViraP5Sketch;