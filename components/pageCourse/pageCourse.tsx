'use client';
import { useState, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import CountdownTimer from '@/components/countdownTimer/countdownTImer';
import { FaRegClock } from "react-icons/fa";
import { PiCertificateBold } from "react-icons/pi";
import Image from 'next/image';
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const requisitos = [
    {
        title: 'Pré-requisito',
        desc:
            'Graduação em qualquer área para nível de conhecimento. Em casos de atuação na área e registro no conselho profissional, a formação deverá ser específica.',
        icon: <PiCertificateBold />,
    },
    {
        title: '720 horas',
        desc:
            'De carga horária que contempla videoaulas inovadoras e materiais didáticos exclusivos.',
        icon: <FaRegClock />,
    },
];

const modulosData = [
    {
        titulo: 'Fundamentos da Psicologia Jurídica',
        horas: 80,
        conteudo:
            'Conceitos, histórico, áreas de atuação, perícias psicológicas e mediação de conflitos.',
    },
    {
        titulo:
            'Psicologia Jurídica nas Varas da Infância, Juventude e Idoso',
        horas: 80,
        conteudo:
            'Medidas protetivas, escuta especializada, rede de proteção e políticas públicas.',
    },
    {
        titulo:
            'Neuropsicologia: Infância e Adolescência',
        horas: 80,
        conteudo:
            'Desenvolvimento, funções executivas, avaliação e intervenções baseadas em evidências.',
    },
    {
        titulo:
            'Transtornos Psiquiátricos na Criança e no Adolescente',
        horas: 80,
        conteudo:
            'Classificações, sinais e sintomas, condução ética e articulação multiprofissional.',
    },
    {
        titulo:
            'A Neurociência e os Sentidos na Infância e na Adolescência',
        horas: 80,
        conteudo:
            'Mecanismos sensoriais, plasticidade neural e implicações educacionais/clinicas.',
    },
];

type Item = {
    img: string;
    alt: string;
    title: string;
    videoUrl?: string;
};

const items: Item[] = [
    {
        img: '/metodologia/metodologia-1.webp',
        alt: 'Guiado pelos melhores!',
        title: 'Quem vai te ajudar nessa jornada',
    },
    {
        img: '/metodologia/metodologia-2.webp',
        alt: 'Aqui, sua vida não para por causa da Pós',
        title: 'Estude de qualquer lugar a qualquer hora',
    },
    {
        img: '/metodologia/metodologia-3.webp',
        alt: 'Extrapole as fronteiras da faculdade',
        title: 'Como funciona a Pós-Graduação',
    },
    {
        img: '/metodologia/metodologia-4.webp',
        alt: 'O mercado não espera',
        title: 'Estude em uma faculdade com 27 anos de tradição',
    },
    {
        img: '/metodologia/metodologia-5.webp',
        alt: 'Tradição e inovação',
        title: 'Saiba onde você vai estudar',
    },
];

function getStableRandom(min: number, max: number, key = 'default', ttlMs = 24 * 60 * 60 * 1000) {
    if (typeof window === 'undefined') {
        return min;
    }

    const storageKey = `rand:${key}:${min}-${max}`;
    try {
        const raw = localStorage.getItem(storageKey);
        if (raw) {
            const saved = JSON.parse(raw) as { v: number; exp: number };
            if (saved && Date.now() < saved.exp) {
                return saved.v;
            }
        }
    } catch { }

    const v = min + Math.floor(Math.random() * (max - min + 1));
    try {
        localStorage.setItem(storageKey, JSON.stringify({ v, exp: Date.now() + ttlMs }));
    } catch { }
    return v;
}

function useStableRandom(min: number, max: number, key = 'default', ttlMs = 24 * 60 * 60 * 1000) {
    const [value, setValue] = useState<number>(min);
    useEffect(() => {
        setValue(getStableRandom(min, max, key, ttlMs));
    }, [min, max, key, ttlMs]);
    return value;
}



export default function PageCourse() {
    const [open, setOpen] = useState<number | null>(null);


    const courseKey = 'curso-psicologia-juridica';
    const compradoresHoje = useStableRandom(50, 129, `${courseKey}:compras`);

    return (
        <>
            <section className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-10">
                <h2 className="text-3xl sm:text-4xl font-krona font-bold text-center mb-10">
                    Programa de Curso
                </h2>
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <div className="lg:col-span-8 space-y-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {requisitos.map((r, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-[#6424b3] bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(117,0,255,0.35)] transition"
                                >
                                    <div className="h-12 w-12 grid place-items-center rounded-lg bg-[#7500FF]/15 text-[#a875ff] text-xl mb-4">
                                        <span aria-hidden>{r.icon}</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">{r.title}</h3>
                                    <p className="text-sm leading-relaxed">{r.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div>
                            <h3 className="text-2xl sm:text-[28px] text-center font-krona font-extrabold mb-6">
                                Módulos de Aprendizagem:
                            </h3>

                            <div className="space-y-5">
                                {modulosData.map((m, idx) => {
                                    const isOpen = open === idx;
                                    return (
                                        <div key={idx} className="group">
                                            <div className="flex items-stretch gap-4">
                                                <button
                                                    onClick={() => setOpen(isOpen ? null : idx)}
                                                    className="flex-1 rounded-xl border light:border-black/10 light:bg-black/10 dark:border-white/10 dark:bg-white/5 px-4 sm:px-6 py-4 text-left hover:border-[#8f33ff]/50 transition relative"
                                                >
                                                    <div className="flex items-center justify-between gap-4">
                                                        <p className="text-sm sm:text-base">
                                                            {m.titulo}
                                                            <span> — </span>
                                                            <span className="font-semibold">{m.horas} horas</span>
                                                        </p>

                                                        <ChevronDown
                                                            className={`shrink-0 h-5 w-5 transition-transform ${isOpen ? 'rotate-180' : ''
                                                                }`}
                                                        />
                                                    </div>
                                                    <div
                                                        className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                                                            }`}
                                                    >
                                                        <div className="overflow-hidden">
                                                            <p className="mt-3 text-sm  leading-relaxed">
                                                                {m.conteudo}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="absolute left-0 right-0 -bottom-px h-px bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        <h4 className="text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10">
                            Metodologia que te conduz ao próximo nível da carreira!
                        </h4>
                        <div className="relative">
                            <span className="pointer-events-none absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[2px] bg-black/20 dark:bg-neutral-800 z-0" />
                            <div className="flex flex-col gap-10">
                                {items.map((it, idx) => {
                                    const left = idx % 2 === 0;
                                    return (
                                        <div
                                            key={idx}
                                            className="relative grid grid-cols-1 md:grid-cols-2"
                                        >
                                            <span
                                                className={[
                                                    'absolute hidden lg:flex top-1/2 -translate-y-1/2 h-4 w-4 rounded-full bg-[#7a2cff] shadow-[0_0_0_4px_rgba(122,44,255,0.25)] z-10',
                                                    left
                                                        ? 'left-[calc(50%-20px)]'
                                                        : 'left-[calc(50%+5px)]',
                                                ].join(' ')}
                                            />
                                            <div
                                                className={[
                                                    'py-2',
                                                    left ? 'order-1 md:pr-6' : 'order-2 md:col-start-2 md:pl-6',
                                                ].join(' ')}
                                            >
                                                <div className="flex items-center gap-4 rounded-xl border light:border-black/20 light:bg-black/20 dark:border-white/10 dark:bg-white/5 backdrop-blur-sm p-4 transition hover:border-[#7a2cff]/50">
                                                    <div className="relative w-[157px] h-[209px] shrink-0 overflow-hidden rounded-lg">
                                                        <Image
                                                            src={it.img}
                                                            alt={it.alt}
                                                            fill
                                                            className="object-cover"
                                                            sizes="157px"
                                                            priority={idx === 0}
                                                        />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <h2 className="text-base sm:text-lg font-semibold leading-snug">
                                                            {it.title}
                                                        </h2>
                                                        <button
                                                            type="button"
                                                            className="mt-3 inline-flex items-center justify-center rounded-md bg-[#7a2cff] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 active:translate-y-px"
                                                        >
                                                            Ver vídeo
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                            <div
                                                className={[
                                                    left ? 'order-2 md:col-start-2' : 'order-1',
                                                    'hidden md:block',
                                                ].join(' ')}
                                            />
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                        <h5 className='text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10'>Com uma Pós, você sai na frente no mercado</h5>
                        <Image
                            src="/graficos/grafico-pos.webp"
                            alt='com uma pós, você sai na frente no mercado'
                            width={780}
                            height={620}
                        />

                    </div>

                    <aside className="lg:col-span-4">
                        <div className="sticky top-6">
                            <div className="rounded-2xl overflow-hidden border border-white/10 bg-white/5 shadow-xl">

                                <div className="bg-gradient-to-r from-[#7a2cff] to-[#b18bff] text-white px-6 py-4 font-semibold flex items-center gap-2">
                                    <span><FaRegClock /></span>
                                    <span>
                                        Acaba em: <CountdownTimer durationMs={24 * 60 * 60 * 1000} className="font-bold" />

                                    </span>
                                </div>

                                <div className="px-6 py-7 font-poppins">
                                    <p className="text-center tracking-wide text-3xl">
                                        BOLSAS DE ATÉ
                                    </p>
                                    <p className="text-center text-[85px] leading-none font-extrabold my-2">
                                        50%
                                    </p>
                                    <p className="text-center  text-black font-bold bg-yellow-400 text-lg tracking-widest">
                                        ÚLTIMAS TURMAS EAD
                                    </p>

                                    <button className="mt-6 w-full rounded-xl py-3 text-black font-bold shadow-[0_10px_30px_rgba(255,179,0,0.35)] bg-gradient-to-r from-[#FFB800] via-[#FF9A00] to-[#FF6A00] hover:brightness-110 transition">
                                        MATRICULAR AGORA
                                    </button>

                                    <div className="mt-6 text-center text-[13px]">
                                        <span className="text-green-400 font-semibold">{compradoresHoje}</span>{' '}
                                        <span>
                                            pessoas já compraram esse curso hoje
                                        </span>
                                    </div>

                                    <p className="mt-8 text-center text-xs">
                                        *Consulte condições
                                    </p>
                                </div>
                            </div>
                        </div>
                    </aside>
                </div>
                <div className="">
                    <h2 className="text-3xl text-center mt-10 font-bold mb-6 font-krona">
                        Os alunos de{" "}
                        <span className="uppercase">NOME DO CURSO</span>{" "}
                        avaliaram esse curso em:
                    </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 items-center gap-10">
                    <div className="text-end md:text-left flex flex-col items-center">
                        <p className="text-9xl leading-none font-extrabold text-[#0066ff]">
                            4.5
                        </p>
                        <div className="flex items-center justify-center md:justify-start gap-1 text-yellow-400 text-5xl my-4">
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStar />
                            <FaStarHalfAlt />
                        </div>
                        <p className="text-lg">
                            20.000 alunos avaliaram esse curso
                        </p>
                    </div>
                    <div className="relative flex justify-start">
                        <Image
                            src="/aluna-feliz-certificado.webp"
                            alt="Aluna feliz com certificado"
                            width={400}
                            height={400}
                            className="relative z-10 object-contain"
                        />
                    </div>
                </div>
            </section>
        </>
    );
}
