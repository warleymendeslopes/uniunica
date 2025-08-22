/**
 * Esta página possui duas finalidades:
 *
 * - Pode ser utilizada como página de listagem de cursos para a modalidade "pós-graduação".
 * - Pode ser utilizada como página de curso individual para as demais modalidades.
 *
 * O comportamento é definido com base no valor de `params.modality`.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */

export default async function PageParams2({params,}: {
    params: Promise<{ modality: string, param1: string, param2: string }>
}) {
    const {modality, param1, param2 } = await params

    return (
        <>
            ajsdngakjsdg
            pagina de modality: {modality} <br/>
            Página de Param1: {param1}<br/>
            Página de Param2: {param2}
        </>
    )
}

