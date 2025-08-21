interface Area {
    id: number;
    areaName: string;
    icon: string;
    areaAlias: string;
    description: string;
    miniature: string;
}
export interface ResponseArea {
    code: number;
    data: Array<Area>;
}