"use client";
import {ReactNode, useEffect, useState} from "react";
export default function Jornada() {
  const [squaresUp, setSquaresUp] = useState<ReactNode[]>([]);
  const [squaresDown, setSquaresDown] = useState<ReactNode[]>([]);

  const createSquare = (direction: "up" | "down", count: number) => {
    const top: number = Math.random() * 100;
    const left: number = Math.random() * 100;
    const size: number = Math.floor(Math.random() * 16) + 6;
    const duration: number = 2 + Math.random() * 2;

    return (
        <span
            key={count}
            className={`absolute border-2 border-white ${
                direction === "up" ? "animate-floatup" : "animate-floatdown"
            }`}
            style={{
              top: `${top}%`,
              left: `${left}%`,
              width: `${size}px`,
              height: `${size}px`,
              animationDuration: `${duration}s`,
            }}
        />
    );
  };
  useEffect(() => {
    setSquaresUp(Array.from({ length: 50 }).map((_, count) => createSquare("up", count)));
    setSquaresDown(Array.from({ length: 50 }).map((_, count) => createSquare("down", count)));
  }, []);

  return (
    <section className="relative h-[5vh] bg-black py-8 text-white flex items-center justify-center ">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {squaresUp}
        {squaresDown}
      </div>
      <h1 className="text-xl lg:text-3xl uppercase font-krona z-10 relative">
        sua jornada começa aqui
      </h1>
    </section>
  );
}
