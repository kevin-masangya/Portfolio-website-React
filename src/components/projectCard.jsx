export default function projectCard({ project }) {
  return (
    <div className="group bg-[#140d0f] border border-[#382027] rounded-2xl p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#a72d43] hover:shadow-[0_18px_55px_rgba(104,17,39,.14)]">
      <h3 className="font-semibold text-lg mb-2.5">{project.title}</h3>
      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags.map((t) => (
          <span key={t} className="text-xs text-[#ff7180] border border-[#49202a] bg-[#1b1013] rounded-md px-2 py-1">
            {t}
          </span>
        ))}
      </div>
      {project.star.map(([label, text]) => (
        <p key={label} className="text-sm text-[#b9a5aa] mb-1.5">
          <b className="text-[#f5edef] font-semibold">{label}:</b> {text}
        </p>
      ))}
      <div className="mt-3">
        
        <a  href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-[#ff5268] hover:text-[#ff8795] transition-colors"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  );
}