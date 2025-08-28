"use client";

import { useEffect, useState } from "react";

export default function Jornada() {
  const [squaresUp, setSquaresUp] = useState<JSX.Element[]>([]);
  const [squaresDown, setSquaresDown] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const createSquare = (direction: "up" | "down", i: number) => {
      const top = Math.random() * 100;
      const left = Math.random() * 100;
      const size = Math.floor(Math.random() * 16) + 6;
      const delay = Math.random() * 6;
      const duration = 2 + Math.random() * 2;

      return (
        <span
          key={`${direction}-${i}`}
          className={`absolute border-2 border-white ${
            direction === "up" ? "animate-floatup" : "animate-floatdown"
          }`}
          style={{
            top: `${top}%`,
            left: `${left}%`,
            width: `${size}px`,
            height: `${size}px`,
            animationDelay: `${delay}s`,
            animationDuration: `${duration}s`,
          }}
        />
      );
    };

    setSquaresUp(Array.from({ length: 50 }).map((_, i) => createSquare("up", i)));
    setSquaresDown(Array.from({ length: 50 }).map((_, i) => createSquare("down", i)));
  }, []);

  return (
    <section className="relative h-[600px] bg-black py-8 text-white flex items-center justify-center ">
      {/* fundo com quadradinhos */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {squaresUp}
        {squaresDown}
      </div>

      {/* título */}
      <h1 className="text-3xl uppercase font-krona z-10 relative">
        sua jornada começa aqui
      </h1>
    </section>
  );
}
