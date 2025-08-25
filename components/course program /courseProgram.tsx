import {PiCertificateBold, PiListChecksBold} from "react-icons/pi";
import {CourseDetailResponse} from "@/types/detailsCourse";

export default function CourseProgram({course}: {course: CourseDetailResponse}) {
    return (
        <>
            <div aria-labelledby="requisitos-title">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div
                        className="rounded-xl border border-[#6424b3] bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(117,0,255,0.35)] transition-all duration-300"
                        role="article"
                    >
                        <div className="h-12 w-12 grid place-items-center rounded-lg bg-[#7500FF]/15 text-[#a875ff] text-xl mb-4">
                            <span aria-hidden="true"><PiListChecksBold /></span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            Pré-requisito
                        </h3>
                        <p className="text-sm leading-relaxed text-white/80">
                            Graduação em qualquer área para nível de conhecimento.
                            Em casos de atuação na área e registro no conselho
                            profissional, a formação deverá ser específica.
                        </p>
                    </div>
                    <div
                        className="rounded-xl border border-[#6424b3] bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(117,0,255,0.35)] transition-all duration-300"
                        role="article"
                    >
                        <div className="h-12 w-12 grid place-items-center rounded-lg bg-[#7500FF]/15 text-[#a875ff] text-xl mb-4">
                            <span aria-hidden="true"><PiCertificateBold /></span>
                        </div>
                        <h3 className="text-xl font-semibold mb-2">
                            {course.data.workload} Horas
                        </h3>
                        <p className="text-sm leading-relaxed text-white/80">De carga horária que contempla vídeoaulas inovadoras e materiais didáticos exclusivos.</p>
                    </div>
                </div>
            </div>
        </>
    )
}
