/**
 * Esta página pode ter duas finalidades, dependendo da modalidade.
 *
 * - Se a modalidade for "pós-graduação", serão renderizados os componentes
 *   responsáveis por exibir a lista de áreas.
 * - Para outras modalidades que não exigem listagem de áreas, a página exibirá
 *   diretamente os cursos.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */
import {detailsArea, detailsCourse} from "@/services/api";
import {notFound} from "next/navigation";
import {CourseAreaResponse} from "@/types/detailsArea";
import BannerSiteUniUnica from "@/components/banner/page";
import {BannerSite} from "@/types/banner";
import ListCoursesPosGraduacao from "@/app/@partner/[modality]/[param1]/pos-graduacao";
import DualMarquee from "@/components/dualSlider/dualSlider";
import VideoPromoSection from "@/components/videoMarket/videoMarket";
import Testimonials from "@/components/depoiments/depoiments";
import {CourseDetailResponse} from "@/types/detailsCourse";
import FaqTabs from "@/components/faq/faq";
import PageCourse from "@/template/page-courses/pageCourse";
import Jornada from "@/components/jornada/jornada";

export default async function PageParams1({params,}: {
    params: Promise<{modality: string, param1: string }>
}) {
    const {modality, param1 } = await params

    /**
     * Se a modalidade for pos-graduacao, vamos rederizar as informacoes da area,
     * para isso faço uma consulta na API do educacional para traqzer informacoes
     * dessa area que foi passada no param1
     */
    if (modality == 'pos-graduacao') {
        // Como estamos com o foco em melhoria de desempenho,
        // na página vou colocar o banner para carregar
        // de imediato, antes de chamar o componente,
        // pois esse componente vai rodar do lado do cliente,
        // o que pode atrasar um pouco o carregamento das
        // informações.
        const details: CourseAreaResponse =   await detailsArea(param1, false)
        if( details.data.length <= 0){
            notFound()
        }
        const bannerCentralizado: BannerSite = {
            configBanner: {
                col: 2,
                position: 'start',
                skeleton: false,
                titleFont: 'poppins',
                ButtonPosition: "start",
            },
            content1: {
                backgroundImage: '/fimEADdesktop.webp',
                openTitle: 'Pós-Graduação',
                title: `<b style="font-size: 5rem;">ONLINE</b>`,
                subtitle: `<sapan style="padding: 6px 17px; background: #6424b3;">Área de ${param1} <br/> </sapan> <p style=" margin-top: 10px;">Conquiste pontos e destaque-se em concursos públicos e designações com uma especialização reconhecida pelo MEC na área da Educação.</p>`,
                button: false,
                hubspot: {
                    active: true,
                    idform: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
                    title: "Você ganhou um SUPERCUPOM válido por 30 minutos!"
                }
            },
        };
        return (
            <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            <Jornada />
            <ListCoursesPosGraduacao area={param1} />
            <DualMarquee />
            <VideoPromoSection />
            <Testimonials />
            </>
        )
    }

    const course: CourseDetailResponse = await detailsCourse(param1, modality, true)


    if(!course.data){
        notFound();
    }

    const bannerCentralizado: BannerSite = {
        configBanner: {
            col: 2,
            position: 'start',
            skeleton: false,
            titleFont: 'poppins'
        },
        content1: {
            backgroundImage: '/fimEADdesktop.webp',
            openTitle: `${course.data.type}`,
            title: `<b style="font-size: 5rem;">ONLINE</b>`,
            subtitle: `<span class="p-4 font-bold bg-[#6424b3] mt-3 text-lg">Curso de ${course.data.name} <br/> </span> <p style="margin-top: 20px;">${course.data.objective}</p>`,
            button: false,
            hubspot: {
                active: true,
                idform: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
                title: "Você ganhou um SUPERCUPOM válido por 30 minutos!"
            }
        },
    };

    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            
            <PageCourse course={course} modality={modality} /> 
            <Testimonials />
            <FaqTabs modality={modality} />
        </>
    )
}


