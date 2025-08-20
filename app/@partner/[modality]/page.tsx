import { notFound } from 'next/navigation'
import ModalityPosGraduacao from "@/template/pages-modality/modalityPosGraduacao";
import ModalitySegundaGraduacao from "@/template/pages-modality/modalitySegundaGraduacao";
import ModalityGraduacaoEAD from "@/template/pages-modality/modalityGraduacaoEAD";
import ModalitySemipresenciais from "@/template/pages-modality/modalitySemipresenciais";
import ModalityDisciplinaIsolada from "@/template/pages-modality/modalityDisciplinaIsolada";
/**
 * Essa página é destinada à modalidade dos cursos. Ela pega o parâmetro (modality) que foi passado
 * e verifica se essa modalidade realmente existe. Se não existir, retornamos 404.
 * Se existir, renderizamos a página de acordo com a modalidade.
 * Como estamos dentro de uma condição de parceiro, não exibimos a graduação na modalidade EaD
 * @param params
 * @constructor
 */
export default async function PageModality({params,}: {
    params: Promise<{ modality: string }>
}) {
    const { modality } = await params
    const validModalities: string[] = [
        'pos-graduacao',
        'segunda-graduacao',
        'graduacao-ead',
        'semipresenciais',
        'disciplina-isolada'
    ]
    if (!validModalities.includes(modality)) {
        notFound()
    }

    switch (modality) {
        case 'pos-graduacao':
            return <ModalityPosGraduacao />
        case 'segunda-graduacao':
            return <ModalitySegundaGraduacao />
        case 'graduacao-ead':
            return <ModalityGraduacaoEAD />
        case 'semipresenciais':
            return <ModalitySemipresenciais />
        case 'disciplina-isolada':
            return <ModalityDisciplinaIsolada />
        default:
            break;
    }
}






