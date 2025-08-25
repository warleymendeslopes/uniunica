"use client"
import { useState, useEffect, useMemo, lazy, Suspense } from "react"
import { ChevronDown } from "lucide-react"
import { FaRegClock } from "react-icons/fa"
import Image from "next/image"
import { FaStar, FaStarHalfAlt } from "react-icons/fa"
import {CourseDetailResponse} from "@/types/detailsCourse";
import CourseProgram from "@/components/course program /courseProgram";
import Curriculum from "@/components/curriculum/curriculum";
const CountdownTimer = lazy(() => import("@/components/countdownTimer/countdownTImer"))


const modulosData = [
    {
        titulo: "Fundamentos da Psicologia Jurídica",
        horas: 80,
        conteudo: "Conceitos, histórico, áreas de atuação, perícias psicológicas e mediação de conflitos.",
    },
    {
        titulo: "Psicologia Jurídica nas Varas da Infância, Juventude e Idoso",
        horas: 80,
        conteudo: "Medidas protetivas, escuta especializada, rede de proteção e políticas públicas.",
    },
    {
        titulo: "Neuropsicologia: Infância e Adolescência",
        horas: 80,
        conteudo: "Desenvolvimento, funções executivas, avaliação e intervenções baseadas em evidências.",
    },
    {
        titulo: "Transtornos Psiquiátricos na Criança e no Adolescente",
        horas: 80,
        conteudo: "Classificações, sinais e sintomas, condução ética e articulação multiprofissional.",
    },
    {
        titulo: "A Neurociência e os Sentidos na Infância e na Adolescência",
        horas: 80,
        conteudo: "Mecanismos sensoriais, plasticidade neural e implicações educacionais/clinicas.",
    },
]

type Item = {
    img: string
    alt: string
    title: string
    videoUrl?: string
}

const items: Item[] = [
    {
        img: "/metodologia/metodologia-1.webp",
        alt: "Guiado pelos melhores!",
        title: "Quem vai te ajudar nessa jornada",
    },
    {
        img: "/metodologia/metodologia-2.webp",
        alt: "Aqui, sua vida não para por causa da Pós",
        title: "Estude de qualquer lugar a qualquer hora",
    },
    {
        img: "/metodologia/metodologia-3.webp",
        alt: "Extrapole as fronteiras da faculdade",
        title: "Como funciona a Pós-Graduação",
    },
    {
        img: "/metodologia/metodologia-4.webp",
        alt: "O mercado não espera",
        title: "Estude em uma faculdade com 27 anos de tradição",
    },
    {
        img: "/metodologia/metodologia-5.webp",
        alt: "Tradição e inovação",
        title: "Saiba onde você vai estudar",
    },
]

