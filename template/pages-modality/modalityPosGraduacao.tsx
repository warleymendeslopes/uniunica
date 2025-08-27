'use client'
import {BannerSite} from "@/types/banner";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {getAreaURL} from "@/services/api";
import {Area, ResponseArea} from "@/types/list-area";
import CursosPorModalidade from "@/components/listingCourses/listingCardArea";
import OfferPos from "@/components/offers/pos-graduacao";
import {List} from "@/types/listCards";
import {Course} from "@/types/list-courses";

export default  function ModalityPosGraduacao() {
    const [area, setArea] = useState<ResponseArea>();
    const [loading, setLoading] = useState<boolean>(false);
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
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl "> PÓS GRADUAÇÃO</div>',
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
        setLoading(true)
        async function getApiAreas() {
            const res: ResponseArea = await getAreaURL();
            setArea(res);
            setLoading(false)
        }
        getApiAreas().then();
    }, []);

    const curses: List[] = area?.data.map((item: Area) => ({
        link:  `pos-graduacao/${item.areaAlias}`,
        img: item.miniature,
        name: item.areaName ?? "",
    })) ?? [];

    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            {!loading && area ? (
                <CursosPorModalidade list={curses}/>
            ): (
                <>Carregando...</>
            )}
        </>
    )
}