import Image from "next/image";
import {Item} from "@/types/timeLine";

export default function TimeLine({items}: {items: Item[]}) {
    return(
        <div aria-labelledby="metodologia-title">
            <h2 className="text-center text-2xl sm:text-3xl font-krona font-extrabold mb-10">
                Metodologia que te conduz ao próximo nível da carreira!
            </h2>

            <div className="relative">
                          <span
                              className=" absolute top-0 bottom-0 left-1/2 -translate-x-1/2 w-[1px] bg-[#7a2cff]  z-0"
                              aria-hidden="true"
                          />
                <div className="flex flex-col gap-10">
                    {items.map((it, idx) => {
                        const left = idx % 2 === 0
                        return (
                            <article key={idx} className="relative grid grid-cols-1 md:grid-cols-2">
                                      <span
                                          className={[
                                              "absolute hidden lg:flex top-1/2 -translate-y-1/2 w-6 h-[1px] bg-[#7a2cff] z-10",
                                              left ? "left-[calc(50%-25px)]" : "left-[calc(50%)]",
                                          ].join(" ")}
                                          aria-hidden="true"
                                      />
                                <div className={["py-2", left ? "order-1 md:pr-6" : "order-2 md:col-start-2 md:pl-6"].join(" ")}>
                                    <div className="flex items-center gap-4 rounded-xl border border-[#6424b3] bg-white/5 backdrop-blur-sm p-6 shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(117,0,255,0.35)] transition-all duration-300">
                                        <div className="relative w-[157px] h-[209px] shrink-0 overflow-hidden rounded-lg">
                                            <Image
                                                src={it.img || "/placeholder.svg"}
                                                alt={it.alt}
                                                fill
                                                className="object-cover"
                                                sizes="157px"
                                                priority={idx === 0}
                                                loading={idx === 0 ? "eager" : "lazy"}
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <h3 className="text-base sm:text-lg font-semibold leading-snug">{it.title}</h3>
                                            <button
                                                type="button"
                                                className="mt-3 inline-flex items-center justify-center rounded-md bg-[#7a2cff] px-4 py-2 text-sm font-semibold text-white shadow hover:brightness-110 active:translate-y-px transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#7a2cff]/50"
                                                aria-label={`Ver vídeo sobre ${it.title}`}
                                            >
                                                Ver vídeo
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className={[left ? "order-2 md:col-start-2" : "order-1", "hidden md:block"].join(" ")} />
                            </article>
                        )
                    })}
                </div>
            </div>
        </div>

    )
}