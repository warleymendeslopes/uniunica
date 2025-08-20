interface Area {
    id: number;
    name: string;
    icon: string;
    alias: string;
    description: string;
}
export interface ResponseArea {
    code: number;
    data: Array<Area>;
}