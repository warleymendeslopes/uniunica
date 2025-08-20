'use client'
import {BannerSite} from "@/types/banner";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect} from "react";
import {getAreaURL} from "@/services/api";

export default  function ModalityPosGraduacao() {
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
            subtitle: '<sapan style="padding: 6px 17px; background: #8f33ff;">Área de Educação <br/> </sapan> <p style=" margin-top: 10px;">Conquiste pontos e destaque-se em concursos públicos e designações com uma especialização reconhecida pelo MEC na área da Educação.</p>',
            button: true,
            buttonText: 'INSCREVA-SE ANTES QUE ACABE',
            onClickButton: () => console.log('Botão clicado!')
        },
    };


    useEffect(() => {
        async function test() {
            const res = await getAreaURL();
        }
        test();
    }, []);

    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
        </>
    )
}