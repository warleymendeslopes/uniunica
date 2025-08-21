import { ReactNode } from "react";

export interface BannerSite {
  configBanner: {
    col: number // maximo de duas colunas
    position: 'center' | 'start' | 'end'; // centro, ao lado esquerdo, ao lado direito
    skeleton: boolean // para ver se deve aplicar um skeleton no banner
    titleFont?: string // classe CSS da fonte para os títulos (ex: 'font-poppins')
  }
  content1: {
    backgroundImage?: string
    openTitle?: string  // descricao que fica acima do titulo
    title: string  // titulo principal do banner
    subtitle?: string // descricao que fica abaixo do titulo
    offer?: ReactNode // pode ser qualquer html que fica abaixo do titulo
    button: boolean // se vai ter o botao ou nao
    onClickButton?: () => void // funcao que o botao vai executar caso exista
    buttonText?: string // texto do botão
  }
  content2?: {
    openTitle?: string
    title?: string
    subtitle?: string
    offer?: ReactNode
    button: boolean
    onClickButton?: () => void
    buttonText?: string
  }
}
