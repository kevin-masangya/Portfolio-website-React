export default function projectCard({ project }) {
  return (
    <div className="bg-[#12161F] border border-[#232938] rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#5CE1D0]">
      <h3 className="font-semibold text-lg mb-2.5">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="text-xs text-[#5CE1D0] border border-[#232938] rounded-md px-2 py-1">
            {t}
          </span>
        ))}
      </div>
      {project.star.map(([label, text]) => (
        <p key={label} className="text-sm text-[#93A0B4] mb-1.5">
          <b className="text-[#E9EDF2] font-semibold">{label}:</b> {text}
        </p>
      ))}
      <div className="mt-3">
        
        <a  href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#5CE1D0] hover:opacity-80"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}