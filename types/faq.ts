export type FaqItem = {
    question: string;
    response: string
};

export type FaqCategory = {
    title: string;
    items: FaqItem[]
};
