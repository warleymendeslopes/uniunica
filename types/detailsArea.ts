interface CourseArgument {
    description: string;
}

interface CourseArea {
    name: string;
    arguments: CourseArgument[];
    description: string;
    image: string;
    id: string | number | null;
}

interface Metadata {
    responseAt: string;
    method: string;
    route: string;
}

export interface CourseAreaResponse {
    code: number;
    data: CourseArea[];
    message: string;
    metadata: Metadata;
}
