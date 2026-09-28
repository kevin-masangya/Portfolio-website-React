import { useState } from "react";

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

const LINKS = [
  ["#about", "About"],
  ["#projects", "Projects"],
  ["#experience", "Experience"],
  ["#contact", "Contact"],
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#0B0E14]/85 backdrop-blur border-b border-[#232938]">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between relative">
        <span className="font-semibold" style={{ fontFamily: "Sora, sans-serif" }}>
          Kevin Masangya
        </span>

        <div className="hidden md:flex gap-7">
          {LINKS.map(([href, label]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
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
            {LINKS.map(([href, label]) => (
              <NavLink key={href} href={href} onClick={() => setMenuOpen(false)}>
                {label}
              </NavLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}