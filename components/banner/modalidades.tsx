import { poppins } from "@/config/fonts";
import { Button } from "@heroui/button";

interface Modality {
  title: string;
  href: string;
  image: string;
}

const modalities: Modality[] = [
  { title: "GRADUAÇÃO", href: "/graduacao/escolha", image: "/capa-modalidade/capa-graduacao.webp" },
  { title: "PÓS ONLINE", href: "/pos-graduacao", image: "/capa-modalidade/capaPos.webp" },
  { title: "SEGUNDA GRADUAÇÃO", href: "/segunda-graduacao", image: "/capa-modalidade/capaSegundaGraduacao.webp" },
  { title: "DISCIPLINAS ISOLADAS", href: "/disciplina-isolada", image: "/capa-modalidade/capaDisciplinasIsoladas.webp" },
];

function ModalityCard({ title, href, image }: Modality) {
  return (
    <div
      className="shadow-md text-center min-h-[50vh] lg:min-h-[100vh] bg-top bg-no-repeat bg-cover"
      style={{ backgroundImage: `url(${image})` }}
    >
      {/* overlay com gradiente e flex empurrando conteúdo para baixo */}
      <div className="h-full w-full flex flex-col items-center justify-end gap-4 bg-gradient-to-t from-black/60 via-black/30 to-transparent p-6 pb-12">
        <h1 className={`text-xl font-bold text-white drop-shadow-md ${poppins.className}`}>
          {title}
        </h1>

        <a href={href}>
          <Button
            size="md"
            variant="bordered"
            className="text-white border-white hover:bg-white/10 transition"
          >
            SAIBA MAIS
          </Button>
        </a>
      </div>
    </div>
  );
}

export default function ModalitySiteUniUnica() {
  return (
    <section>
      <div className="mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
        {modalities.map((modality, index) => (
          <ModalityCard key={index} {...modality} />
        ))}
      </div>
    </section>
  );
}
