import ProjectCard from "./projectCard";
import SectionHeading from "./SectionHeading";
import { PROJECTS } from "../data/data";

export default function Projects() {
  return (
    <section id="projects" className="border-t border-[#232938] py-20">
      <div className="max-w-5xl mx-auto px-6">
        <SectionHeading eyebrow="Projects" title="What I've built" />
        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => (
            <ProjectCard key={p.title} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}