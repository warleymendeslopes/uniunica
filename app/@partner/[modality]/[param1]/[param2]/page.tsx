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
import {detailsArea, detailsCourse} from "@/services/api"
import { BannerSite } from "@/types/banner"
import { CourseAreaResponse } from "@/types/detailsArea"
import { notFound } from "next/navigation"
import {CourseDetailResponse} from "@/types/detailsCourse";

export default async function PageParams2({params,}: {
    params: Promise<{ modality: string, param1: string, param2: string }>
}) {
    const {modality, param1, param2 } = await params
        if (modality == 'pos-graduacao') {
            const course: CourseDetailResponse = await detailsCourse(param2, modality)
            const details: CourseAreaResponse = await detailsArea(param1, false)
            if(!course || !course.data || details.data.length <= 0){
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
                    subtitle: `<sapan class="p-4 font-bold bg-[#6424b3] text-lg">Curso de ${course.data.name} <br/> </sapan> <p style=" margin-top: 10px;">${course.data.objective}</p>`,
                    button: true,
                    buttonText: 'INSCREVA-SE ANTES QUE ACABE',
                },
            };

            return (
                <>
                   <BannerSiteUniUnica {...bannerCentralizado} />
                    <PageCourse course={course} />
                </>
            )
        }
}