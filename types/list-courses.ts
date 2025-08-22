export interface CourseResponse {
    code: number;
    data: Course[];
    message: string;
    metadata: Metadata;
}

export interface Course {
    _id: string;
    name: string;
    certifier: string;
    subcategory: string | null;
    type: string;
    workload: number | null;
    tags: string[];
    depositions: any[]; // se depois soubermos a estrutura, podemos tipar melhor
    score: number | null;
    photo_miniature: string | null;
    photo: string | null;
    amountPeriodicity: number | null;
    periodicity: string | null;
    siteTitle: string | null;
    description: string | null;
    objective: string | null;
    originTags: string[];
    _categoryName: string | null;
    campaignImage: string | null;
    alias: string;
    area: string;

    bestPrice: PaymentMethod | null;
    originalPrice: PaymentMethod | null;
    bestValueParcelMethod: ParcelMethod | null;
    bestPaymentMethodOriginal: PaymentMethod | null;
    bestValueParcelMethodOriginal: ParcelMethod | null;
    bestParcelCreditCard: Parcel | null;
}

export interface PaymentMethod {
    installment: number;
    value: number;
    total: number;
    method: string;
}

export interface ParcelMethod {
    installment: number;
    value: number;
    method: string;
}

export interface Parcel {
    installment: number;
    value: number;
}

export interface Metadata {
    responseAt: string;
    method: string;
    route: string;
    paginate: Paginate;
}

export interface Paginate {
    offset: number;
    page: number;
    perPage: number;
    lastPage: number;
    total: number;
}
