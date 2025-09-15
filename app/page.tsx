<<<<<<< HEAD
import { Link } from "@heroui/link";
import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { button as buttonStyles } from "@heroui/theme";
=======
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
        buttonPosition: 'center',
        hubspot: {
            active: true,
            idform: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
            title: "Você ganhou um SUPERCUPOM válido por 30 minutos!"
        }
    },
    hubspotPosition: 'bottom'
};
>>>>>>> main

import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";

export default function Home() {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="inline-block max-w-xl text-center justify-center">
        <span className={title()}>Make&nbsp;</span>
        <span className={title({ color: "violet" })}>beautiful&nbsp;</span>
        <br />
        <span className={title()}>
          websites regardless of your design experience.
        </span>
        <div className={subtitle({ class: "mt-4" })}>
          Beautiful, fast and modern React UI library.
        </div>
      </div>

      <div className="flex gap-3">
        <Link
          isExternal
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
          href={siteConfig.links.docs}
        >
          Documentation
        </Link>
        <Link
          isExternal
          className={buttonStyles({ variant: "bordered", radius: "full" })}
          href={siteConfig.links.github}
        >
          <GithubIcon size={20} />
          GitHub
        </Link>
      </div>

      <div className="mt-8">
        <Snippet hideCopyButton hideSymbol variant="bordered">
          <span>
            Get started by editing <Code color="primary">app/page.tsx</Code>
          </span>
        </Snippet>
      </div>
    </section>
  );
}
