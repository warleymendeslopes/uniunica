'use client'
import {BannerSite} from "@/types/banner";
import OfferPos from "@/components/offers/pos-graduacao";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {CourseResponse} from "@/types/list-courses";
import {listCourses} from "@/services/api";
import {notFound} from "next/navigation";
import ListingCourse from "@/components/listingCourses/listingCourses";

export default function ModalitySegundaGraduacao() {
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
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl "> Segunda Graduacao</div>',
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
                modality: 'segunda-graduacao',
                searchother: true
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
                {listcourse && listcourse.data.length <= 0 ? notFound() : <ListingCourse responseCourse={listcourse} /> }
            </>
        ): (
            <>
                carregando...
            </>
        )
        }
    </>
}
