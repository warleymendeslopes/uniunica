'use client'
import {BannerSite} from "@/types/banner";
import BannerSiteUniUnica from "@/components/banner/page";
import {useEffect, useState} from "react";
import {getAreaURL} from "@/services/api";
import {ResponseArea} from "@/types/list-area";
import CursosPorModalidade from "@/components/listingCourses/listCouse";

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
    const [area, setArea] = useState<ResponseArea>();
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true)
        async function test() {
            const res: ResponseArea = await getAreaURL();
            setArea(res);
            setLoading(false)
        }
        test();
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