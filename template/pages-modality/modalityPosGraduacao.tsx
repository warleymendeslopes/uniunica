'use client'
import {BannerSite} from "@/types/banner";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {getAreaURL} from "@/services/api";
import {ResponseArea} from "@/types/list-area";
import CursosPorModalidade from "@/components/listingCourses/listCouse";
import OfferPos from "@/components/offers/pos-graduacao";

export default  function ModalityPosGraduacao() {
    const [area, setArea] = useState<ResponseArea>();
    const [loading, setLoading] = useState<boolean>(false);
    const bannerCentralizado: BannerSite = {
        configBanner: {
            col: 2,
            position: 'start',
            skeleton: false,
            titleFont: 'poppins'
        },
        content1: {
            backgroundImage: '/fimEADdesktop.webp',
            title: `<div class="text-[5rem] text-center font-bold lg:text-[8rem]">O FIM <br/> DO EAD</div>`,
            subtitle: '<div class=" bg-yellow-300 p-3 text-center text-black font-bold text-2xl "> PÓS GRADUAÇÃO</div>',
            button: true,
            buttonText: 'INSCREVA-SE ANTES QUE ACABE',
            onClickButton: () => console.log('Botão clicado!')
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

    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            {!loading && area ? (
                <CursosPorModalidade area={area}/>
            ): (
                <>Carregando...</>
            )}
        </>
    )
}