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
import {detailsArea} from "@/services/api";
import {notFound} from "next/navigation";
import {CourseAreaResponse} from "@/types/detailsArea";
import BannerSiteUniUnica from "@/components/banner/page";
import {BannerSite} from "@/types/banner";
import PageCourse from "@/components/pageCourse/pageCourse";

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
      const details: CourseAreaResponse =   await detailsArea(param1, false)
        if(details.data.length <= 0){
            notFound()
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
                openTitle: 'Pós-Graduação',
                title: `<b style="font-size: 5rem;">ONLINE</b>`,
                subtitle: `<sapan style="padding: 6px 17px; background: #8f33ff;">Área de ${param1} <br/> </sapan> <p style=" margin-top: 10px;">Conquiste pontos e destaque-se em concursos públicos e designações com uma especialização reconhecida pelo MEC na área da Educação.</p>`,
                button: true,
                buttonText: 'INSCREVA-SE ANTES QUE ACABE',
            },
        };

        return (
            <>
                <BannerSiteUniUnica {...bannerCentralizado} />
                <PageCourse />
                Vamos exibir a pagina de area de posgraduacao
            </>
        )
    }


    return (
        <>
            pagina de modality; {modality} <br />
            Página de param1: {param1}
        </>
    )
}


