import {notFound} from "next/navigation";

/**
 * Esta página corresponde ao detalhe de um curso de pós-graduação.
 *
 * As demais modalidades provavelmente não utilizarão esta página,
 * pois não possuem listagem de áreas. Nessas modalidades, os cursos
 * são exibidos diretamente, resultando em um nível a menos no fluxo
 * de navegação.
 *
 * @param params - Parâmetros da rota, incluindo a modalidade.
 * @constructor
 */

export default async function PageCourse({params,}: {
    params: Promise<{ modality: string, param1: string, param2: string, course: string }>
}) {
    const {modality, param1, param2, course } = await params
    if (modality != 'pos-graduacao') {
        notFound()
    }
    return (
        <>
            pagina de modality: {modality} <br/>
            Página de Param1: {param1}<br/>
            Página de Param2: {param2}<br/>
            Página de course pos: {course}<br/>
        </>
    )
}

