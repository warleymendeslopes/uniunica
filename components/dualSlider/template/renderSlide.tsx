import {ReactNode} from "react";

export default function RenderSlide({
                                      children,
                                  }: {
    children: ReactNode;
}) {
    return (
        <div
            className="
        shrink-0 rounded-2xl overflow-hidden
        bg-neutral-900/40 ring-1 ring-white/5
        w-[280px] h-[160px]
        md:w-[460px] md:h-[240px]
        lg:w-[560px] lg:h-[300px]
      "
        >
            {children}
        </div>
    );
}