"use client";

import Image from "next/image";

type Card = {
  title: string;
  image: string;
  alt?: string;
  href?: string;             
  onClick?: () => void;       
  cta?: string;              
};

type Props = {
  heading?: string;
  items?: Card[];
};

const DEFAULT_ITEMS: Card[] = [
  {
    title: "Vai correr o risco de perder sua vaga para um concorrente?",
    image: "/capa-video/capaVideo1.webp",
  },
  {
    title: "Curso livre ou Pós-Graduação?",
     image: "/capa-video/capaVideo2.webp",
  },
  {
    title: "Tá cansado de não conseguir pagar as contas?",
      image: "/capa-video/capaVideo3.webp",
  },
  {
    title: "Estude em uma Faculdade com 22 anos de tradição",
     image: "/capa-video/capaVideo4.webp",
  },
];

export default function VideoPromoSection({
  heading = "Com uma Pós-Graduação, você se destaca no mercado de trabalho.",
  items = DEFAULT_ITEMS,
}: Props) {
  return (
    <section className="w-full py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-krona font-bold text-2xl tracking-tight">
          {heading}
        </h2>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {items.map((card, i) => (
            <VideoCard key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
}

function VideoCard({ title, image, alt, href, onClick, cta = "Ver Vídeo" }: Card) {
  const Wrapper: any = href ? "a" : "button";

  return (
    <Wrapper
      href={href}
      onClick={onClick}
      className="group relative block rounded-2xl ring-1 ring-white/10 overflow-hidden
                 shadow-[0_2px_20px_rgba(0,0,0,0.25)] focus:outline-none focus-visible:ring-2
                 focus-visible:ring-[#7c3aed] transition-transform duration-300 hover:-translate-y-0.5"
    >
      <div className="relative aspect-[3/4] w-full">
        <Image
          src={image}
          alt={alt ?? ""}
          fill
          priority={false}
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width:1024px) 320px, (min-width:640px) 45vw, 90vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/0" />
      </div>

      <div className="font-poppins pointer-events-none absolute cursor-pointer inset-x-0 bottom-5 md:bottom-6 px-5 text-center space-y-2">
        <p className="text-lg leading-snug">
          {title}
        </p>
        <span className="inline-block border rounded-2xl p-2 text-lg font-semibold tracking-wide
                         transition-colors ">
          {cta}
        </span>
      </div>
    </Wrapper>
  );
}
