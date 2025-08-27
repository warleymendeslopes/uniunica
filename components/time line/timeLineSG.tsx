"use client";

import Image from "next/image";

type Item = { title: string; text: string; image: string; alt?: string };
type Props = {
  modality?: string;           // <- nova (opcional)
  heading?: string;            // se quiser forçar um título custom
  items?: Item[];              // se quiser forçar cards custom
};

/* utils */
const toKey = (v?: string) =>
  (v || "")
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

const BANK: Record<
  "segunda-graduacao" | "disciplina-isolada" | "graduacao",
  { heading: string; items: Item[] }
> = {
  "segunda-graduacao": {
    heading: "Com uma Segunda Graduação, você sai na frente no mercado",
    items: [
      {
        title: "Formação em tempo recorde",
        text:
          "Já pensou em conquistar um novo diploma em tempo recorde? A Segunda Graduação da Uniúnica oferece ensino de qualidade, nota máxima no MEC e novas oportunidades, no menor tempo possível.",
        image: "/capa-video/timeLineSG/segundagraduacao1.webp",
      },
      {
        title: "Ampliar oportunidades ou mudar de carreira?",
        text:
          "Acelere concursos, processos seletivos e designações. Ideal também para transição de carreira e atuação em uma nova área rapidamente.",
        image: "/capa-video/timeLineSG/segundagraduacao2.webp",
      },
      {
        title: "Segunda Graduação + Especialização",
        text:
          "Nesta megaoferta você ganha um curso de Pós e se prepara ainda mais. Segundo o IBGE, especialistas recebem até 225% a mais.",
        image: "/capa-video/timeLineSG/segundagraduacao3.webp",
      },
      {
        title: "Por que a nota máxima faz diferença?",
        text:
          "O nome da instituição pesa no currículo. Estude com quem tem nota máxima no MEC e é referência no Ensino Superior.",
        image: "/capa-video/timeLineSG/segundagraduacao4.webp",
      },
    ],
  },
  "disciplina-isolada": {
    heading: "Por que fazer uma Disciplina Isolada?",
    items: [
      {
        title: "Destrave pendências do seu curso",
        text:
          "Se o seu diploma é o que está faltando para dar o pontapé inicial na sua carreira, as Disciplinas Isoladas são a solução. Conclua aquela disciplina que está travando a sua formatura e garanta o seu ingresso no mercado de trabalho!",
       image: "/capa-video/timeLineSG/segundagraduacao1.webp",
      },
      {
        title: "Conclusão rápida",
        text:
          "Tem pressa e quer começar a sua carreira logo? Isso não é um problema! Os nossos cursos são rápidos e você consegue finalizar a disciplina que precisa em apenas 32 dias, de maneira totalmente online e no conforto do seu lar.",
       image: "/capa-video/timeLineSG/segundagraduacao2.webp"
      },
      {
        title: "Turbine sua grade curricular e seu currículo",
        text:
          "Adicionando uma disciplina que não está em seu plano de estudo, você adquire um novo conhecimento e terá mais destaque no mercado de trabalho. É a sua chance de conquistar skills que irão te fazer conquistar o emprego que tanto deseja",
      image: "/capa-video/timeLineSG/segundagraduacao3.webp"
      },
      {
        title: "Está em dúvida sobre qual carreira seguir?",
        text:
          "Com uma Disciplina Isolada você pode conhecer um pouco mais sobre a profissão antes de decidir em qual Graduação ingressar. E o melhor, caso decida seguir neste curso, você já não precisa fazer essa matéria novamente.",
       image: "/capa-video/timeLineSG/segundagraduacao4.webp"
      },
      {
        title: "Garantia de qualidade com o certificado reconhecido pelo MEC",
        text:
          "No Centro universitário uniunica você tem a certeza que está adquirindo um curso de qualidade. Somos uma instituição com nota máxima no MEC, ou seja, o seu certificado de conclusão da disciplina tem selo de qualidade comprovada.",
         image: "/capa-video/timeLineSG/segundagraduacao5.webp"
      },
    ],
  },  "graduacao": {
    heading: "Com uma Graduação, você sai na frente no mercado",
    items: [
      {
        title: "Não fique desempregado!",
        text:
          "Pesquisa da Associação Brasileira de Mantenedoras de Ensino Superior (Abmes), mostra que 69% dos graduados no ensino superior estão empregados após a colação de grau.",
       image: "/capa-video/timeLineSG/segundagraduacao1.webp",
      },
      {
        title: "Tá cansado de não conseguir pagar as contas?",
        text:
          "Junto ao destaque profissional, a Graduação também traz o reconhecimento, e isso não somos nós que estamos dizendo. Segundo a Fundação Getúlio Vargas, confirmando dados do IBGE, a Graduação traz um crescimento financeiro de 144% em relação aos profissionais que não possuem a formação.",
       image: "/capa-video/timeLineSG/segundagraduacao2.webp"
      },
      {
        title: "Por que uma faculdade de nota máxima faz a diferença?",
        text:
          "Você já deve ter se perguntado se o nome da sua faculdade pesa tanto assim no seu currículo, e a resposta é SIM! De acordo com Escolas para Executivos e Negócios, o nome da instituição influencia e, em determinados casos, é determinante na decisão dos recrutadores em uma entrevista de emprego. Por isso, estude com quem possui nota máxima no MEC e é referência no Ensino Superior.",
      image: "/capa-video/timeLineSG/segundagraduacao3.webp"
      },
      {
        title: "Conselhos profissionais",
        text:
          "Se gradue com quem possui vínculos com importantes conselhos profissionais, como: CREA, CONFEA, CREF, OAB, CFP, COREN, dentre outros e tenha a credibilidade da sua formação comprovada pelos maiores órgãos regulamentadores de atuação profissional do país.",
       image: "/capa-video/timeLineSG/segundagraduacao4.webp"
      },
    ],
  },
};

