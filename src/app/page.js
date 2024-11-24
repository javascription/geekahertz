"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "./components/Navbar";

export default function Home() {
  const [floatingDivs, setFloatingDivs] = useState([]);

  useEffect(() => {
    const divs = [...Array(20)].map(() => ({
      width: `${Math.random() * 20 + 10}px`,
      height: `${Math.random() * 20 + 10}px`,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      animationDuration: `${Math.random() * 10 + 10}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
    setFloatingDivs(divs);
  }, []);

  return (
    <>
      <Navbar color="#fff" />
      <div className="absolute top-0 left-0 w-full h-screen overflow-hidden font-sans z-0">
        <div className="absolute inset-0">
          <div className="absolute inset-0">
            {floatingDivs.map((style, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white opacity-10 animate-float"
                style={style}
              ></div>
            ))}
          </div>

          <svg
            className="absolute inset-0 w-full h-full"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth="1"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
          <div className="absolute inset-0 bg-white bg-opacity-10 backdrop-filter backdrop-blur-lg"></div>
        </div>

        <main className="relative z-10 flex flex-col items-center justify-center min-h-screen text-center px-4">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4 animate-fade-in-down tracking-tight">
            GoDoc
          </h1>
          <p className="text-xl md:text-2xl text-blue-100 mb-8 animate-fade-in-up font-light">
            Your documents, one click away!
          </p>
          <Link
            href="/register"
            className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition-colors duration-300 animate-slide-up-fade"
          >
            Get Started
          </Link>
        </main>
      </div>
    </>
  );
}
