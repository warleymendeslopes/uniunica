"use client";
import { useState, useEffect, lazy, Suspense } from "react";
import { FaRegClock, FaStar, FaStarHalfAlt } from "react-icons/fa";
import Image from "next/image";
import { CourseDetailResponse } from "@/types/detailsCourse";
import Curriculum from "@/components/curriculum/curriculum";
import CourseProgram from "../course program /courseProgram";
import TimeLine from "../timeLIne/timeLine";
import { Item } from "@/types/timeLine";
import CountdownTimer from "../countdownTimer/countdownTImer";
import { VerifyModality, PaginacaoCurso } from "@/types/pageCourse";

const titles: Record<VerifyModality, string> = {
  "pos-graduacao": "Com uma Pós, você sai na frente no mercado",
  "graduacao": "Profissionais graduados ganham salários 144% maiores",
  "segunda-graduacao": "Faça uma transição de carreira ou saia na frente em concursos e designações",
  "disciplina-isolada": "Com Disciplina Isolada, você acelera sua evolução",
};

const graficos: Record<VerifyModality, { src: string; alt: string }> = {
  "pos-graduacao": {
    src: "/graficos/grafico-pos.webp",
    alt: "Gráfico mostrando vantagens de ter uma pós-graduação no mercado de trabalho",
  },
  "graduacao": {
    src: "/graficos/graficoG.webp",
    alt: "Gráfico mostrando vantagens de ter uma graduação no mercado de trabalho",
  },
  "segunda-graduacao": {
    src: "/graficos/graficoSG.webp",
    alt: "Gráfico mostrando vantagens de ter uma segunda graduação no mercado de trabalho",
  },
  "disciplina-isolada": {
    src: "/graficos/grafico-disciplina.webp",
    alt: "Gráfico mostrando progresso com disciplina isolada",
  },
};

const items: Item[] = [
  { img: "/metodologia/metodologia-1.webp", alt: "Guiado pelos melhores!", title: "Quem vai te ajudar nessa jornada" },
  { img: "/metodologia/metodologia-2.webp", alt: "Flexível", title: "Estude de qualquer lugar a qualquer hora" },
  { img: "/metodologia/metodologia-3.webp", alt: "Como funciona", title: "Como funciona a Pós-Graduação" },
  { img: "/metodologia/metodologia-4.webp", alt: "Tradição", title: "Estude em uma faculdade com 27 anos de tradição" },
  { img: "/metodologia/metodologia-5.webp", alt: "Onde estudar", title: "Saiba onde você vai estudar" },
];



export default function PageCourse({ course, modality }: PaginacaoCurso) {
  const [compradoresHoje, setCompradoresHoje] = useState<number>(0);

  useEffect(() => {
    setCompradoresHoje(Math.floor(Math.random() * (129 - 50 + 1)) + 50);
  }, []);

  return (
    <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-krona font-bold text-left">Programa de Curso</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-10">
          <CourseProgram course={course} />
          <Curriculum disciplines={course.data.disciplines} modality={modality} />

          {modality === "pos-graduacao" && <TimeLine items={items} />}

          {modality && (
            <section aria-labelledby="mercado-title">
              <h2
                id="mercado-title"
                className="text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10"
              >
                {titles[modality]}
              </h2>
              <Image
                src={graficos[modality].src}
                alt={graficos[modality].alt}
                width={780}
                height={620}
                className="w-full h-auto"
                loading="lazy"
              />
            </section>
          )}
        </div>

        <aside className="lg:col-span-4" aria-label="Informações de matrícula">
          <div className="sticky top-6">
            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl">
              <div className="bg-gradient-to-r from-[#7a2cff] to-[#b18bff] text-white px-6 py-4 font-semibold flex items-center gap-2">
                <FaRegClock aria-hidden="true" />
                <span>
                  Acaba em:
                  <Suspense fallback={<span className="font-bold">Carregando...</span>}>
                    <CountdownTimer durationMs={24 * 60 * 60 * 1000} className="font-bold" />
                  </Suspense>
                </span>
              </div>
              <div className="px-6 py-7 font-poppins">
                <p className="text-center tracking-wide text-3xl">BOLSAS DE ATÉ</p>
                <p className="text-center text-[85px] leading-none font-extrabold my-2">50%</p>
                <p className="text-center text-black font-bold bg-yellow-400 text-lg tracking-widest">
                  ÚLTIMAS TURMAS EAD
                </p>
                <button
                  className="mt-6 w-full rounded-xl py-3 text-black font-bold shadow-[0_10px_30px_rgba(255,179,0,0.35)] bg-gradient-to-r from-[#FFB800] via-[#FF9A00] to-[#FF6A00] hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9A00]/50"
                  aria-label="Matricular agora"
                >
                  MATRICULAR AGORA
                </button>
                <div className="mt-6 text-center text-[13px]">
                  <span className="text-green-400 font-semibold" aria-label={`${compradoresHoje} pessoas`}>
                    {compradoresHoje}
                  </span>{" "}
                  <span>pessoas já compraram esse curso hoje</span>
                </div>
                <p className="mt-8 text-center text-xs">*Consulte condições</p>
              </div>
            </div>
          </div>
        </aside>
      </div>

      {modality === "pos-graduacao" && (
        <section aria-labelledby="avaliacoes-title" className="mt-10">
          <h2 id="avaliacoes-title" className="text-3xl text-center font-bold mb-6 text-white">
            Os alunos de <span className="uppercase">{course?.data?.name ?? "este curso"}</span> avaliaram esse curso em:
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
            <div className="text-end md:text-left flex flex-col items-center">
              <p className="text-9xl leading-none font-extrabold text-[#0066ff]" aria-label="Nota 4.5 de 5">
                4.5
              </p>
              <div
                className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 text-5xl my-4"
                role="img"
                aria-label="4.5 estrelas de 5"
              >
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStar />
                <FaStarHalfAlt />
              </div>
              <p className="text-lg text-white/80">20.000 alunos avaliaram esse curso</p>
            </div>
            <div className="relative flex justify-start">
              <Image
                src="/aluna-feliz-certificado.webp"
                alt="Aluna feliz segurando certificado de conclusão"
                width={400}
                height={400}
                className="relative z-10 object-contain"
                loading="lazy"
              />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
