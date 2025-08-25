export interface CourseDetailResponse {
    code: number
    data: CourseDetailData
    message: string
    metadata: ResponseMetadata
}

export interface CourseDetailData {
    evaluationMethod: string
    videoIntroduction: string | null
    marketingVideoTeaser: string | null
    marketingVideoBody: string | null
    faculty: string | null
    methodology: string | null
    objective: string
    targetPublic: string | null
    tags: string[]
    description: string
    workload: number
    minMonthsToComplete: number
    maxMonthsToComplete: number
    disciplines: Discipline[]
    paymentPlan: PaymentPlan
    depositions: any[]
    name: string
    type: string
    subcategory: string
    originTags: string[]
    area: string
    bestPrice: BestPaymentMethod
    bestValueParcelMethod: BestValueParcelMethod
    bestPaymentMethodOriginal: BestPaymentMethod
    bestValueParcelMethodOriginal: BestValueParcelMethod
    bestParcelCreditCard: BestParcelCreditCard
    certifiers: Certifier[]
}

export interface Discipline {
    workload: number
    description: string
    name: string
}

export interface PaymentPlan {
    boleto: InstallmentPlan[]
    creditCard: InstallmentPlan[]
    debitCard: InstallmentPlan[]
    cardRecurrence: InstallmentPlan[]
    pix: InstallmentPlan[]
}

export interface InstallmentPlan {
    installment: number
    value: number
}

export interface BestPaymentMethod {
    installment: number
    value: number
    total: number
    method: string
}

export interface BestValueParcelMethod {
    installment: number
    value: number
    method: string
}

export interface BestParcelCreditCard {
    installment: number
    value: number
}

export interface Certifier {
    name: string
    _id: string
}

export interface ResponseMetadata {
    responseAt: string
    method: string
    route: string
}
