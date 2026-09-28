export default function SkillChip({ label }) {
  return (
    <span
      className="text-sm px-3 py-1.5 rounded-lg border border-[#232938] text-[#E9EDF2]
                 transition-all duration-200 hover:border-[#5CE1D0] hover:text-[#5CE1D0]
                 hover:shadow-[0_0_16px_rgba(92,225,208,0.35)] hover:-translate-y-0.5 cursor-default"
    >
      {label}
    </span>
  );
}