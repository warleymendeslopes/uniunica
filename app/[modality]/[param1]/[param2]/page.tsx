/**
 * Esta página possui duas finalidades:
 *
 * - Pode ser utilizada como página de listagem de cursos para a modalidade "pós-graduação" e "graduação".
 * - Pode ser utilizada como página de curso individual para as demais modalidades.
 *
 * O comportamento é definido com base no valor de `params.modality`.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */

import BannerSiteUniUnica from "@/components/banner/page"
import Testimonials from "@/components/depoiments/depoiments"
import { detailsArea, detailsCourse } from "@/services/api"
import { BannerSite } from "@/types/banner"
import { CourseAreaResponse } from "@/types/detailsArea"
import { notFound } from "next/navigation"
import { CourseDetailResponse } from "@/types/detailsCourse";
import FaqTabs from "@/components/faq/faq"
import PageCourse from "@/template/page-courses/pageCourse";
import Jornada from "@/components/jornada/jornada"

export default async function PageParams2({ params, }: {
    params: Promise<{ modality: string, param1: string, param2: string }>
}) {

    const { modality, param1, param2 } = await params



    if (modality == 'pos-graduacao') {
        const course: CourseDetailResponse = await detailsCourse(param2, modality)
        const details: CourseAreaResponse = await detailsArea(param1, false)
        if (!course || !course.data || details.data.length <= 0) {
            notFound()
        }
        const bannerCentralizado: BannerSite = {
            configBanner: {
                col: 2,
                position: 'start',
                skeleton: false,
                titleFont: 'poppins',
                ButtonPosition: 'start',
            },
            content1: {
                backgroundImage: '/fimEADdesktop.webp',
                openTitle: 'Pós-Graduação',
                title: `<b style="font-size: 5rem;">ONLINE</b>`,
                subtitle: `<span class="font-bold  mt-3 text-lg">Curso de ${course.data.name} <br/> </span> <p style="margin-top: 20px;">${course.data.objective}</p>`,
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
                <PageCourse course={course} modality={modality} />
                <Testimonials />
                <FaqTabs modality={modality} />
            </>
        )
    }


    if (modality == 'graduacao' && param1 == 'ead' || 'presencial') {

        const curses: CourseDetailResponse = await detailsCourse(param2, modality, true)

        if (!curses || !curses.data) {
            notFound()
        }



        const bannerCentralizado: BannerSite = {
            configBanner: {
                col: 2,
                position: 'start',
                skeleton: false,
                titleFont: 'poppins',
                ButtonPosition: 'start',
            },
            content1: {
                backgroundImage: '/fimEADdesktop.webp',
                openTitle: `Graduação`,
                title: `<b style="font-size: 5rem; text-transform: uppercase;">${param1}</b>`,
                subtitle: `<span class="font-bold  mt-3 text-lg">Curso de ${curses.data.name}<br/> </span> <p style="margin-top: 20px;">${curses.data.objective}</p>`,
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
                <PageCourse course={curses} modality={modality} />
                <Testimonials />
                <FaqTabs modality={modality} />
            </>
        )
    }
}