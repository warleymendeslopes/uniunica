export interface List{
    link: string;
    img: string;
    name: string;
    cta?: string;
    title?: string;
}
export interface CursosPorModalidadeProps {
    list: List[];
    showSearch?: boolean;
    showPagination?: boolean;
    coursesPerPage?: number;
}
