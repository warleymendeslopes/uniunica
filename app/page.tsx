'use client'
import BannerSiteUniUnica from "@/components/banner/page";
import {BannerSite} from "@/types/banner";
import ModalitySiteUniUnica from "@/components/banner/modalidades";
const bannerCentralizado: BannerSite = {
    configBanner: {
        col: 1,
        position: 'center',
        skeleton: false,
        titleFont: 'krona',
        ButtonPosition: 'center'
    },
    content1: {
        backgroundImage: '/fimEADdesktop.webp',
        title: `<b style="font-size: 5rem;">O FIM <br/> DO EAD</b>`,
        subtitle: '<sapan style="padding: 6px 17px; background: #6424b3;">ENTENDA O QUE VAI ACONTECER </sapan>',
        button: false,
        hubspot: {
            active: true,
            idform: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
            title: "Você ganhou um SUPERCUPOM válido por 30 minutos!"
        }
    },
};


export default function Home() {
    return (
        <>
            <BannerSiteUniUnica {...bannerCentralizado} />
            <ModalitySiteUniUnica />
        </>
    );
}
