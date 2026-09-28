import SkillChip from "./SkillChip";
import SectionHeading from "./SectionHeading";
import { SKILLS } from "../data/data";

export default function About() {
  return (
    <section id="about" className="border-t border-[#232938] py-20">
      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1.1fr_.9fr] gap-14">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Grounded in fundamentals, curious about everything above them."
          />
          <p className="text-[#93A0B4] mb-4 max-w-xl">
            I started with procedural C and worked up to object-oriented systems, Android
            development and relational database design — winning{" "}
            <strong className="text-[#E9EDF2]">1st place in both a C# and a C programming competition</strong> along the way.
          </p>
          <p className="text-[#93A0B4] mb-4 max-w-xl">
            My philosophy: a program is only as good as the data model underneath it. Before
            writing a line of UI code, I map out the entities, the access control, and the
            failure cases — which is why projects like my Student Enrollment System and Car
            Rental System are built around clean, role-based data layers rather than quick
            hacks.
          </p>
          <p className="text-[#93A0B4] max-w-xl">
            I'm currently deepening my systems knowledge with Azure AI fundamentals and IBM's IT
            foundations, while extending into Laravel and PostgreSQL for larger backend work.
          </p>
        </div>

        <div>
          {Object.entries(SKILLS).map(([group, items]) => (
            <div key={group} className="mb-7">
              <h4 className="text-sm text-[#93A0B4] mb-3">{group}</h4>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <SkillChip key={s} label={s} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}