/**
 * Esta página possui duas finalidades:
 *
 * - Pode ser utilizada como página de listagem de cursos para a modalidade "pós-graduação".
 * - Pode ser utilizada como página de curso individual para as demais modalidades.
 *
 * O comportamento é definido com base no valor de `params.modality`.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */

import BannerSiteUniUnica from "@/components/banner/page"
import PageCourse from "@/components/pageCourse/pageCourse"
import { detailsArea } from "@/services/api"
import { BannerSite } from "@/types/banner"
import { CourseAreaResponse } from "@/types/detailsArea"
import { notFound } from "next/navigation"

export default async function PageParams2({params,}: {
    params: Promise<{ modality: string, param1: string, param2: string }>
}) {
    const {modality, param1, param2 } = await params
   
    
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
                    titleFont: 'poppins'
                },
                content1: {
                    backgroundImage: '/fimEADdesktop.webp',
                    openTitle: 'Pós-Graduação',
                    title: `<b style="font-size: 5rem;">ONLINE</b>`,
                    subtitle: `<sapan style="padding: 6px 17px; background: #6424b3;">Curso de ${param2} <br/> </sapan> <p style=" margin-top: 10px;">Conquiste pontos e destaque-se em concursos públicos e designações com uma especialização reconhecida pelo MEC na área da Educação.</p>`,
                    button: true,
                    buttonText: 'INSCREVA-SE ANTES QUE ACABE',
                },
            };

    return (
        <>
           <BannerSiteUniUnica {...bannerCentralizado} />
           {/*  pagina de modality: {modality} <br/>
            Página de Param1: {param1}<br/>
            Página de Param2: {param2} */}
            <PageCourse />
        </>
    )
}}