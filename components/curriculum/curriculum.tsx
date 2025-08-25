'use client'
import {Discipline} from "@/types/detailsCourse";
import UndrawHappy from "@/illustrations/undraw_happy";
import {Accordion, AccordionItem} from "@heroui/react";
import {useState} from "react";


export default function Curriculum({disciplines}: {disciplines: Discipline[]}) {
    const [openAccordion, setOpenAccordion] = useState<number | null>(null)

    const handleAccordionChange = (keys: any) => {
        const openKey = Array.from(keys)[0]
        const newOpenKey = openKey !== undefined ? Number(openKey) : null
        setOpenAccordion(newOpenKey === openAccordion ? null : newOpenKey)
    }
    return(
      <div aria-labelledby="modulos-title">
          <h2 className="text-2xl sm:text-[28px] text-left font-krona font-extrabold mb-6">Módulos de Aprendizagem</h2>
          {disciplines.length <= 0 ? (
              <div className={`flex flex-col space-y-5 items-center`}>
                  <UndrawHappy width={300} height={300} />
                  <span className={`font-300 text-xl`}>OPS.. Esse curso não tem nenhuma disciplina cadastrada.</span>
              </div>
          ): (<>
                  <div className="space-y-4">
                      {disciplines.map((discipline, index) => (
                          <div key={index} className="flex items-center gap-4 relative">
                              <div className="flex-shrink-0">
                                  <div
                                      className={`rounded-xl border border-[#6424b3] bg-white/5 backdrop-blur-sm p-2 text-center shadow-[0_0_0_1px_rgba(255,255,255,0.02)] hover:shadow-[0_0_0_1px_rgba(117,0,255,0.35)] transition-all duration-300 min-w-[80px] lg:min-w-[120px] ${
                                          openAccordion === index ? "hidden md:block" : ""
                                      }`}
                                  >
                                      <span className="font-semibold text-sm">Módulo {index + 1}</span>
                                  </div>
                              </div>
                              <div
                                  className={`absolute left-[15%] w-[3%] h-[1px] bg-[#6424b3] ${
                                      openAccordion === index ? "hidden md:block" : ""
                                  }`}
                              ></div>
                              <div className="flex-1">
                                  <Accordion
                                      variant="splitted"
                                      className="w-full"
                                      selectedKeys={openAccordion === index ? new Set([index.toString()]) : new Set()}
                                      onSelectionChange={handleAccordionChange}
                                      itemClasses={{
                                          base: "bg-black border-1 border-[#6424b3] rounded-lg",
                                          title: "text-white font-semibold text-sm lg:text-lg ",
                                          trigger: "px-6 py-4 hover:bg-gray-900 transition-colors",
                                          content: "px-6 pb-4 text-gray-300",
                                          indicator: "text-blue-500",
                                      }}
                                  >
                                      <AccordionItem key={index} title={discipline.name}>
                                          <div className="md:hidden mb-3 px-3 py-2 bg-[#6424b3]/20 rounded-lg border border-[#6424b3]/30">
                                              <span className="text-[#6424b3] font-semibold text-sm">📚 Módulo {index + 1}</span>
                                          </div>
                                          <div
                                              className="prose prose-invert max-w-none text-justify"
                                              dangerouslySetInnerHTML={{ __html: discipline.description }}
                                          />
                                      </AccordionItem>
                                  </Accordion>
                              </div>
                          </div>
                      ))}
                  </div>
              </>
          )}

      </div>
    )
}