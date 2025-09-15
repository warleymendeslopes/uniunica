"use client"

import type { BannerSite } from "@/types/banner"
import { ArrowDown } from "lucide-react"
import { poppins } from "@/config/fonts"
import type React from "react"
import HubSpotForm from "@/components/hubSpot/form"
import { Modal, ModalBody, ModalContent, ModalHeader, useDisclosure } from "@heroui/react"
import { useEffect, useState } from "react"

interface BannerSiteUniUnicaProps extends BannerSite {
  hubspotPosition?: "first" | "second" | "bottom"
}

function useIsMobile(breakpoint = 1024) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < breakpoint)
    check()
    window.addEventListener("resize", check)
    return () => window.removeEventListener("resize", check)
  }, [breakpoint])

  return isMobile
}

const BannerSiteUniUnica: React.FC<BannerSiteUniUnicaProps> = ({
  configBanner,
  content1,
  content2,
  hubspotPosition = "bottom",
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()
  const isMobile = useIsMobile()

  const effectiveHubspotPosition = isMobile ? "bottom" : hubspotPosition

  const getPositionClasses = () => {
    switch (configBanner.position) {
      case "start":
        return "text-left"
      case "end":
        return "text-right"
      default:
        return "text-center"
    }
  }

  const getColumnClasses = () => {
    if (configBanner.col === 2) {
      return "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12"
    }
    return "flex flex-col"
  }

  const getButtonPositionClass = (position?: "start" | "center" | "end") => {
    switch (position) {
      case "center":
        return "justify-center"
      case "end":
        return "justify-end"
      default:
        return "justify-start"
    }
  }

  const renderHubSpotForm = (content: any) => {
    if (!content.hubspot?.active) return null

    return (
      <div className={`flex ${getButtonPositionClass(content.buttonPosition)}`}>
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
          <ModalContent className="bg-[#101827] text-white p-6 content-form">
            <ModalHeader className="flex flex-col gap-1 text-center font-bold text-2xl">
              {content.hubspot!.title}
            </ModalHeader>
            <ModalBody>
              <HubSpotForm formId={content.hubspot!.idform} />
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
      buttonText?: string
      buttonPosition?: "start" | "center" | "end"
      onClickButton?: () => void
      hubspot?: {
        active: boolean
        idform: string
        title: string
      }
    },
  ) => {
    return (
      <div className={`space-y-4 text-white ${poppins.className}`}>
        {content.openTitle && (
          <p
            className={`text-sm md:text-base font-medium uppercase tracking-wide ${getPositionClasses()}`}
          >
            {content.openTitle}
          </p>
        )}

        {content.title && (
          <h1
            className={`text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold ${getPositionClasses()}`}
            dangerouslySetInnerHTML={{ __html: content.title }}
          />
        )}

        {content.subtitle && (
          <p
            className={`${getPositionClasses()}`}
            dangerouslySetInnerHTML={{ __html: content.subtitle }}
          />
        )}

        {content.offer && <div className="my-6">{content.offer}</div>}

        {configBanner.col === 1 && configBanner.position === "center" && (
          <div className="flex justify-center my-6">
            <ArrowDown className="w-8 h-8 text-white animate-bounce" />
          </div>
        )}

        {content.button && content.buttonText && (
          <div className={`flex ${getButtonPositionClass(content.buttonPosition)}`}>
            <button
              onClick={content.onClickButton}
              className="bg-yellow-500 hover:bg-yellow-600 text-black font-bold py-4 px-8 rounded-full text-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
            >
              {content.buttonText}
            </button>
          </div>
        )}

        {effectiveHubspotPosition !== "bottom" && content.hubspot?.active && (
          renderHubSpotForm(content)
        )}
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
        <div className={`${getColumnClasses()}`}>
          <div className="w-full">
            {renderContent(content1)}
          </div>

          {configBanner.col === 2 && content2 && (
            <div className="w-full">
              {renderContent(content2)}
            </div>
          )}
        </div>

        {/* no mobile sempre vai ficar mostrando o formulário abaixo das duas col */}
        {effectiveHubspotPosition === "bottom" && hubspotContent && (
          <div
            className={`mt-12 flex ${getButtonPositionClass(
              hubspotContent.buttonPosition
            )}`}
          >
            {renderHubSpotForm(hubspotContent)}
          </div>
        )}
      </div>
    </section>
  )
}

export default BannerSiteUniUnica
