import SectionHeading from "./sectionheading";
import { TIMELINE } from "../data/data";

export default function Experience() {
  return (
    <section id="experience" className="border-t border-[#232938] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="Experience" title="Timeline" />
        <div className="border-l-2 border-[#232938] pl-7">
          {TIMELINE.map((item) => (
            <div key={item.title} className="relative pb-8 last:pb-0">
              <div className="absolute -left-[34px] top-1 w-2.5 h-2.5 rounded-full bg-[#5CE1D0] ring-4 ring-[#0B0E14]" />
              <div className="text-[#F2A65A] text-sm font-semibold mb-1">{item.date}</div>
              <h3 className="font-semibold mb-2">{item.title}</h3>
              <ul className="text-sm text-[#93A0B4] list-disc pl-5 space-y-1">
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