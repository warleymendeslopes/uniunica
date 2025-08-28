import { FaqItem } from "@/types/faq";
import { ChevronLeft } from "lucide-react";

export default function FaqRow({
  item,
  isOpen,
  onToggle,
}: {
  item: FaqItem;
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="group border-b border-neutral-800/80 pb-4 font-poppins">
      <div className="flex items-start gap-4">
        <button
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex-1 text-left text-lg leading-snug transition-colors"
        >
          {item.question}
        </button>

        <button
          onClick={onToggle}
          aria-label={isOpen ? "Recolher" : "Expandir"}
          className="shrink-0 grid place-items-center h-8 w-8 border border-white/80 hover:border-white transition-colors"
        >
          <ChevronLeft
            className={`h-4 w-4 transition-transform duration-300 ${
              isOpen ? "-rotate-90" : "rotate-180"
            }`}
          />
        </button>
      </div>

      <div
        className={`overflow-hidden transition-all duration-400 ease-out
          ${isOpen ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"}`}
      >
        <p className="leading-relaxed">{item.response}</p>
      </div>
    </div>
  );
}