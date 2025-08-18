export interface SkeletonAniversario {
  isActived: boolean;
  isLoading: boolean;
}

interface OffersOndaRoxa {
  isActived: boolean;
  offerondaroxa: React.ReactNode;
  position: number;
  idOffers?: string;
  marginTop?: number;
  marginBotton?: number;
}

interface OffersAniversario {
  isActived: boolean;
  offer: React.ReactNode;
  possition: number;
  idOffers?: string;
  marginTop?: number;
  marginBotton?: number;
}

interface OfferEAD {
  isActived: boolean;
  offer?: React.ReactNode;
  position: number;
  idOffer?: string;
  marginTop?: number;
  marginBottom?: number;
}

export interface BannerAniversario {
  content: {
    headerTitle?: string | React.ReactNode;
    title?: string;
    subTitle?: string;
    ctaName?: string;
    onButtonClick?: () => void;
    modalContent?: React.ReactNode;
    imgbanner?: string;
    mobileBgImage?: string;
    benefitList?: { text: string; icon?: string }[];
    offer?: OffersAniversario;
    offerOndaRoxa?: OffersOndaRoxa;
    offerEAD?: OfferEAD;
  };
  width?: number;
  alignment?: 'center' | 'start' | 'end';
  animation: boolean;
  skeleton?: SkeletonAniversario;
}
