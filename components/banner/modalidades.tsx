import {poppins} from "@/config/fonts";
import {Button} from "@heroui/button";

interface Modality {
    title: string;
    href: string;
    image: string;
}
const modalities: Modality[] = [
    {
        title: 'GRADUAÇÃO',
        href: '/graduacao/escolha',
        image: '/capa-modalidade/capa-graduacao.webp'
    },
    {
        title: 'PÓS ONLINE',
        href: '/pos-graduacao',
        image: '/capa-modalidade/capaPos.webp'
    },
    {
        title: 'SEGUNDA GRADUAÇÃO',
        href: '/segunda-graduacao',
        image: '/capa-modalidade/capaSegundaGraduacao.webp'
    },
    {
        title: 'DISCIPLINAS ISOLADAS',
        href: '/disciplina-isolada',
        image: '/capa-modalidade/capaDisciplinasIsoladas.webp'
    }
];

function ModalityCard({ title, href, image }: Modality) {
    return (
        <div
            className="relative shadow-md  text-center min-h-[50vh] lg:min-h-[100vh] "
            style={{
                backgroundImage: `url(${image})`,
                backgroundPosition: 'top center',
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat'
            }}
        >
            <div className={'absolute bottom-0 inset-0 bg-black/40'}>
                <h1 className={`text-xl font-bold mb-4 text-white drop-shadow-md absolute bottom-20 w-full ${poppins.className}`}>{title}</h1>
                <a href={href} className={'absolute bottom-10 w-full left-0'}>
                    <Button
                        size={'md'}
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
        <section className="relative">
            <div className="mx-auto grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4">
                {modalities.map((modality, index) => (
                    <ModalityCard key={index} {...modality} />
                ))}
            </div>
        </section>
    );
}
