"use client";

import { useEffect, useRef, useState } from "react";
import { Card, CardBody, CardFooter } from "@heroui/card";
import { Avatar } from "@heroui/avatar";
import { Button } from "@heroui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ScrollShadow } from "@heroui/react";

type Testimonial = {
  quote: string;
  name: string;
  subtitle?: string;
  image: string;
};

type Props = {
  items?: Testimonial[];
  alwaysShowArrows?: boolean;
};

const defaultItems: Testimonial[] = [
  {
    quote:
      "O Centro Universitário Uniúnica tem agregado muito na minha formação. Conteúdo excelente e equipe dedicada.",
    name: "ALESSANDRA DUARTE",
    subtitle: "Direito Previdenciário",
    image: "/people/ana.jpg",
  },
  {
    quote:
      "Tive uma ótima experiência, flexibilidade de horários e suporte rápido da equipe.",
    name: "HELLEN PATRINY",
    subtitle: "MBA e Marketing",
    image: "/people/bruno.jpg",
  },
  {
    quote:
      "Qualidade impecável, sem burocracia e prazos cumpridos. Recomendo muito.",
    name: "AUIK PEREIRA",
    subtitle: "Gestão Empresarial",
    image: "/people/diego.jpg",
  },
];

export default function Testimonials({
  items = defaultItems,
  alwaysShowArrows = true,
}: Props) {
  const scrollerRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const tol = 2;
    setCanLeft(el.scrollLeft > tol);
    setCanRight(el.scrollLeft < el.scrollWidth - el.clientWidth - tol);
  };

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateArrows();

    const ro = new ResizeObserver(updateArrows);
    ro.observe(el);
    el.addEventListener("scroll", updateArrows, { passive: true });
    window.addEventListener("resize", updateArrows);

    return () => {
      ro.disconnect();
      el.removeEventListener("scroll", updateArrows);
      window.removeEventListener("resize", updateArrows);
    };
  }, []);

  const scrollByCard = (dir: "left" | "right") => {
    const el = scrollerRef.current;
    if (!el) return;

    const firstCard = el.querySelector<HTMLElement>("[data-card]");
    const styles = getComputedStyle(el);
    const gap = parseFloat(styles.columnGap || styles.gap || "24") || 24;
    const cardW = firstCard?.clientWidth ?? 320;
    const delta = (cardW + gap) * (dir === "left" ? -1 : 1);

    const tol = 2;

    if (dir === "right") {
      if (el.scrollLeft >= el.scrollWidth - el.clientWidth - tol) {
        el.scrollTo({ left: 0, behavior: "smooth" });
        return;
      }
    }

    if (dir === "left") {
      if (el.scrollLeft <= tol) {
        el.scrollTo({ left: el.scrollWidth, behavior: "smooth" });
        return;
      }
    }

    el.scrollTo({ left: el.scrollLeft + delta, behavior: "smooth" });
  };


  const showArrows = alwaysShowArrows || canLeft || canRight;

  return (
    <section className="relative w-full py-12 bg-gradient-to-tr from-[#6b2cff] to-[#0ea5ff] font-poppins">
      <div className="mx-auto max-w-6xl px-6">
        <h2 className="text-center text-xl lg:text-3xl font-krona font-bold mb-10 text-white">
          Quem faz a escolha certa não se arrepende
        </h2>
        <div className="relative">
          {showArrows && (
            <>
              <Button
                isIconOnly
                radius="full"
                variant="flat"
                className={`absolute lg:-left-20 -left-5 top-1/2 -translate-y-1/2 z-20 bg-white/80
                  transition-all duration-300
                  ${canLeft ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${alwaysShowArrows ? "opacity-100 scale-100" : ""}`}
                onPress={() => scrollByCard("left")}
                isDisabled={!canLeft && !alwaysShowArrows}
              >
                <ChevronLeft className="h-5 w-5 text-black" />
              </Button>

              <Button
                isIconOnly
                radius="full"
                variant="flat"
                className={`absolute lg:-right-20 -right-5 top-1/2 -translate-y-1/2 z-20 bg-white/80
                  transition-all duration-300
                  ${canRight ? "opacity-100 scale-100" : "opacity-0 scale-90"}
                  ${alwaysShowArrows ? "opacity-100 scale-100" : ""}`}
                onPress={() => scrollByCard("right")}
                isDisabled={!canRight && !alwaysShowArrows}
              >
                <ChevronRight className="h-5 w-5 text-black" />
              </Button>
            </>
          )}

          <ScrollShadow
            ref={scrollerRef}
            orientation="horizontal"
            className="flex flex-nowrap items-stretch gap-6 pb-4 pe-2
             overflow-x-auto scroll-smooth snap-x snap-mandatory
             [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden
             [--tw-shadow-color:theme(colors.white/50)]
             [transition:box-shadow_200ms_ease]"
            style={{ WebkitOverflowScrolling: "touch" }}
          >
            {items.map((t, i) => (
              <Card
                key={i}
                data-card
                isBlurred
                className="snap-start shrink-0 w-[300px] md:w-[360px] lg:w-[420px] h-[280px]
                 text-white flex flex-col justify-between rounded-xl bg-white/10
                 shadow-none backdrop-blur
                 transition-transform duration-300 ease-out
                 hover:-translate-y-0.5 active:translate-y-0"
              >
                <CardBody>
                  <p className="text-[15px] leading-relaxed">"{t.quote}"</p>
                </CardBody>
                <CardFooter className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-semibold uppercase">{t.name}</p>
                    <p className="text-xs text-white/70">{t.subtitle}</p>
                  </div>
                  <Avatar src={t.image} alt={t.name} size="lg" />
                </CardFooter>
              </Card>
            ))}
          </ScrollShadow>
        </div>
      </div>
    </section>
  );
}
