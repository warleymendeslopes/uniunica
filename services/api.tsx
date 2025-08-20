import {ResponseArea} from "@/types/list-area";
const revalidate = 3600; // 1 hora


/**
 * Funcao faz uma request na API do sistema educacional e busca todas as areas cadastrada.
 */
export async function getAreaURL() {
    try {
        const response = await fetch(`https://api-lyratec.institutoprominas.com.br/course_areas/list`, {
            next: { revalidate },
        });
        const data: ResponseArea = await response.json();
        return data;
    } catch (error) {
        console.error('error', error);
        throw error;
    }
}

/**
 * Esta Funccao e responsavel por verificar e validar o usuaruio, assim verificamos se
 * o codigo do agency e realmente de um parceiro ou somente um codigo aleatorio
 * @param partnerId
 */
export async function validatePartner(partnerId: string): Promise<boolean> {
    const validPartners = ['1026', '2423', '3000']
    const isValid: boolean = validPartners.includes(partnerId);
    return isValid
}