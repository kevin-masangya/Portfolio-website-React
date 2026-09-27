import { useState } from "react";
import './index.css'
// Assumes Tailwind (with JIT/arbitrary-value support) is configured in your project.
// Drop your resume at /public/resume.pdf — the download button points to /resume.pdf.

const SKILLS = {
  "Software Development": ["C#", "Java", "VB.NET", "PHP", "SQL"],
  "Frameworks & Backend": ["Laravel", "Android Studio", "Firebase"],
  "Systems & Database": ["MySQL", "PostgreSQL", "Relational Design"],
  "Networking & Hardware": ["Cisco CLI", "Packet Tracer", "Troubleshooting"],
  "Tools & Design": ["Figma", "Git/GitHub", "Visual Studio"],
};

const PROJECTS = [
  {
    title: "Android CRUD App",
    tags: ["Java", "Volley", "PHP", "MySQL"],
    star: [
      ["Situation", "Needed a mobile app that could manage live records, not just display static data."],
      ["Task", "Build full CRUD functionality with secure login over a REST API."],
      ["Action", "Connected Java/Android to a PHP + MySQL backend via Volley, adding authentication and input validation."],
      ["Result", "A working real-time app performing create, read, update and delete operations against a live database."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Student Enrollment System",
    tags: ["OOP", "Java", "Access Control"],
    star: [
      ["Situation", "Enrollment logic often mixes student, course and admin data with no clear boundaries."],
      ["Task", "Design a modular system separating students, courses and enrollments."],
      ["Action", "Applied OOP principles to build independent modules with role-based access for admins and users."],
      ["Result", "A maintainable enrollment platform where each role sees only what it needs."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Car Rental System",
    tags: ["Java Swing", "NetBeans", "MySQL"],
    star: [
      ["Situation", "Rental tracking on paper leads to double-bookings and lost vehicle history."],
      ["Task", "Build a desktop app to manage bookings, users and vehicle status."],
      ["Action", "Built a Swing GUI wired to a MySQL backend for authentication and live vehicle tracking."],
      ["Result", "A single-source booking system replacing manual tracking end to end."],
    ],
    github: "https://github.com/kevin-masangya",
  },
  {
    title: "Network Configuration Labs",
    tags: ["Cisco CLI", "Packet Tracer"],
    star: [
      ["Situation", "Simulated office network needed reliable addressing and routing."],
      ["Task", "Configure DHCP, static routing and serial DTE/DCE links."],
      ["Action", "Set up and tested configurations via Cisco CLI, diagnosing connectivity failures."],
      ["Result", "A stable simulated network with resolved routing and link issues."],
    ],
    github: "https://github.com/kevin-masangya",
  },
];

const TIMELINE = [
  {
    date: "2024 — 2028 (Expected)",
    title: "BS in Information Technology — University of Caloocan City",
    points: [
      "1st Place, C# Programming Competition (CSD FAIR) — Oct 2025",
      "1st Place, C Programming Competition (ITechtivity) — Mar 2025",
    ],
  },
  {
    date: "2022 — 2023",
    title: "IT Support — Work Immersion",
    points: [
      "Directed student queues for a school ID project covering 200+ students",
      "Operated and maintained digital imaging equipment for consistent capture quality",
      "Resolved hardware connectivity issues to keep the workstation running at peak hours",
    ],
  },
];

function Keyframes() {
  return (
    <style>{`
      @keyframes rise { from { opacity:0; transform:translateY(16px); } to { opacity:1; transform:translateY(0); } }
      @keyframes floatY { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-10px); } }
      @keyframes pulseGlow { 0%,100% { box-shadow:0 0 0 1px #232938, 0 20px 50px -20px rgba(92,225,208,.15); } 50% { box-shadow:0 0 0 1px #5CE1D0, 0 20px 60px -15px rgba(92,225,208,.35); } }
      @keyframes drift { 0% { transform:translate(0,0) rotate(0deg); } 100% { transform:translate(30px,20px) rotate(20deg); } }
      .rise-in { animation: rise .7s ease-out backwards; }
      .float-avatar { animation: floatY 5s ease-in-out infinite, pulseGlow 5s ease-in-out infinite; }
      @media (prefers-reduced-motion: reduce) {
        .rise-in, .float-avatar { animation: none !important; }
      }
    `}</style>
  );
}

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="text-sm text-[#93A0B4] hover:text-[#5CE1D0] transition-colors"
    >
      {children}
    </a>
  );
}

function SkillChip({ label }) {
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

function ProjectCard({ project }) {
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
        <a
          href={project.github}
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

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#0B0E14] text-[#E9EDF2] font-sans min-h-screen">
      <Keyframes />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-[#0B0E14]/85 backdrop-blur border-b border-[#232938]">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between relative">
          <span className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>
            Kevin Masangya
          </span>
          <div className="hidden md:flex gap-7">
            <NavLink href="#about">About</NavLink>
            <NavLink href="#projects">Projects</NavLink>
            <NavLink href="#experience">Experience</NavLink>
            <NavLink href="#contact">Contact</NavLink>
          </div>
          <button
            className="md:hidden border border-[#232938] rounded-lg px-2.5 py-1"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          {menuOpen && (
            <div className="absolute top-full left-0 right-0 bg-[#12161F] border-b border-[#232938] flex flex-col gap-4 px-6 py-4 md:hidden">
              <NavLink href="#about" onClick={() => setMenuOpen(false)}>About</NavLink>
              <NavLink href="#projects" onClick={() => setMenuOpen(false)}>Projects</NavLink>
              <NavLink href="#experience" onClick={() => setMenuOpen(false)}>Experience</NavLink>
              <NavLink href="#contact" onClick={() => setMenuOpen(false)}>Contact</NavLink>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section className="py-24 relative overflow-hidden">
        <div
          className="absolute -top-24 -left-24 w-72 h-72 rounded-full opacity-20 blur-3xl pointer-events-none"
          style={{ background: "#5CE1D0", animation: "drift 12s ease-in-out infinite alternate" }}
        />
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1.3fr_.9fr] gap-14 items-center relative">
          <div>
            <div className="rise-in text-[#5CE1D0] text-sm font-semibold">
              IT Student · Aspiring Software Engineer
            </div>
            <h1
              className="rise-in text-4xl md:text-6xl leading-[1.08] font-semibold mt-3 mb-5"
              style={{ fontFamily: "Sora, sans-serif", animationDelay: "0.08s" }}
            >
              I build software that turns messy processes into working systems.
            </h1>
            <p
              className="rise-in text-[#93A0B4] text-lg max-w-md mb-8"
              style={{ animationDelay: "0.16s" }}
            >
              Full-stack and mobile apps in Java, C#, PHP and Laravel, backed by MySQL and
              PostgreSQL. Currently completing a BS in Information Technology at University of
              Caloocan City.
            </p>
            <div className="rise-in flex gap-3 flex-wrap" style={{ animationDelay: "0.24s" }}>
              <a
                href="#projects"
                className="px-6 py-3 rounded-xl font-semibold bg-[#5CE1D0] text-[#06121A] transition-transform hover:-translate-y-0.5 hover:bg-[#7CEBDD]"
              >
                View Projects
              </a>
              <a
                href="/resume.pdf"
                download="Kevin-Masangya-Resume.pdf"
                className="px-6 py-3 rounded-xl font-semibold border border-[#232938] transition-all hover:-translate-y-0.5 hover:border-[#5CE1D0] hover:text-[#5CE1D0]"
              >
                Download Resume
              </a>
            </div>
          </div>

          <div className="relative justify-self-center rise-in" style={{ animationDelay: "0.12s" }}>
            <div className="float-avatar w-52 h-52 rounded-full bg-gradient-to-br from-[#1A1F2B] to-[#0F2A28] border border-[#232938] flex items-center justify-center text-5xl font-bold text-[#5CE1D0]" style={{ fontFamily: "Sora, sans-serif" }}>
              KM
            </div>
            <div className="absolute -top-4 -right-2 bg-[#12161F] border border-[#232938] rounded-xl px-4 py-2.5">
              <div className="text-2xl font-bold text-[#F2A65A]" style={{ fontFamily: "Sora, sans-serif" }}>1st</div>
              <div className="text-[11px] text-[#93A0B4]">Place, 2 coding competitions</div>
            </div>
            <div className="absolute -bottom-3 -left-8 bg-[#12161F] border border-[#232938] rounded-xl px-4 py-2.5">
              <div className="text-2xl font-bold text-[#F2A65A]" style={{ fontFamily: "Sora, sans-serif" }}>200+</div>
              <div className="text-[11px] text-[#93A0B4]">Students served in workflow</div>
            </div>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="border-t border-[#232938] py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-[1.1fr_.9fr] gap-14">
          <div>
            <div className="text-[#5CE1D0] text-sm font-semibold mb-2">About</div>
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
              Grounded in fundamentals, curious about everything above them.
            </h2>
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

      {/* PROJECTS */}
      <section id="projects" className="border-t border-[#232938] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-[#5CE1D0] text-sm font-semibold mb-2">Projects</div>
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
            What I've built
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECTS.map((p) => (
              <ProjectCard key={p.title} project={p} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-t border-[#232938] py-20">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-[#5CE1D0] text-sm font-semibold mb-2">Experience</div>
          <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
            Timeline
          </h2>
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

      {/* CONTACT */}
      <section id="contact" className="border-t border-[#232938] py-20">
        <div className="max-w-5xl mx-auto px-6 grid md:grid-cols-2 gap-12">
          <div>
            <div className="text-[#5CE1D0] text-sm font-semibold mb-2">Contact</div>
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "Sora, sans-serif" }}>
              Let's talk
            </h2>
            <form action="mailto:sd@gmail.com" method="get" encType="text/plain" className="flex flex-col gap-4">
              <div>
                <label className="text-sm text-[#93A0B4] block mb-1" htmlFor="name">Name</label>
                <input id="name" name="name" type="text" required className="w-full bg-[#12161F] border border-[#232938] rounded-lg px-3.5 py-2.5 focus:outline-2 focus:outline-[#5CE1D0]" />
              </div>
              <div>
                <label className="text-sm text-[#93A0B4] block mb-1" htmlFor="email">Your email</label>
                <input id="email" name="email" type="email" required className="w-full bg-[#12161F] border border-[#232938] rounded-lg px-3.5 py-2.5 focus:outline-2 focus:outline-[#5CE1D0]" />
              </div>
              <div>
                <label className="text-sm text-[#93A0B4] block mb-1" htmlFor="message">Message</label>
                <textarea id="message" name="message" required rows={4} className="w-full bg-[#12161F] border border-[#232938] rounded-lg px-3.5 py-2.5 focus:outline-2 focus:outline-[#5CE1D0]" />
              </div>
              <button type="submit" className="self-start px-6 py-3 rounded-xl font-semibold bg-[#5CE1D0] text-[#06121A] hover:-translate-y-0.5 transition-transform">
                Send message
              </button>
            </form>
          </div>
          <div className="flex flex-col gap-3.5">
            <a href="https://github.com/kevin-masangya" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#232938] bg-[#12161F] hover:border-[#5CE1D0] hover:text-[#5CE1D0] transition-colors">
              GitHub — kevin-masangya
            </a>
            <a href="https://kmasavin.vercel.app" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#232938] bg-[#12161F] hover:border-[#5CE1D0] hover:text-[#5CE1D0] transition-colors">
              Portfolio site — KmasaVin.vercel.app
            </a>
            <a href="mailto:sd@gmail.com" className="flex items-center gap-3 px-4 py-3.5 rounded-xl border border-[#232938] bg-[#12161F] hover:border-[#5CE1D0] hover:text-[#5CE1D0] transition-colors">
              Email — sd@gmail.com
            </a>
          </div>
        </div>
      </section>

      <footer className="text-center text-sm text-[#93A0B4] py-8 border-t border-[#232938]">
        © 2026 Kevin Masangya. Built with care.
      </footer>
    </div>
  );
}
