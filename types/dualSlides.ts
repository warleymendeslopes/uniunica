type TextCard = { kind: "text"; small: string; big: string };

type ImageCard = { kind: "image"; src: string; alt?: string };

export type Slide = TextCard | ImageCard;

export type DualSLider = {
    top?: Slide[];
    bottom?: Slide[];
    speedTop?: number;
    speedBottom?: number;
    modality?: string;
};