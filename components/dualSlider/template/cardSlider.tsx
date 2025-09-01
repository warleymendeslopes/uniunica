import Image from "next/image";
import {Slide} from "@/types/dualSlides";

export default function CardSlider(contentSlider: Slide) {
    if (contentSlider.kind === "image") {
        return (
            <div className="relative w-full h-full">
                <Image
                    src={contentSlider.src}
                    alt={contentSlider.alt ?? ""}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 460px, 280px"
                />
            </div>
        );
    }
    return (
       <div className="text-center font-poppins h-full w-full dark:bg-neutral-900 bg-[#e6e6e6] shadow-lg grid place-content-center px-8">

            <p className="font-semibold text-base md:text-xl lg:text-2xl mb-1">{contentSlider.small}</p>
            <p className="text-4xl font-extrabold leading-none bg-gradient-to-r from-[#7c3aed] to-[#0ea5ff] bg-clip-text text-transparent">
                {contentSlider.big}
            </p>
        </div>
    );
}