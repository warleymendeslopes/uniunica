"use client";

import Link from "next/link";
import Image from "next/image";

export default function EscolhaGrad() {
  return (
    <div className="h-[80vh] w-full grid grid-cols-2 overflow-hidden">
      <Link
        href="/graduacao/ead"
        className="group relative flex items-center justify-center overflow-hidden group-hover:scale-105 blur-sm hover:blur-none transition duration-300 hover:scale-110 hover:z-10"
      >
        <Image
          src="/escolha/img-modality-graduacao-online.webp"
          alt="Graduação Online"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />
        <span className="relative z-10 max-w-lg font-krona text-start text-white font-extrabold text-3xl md:text-5xl uppercase">
          Graduação Online
        </span>
      </Link>

      <Link
        href="/graduacao/presencial"
        className="group relative flex items-center justify-center overflow-hidden group-hover:scale-105 blur-sm hover:blur-none transition duration-300 hover:scale-110 hover:z-10"
      >
        <Image
          src="/escolha/img-modality-graduacao-presencial.webp"
          alt="Graduação Presencial"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />
        <span className="relative z-10 max-w-lg text-start font-krona text-white font-extrabold text-3xl md:text-5xl uppercase">
          Graduação Presencial
        </span>
      </Link>
    </div>
  );
}
