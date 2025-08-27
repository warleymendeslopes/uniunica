'use client';
import React from 'react';
import Image from 'next/image';
import {useRouter} from 'next/navigation';
import {CursosPorModalidadeProps} from "@/types/listCards";

export default function CursosPorModalidade({list}: CursosPorModalidadeProps) {
    const router = useRouter();

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 items-center justify-center flex flex-col">
      <h2 className="text-xl lg:text-2xl text-center py-16 font-bold uppercase font-krona mb-4">
        Escolha sua área de estudos
      </h2>
      <div className="grid grid-cols-2 font-poppins sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
                  {list.map((a, index) => (
                      <button
                          key={index}
                          onClick={() => router.push(`${a.link}`)}
                          className="relative group  text-center rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
                      >
                          <div className="relative w-[200px] h-[260px] lg:w-[280px] lg:h-[346px]">
                              <Image
                                  src={a.img}
                                  alt={a.name}
                                  width={280}
                                  height={350}
                                  className="object-cover"
                                  unoptimized
                              />
                              <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 dark:via-black/30 from-white/70 via-white/30 to-transparent" />
                              <div className="absolute -left-3 bottom-0 lg:left-0 w-full p-3 font-krona flex flex-col items-center justify-center text-center">
                                  <p className="uppercase mb-3 text-xs lg:text-base drop-shadow-md">
                                      {a.name}
                                  </p>
                                  <span className="uppercase  rounded-lg text-[10px] lg:text-base border-1 p-2 mb-3">
                                    {a.cta || 'ESCOLHER CURSO'}
                                  </span>
                              </div>
                          </div>
                      </button>
                  ))}
      </div>

    </section>
  );
}
