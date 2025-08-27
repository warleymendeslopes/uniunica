"use client";
import {siteConfig} from "@/config/site";
import {DualSLider} from "@/types/dualSlides";
import MarqueeRow from "@/components/dualSlider/template/slide";
import {SiteConfig} from "@/types/siteConfig";

export default function DualMarquee({
  speedTop = 28,
  speedBottom = 28,
  modality,
}: DualSLider) {
    const slideModality: keyof SiteConfig["slidePage"] = modality || "pos-graduacao" as any;
    const  slides = siteConfig.slidePage[slideModality];
    if (!slides) {
        return (
            <>não foi possível encontrar o config da modalidade {modality}</>
        );
    }
  return (
    <section className="w-full py-10">
      <div className="mx-auto px-6 space-y-10">
        <MarqueeRow items={slides.slideTop} direction="left" duration={speedTop} />
        <MarqueeRow items={slides.slideBottom} direction="right" duration={speedBottom} />
      </div>
    </section>
  );
}