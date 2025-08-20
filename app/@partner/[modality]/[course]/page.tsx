
export default async function PageCourse({params,}: {
    params: Promise<{ course: string }>
}) {
    const { course } = await params

    return (
        <>
            Página de Curso: {course}
        </>
    )
}


