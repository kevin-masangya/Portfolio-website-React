export default function SkillChip({ label }) {
  return (
    <span
      className="text-sm px-3 py-1.5 rounded-lg border border-[#382027] bg-[#140d0f]/60 text-[#f5edef]
                 transition-all duration-200 hover:border-[#a72d43] hover:text-[#ff7180]
                 hover:shadow-[0_0_16px_rgba(242,57,83,.22)] hover:-translate-y-0.5 cursor-default"
    >
      {label}
    </span>
  );
}