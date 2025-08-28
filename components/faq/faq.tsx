"use client";

import { useState } from "react";
import {FaqCategory, FaqItem} from "@/types/faq";
import FaqRow from "./template/faqRow";

const FAQ: Record<string, FaqCategory[]> = {
    "pos-graduacao": [
        {
            title: "Pós Única",
            items: [
                { question: "Qual a melhor Pós-Graduação EaD?", response: "A melhor é a que alinha grade, reconhecimento do MEC, flexibilidade e suporte. A Uniúnica atende a esses pilares com tutoria ativa e avaliações on-line." },
                { question: "Onde fazer Pós-Graduação EaD?", response: "100% on-line na plataforma Uniúnica, com certificado válido em todo o Brasil." },
                { question: "O que é Pós-Graduação lato sensu?", response: "Especialização focada no mercado, com carga mínima de 360h e ênfase prática." },
            ],
        },
        {
            title: "Metodologia",
            items: [
                { question: "Como funcionam as aulas?", response: "Aulas gravadas, trilhas de estudo e atividades práticas. Você assiste quando quiser." },
                { question: "Tem prova?", response: "Sim, avaliações on-line por módulo, com possibilidade de recuperação." },
                { question: "Há TCC?", response: "Quando exigido pelo curso, orientado por professor especialista." },
            ],
        },
        {
            title: "Mercado",
            items: [
                { question: "O diploma é reconhecido?", response: "Emitido por Centro Universitário credenciado, com validade nacional." },
                { question: "Há apoio de carreira?", response: "Trilhas de empregabilidade, revisão de CV e indicações de vagas." },
                { question: "Em quanto tempo concluo?", response: "De 6 a 12 meses, conforme a trilha e seu ritmo." },
            ],
        },
    ],

    /* GRADUAÇÃO */
    graduacao: [
        {
            title: "Sobre o Curso",
            items: [
                { question: "Qual a duração?", response: "De 2 a 4 anos, variando por área." },
                { question: "As aulas são ao vivo?", response: "Conteúdo on-demand, com encontros síncronos opcionais." },
            ],
        },
        {
            title: "Matrícula",
            items: [
                { question: "Quais documentos preciso?", response: "RG, CPF, comprovante de escolaridade e residência (digitalizados)." },
                { question: "Posso aproveitar disciplinas?", response: "Sim, mediante análise de equivalência curricular." },
            ],
        },
        {
            title: "Financeiro",
            items: [
                { question: "Tem bolsa?", response: "Programas de bolsa, convênios e descontos por pontualidade." },
                { question: "Formas de pagamento?", response: "Boleto, cartão e PIX recorrente." },
            ],
        },
    ],

    "segunda-graduacao": [
        {
            title: "Acesso e Dispensas",
            items: [
                { question: "Tenho dispensas?", response: "Sim, análise de histórico pode conceder dispensas e reduzir o tempo." },
                { question: "Quais pré-requisitos?", response: "Diploma ou histórico de graduação anterior, além dos documentos pessoais." },
            ],
        },
        {
            title: "Tempo e Custos",
            items: [
                { question: "Dá para concluir mais rápido?", response: "Sim, com aproveitamento de estudos e trilha acelerada." },
                { question: "Como funciona o pagamento?", response: "Mensalidades com descontos e opções de parcelamento." },
            ],
        },
        {
            title: "Carreira",
            items: [
                { question: "Vantagens no mercado?", response: "Amplia atuação e empregabilidade, com certificação reconhecida." },
                { question: "Apoio de carreira?", response: "Mentorias, revisão de CV e comunidade de vagas." },
            ],
        },
    ],

    "disciplina-isolada": [
        {
            title: "Sobre",
            items: [
                { question: "O que é disciplina isolada?", response: "Você cursa uma ou mais disciplinas avulsas sem ingressar no curso completo." },
                { question: "Serve para quê?", response: "Atualização rápida, teste de área ou complementação de carga horária." },
            ],
        },
        {
            title: "Matrícula e Acesso",
            items: [
                { question: "Como faço matrícula?", response: "Selecione a disciplina disponível e envie os documentos básicos pelo portal." },
                { question: "Quando começo?", response: "O acesso é liberado após confirmação da matrícula/pagamento." },
            ],
        },
        {
            title: "Certificação",
            items: [
                { question: "Recebo certificado?", response: "Sim, certificado de conclusão da disciplina com a carga horária cursada." },
                { question: "Vale como horas complementares?", response: "Sim, conforme regulamento da sua instituição/órgão." },
            ],
        },
    ],
};

export default function FaqTabs({ modality }: {modality: string}) {
  const categories: FaqCategory[] | undefined = modality ? FAQ[modality] : undefined;

  if (!categories) return;

  const [active, setActive] = useState(0);
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const total: number = categories.length;

  return (
    <section className="w-full py-10 font-poppins">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-xl text-center lg:text-start lg:text-3xl font-bold font-krona mb-6">
          Perguntas Frequentes
        </h2>

        <div className="relative">
          <div className="flex items-center gap-4 mb-3">
            {categories.map((faq: FaqCategory, index: number) => (
              <button
                key={index}
                onClick={() => {
                  setActive(index);
                  setOpenIndex(null);
                }}
                className={`flex-1 text-center py-2 text-lg transition-colors duration-200
                  ${index === active ? "text-[#7c3aed] font-semibold" : "cursor-pointer"}`}
              >
                {faq.title}
              </button>
            ))}
          </div>

          <div className="relative h-[3px] w-full bg-neutral-700/60 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-[#7c3aed] will-change-transform
                transition-transform duration-500 ease-out"
              style={{
                width: `${100 / Math.max(total, 1)}%`,
                transform: `translateX(${active * (300 / total)}%)`,
              }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-6">
          {categories[active].items.map((item: FaqItem, index: number) => (
            <FaqRow
              key={index}
              item={item}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}

