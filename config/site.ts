

import {SiteConfig} from "@/types/siteConfig";

export const siteConfig: SiteConfig = {
  form: [
    {
      partner: {
        geral: "07ed6974-53d8-49b1-8d6c-1f30efdb3c06",
        "pos-graduacao": "sdgasdgasgdsdgasdg",
        graduacao: "sdgasdgasgdsdgasdg",
        "segunda-graduacao": "asdgasdg",
        "disciplina-isolada": "asdgasdg",
      },
      internal: {
        geral: "07ed6974-53d8-49b1-8d6c-1f30efd",
        "pos-graduacao": "sdgasdgasgdsdgasdg",
        graduacao: "sdgasdgasgdsdgasdg",
        "segunda-graduacao": "asdgasdg",
        "disciplina-isolada": "asdgasdg",
      },
    },
  ],
  slidePage: {
    "pos-graduacao": {
      slideTop: [
        { kind: "text", small: "Certificado digital", big: "EM 24H" },
        { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Campus" },
        { kind: "text", small: "Especialistas ganham +", big: "de 5 MIL" },
        { kind: "image", src: "/dualSlide/dualslide2.png", alt: "Laboratório" },
      ],
      slideBottom: [
        { kind: "image", src: "/dualSlide/dualslide3.png", alt: "Mercado" },
        { kind: "text", small: "Cursos 100% ONLINE", big: "e tecnologia de cinema" },
        { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Edição" },
        { kind: "text", small: "28 anos de", big: "TRADIÇÃO" },
      ],
    },
    graduacao: {
      slideTop: [
        { kind: "text", small: "Certificado digital", big: "EM 24H" },
        { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Campus" },
        { kind: "text", small: "Especialistas ganham +", big: "de 5 MIL" },
        { kind: "image", src: "/dualSlide/dualslide2.png", alt: "Laboratório" },
      ],
      slideBottom: [
        { kind: "image", src: "/dualSlide/dualslide3.png", alt: "Mercado" },
        { kind: "text", small: "Cursos 100% ONLINE", big: "e tecnologia de cinema" },
        { kind: "image", src: "/dualSlide/dualslide1.png", alt: "Edição" },
        { kind: "text", small: "28 anos de", big: "TRADIÇÃO" },
      ],
    },
  },
  name: "Centro Universitário UniÚnica",
  description: "Make beautiful websites regardless of your design experience.",
  navItems: [
    { label: "Home", href: "/" },
    { label: "Docs", href: "/docs" },
    { label: "Pricing", href: "/pricing" },
    { label: "Blog", href: "/blog" },
    { label: "About", href: "/about" },
  ],
  navMenuItems: [
    { label: "Profile", href: "/profile" },
    { label: "Dashboard", href: "/dashboard" },
    { label: "Projects", href: "/projects" },
    { label: "Team", href: "/team" },
    { label: "Calendar", href: "/calendar" },
    { label: "Settings", href: "/settings" },
    { label: "Help & Feedback", href: "/help-feedback" },
    { label: "Logout", href: "/logout" },
  ],
  links: {
    github: "https://github.com/heroui-inc/heroui",
    twitter: "https://twitter.com/hero_ui",
    docs: "https://heroui.com",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
