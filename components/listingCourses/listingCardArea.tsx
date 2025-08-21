'use client';
import React from 'react';
import Image from 'next/image';
import {ResponseArea} from "@/types/list-area";
import {usePathname, useRouter} from 'next/navigation';
interface CursosPorModalidadeProps {
  area: ResponseArea;
}
export default function CursosPorModalidade({area}: CursosPorModalidadeProps) {
    const router = useRouter();
    const pathname =  usePathname();
  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 items-center justify-center flex flex-col">
      <h2 className="text-xl lg:text-2xl text-center py-16 font-bold uppercase font-krona mb-4">
        escolha sua área de estudos
      </h2>
      <div className="grid grid-cols-2 font-poppins sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
        {area.data.map((a, index) => (
            <button
                key={index}
                onClick={() => router.push(`${pathname}/${a.areaAlias}`)}
                className="relative group  text-center rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              <div className="relative w-[200px] h-[260px] lg:w-[280px] lg:h-[346px]">
                <Image
                    src={a.miniature}
                    alt={a.areaName}
                    width={280}
                    height={350}
                    className="object-cover"
                    unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute -left-3 bottom-0 lg:left-0 w-full p-3 font-krona flex flex-col items-center justify-center text-center">
                  <p className="text-white uppercase mb-3 text-xs lg:text-base drop-shadow-md">
                    {a.areaName}
                  </p>
                  <span className="uppercase rounded-lg text-[10px] lg:text-base border-1 p-2 mb-3">
                      ESCOLHER CURSO
                  </span>
                </div>
              </div>
            </button>
        ))}
      </div>

    </section>
  );
}
