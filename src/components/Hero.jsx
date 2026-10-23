import GradientText from "./GradientText";
import DarkVeil from "./DarkVeil";
import HalftonePortrait from "./HalftonePortrait";
import portrait from "../assets/photo.png";

const HIGHLIGHTS = [
  ["01", "Thoughtful systems"],
  ["02", "Useful experiences"],
  ["03", "Always improving"],
];

export default function Hero() {
  return (
    <section id="top" className="hero-shell relative isolate overflow-hidden">
      <DarkVeil
        className="absolute inset-0 z-0 h-full w-full"
        color="#ff0000"
        speed={1}
        scale={1}
        rotation={0}
        flow={2.2}
        warp={0.6}
        variation={5}
        sheen={0}
        glow={0.4}
        brightness={0.2}
        grain={0.03}
        quality={0.5}
        fade={0}
        opacity={1}
        mouseInteraction
        mouseStrength={1}
        intro
        lightMode={false}
      />
      <div className="hero-grid absolute inset-0 z-[1]" aria-hidden="true" />
      <div className="hero-orb hero-orb-one absolute z-[1]" aria-hidden="true" />
      <div className="hero-orb hero-orb-two absolute z-[1]" aria-hidden="true" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-20 pb-24 sm:pt-28 sm:pb-32 lg:pt-32 lg:pb-36">
        <div className="grid max-w-6xl lg:grid-cols-[1.2fr_.8fr] gap-14 lg:gap-20 items-center">
          <div className="relative z-10">
            <h1
              className="rise-in mt-12 sm:mt-16 mb-5 text-[clamp(3.5rem,11vw,7.6rem)] leading-[1.02] font-semibold tracking-[-.075em]"
              style={{ fontFamily: "Sora, sans-serif", animationDelay: "0.4s" }}
            >
              <GradientText
                colors={["#ff4d4d", "#dc143c", "#7a0015", "#ff2a2a"]}
                animationSpeed={7}
                variant="flow"
                scale={3}
                followPointer
                glow={0.3}
                className="justify-start name-gradient"
              >
                <span className="block">Kevin</span>
                <span className="block">Masangya</span>
              </GradientText>
            </h1>

            <blockquote
              className="rise-in max-w-xl border-l-2 border-[#ff4059] pl-5 text-xl sm:text-2xl leading-relaxed text-[#f5e9eb]"
              style={{ animationDelay: "0.48s" }}
            >
              “Great things are built one thoughtful{" "}
              <span className="text-[#ff6578]">idea</span>, one careful{" "}
              <span className="text-[#ff6578]">line</span> at a time.”
            </blockquote>

            <div
              className="rise-in mt-8 flex flex-wrap items-center gap-3"
              style={{ animationDelay: "0.56s" }}
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-xl bg-[#f23953] px-5 py-3 font-semibold text-[#19080d] shadow-[0_8px_30px_rgba(242,57,83,.2)] transition duration-200 hover:-translate-y-0.5 hover:bg-[#ff5268] hover:shadow-[0_12px_36px_rgba(242,57,83,.3)]"
              >
                Explore my work <span aria-hidden="true">→</span>
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-xl border border-[#49202a] bg-[#140b0d]/70 px-5 py-3 font-semibold text-[#f0dfe2] transition duration-200 hover:-translate-y-0.5 hover:border-[#a72d43] hover:text-white"
              >
                Let’s connect <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>

          <figure className="hero-portrait relative mx-auto w-full max-w-[390px] lg:justify-self-end">
            <HalftonePortrait
              src={portrait}
              alt="Portrait illustration of Kevin Masangya"
            />
          </figure>
        </div>

        <div
          className="hero-highlights rise-in mt-16 sm:mt-20 pt-5"
          style={{ animationDelay: "0.64s" }}
        >
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-8">
            {HIGHLIGHTS.map(([number, label]) => (
              <div key={number} className="flex items-center gap-3 text-sm">
                <span className="font-mono text-xs text-[#f34c64]">{number}</span>
                <span className="text-[#bba8ad]">{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
