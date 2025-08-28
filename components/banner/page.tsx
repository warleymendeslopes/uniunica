"use client"

import type { BannerSite } from "@/types/banner"
import { ArrowDown } from "lucide-react"
import { poppins } from "@/config/fonts"
import type React from "react"
import HubSpotForm from "@/components/hubSpot/form"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"

interface BannerSiteUniUnicaProps extends BannerSite {
    hubspotPosition?: "first" | "second" | "bottom" // 'bottom' é o padrão
}

const BannerSiteUniUnica: React.FC<BannerSiteUniUnicaProps> = ({
                                                                   configBanner,
                                                                   content1,
                                                                   content2,
                                                                   hubspotPosition = "bottom", // Valor padrão é 'bottom'
                                                               }) => {
    const { isOpen, onOpen, onOpenChange } = useDisclosure() // Moved useDisclosure hook to top level

    const getPositionClasses = () => {
        switch (configBanner.position) {
            case "start":
                return "justify-start text-left items-start"
            case "end":
                return "justify-end text-right"
            default:
                return "justify-start text-start"
        }
    }

    const getColumnClasses = () => {
        if (configBanner.col === 2) {
            return "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
        }
        return "flex flex-col"
    }

    const renderHubSpotForm = (content: any) => {
        if (!content.hubspot?.active) return null

        return (
            <div
                className={`flex items-${configBanner.ButtonPosition ? configBanner.ButtonPosition : "start"} justify-${configBanner.ButtonPosition ? configBanner.ButtonPosition : "start"}`}
            >
                {/* Form aparece apenas no mobile */}
                <HubSpotForm
                    className="block lg:hidden bg-[#101827] text-white p-6 content-form"
                    formId={content.hubspot.idform}
                />

                <button
                    onClick={onOpen}
                    className="hidden lg:flex animate-pulse relative items-center justify-center bg-gradient-to-r from-yellow-500 to-yellow-300 text-black font-bold text-base rounded-full px-5 py-3 shadow-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-xl
                    w-full max-w-xs sm:max-w-none sm:w-10/12 lg:w-auto cursor-pointer"
                >
                    <span className="mr-[50px]">INSCREVA-SE ANTES QUE ACABE</span>
                    <div className="absolute right-0 h-full aspect-square bg-yellow-500 rounded-full shadow-inner z-0"></div>
                </button>

                <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="xl">
                    <ModalContent className={`bg-[#101827] text-white p-6 content-form`}>
                        <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
                            {content.hubspot!.title}
                        </ModalHeader>
                        <ModalBody>
                            <HubSpotForm className="" formId={content.hubspot!.idform} />
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </div>
        )
    }

    const renderContent = (
        content: {
            openTitle?: string
            title?: string
            subtitle?: string
            offer?: React.ReactNode
            button: boolean
            onClickButton?: () => void
            buttonText?: string
            hubspot?: {
                active: boolean
                idform: string
                title: string
            }
        },
        isSecondColumn = false,
        showHubSpot = false,
    ) => {
        // if (configBanner.skeleton) {
        //     return <BannerSkeleton columns={configBanner.col} position={configBanner.position} />
        // }

        return (
            <div className={`space-y-4 text-white ${isSecondColumn ? "lg:text-right" : ""} ${poppins.className}`}>
                {content.openTitle && (
                    <p className={`text-sm md:text-base font-medium uppercase tracking-wide`}>{content.openTitle}</p>
                )}

                {content.title && (
                    <h1
                        className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold`}
                        dangerouslySetInnerHTML={{ __html: content.title }}
                    />
                )}

                {content.subtitle && <p className={``} dangerouslySetInnerHTML={{ __html: content.subtitle }} />}

                {content.offer && <div className={`my-6`}>{content.offer}</div>}

                {configBanner.col === 1 && configBanner.position === "center" && (
                    <div className="flex justify-center my-6">
                        <ArrowDown className="w-8 h-8 text-white animate-bounce" />
                    </div>
                )}

                {content.button && content.buttonText && (
                    <button
                        onClick={content.onClickButton}
                        className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                    >
                        {content.buttonText}
                    </button>
                )}

                {showHubSpot && renderHubSpotForm(content)}
            </div>
        )
    }

    const getHubSpotContent = () => {
        if (content1.hubspot?.active) return content1
        if (content2?.hubspot?.active) return content2
        return null
    }

    const hubspotContent = getHubSpotContent()

    return (
        <section
            className="relative w-full lg:min-h-screen flex items-center bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${content1.backgroundImage})`,
            }}
        >
            <div className="absolute inset-0 bg-black/40"></div>

                <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
                    <div className={`${getPositionClasses()} ${getColumnClasses()}`}>
                        <div className="w-full">
                            {renderContent(content1, false, hubspotPosition === "first" && hubspotContent === content1)}
                        </div>
                        {configBanner.col === 2 && content2 && (
                            <div className="w-full">
                                {renderContent(content2, true, hubspotPosition === "second" && hubspotContent === content2)}
                            </div>
                        )}
                    </div>

                    {hubspotPosition === "bottom" && hubspotContent && (
                        <div className={`mt-12 flex justify-${configBanner.ButtonPosition ? configBanner.ButtonPosition : "start"}`}>{renderHubSpotForm(hubspotContent)}</div>
                    )}
                </div>
        </section>
    )
}

export default BannerSiteUniUnica