/* ----- COMPONENTE ----- */
export default function TimeLineSG({ modality, heading, items }: Props) {
  // padrão: segunda-graduação (ajuste se preferir outro fallback)
  const key =
    (["segunda-graduacao", "graduacao", "pos-graduacao", "disciplina-isolada"] as const).includes(
      toKey(modality) as any
    )
      ? (toKey(modality) as keyof typeof BANK)
      : "segunda-graduacao";

  const content = {
    heading: heading ?? BANK[key].heading,
    items: items ?? BANK[key].items,
  };

  return (
    <section className="w-full py-10 md:py-14">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center font-krona font-bold tracking-tight text-2xl md:text-3xl mb-8 md:mb-10">
          {content.heading}.
        </h2>

        <div className="space-y-6 md:space-y-8">
          {content.items.slice(0, 4).map((it, i) => (
            <BlueFeatureCard key={i} {...it} />
          ))}
        </div>
      </div>
    </section>
  );
}

function BlueFeatureCard({ title, text, image, alt }: Item) {
  return (
    <div
      className="
        relative overflow-hidden rounded-2xl
        shadow-[0_8px_40px_rgba(0,0,0,0.35)]
        ring-1 ring-white/10
        bg-gradient-to-r from-[#0a57ff] via-[#0c5fff] to-[#2aa4ff]
        h-[350px] font-poppins
      "
    >
      <div className="pointer-events-none absolute inset-0 opacity-60 mix-blend-screen">
        <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full blur-2xl bg-white/10" />
        <div className="absolute right-16 top-10 h-56 w-56 rounded-full blur-2xl bg-white/10" />
      </div>

      <div className="relative grid md:grid-cols-12 gap-0 h-full">
        <div className="md:col-span-8 p-6 md:p-10 lg:p-12">
          <h3 className="text-2xl md:text-3xl font-extrabold mb-4">{title}</h3>
          <p className="text-sm md:text-base leading-relaxed">{text}</p>
        </div>

        <div className="md:col-span-4 relative min-h-[180px] md:min-h-[220px]">
          <Image
            src={image}
            alt={alt ?? title}
            fill
            className="object-cover object-center"
            sizes="(min-width:1024px) 360px, (min-width:768px) 320px, 100vw"
          />
        </div>
      </div>
    </div>
  );
}
