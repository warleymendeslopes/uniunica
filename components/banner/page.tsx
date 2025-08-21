import { BannerSite } from "@/types/banner";
import { ArrowDown } from 'lucide-react';
import BannerSkeleton from "@/template/banner-skeleton";
import GridUniUnica from "@/template/grid";
import {poppins} from "@/config/fonts";
import React from "react";

interface BannerSiteUniUnicaProps extends BannerSite {}

const BannerSiteUniUnica: React.FC<BannerSiteUniUnicaProps> = ({configBanner, content1, content2 }) => {
    const getPositionClasses = () => {
        switch (configBanner.position) {
            case 'start':
                return 'justify-start text-left';
            case 'end':
                return 'justify-end text-right';
            default:
                return 'justify-center text-center';
        }
    };

    const getColumnClasses = () => {
        if (configBanner.col === 2) {
            return 'grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12';
        }
        return 'flex flex-col';
    };
    const renderContent = (content: {
        openTitle?: string;
        title?: string;
        subtitle?: string;
        offer?: React.ReactNode;
        button: boolean;
        onClickButton?: () => void;
        buttonText?: string
    }, isSecondColumn = false) => {
        if (configBanner.skeleton) {
            return <BannerSkeleton />;
        }
        return (
            <div className={`space-y-4 text-white ${isSecondColumn ? 'lg:text-right' : ''} ${poppins.className}`}>
                {content.openTitle && (
                    <p className={`text-sm md:text-base font-medium uppercase tracking-wide `}>
                        {content.openTitle}
                    </p>
                )}

                {content.title && (
                    <h1
                        className={`text-4xl  md:text-5xl lg:text-6xl xl:text-7xl font-bold`}
                        dangerouslySetInnerHTML={{ __html: content.title }}
                    />
                )}


                {content.subtitle && (
                    <p className={``}
                       dangerouslySetInnerHTML={{ __html: content.subtitle }}
                    />
                )}

                {content.offer && (
                    <div className={`my-6 `}>
                        {content.offer}
                    </div>
                )}

                {configBanner.col === 1 && configBanner.position === 'center' && (
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
            </div>
        );
    };

    return (
        <section
            className="relative w-full min-h-[80vh] lg:min-h-screen flex items-center bg-cover bg-center bg-no-repeat "
            style={{
                backgroundImage: `url(${content1.backgroundImage})`
            }}
        >
          
            <div className="absolute inset-0 bg-black/40"></div>

            <GridUniUnica>
            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`${getPositionClasses()} ${getColumnClasses()}`}>
                   
                    <div className="w-full">
                        {renderContent(content1)}
                    </div>

                    {configBanner.col === 2 && content2 && (
                        <div className="w-full">
                            {renderContent(content2, true)}
                        </div>
                    )}
                </div>
            </div>
            </GridUniUnica>

        </section>
    );
};

export default BannerSiteUniUnica;
