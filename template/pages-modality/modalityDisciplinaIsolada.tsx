'use client'
import {BannerSite} from "@/types/banner";
import OfferPos from "@/components/offers/pos-graduacao";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {CourseResponse} from "@/types/list-courses";
import {listCourses} from "@/services/api";
import {notFound} from "next/navigation";
import Testimonials from "@/components/depoiments/depoiments";
import FaqTabs from "@/components/faq/faq";
import DualMarquee from "@/components/dualSlider/dualSlider";
<<<<<<< HEAD
import ListingCourseDI from "@/components/listingCourses/listingDisciplinaIsolada";
import ListingSG from "@/components/videoMarket/listingMarketingSG";
=======
import TimeLineSG from "@/components/time line/timeLineSG";
import ListingCourseDI from "@/components/listingCourses/listingGridCols";
>>>>>>> db53ed1c1191318aa9a9ac6e58e1e6f022f5cf69

export default function ModalityDisciplinaIsolada() {
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
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl ">Disciplina Isolada</div>',
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
                modality: 'disciplina-isolada',
            });
            setListCourse(listcourse)
            setLoading(true)
        }
        detailsCourse().catch()
    }, []);

    return <>
        <BannerSiteUniUnica {...bannerCentralizado} />
        {loading ? (
            <>
                {listcourse && listcourse.data.length <= 0 ? notFound() : <ListingCourseDI responseCourse={listcourse}/> }
            </>
        ): (
            <>
                carregando...
            </>
        )
        }
                    <DualMarquee />
                    <ListingSG modality="disciplina-isolada" />
                    <Testimonials />
                    <FaqTabs modality={'disciplina-isolada'} />
    </>
}
