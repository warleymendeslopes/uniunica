"use client";
import type React from "react";
import { useState, useMemo, useEffect } from "react";
import { Pagination } from "@heroui/react";
import type { CourseResponse } from "@/types/list-courses";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";

/* utils --------------------------------------------------- */
const toKey = (v?: string) =>
  (v || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const ALLOWED = new Set([
  "pos-graduacao",
  "graduacao",
  "segunda-graduacao",
  "disciplina-isolada",
]);

// tenta descobrir a modalidade do curso a partir de campos comuns
const getCourseModalityKey = (course: any): string => {
  const candidates = [
    course?.modality,
    course?.modalityName,
    course?.modality_name,
    course?.type,
    course?.category,
    course?.group,
    course?.modalitySlug,
    course?.modality_slug,
  ];
  for (const c of candidates) {
    if (typeof c === "string" && c.trim()) return toKey(c);
  }
  // fallback: tenta inferir do alias/slug
  if (typeof course?.alias === "string") {
    const m = course.alias.match(
      /(pos-graduacao|graduacao|segunda-graduacao|disciplina-isolada)/i
    );
    if (m) return toKey(m[1]);
  }
  // se não achar nada, considere "pos-graduacao" para não esconder dados
  return "pos-graduacao";
};

const normalizeText = (text: string): string =>
  text.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

type Props = {
  responseCourse?: CourseResponse;
  modality?: string; 
};

export default function ListingCourse({ responseCourse, modality }: Props) {
  const router = useRouter();
  const pathname: string = usePathname();
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 10;

  const modalityKey = useMemo(() => {
    const key = toKey(modality || "pos-graduacao");
    return ALLOWED.has(key) ? key : "pos-graduacao";
  }, [modality]);

  useEffect(() => setCurrentPage(1), [modalityKey]);

  const filteredCourses = useMemo(() => {
    const data = responseCourse?.data ?? [];
    const byModality = data.filter(
      (c) => getCourseModalityKey(c) === modalityKey
    );

    if (!searchTerm.trim()) return byModality;

    const normalizedSearchTerm = normalizeText(searchTerm.trim());
    const searchRegex = new RegExp(
      normalizedSearchTerm.split(" ").join("|"),
      "i"
    );

    return byModality.filter((course: any) => {
      const normalizedName = normalizeText(course.name ?? "");
      const nameMatch = searchRegex.test(normalizedName);
      const workloadMatch = (course.workload ?? "")
        .toString()
        .includes(searchTerm.trim());
      return nameMatch || workloadMatch;
    });
  }, [responseCourse?.data, modalityKey, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / coursesPerPage));
  const startIndex = (currentPage - 1) * coursesPerPage;
  const endIndex = startIndex + coursesPerPage;
  const currentCourses = filteredCourses.slice(startIndex, endIndex);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => setCurrentPage(page);

  const isPosGraduacao = modalityKey === "pos-graduacao";
  const isDisciplinaIsolada = modalityKey === "disciplina-isolada"

  return (
    <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-6 font-poppins">
      <input
        type="search"
        placeholder="Pesquise por nome do curso ou carga horária..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="dark:bg-[#2a2a2a] bg-gray-300 p-3 rounded-lg outline-none w-full h-[55px]"
      />
      {searchTerm && (
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {filteredCourses.length} curso(s) encontrado(s)
        </p>
      )}

      {isPosGraduacao ? (
        <>
          {currentCourses.map((course: any, index: number) => (
            <div
              key={startIndex + index}
              className="bg-[#eaeaea] dark:bg-[#2a2a2a] dark:text-white rounded-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between shadow-lg"
            >
              <div className="flex-1 pr-6">
                <p className="text-sm dark:text-gray-300 font-bold mb-2">
                  {course.workload || 0} horas
                </p>
                <h4 className="font-bold text-[1.3rem] lg:text-2xl text-[#0059ff] mb-4 uppercase">
                  {course.name}
                </h4>
                <p className="dark:text-gray-300 text-base text-justify leading-relaxed max-w-2xl">
                  {course.objective ?? course.description}
                </p>
              </div>
              <div className="mt-6 md:mt-0">
                <button
                  onClick={() => router.push(`${pathname}/${course.alias}`)}
                  className="bg-gradient-to-r to-yellow-400 from-orange-500 text-black font-bold px-6 py-3 rounded-lg shadow-md hover:opacity-90 transition"
                >
                  CONHECER CURSO
                </button>
              </div>
            </div>
          ))}
        </>
      ) : isDisciplinaIsolada ? (
       <div className="grid grid-cols-1 md:grid-cols-2 gap-6 font-poppins">
  {currentCourses.map((course: any, index: number) => (
    <button
      key={course?.alias ?? index}
      /* onClick={() => router.push(`${pathname}/${course.alias}`)} */
      className="w-full text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#7c3aed]/50 rounded-xl"
      title={course.name}
    >
      <div
        className={[
          "w-full rounded-xl",
          "bg-gray-100 text-neutral-900 border border-neutral-200 hover:bg-gray-200",
          "dark:bg-neutral-900 dark:text-white dark:border-white/10 dark:hover:bg-neutral-800/70",
          "px-5 py-4 md:px-6 md:py-5 transition-colors min-h-[88px] md:min-h-[96px] flex items-center",
        ].join(" ")}
      >
        <p className="font-semibold uppercase leading-snug text-sm md:text-base line-clamp-3">
          {course.name}
        </p>
      </div>
    </button>
  ))}
</div>

      ) : (
        <div className="grid grid-cols-2 font-poppins sm:grid-cols-2 md:grid-cols-4 gap-6 items-center justify-center text-center">
          {currentCourses.map((course: any, index: number) => (
            <button
              key={index}
              onClick={() => router.push(`${pathname}/${course.alias}`)}
              className="relative group  text-center rounded-lg overflow-hidden hover:shadow-lg transition cursor-pointer"
            >
              <div className="relative w-[200px] h-[260px] lg:w-[280px] lg:h-[346px]">
                <Image
                  src={course.photo_miniature}
                  alt={course.name}
                  width={280}
                  height={350}
                  className="object-cover"
                  unoptimized
                />
                <div className="absolute inset-0 bg-gradient-to-t dark:from-black/70 dar:via-black/30 from-white/70 via-white/30 to-transparent" />
                <div className="absolute -left-3 bottom-0 lg:left-0 w-full p-3 font-krona flex flex-col items-center justify-center text-center">
                  <p className="uppercase mb-3 text-xs lg:text-base drop-shadow-md">
                    {course.name}
                  </p>
                  <span className="uppercase rounded-lg text-[10px] lg:text-base border-1 p-2 mb-3">
                    ESCOLHER CURSO
                  </span>
                </div>
              </div>
            </button>
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
            loop
            showControls
            color="primary"
            page={currentPage}
            total={totalPages}
            onChange={handlePageChange}
          />
        </div>
      )}

      {filteredCourses.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <p className="text-gray-600 dark:text-gray-400">
            Nenhum curso encontrado para "{searchTerm}"
          </p>
        </div>
      )}
    </section>
  );
}
