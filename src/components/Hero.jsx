export default function Hero() {
  return (
    <section className="py-24 relative overflow-hidden">
      <div
        className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{
          background: "#5CE1D0",
          animation: "drift 12s ease-in-out infinite alternate",
        }}
      />

      <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1.3fr_.9fr] gap-14 items-center relative">
        {/* LEFT CONTENT */}
        <div>
          <div className="rise-in text-[#5CE1D0] text-sm font-semibold">
            IT Student · Aspiring Software Engineer
          </div>

          <h1
            className="rise-in text-4xl md:text-6xl leading-[1.08] font-semibold mt-3 mb-5"
            style={{
              fontFamily: "Sora, sans-serif",
              animationDelay: "0.08s",
            }}
          >
            I build software that turns messy processes into working systems.
          </h1>

          <p
            className="rise-in text-[#93A0B4] text-lg max-w-md mb-8"
            style={{ animationDelay: "0.16s" }}
          >
            Full-stack and mobile apps in Java, C#, PHP and Laravel, backed by
            MySQL and PostgreSQL. Currently completing a BS in Information
            Technology at University of Caloocan City.
          </p>

          <div
            className="rise-in flex gap-3 flex-wrap"
            style={{ animationDelay: "0.24s" }}
          >
            {/* VIEW PROJECTS */}
            <a
              href="#projects"
              className="px-6 py-3 rounded-xl font-semibold bg-[#5CE1D0] text-[#06121A] transition-transform hover:-translate-y-0.5 hover:bg-[#7CEBDD]"
            >
              View Projects
            </a>

            {/* DOWNLOAD RESUME */}
            <a
              href="/resume.pdf"
              download="Kevin-Masangya-Resume.pdf"
              className="px-6 py-3 rounded-xl font-semibold border border-[#232938] transition-all hover:-translate-y-0.5 hover:border-[#5CE1D0] hover:text-[#5CE1D0]"
            >
              Download Resume
            </a>
          </div>
        </div>

        {/* RIGHT AVATAR */}
        <div
          className="relative justify-self-center rise-in"
          style={{ animationDelay: "0.12s" }}
        >
          <div
            className="float-avatar w-52 h-52 rounded-full bg-gradient-to-br from-[#1A1F2B] to-[#0F2A28] border border-[#232938] flex items-center justify-center text-5xl font-bold text-[#5CE1D0]"
            style={{ fontFamily: "Sora, sans-serif" }}
          >
            KM
          </div>

          {/* ACHIEVEMENT */}
          <div className="absolute -top-4 -right-2 bg-[#12161F] border border-[#232938] rounded-xl px-4 py-2.5">
            <div
              className="text-2xl font-bold text-[#F2A65A]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              1st
            </div>

            <div className="text-[11px] text-[#93A0B4]">
              Place, 2 coding competitions
            </div>
          </div>

          {/* STUDENTS SERVED */}
          <div className="absolute -bottom-3 -left-8 bg-[#12161F] border border-[#232938] rounded-xl px-4 py-2.5">
            <div
              className="text-2xl font-bold text-[#F2A65A]"
              style={{ fontFamily: "Sora, sans-serif" }}
            >
              200+
            </div>

            <div className="text-[11px] text-[#93A0B4]">
              Students served in workflow
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}