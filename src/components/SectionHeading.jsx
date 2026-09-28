export default function SectionHeading({ eyebrow, title }) {
  return (
    <>
      <div className="text-[#5CE1D0] text-sm font-semibold mb-2">{eyebrow}</div>
      <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
        {title}
      </h2>
    </>
  );
}