const ModuloItem = ({
                        modulo,
                        index,
                        isOpen,
                        onToggle,
                    }: {
    modulo: (typeof modulosData)[0]
    index: number
    isOpen: boolean
    onToggle: () => void
}) => (
    <div className="group">
        <div className="flex items-stretch gap-4">
            <button
                onClick={onToggle}
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 sm:px-6 py-4 text-left hover:border-[#8f33ff]/50 transition-all duration-300 relative focus:outline-none focus:ring-2 focus:ring-[#8f33ff]/50"
                aria-expanded={isOpen}
                aria-controls={`modulo-content-${index}`}
                id={`modulo-button-${index}`}
            >
                <div className="flex items-center justify-between gap-4">
                    <p className="text-sm sm:text-base">
                        {modulo.titulo}
                        <span className="text-white/60"> — </span>
                        <span className="font-semibold">{modulo.horas} horas</span>
                    </p>

                    <ChevronDown
                        className={`shrink-0 h-5 w-5 text-white/70 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                        aria-hidden="true"
                    />
                </div>
                <div
                    id={`modulo-content-${index}`}
                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${
                        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                    }`}
                    aria-labelledby={`modulo-button-${index}`}
                >
                    <div className="overflow-hidden">
                        <p className="mt-3 text-sm text-white/80 leading-relaxed">{modulo.conteudo}</p>
                    </div>
                </div>
                <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </button>
        </div>
    </div>
)

export default function PageCourse({course}: {course: CourseDetailResponse}) {
    const [open, setOpen] = useState<number | null>(null)
    const [compradoresHoje, setCompradoresHoje] = useState<number>(0)

    useEffect(() => {
        const randomNumber = Math.floor(Math.random() * (129 - 50 + 1)) + 50
        setCompradoresHoje(randomNumber)
    }, [])

    const moduloItems = useMemo(
        () =>
            modulosData.map((m, idx) => (
                <ModuloItem
                    key={idx}
                    modulo={m}
                    index={idx}
                    isOpen={open === idx}
                    onToggle={() => setOpen(open === idx ? null : idx)}
                />
            )),
        [open],
    )

    return (
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
            <header className="mb-10">
                <h1 className="text-3xl sm:text-4xl font-krona font-bold text-left">Programa de Curso</h1>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                <div className="lg:col-span-8 space-y-10">
                    <CourseProgram course={course} />
                    <Curriculum disciplines={course.data.disciplines} />

                    {/*<>/!*pode ser um componenete separado *!/*/}
                    {/*    <div aria-labelledby="modulos-title">*/}
                    {/*        <h2 className="text-2xl sm:text-[28px] text-left font-krona font-extrabold mb-6">Módulos de Aprendizagem</h2>*/}
                    {/*        <div className="space-y-5" role="region" aria-label="Lista de módulos do curso">{moduloItems}</div>*/}
                    {/*    </div>*/}
                    {/*</>*/}
                    <section aria-labelledby="metodologia-title">
                        <h2 id="metodologia-title" className="text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10">
                            Metodologia que te conduz ao próximo nível da carreira!
                        </h2>

                        <div className="relative">
                          <span
                              className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-white/20 dark:bg-neutral-800 z-0"
                              aria-hidden="true"
                          />
                            <div className="flex flex-col gap-10">
                                {items.map((it, idx) => {
                                    const left = idx % 2 === 0
                                    return (
                                        <article key={idx} className="relative grid grid-cols-1 md:grid-cols-2">
                                      <span
                                          className={[
                                              "absolute hidden lg:flex top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#7a2cff] shadow-[0_0_0_4px_rgba(122,44,255,0.25)] z-10",
                                              left ? "left-[calc(50%-20px)]" : "left-[calc(50%+5px)]",
                                          ].join(" ")}
                                          aria-hidden="true"
                                      />
                                            <div className={["py-2", left ? "order-1 md:pr-6" : "order-2 md:col-start-2 md:pl-6"].join(" ")}>
                                                <div className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/5 backdrop-blur-sm p-4 transition-all duration-300 hover:border-[#7a2cff]/50">
                                                    <div className="relative w-[157px] h-[209px] shrink-0 overflow-hidden rounded-lg">
                                                        <Image
                                                            src={it.img || "/placeholder.svg"}
                                                            alt={it.alt}
                                                            fill
                                                            className="object-cover"
                                                            sizes="157px"
                                                            priority={idx === 0}
                                                            loading={idx === 0 ? "eager" : "lazy"}
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h3 className="text-base sm:text-lg font-semibold leading-snug">{it.title}</h3>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex items-center justify-center rounded-md bg-[#7a2cff] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7a2cff]/50"
                                                            aria-label={`Ver vídeo sobre ${it.title}`}
                                                        >
                                                            Ver vídeo
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className={[left ? "order-2 md:col-start-2" : "order-1", "hidden md:block"].join(" ")} />
                                        </article>
                                    )
                                })}
                            </div>
                        </div>
                    </section>

                    <section aria-labelledby="mercado-title">
                        <h2 id="mercado-title" className="text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10">
                            Com uma Pós, você sai na frente no mercado
                        </h2>
                        <Image
                            src="/graficos/grafico-pos.webp"
                            alt="Gráfico mostrando vantagens de ter uma pós-graduação no mercado de trabalho"
                            width={780}
                            height={620}
                            className="w-full h-auto"
                            loading="lazy"
                        />
                    </section>
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
                                <p className="text-center tracking-wide text-3xl text-white/90">BOLSAS DE ATÉ</p>
                                <p className="text-center text-[85px] leading-none font-extrabold my-2">50%</p>
                                <p className="text-center text-black font-bold bg-yellow-400 text-lg tracking-widest">
                                    ÚLTIMAS TURMAS EAD
                                </p>

                                <button
                                    className="mt-6 w-full rounded-xl py-3 text-black font-bold shadow-[0_10px_30px_rgba(255,179,0,0.35)] bg-gradient-to-r from-[#FFB800] via-[#FF9A00] to-[#FF6A00] hover:brightness-110 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#FF9A00]/50"
                                    aria-label="Matricular agora no curso de Psicologia Jurídica"
                                >
                                    MATRICULAR AGORA
                                </button>

                                <div className="mt-6 text-center text-[13px]">
                  <span className="text-green-400 font-semibold" aria-label={`${compradoresHoje} pessoas`}>
                    {compradoresHoje}
                  </span>{" "}
                                    <span className="text-white/80">pessoas já compraram esse curso hoje</span>
                                </div>

                                <p className="mt-8 text-center text-xs text-white/50">*Consulte condições</p>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>

            <section aria-labelledby="avaliacoes-title" className="mt-10">
                <h2 id="avaliacoes-title" className="text-3xl text-center font-bold mb-6 text-white">
                    Os alunos de <span className="uppercase">Psicologia Jurídica</span> avaliaram esse curso em:
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
                            <FaStar aria-hidden="true" />
                            <FaStar aria-hidden="true" />
                            <FaStar aria-hidden="true" />
                            <FaStar aria-hidden="true" />
                            <FaStarHalfAlt aria-hidden="true" />
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
        </main>
    )
}
