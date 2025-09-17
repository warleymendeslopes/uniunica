"use client"

import { useLayoutEffect, useRef, useState, useId } from "react"

interface HubSpotFormProps {
    formId: string
    portalId?: string
    className?: string
    origin?: string
    courseName?: string
    modality?: string
    areaCourse?: string
}

const applyPhoneMask = (inputValue: string): string => {
    let digits = inputValue.replace(/\D/g, "")

    if (digits.startsWith("55")) {
        digits = digits.slice(2)
    }

    const countryCode = "+55 "

    if (digits.length <= 2) {
        return `${countryCode}(${digits}`
    } else if (digits.length <= 6) {
        return `${countryCode}(${digits.slice(0, 2)}) ${digits.slice(2)}`
    } else if (digits.length <= 10) {
        return `${countryCode}(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`
    } else {
        return `${countryCode}(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7, 11)}`
    }
}

const applyPhoneMaskToFields = () => {
    const phoneFields = document.querySelectorAll('input[name="phone"]')

    phoneFields.forEach((phoneField) => {
        const input = phoneField as HTMLInputElement

        // Remove listeners existentes para evitar duplicação
        input.removeEventListener("input", handlePhoneInput)
        input.addEventListener("input", handlePhoneInput)
    })
}

const handlePhoneInput = (event: Event) => {
    const target = event.target as HTMLInputElement
    target.value = applyPhoneMask(target.value)
}

export default function HubSpotForm({
    formId,
    portalId = "47678762",
    className = "FormHubSpot p-6",
    origin = "site oficial",
    courseName = "",
    modality = "",
    areaCourse = "",
}: HubSpotFormProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const reactId = useId()
    const uniqueId = `hubspot-form-${formId}-${reactId.replace(/:/g, "")}`
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)


    useLayoutEffect(() => {
        const createForm = () => {
            if (window.hbspt && containerRef.current && document.getElementById(uniqueId)) {
                try {
                    containerRef.current.innerHTML = ""

                    window.hbspt.forms.create({
                        portalId,
                        formId,
                        target: `#${uniqueId}`,
                        onFormReady: () => {
                            setTimeout(() => {
                                applyPhoneMaskToFields()

                                const originField = document.querySelector(
                                    `#${uniqueId} input[name="origem_do_lead"], #${uniqueId} input[name="origin"]`,
                                ) as HTMLInputElement
                                if (originField && origin) {
                                    originField.value = origin
                                }

                                const courseField = document.querySelector(
                                    `#${uniqueId} input[name="nome_do_curso"], #${uniqueId} input[name="course_name"]`,
                                ) as HTMLInputElement
                                if (courseField && courseName) {
                                    courseField.value = courseName
                                }

                                const modalityFields = document.querySelectorAll(
                                    `#${uniqueId} input[name="modalidade"], #${uniqueId} input[name="modality"]`,
                                )
                                modalityFields.forEach((modalityField) => {
                                    ; (modalityField as HTMLInputElement).value = modality
                                })

                                const areaCourseFields = document.querySelectorAll(
                                    `#${uniqueId} input[name="area_do_curso"], #${uniqueId} input[name="area_course"]`,
                                )
                                areaCourseFields.forEach((areaCourseField) => {
                                    ; (areaCourseField as HTMLInputElement).value = areaCourse
                                })
                            }, 100)
                        },
                    })

                    setIsLoading(false)
                    setError(null)
                } catch (err) {
                    console.error("Erro ao criar formulário HubSpot:", err)
                    setError("Erro ao carregar o formulário")
                    setIsLoading(false)
                }
            } else {
                return false
            }
            return true
        }

        if (window.hbspt) {
            const timer = setTimeout(() => {
                createForm()
            }, 100)

            return () => clearTimeout(timer)
        } else {
            const checkHubSpot = setInterval(() => {
                if (createForm()) {
                    clearInterval(checkHubSpot)
                }
            }, 500)

            const timeout = setTimeout(() => {
                clearInterval(checkHubSpot)
                if (!window.hbspt) {
                    setError("Timeout: HubSpot script não carregou em 15 segundos")
                    setIsLoading(false)
                }
            }, 15000)

            return () => {
                clearInterval(checkHubSpot)
                clearTimeout(timeout)
            }
        }
    }, [formId, portalId, uniqueId, origin, courseName, modality, areaCourse])

    if (error) {
        return (
            <div className={`${className} text-center text-red`}>
                <p>Erro ao carregar formulário: {error}</p>
                <button
                    onClick={() => window.location.reload()}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                    Tentar novamente
                </button>
            </div>
        )
    }

    return (
        <div className={`${className}`}>
            {isLoading && (
                <div className="flex items-center justify-center py-8">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                    <span className="ml-2 text-gray-600">Carregando formulário...</span>
                </div>
            )}
            <div
                id={uniqueId}
                ref={containerRef}
                className={
                    isLoading
                        ? "hidden"
                        :
                        `overflow-hidden

        /* Labels */
        [&_label]:block
        [&_label]:mb-2
        [&_label]:font-semibold
        [&_label]:outline-none

        // estilizar os inputs
        [&_input]:w-full
        [&_input]:p-3
        [&_input]:rounded-lg
        [&_input]:border
        [&_input]:border-none
        [&_input]:bg-white
        [&_input]:text-black
        [&_input]:focus:ring-2
        [&_input]:focus:ring-blue-500
        [&_input]:outline-none
        [&_input.button]:bg-yellow-500
        [&_input]:ring-0


        /* Textarea */
        [&_textarea]:w-full
        [&_textarea]:p-3
        [&_textarea]:rounded-lg
        [&_textarea]:border
        [&_textarea]:border-gray-300
        [&_textarea]:bg-white
        [&_textarea]:text-black
        [&_textarea]:outline-none

         // estilizar o select
        [&_select]:w-full
        [&_select]:p-3
        [&_select]:rounded-lg
        [&_select]:border
        [&_select]:border-gray-300
        [&_select]:bg-white
        [&_select]:text-black
        [&_select]:outline-none

         // estilizar o checkbox
        [&_.hs-form-checkbox-display]:flex
        [&_.hs-form-checkbox-display]:items-center
        [&_.hs-form-checkbox-display]:space-x-2
        [&_input[type=checkbox]]:h-3
        [&_input[type=checkbox]]:w-3
        [&_input[type=checkbox]]:rounded-md
        [&_input[type=checkbox]]:border-gray-400
        [&_input[type=checkbox]]:bg-transparent
        [&_input[type=checkbox]]:mt-5

        // modificar o botao
        [&_input[type=submit]]:bg-yellow-500
        [&_input[type=submit]]:font-poppins
        [&_input[type=submit]]:font-bold
        [&_input[type=submit]]:border-none
        [&_input[type=submit]]:cursor-pointer
        [&_input[type=submit]]:mt-3

        /* Textos auxiliares */
        [&_p]:text-sm
        [&_p]:text-gray-700
        [&_span]:text-[15px]
        [&_span]:ml-1
        [&_.hs-form-booleancheckbox]:leading-4.5


        /* Erros */
        [&_.hs-error-msgs]:text-red-600
        [&_.hs-error-msgs]:text-sm
        [&_.hs-error-msgs]:mt-1

        /* Ocultar reCAPTCHA */
        [&_.grecaptcha-badge]:hidden
        [&_iframe[src*="recaptcha"]]:hidden
      `
                }
            />
        </div>
    )
}
