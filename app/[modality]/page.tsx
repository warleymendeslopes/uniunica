/**
 * Página responsável por exibir os cursos de uma modalidade específica.
 *
 * Ela utiliza o parâmetro (modality) passado na URL para verificar se a modalidade existe.
 * Caso a modalidade não exista, retornamos um erro 404.
 *
 * Se a modalidade for válida, renderizamos a página correspondente.
 *
 * Observação: quando o acesso ocorre através de um parceiro, a modalidade de Graduação
 * não é exibida na opção EaD.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */

import { notFound } from 'next/navigation'
import ModalityPosGraduacao from "@/template/pages-modality/modalityPosGraduacao";
import ModalitySegundaGraduacao from "@/template/pages-modality/modalitySegundaGraduacao";
import ModalityGraduacaoEAD from "@/template/pages-modality/modalityGraduacaoEAD";
import ModalitySemipresenciais from "@/template/pages-modality/modalitySemipresenciais";
import ModalityDisciplinaIsolada from "@/template/pages-modality/modalityDisciplinaIsolada";
import EscolhaGrad from '@/components/escolha/escolha';

export default async function PageModality({params,}: {
    params: Promise<{ modality: string }>
}) {
    const { modality } = await params
    const validModalities: string[] = [
        'pos-graduacao',
        'segunda-graduacao',
        'graduacao',
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
        case 'graduacao':
            return <EscolhaGrad />
        case 'semipresenciais':
            return <ModalitySemipresenciais />
        case 'disciplina-isolada':
            return <ModalityDisciplinaIsolada />
        default:
            break;
    }
}






