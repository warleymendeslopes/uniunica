'use client'
import { useEffect, useState } from "react";
import { listCourses } from "@/services/api";
import { Course, CourseResponse } from "@/types/list-courses";
import { notFound } from "next/navigation";
import CursosPorModalidade from "@/components/listingCourses/listingCardArea";
import { List } from "@/types/listCards";
import BannerSiteUniUnica from "@/components/banner/page";
import Jornada from "@/components/jornada/jornada";
import { BannerSite } from "@/types/banner";
import OfferPos from "@/components/offers/pos-graduacao";
import DualMarquee from "@/components/dualSlider/dualSlider";
import FaqTabs from "@/components/faq/faq";
import Testimonials from "@/components/depoiments/depoiments";

export default function ModalityGraduacaoPresencial() {
    const [loading, setLoading] = useState(false);
    const [listcourse, setListCourse] = useState<CourseResponse>();
    const bannerCentralizado: BannerSite = {
        configBanner: {
            col: 2,
            position: 'start',
            skeleton: false,
            titleFont: 'poppins',
            ButtonPosition: 'start'
        },
        content1: {
            backgroundImage: '/fimEADdesktop.webp',
            title: `<div class="text-[5rem] text-center font-bold lg:text-[8rem]">O FIM <br/> DO EAD</div>`,
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl ">Graduação Presencial</div>',
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
        async function fetchCourses() {
            const res = await listCourses({
                modality: "graduacao",
                searchother: true,
                tag: "presencial"
            });
            setListCourse(res);
            setLoading(true);
        }
        fetchCourses().catch(console.error);
    }, []);

    const courses: List[] =
        listcourse?.data.map((item: Course) => ({
            link: `graduacao/${item.alias}`,
            img: item.photo_miniature ?? item.photo ?? '',
            name: item.name ?? "",
            cta: "Inscreva-se",
            title: "Escolha seu curso e comece sua jornada",
        })) ?? [];

    if (loading && listcourse && listcourse.data.length <= 0) {
        notFound();
    }

    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            <Jornada />
            {loading ? (
                <CursosPorModalidade list={courses} />
            ) : (
                <>Carregando...</>
            )}
            <DualMarquee />
            <Testimonials />
            <FaqTabs modality={'graduacao'} />
        </>
    );
}
