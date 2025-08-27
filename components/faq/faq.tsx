"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft } from "lucide-react";

type FaqItem = { q: string; a: string };
type FaqCategory = { title: string; items: FaqItem[] };

type Props = {
    modality?: string;
};

const FAQ_BANK: Record<string, FaqCategory[]> = {
    "pos-graduacao": [
        {
            title: "Pós Única",
            items: [
                { q: "Qual a melhor Pós-Graduação EaD?", a: "A melhor é a que alinha grade, reconhecimento do MEC, flexibilidade e suporte. A Uniúnica atende a esses pilares com tutoria ativa e avaliações on-line." },
                { q: "Onde fazer Pós-Graduação EaD?", a: "100% on-line na plataforma Uniúnica, com certificado válido em todo o Brasil." },
                { q: "O que é Pós-Graduação lato sensu?", a: "Especialização focada no mercado, com carga mínima de 360h e ênfase prática." },
            ],
        },
        {
            title: "Metodologia",
            items: [
                { q: "Como funcionam as aulas?", a: "Aulas gravadas, trilhas de estudo e atividades práticas. Você assiste quando quiser." },
                { q: "Tem prova?", a: "Sim, avaliações on-line por módulo, com possibilidade de recuperação." },
                { q: "Há TCC?", a: "Quando exigido pelo curso, orientado por professor especialista." },
            ],
        },
        {
            title: "Mercado",
            items: [
                { q: "O diploma é reconhecido?", a: "Emitido por Centro Universitário credenciado, com validade nacional." },
                { q: "Há apoio de carreira?", a: "Trilhas de empregabilidade, revisão de CV e indicações de vagas." },
                { q: "Em quanto tempo concluo?", a: "De 6 a 12 meses, conforme a trilha e seu ritmo." },
            ],
        },
    ],

    /* GRADUAÇÃO */
    graduacao: [
        {
            title: "Sobre o Curso",
            items: [
                { q: "Qual a duração?", a: "De 2 a 4 anos, variando por área." },
                { q: "As aulas são ao vivo?", a: "Conteúdo on-demand, com encontros síncronos opcionais." },
            ],
        },
        {
            title: "Matrícula",
            items: [
                { q: "Quais documentos preciso?", a: "RG, CPF, comprovante de escolaridade e residência (digitalizados)." },
                { q: "Posso aproveitar disciplinas?", a: "Sim, mediante análise de equivalência curricular." },
            ],
        },
        {
            title: "Financeiro",
            items: [
                { q: "Tem bolsa?", a: "Programas de bolsa, convênios e descontos por pontualidade." },
                { q: "Formas de pagamento?", a: "Boleto, cartão e PIX recorrente." },
            ],
        },
    ],

    "segunda-graduacao": [
        {
            title: "Acesso e Dispensas",
            items: [
                { q: "Tenho dispensas?", a: "Sim, análise de histórico pode conceder dispensas e reduzir o tempo." },
                { q: "Quais pré-requisitos?", a: "Diploma ou histórico de graduação anterior, além dos documentos pessoais." },
            ],
        },
        {
            title: "Tempo e Custos",
            items: [
                { q: "Dá para concluir mais rápido?", a: "Sim, com aproveitamento de estudos e trilha acelerada." },
                { q: "Como funciona o pagamento?", a: "Mensalidades com descontos e opções de parcelamento." },
            ],
        },
        {
            title: "Carreira",
            items: [
                { q: "Vantagens no mercado?", a: "Amplia atuação e empregabilidade, com certificação reconhecida." },
                { q: "Apoio de carreira?", a: "Mentorias, revisão de CV e comunidade de vagas." },
            ],
        },
    ],

    "disciplina-isolada": [
        {
            title: "Sobre",
            items: [
                { q: "O que é disciplina isolada?", a: "Você cursa uma ou mais disciplinas avulsas sem ingressar no curso completo." },
                { q: "Serve para quê?", a: "Atualização rápida, teste de área ou complementação de carga horária." },
            ],
        },
        {
            title: "Matrícula e Acesso",
            items: [
                { q: "Como faço matrícula?", a: "Selecione a disciplina disponível e envie os documentos básicos pelo portal." },
                { q: "Quando começo?", a: "O acesso é liberado após confirmação da matrícula/pagamento." },
            ],
        },
        {
            title: "Certificação",
            items: [
                { q: "Recebo certificado?", a: "Sim, certificado de conclusão da disciplina com a carga horária cursada." },
                { q: "Vale como horas complementares?", a: "Sim, conforme regulamento da sua instituição/órgão." },
            ],
        },
    ],
};

const DEFAULT_CATEGORIES: FaqCategory[] = FAQ_BANK["pos-graduacao"];

function toKey(modality?: string) {
    return (modality || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
}


export default function FaqTabs({ modality }: Props) {
    const key = toKey(modality);
    const categories = useMemo(() => FAQ_BANK[key] ?? DEFAULT_CATEGORIES, [key]);

    const [active, setActive] = useState(0);

    useEffect(() => setActive(0), [key]);

    const total = categories.length;
    const pct = useMemo(
        () => (total <= 1 ? 100 : (active / (total - 1)) * 100),
        [active, total]
    );

    return (
        <section className="w-full   py-10 font-poppins">
            <div className="mx-auto max-w-7xl px-6">
                <h2 className="text-xl text-center lg:text-start lg:text-3xl font-bold font-krona mb-6">Perguntas Frequentes</h2>

                <div className="relative">
                    <div className="flex items-center gap-4 mb-3">
                        {categories.map((t, i) => (
                            <button
                                key={`${key}-${t.title}`}
                                onClick={() => setActive(i)}
                                className={`flex-1 text-center py-2 text-lg transition-colors duration-200
                           ${i === active ? "text-[#7c3aed] font-semibold" : "cursor-pointer"}`}
                            >
                                {t.title}
                            </button>
                        ))}
                    </div>
                    
                    <div className="relative h-[3px] w-full bg-neutral-700/60 rounded-full overflow-hidden">
                        <div
                            className="absolute top-0 left-0 h-full bg-[#7c3aed] will-change-transform
               transition-transform duration-500 ease-out"
                            style={{
                                width: `${100 / Math.max(total, 1)}%`,
                                transform: `translateX(${active * (300 / Math.max(total, 1))}%)`,
                            }}
                        />
                    </div>

                </div>

                <div className="mt-10 space-y-6">
                    {categories[active].items.map((item, idx) => (
                        <FaqRow key={`${key}-${active}-${idx}`} item={item} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function FaqRow({ item }: { item: FaqItem }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="group border-b border-neutral-800/80 pb-4 font-poppins">
            <div className="flex items-start gap-4">
                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-expanded={open}
                    className="flex-1 text-left text-lg leading-snug  transition-colors"
                >
                    {item.q}
                </button>

                <button
                    onClick={() => setOpen((v) => !v)}
                    aria-label={open ? "Recolher" : "Expandir"}
                    className="shrink-0 grid place-items-center h-8 w-8 border border-white/80 hover:border-white transition-colors"
                >
                    <ChevronLeft
                        className={`h-4 w-4 transition-transform duration-300 ${open ? "-rotate-90" : "rotate-180"}`}
                    />
                </button>
            </div>

            <div
                className={`overflow-hidden transition-all duration-400 ease-out
                    ${open ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
            >
                <p className=" leading-relaxed">{item.a}</p>
            </div>
        </div>
    );
}
