import {Slide} from "@/types/dualSlides";
import RenderSlide from "@/components/dualSlider/template/renderSlide";
import CardSlider from "@/components/dualSlider/template/cardSlider";

export default function MarqueeRow({
                                       items,
                                       direction,
                                       duration = 30,
                                   }: {
    items: Slide[];
    direction: "left" | "right";
    duration?: number;
}) {
    const row = [...items, ...items];
    return (
        <div className="relative overflow-hidden">
            <div
                className={[
                    "flex gap-6 w-max transform-gpu will-change-transform",
                    direction === "left" ? "animate-marquee-left" : "animate-marquee-right",
                ].join(" ")}
                style={{ ["--marquee-duration" as string]: `${duration}s` }}
            >
                {row.map((slider, index) => (
                    <RenderSlide key={index}>{CardSlider(slider)}</RenderSlide>
                ))}
            </div>
        </div>
    );
}