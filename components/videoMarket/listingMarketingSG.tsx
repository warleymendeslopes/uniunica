"use client";

import { siteConfig } from "@/config/site";
import { SiteConfig } from "@/types/siteConfig";
import { Item, ModalityListingSG } from "@/types/videoMarket";
import Image from "next/image";
import { notFound } from "next/navigation";

export default function ListingSG({ modality }: ModalityListingSG) {
   const listModality: keyof SiteConfig["ProgramFeatures"] = modality || "segunda-graduacao" as any;
      const  slides = siteConfig.ProgramFeatures[listModality];

    if (!slides) {
        return (
            notFound()
        );
    }

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-krona font-bold tracking-tight text-2xl md:text-3xl mb-8 md:mb-10">
          {slides.heading}
        </h2>

        <div className="space-y-6 md:space-y-8">
          {slides.items.slice(0, 4).map((it, i) => (
            <BlueFeatureCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueFeatureCard({ title, text, image, alt }: Item) {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        ring-1 ring-white/10
        bg-gradient-to-r from-[#0a57ff] via-[#0c5fff] to-[#2aa4ff]
        h-[350px] font-poppins
      "
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-2xl bg-white/10" />
        <div className="absolute right-16 top-10 h-56 w-56 rounded-full blur-2xl bg-white/10" />
      </div>

      <div className="relative grid md:grid-cols-12 gap-0 h-full">
        <div className="md:col-span-8 p-6 md:p-10 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">{title}</h3>
          <p className="text-sm md:text-base leading-relaxed">{text}</p>
        </div>

        <div className="md:col-span-4 relative min-h-[180px] md:min-h-[220px]">
          <Image
            src={image}
            alt={alt ?? title}
            fill
            className="object-cover object-center"
            sizes="(min-width:1024px) 360px, (min-width:768px) 320px, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
