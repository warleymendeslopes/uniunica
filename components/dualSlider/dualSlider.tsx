"use client";

import Image from "next/image";
import { ReactNode } from "react";

type TextCard = { kind: "text"; small: string; big: string };
type ImageCard = { kind: "image"; src: string; alt?: string };
type Slide = TextCard | ImageCard;

type Props = {
  top?: Slide[];
  bottom?: Slide[];
  speedTop?: number;
  speedBottom?: number;
};

const defaultTop: Slide[] = [
  { kind: "text", small: "Certificado digital", big: "EM 24H" },
  { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Campus" },
  { kind: "text", small: "Especialistas ganham +", big: "de 5 MIL" },
  { kind: "image", src: "/dualSlide/dualslide2.png", alt: "Laboratório" },
];

const defaultBottom: Slide[] = [
  { kind: "image", src: "/dualSlide/dualslide3.png", alt: "Mercado" },
  { kind: "text", small: "Cursos 100% ONLINE", big: "e tecnologia de cinema" },
  { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Edição" },
  { kind: "text", small: "28 anos de", big: "TRADIÇÃO" },
];

export default function DualMarquee({
  top = defaultTop,
  bottom = defaultBottom,
  speedTop = 28,
  speedBottom = 28,
}: Props) {
  return (
    <section className="w-full py-10">
      <div className="mx-auto px-6 space-y-10">
      
        <MarqueeRow items={top} direction="left" duration={speedTop} />

        <MarqueeRow items={bottom} direction="right" duration={speedBottom} />

      </div>
    </section>
  );
}

function MarqueeRow({
  items,
  direction,
  duration = 30,
}: {
  items: Slide[];
  direction: "left" | "right";
  duration?: number;
}) {

  const row = [...items, ...items];

  return (
    <div className="relative overflow-hidden">
      <div
        className={[
          "flex gap-6 w-max transform-gpu will-change-transform",
          direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
        ].join(" ")}
        style={{ ["--marquee-duration" as any]: `${duration}s` }}
      >
        {row.map((s, i) => (
          <CardSlide key={i}>{renderSlide(s)}</CardSlide>
        ))}
      </div>
    </div>
  );
}


function CardSlide({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div
      className="
        shrink-0 rounded-2xl overflow-hidden
        bg-neutral-900/40 ring-1 ring-white/5
        w-[280px] h-[160px]
        md:w-[460px] md:h-[240px]
        lg:w-[560px] lg:h-[300px]
      "
    >
      {children}
    </div>
  );
}

function renderSlide(s: Slide) {
  if (s.kind === "image") {
    return (
      <div className="relative w-full h-full">
        <Image
          src={s.src}
          alt={s.alt ?? ""}
          fill
          className="object-cover"
          sizes="(min-width: 1024px) 560px, (min-width: 768px) 460px, 280px"
        />
      </div>
    );
  }
  return (
    <div className="text-center font-poppins h-full w-full bg-neutral-900 grid place-content-center px-8">
      <p className="text-white/90 text-base md:text-xl lg:text-2xl mb-1">{s.small}</p>
      <p className="text-4xl font-extrabold leading-none bg-gradient-to-r from-[#7c3aed] to-[#0ea5ff] bg-clip-text text-transparent">
        {s.big}
      </p>
    </div>
  );
}
