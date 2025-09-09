'use client';
import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Pagination } from '@heroui/react';
import {CursosPorModalidadeProps} from "@/types/listCards";
import {normalizeText} from "@/utils/functions";

export default function CursosPorModalidade({
  list,
  showSearch = true,
  showPagination = true,
  coursesPerPage = 8,
}: CursosPorModalidadeProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const filteredCourses = useMemo(() => {
    if (!list) return [];

    if (!searchTerm.trim()) return list;

    const normalizedSearchTerm = normalizeText(searchTerm.trim());
    const searchRegex = new RegExp(normalizedSearchTerm.split(" ").join("|"), "i");

    return list.filter((course) => {
      const normalizedName = normalizeText(course.name);
      return searchRegex.test(normalizedName);
    });
  }, [list, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const startIndex = (currentPage - 1) * coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, startIndex + coursesPerPage);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col items-center">
  {currentCourses.length > 0 && (
  <h2
    className="text-xl lg:text-2xl text-center py-8 font-bold uppercase font-krona mb-4"
  >
    {currentCourses[0].title || "Escolha sua área de estudo"}
  </h2>
)}


      {showSearch && (
        <div className="flex flex-col w-full mb-10">
          <input
            type="search"
            placeholder="Pesquise por nome do curso..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="dark:bg-[#2a2a2a] bg-[#f1f1f1] shadow-xl p-3 rounded-lg outline-none w-full h-[55px]"
          />
          {searchTerm && (
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {filteredCourses.length} curso(s) encontrado(s)
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 font-poppins text-center">
        {currentCourses.map((a, index) => (
          <button
            key={a.link ?? index}
            onClick={() => router.push(`${a.link}`)}
            className="relative group text-center rounded-lg shadow-xl overflow-hidden hover:shadow-2xl  transition-shadow cursor-pointer"
          >
            <div className="relative w-[200px] h-[260px] lg:w-[280px] lg:h-[346px] shadow-2xl">
              <Image
                src={a.img}
                alt={a.name}
                width={280}
                height={350}
                className="object-cover"
                unoptimized
              />
             <div className="absolute inset-0 bg-gradient-to-t
                from-white via-white/80 
                dark:from-black/70 dark:via-black/30 dark:to-transparent" />

              <div className="absolute -left-3 bottom-0 lg:left-0 w-full p-3 font-krona  font-medium flex flex-col items-center justify-center text-center">
                <p className="uppercase mb-3 text-xs lg:text-base">
                  {a.name} 
                </p>
                <span className="uppercase rounded-lg text-[10px] lg:text-base border-1 p-2 mb-3">
                  {a.cta || 'ESCOLHER CURSO'}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {showPagination && totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            loop
            showControls
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={setCurrentPage}
          />
        </div>
      )}
    </section>
  );
}
