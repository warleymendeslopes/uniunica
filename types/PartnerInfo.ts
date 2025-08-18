
export interface PartnerInfo {
    _id: string;
    status: string;
    type: string;
    agency: string;
    integrationhook: {
        status: boolean;
        url: string;
    };
    tagmanager: string;
    cellphone: string;
    whatsapp: string;
    cpfCnpj: string;
    address: {
        zip: string;
        zone: string;
        state: string;
        street: string;
        city: string;
        number: string;
        complement: string;
    };
    responsible: {
        name: string;
        email: string;
    };
    createdAt: string;
    updatedAt: string;
    certifierAlias: string;
    branchPolo: string[];
}
