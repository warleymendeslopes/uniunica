import {ResponseArea} from "@/types/list-area";
import {CourseAreaResponse} from "@/types/detailsArea";
const revalidate = 3600; // 1 hora


/**
 * Função responsável por realizar uma requisição na API do sistema educacional
 * e buscar todas as áreas cadastradas.
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
 * Esta função é responsável por verificar e validar o usuário, garantindo que
 * o código do agency realmente pertença a um parceiro e não seja apenas um código aleatório.
 *
 * @param partnerId - Identificador do parceiro (agency)
 */
export async function validatePartner(partnerId: string): Promise<boolean> {
    const validPartners = ['1026', '2423', '3000']
    const isValid: boolean = validPartners.includes(partnerId);
    return isValid
}

/**
 * Essa função busca na API do sistema educacional os detalhes de uma área.
 * As rotas do sistema educacional têm uma peculiaridade: se passarmos o parâmetro
 * `searchother` como true, ele busca em um banco mais antigo.
 * Algumas modalidades do sistema exigem que essas informações sejam recuperadas desse banco
 * (uma pequena gambiarra).
 *
 * @param area - Identificador da área do curso
 * @param searchother - Se true, busca também em dados antigos
 */
export async function detailsArea(area: string, searchother?: boolean) {
    let url: string = `https://api-lyratec.institutoprominas.com.br/course_areas/show/${area}`;
    if (searchother) {
        url += `&searchother=true`;
    }
    try {
        const response = await fetch(url, {
            next: { revalidate },
        });
        const data: CourseAreaResponse = await response.json();
        return data;
    } catch (error) {
        console.error(`Erro ao tentar consultar detalhe a area ${area}`, error);
        throw error;
    }
}
