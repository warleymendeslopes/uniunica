'use client'
import BannerSiteUniUnica from "@/components/banner/page";
import {BannerSite} from "@/types/banner";
import ModalitySiteUniUnica from "@/components/banner/modalidades";
import FooterSiteUniUnica from "@/components/footer/page";
const bannerCentralizado: BannerSite = {
  configBanner: {
    col: 1,
    position: 'center',
    skeleton: false,
    titleFont: 'poppins'
  },
  content1: {
    backgroundImage: '/fimEADdesktop.webp',
    title: `<b style="font-size: 5rem;">O FIM <br/> DO EAD</b>`,
    subtitle: '<sapan style="padding: 6px 17px; background: #8f33ff;">ENTENDA O QUE VAI ACONTECER </sapan>',
    button: true,
    buttonText: 'INSCREVA-SE ANTES QUE ACABE',
    onClickButton: () => console.log('Botão clicado!')
  },
};


export default function Home() {
  return (
    <>
      <BannerSiteUniUnica {...bannerCentralizado} />
      <ModalitySiteUniUnica />
      <FooterSiteUniUnica />
    </>
  );
}
