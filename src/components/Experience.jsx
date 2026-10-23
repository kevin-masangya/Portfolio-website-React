import SectionHeading from "./SectionHeading";
import { TIMELINE } from "../data/data";

export default function Experience() {
  return (
    <section id="experience" data-reveal className="scroll-reveal border-t border-[#382027] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="Experience" title="Timeline" />
        <div className="border-l-2 border-[#382027] pl-7">
          {TIMELINE.map((item) => (
            <div key={item.title} className="layout-hover relative pb-8 last:pb-0">
              <div className="absolute -left-[34px] top-1 w-2.5 h-2.5 rounded-full bg-[#f23953] ring-4 ring-[#090708] shadow-[0_0_12px_rgba(242,57,83,.55)]" />
              <div className="text-[#ff7180] text-sm font-semibold mb-1">{item.date}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <ul className="text-sm text-[#b9a5aa] list-disc pl-5 space-y-1">
                {item.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}