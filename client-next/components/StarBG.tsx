"use client"

import { useEffect, useRef } from "react";

const Starfield: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    for (let i = 0; i < 120; i++) {
      const star = document.createElement("div");
      star.className =
        "absolute w-[2px] h-[2px] bg-white/80 rounded-full animate-star-blink";
      star.style.top = `${Math.random() * 100}%`;
      star.style.left = `${Math.random() * 100}%`;
      star.style.opacity = `${Math.random()}`;
      star.style.animationDelay = `${Math.random() * 3}s`;

      container.appendChild(star);
    }

    for (let i = 0; i < 4; i++) {
      const shoot = document.createElement("div");
      shoot.className =
        "absolute w-[2px] h-[2px] bg-white/90 rounded-full shadow-[0_0_8px_white] animate-shooting-star";
      shoot.style.top = `${Math.random() * 100}%`;
      shoot.style.left = `${Math.random() * 100}%`;
      shoot.style.animationDelay = `${Math.random() * 8}s`;

      container.appendChild(shoot);
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 overflow-hidden"
    />
  );
};

export default Starfield;
