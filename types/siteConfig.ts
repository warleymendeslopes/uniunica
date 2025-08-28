type SlideItem =
    | { kind: "text"; small: string; big: string }
    | { kind: "image"; src: string; alt: string };

interface SlideConfig {
    slideTop: SlideItem[];
    slideBottom: SlideItem[];
}

export type Modality =
    | "geral"
    | "pos-graduacao"
    | "graduacao"
    | "segunda-graduacao"
    | "disciplina-isolada";

interface FormConfig {
    partner: Record<Modality, string>;
    internal: Record<Modality, string>;
}

interface NavItem {
    label: string;
    href: string;
}

interface Links {
    github: string;
    twitter: string;
    docs: string;
    discord: string;
    sponsor: string;
}


type ProgramFeatureItem = {
  title: string;
  text: string;
  image: string;
};

type ProgramFeatureCategory = {
  heading: string;
  items: ProgramFeatureItem[];
};

type ProgramFeatures = {
  "segunda-graduacao": ProgramFeatureCategory;
  "disciplina-isolada": ProgramFeatureCategory;
  graduacao: ProgramFeatureCategory;
};


// tipagem principal
export interface SiteConfig {
    form: FormConfig[];
    slidePage: {
        "pos-graduacao": SlideConfig;
        "graduacao": SlideConfig;
    }
    ProgramFeatures: ProgramFeatures;
    name: string;
    description: string;
    navItems: NavItem[];
    navMenuItems: NavItem[];
    links: Links;
}