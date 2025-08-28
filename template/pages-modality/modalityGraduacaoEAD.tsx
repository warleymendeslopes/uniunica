'use client'
import {BannerSite} from "@/types/banner";
import OfferPos from "@/components/offers/pos-graduacao";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {Course, CourseResponse} from "@/types/list-courses";
import {listCourses} from "@/services/api";
import {notFound} from "next/navigation";
import Testimonials from "@/components/depoiments/depoiments";
import FaqTabs from "@/components/faq/faq";
import DualMarquee from "@/components/dualSlider/dualSlider";
import { List } from "@/types/listCards";
import CursosPorModalidade from "@/components/listingCourses/listingCardArea";
import ListingSG from "@/components/videoMarket/listingMarketingSG";

export default function ModalityGraduacaoEAD() {
    const [loading, setLoading] = useState<boolean>(false);
    const [listcourse, setListCourse] = useState<CourseResponse>();
    const bannerCentralizado: BannerSite = {
        configBanner: {
            col: 2,
            position: 'start',
            skeleton: false,
            titleFont: 'poppins',
            ButtonPosition: 'center'
        },
        content1: {
            backgroundImage: '/fimEADdesktop.webp',
            title: `<div class="text-[5rem] text-center font-bold lg:text-[8rem]">O FIM <br/> DO EAD</div>`,
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl ">Graduação EAD</div>',
            button: false,
            hubspot: {
                active: true,
                idform: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
                title: "Você ganhou um SUPERCUPOM válido por 30 minutos!"
            }

        },
        content2: {
            button: false,
            offer: <OfferPos />
        }
    };

    useEffect(() => {
        async function detailsCourse(){
            const listcourse: CourseResponse = await listCourses({
                modality: 'graduacao',
                searchother: true,
                tag: "ead"
            });
            setListCourse(listcourse)
            setLoading(true)
        }
        detailsCourse().catch()
    }, []);

       const curses: List[] = listcourse?.data.map((item: Course) => ({
            link:  `graduacao/${item.alias}`,
            img: item.photo_miniature ?? item.photo ?? 'skdgsdg',
            name: item.name ?? "",
            cta:  "Inscreva-se",
            title: "Escolha seu curso e comece sua jornada",
        })) ?? [];

    return <>
        <BannerSiteUniUnica {...bannerCentralizado} />
        {loading ? (
            <>
                {listcourse && listcourse.data.length <= 0 ? notFound() :  <CursosPorModalidade list={curses} /> }
            </>
        ): (
            <>
                carregando...
            </>
        )
        }
                    <DualMarquee />
                    <ListingSG modality={"graduacao"} />
                    <Testimonials />
                    <FaqTabs modality={'segunda-graduacao'} />
    </>
}
