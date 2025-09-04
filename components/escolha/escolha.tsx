"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function EscolhaGrad() {
  const router = useRouter();

  return (
    <div className="h-auto lg:h-screen w-full flex flex-col lg:grid lg:grid-cols-2 overflow-hidden">
      <button
        onClick={() => router.push("/graduacao/ead")}
        className="group relative h-[45%] lg:h-full flex items-center justify-center overflow-hidden transition duration-300 hover:scale-105 hover:z-10"
      >
        <Image
          src="/escolha/img-modality-graduacao-online.webp"
          alt="Graduação Online"
          width={950}
          height={950}
          className="w-[430px] h-[430px] lg:w-full lg:h-auto object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />
        <span className="absolute z-10 px-4 text-center font-krona text-white font-extrabold text-3xl md:text-5xl uppercase">
          Graduação<br />Online
        </span>
      </button>
      <button
        onClick={() => router.push("/graduacao/presencial")}
        className="group relative h-[45%] lg:h-full flex items-center justify-center overflow-hidden transition duration-300 hover:scale-105 hover:z-10"
      >
        <Image
          src="/escolha/img-modality-graduacao-presencial.webp"
          alt="Graduação Presencial"
          width={950}
          height={950}
          className="w-[950px] h-[950px] lg:w-full lg:h-full object-cover"
          priority
        />
        <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition duration-500" />
        <span className="absolute z-10 px-4 text-center font-krona text-white font-extrabold text-3xl md:text-5xl uppercase">
          Graduação Presencial
        </span>
      </button>
    </div>
  );
}
