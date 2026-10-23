import { useEffect, useState } from "react";

function NavLink({ href, children, onClick }) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="nav-link text-sm text-[#d4c2c7] transition-colors hover:text-white"
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
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`nav-shell ${isScrolled ? "nav-shell-scrolled" : ""}`}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <a
          href="#top"
          className="nav-brand group inline-flex items-center gap-2.5 font-semibold tracking-tight"
          style={{ fontFamily: "Sora, sans-serif" }}
        >
          <span className="nav-logo-mark grid size-9 place-items-center rounded-xl border border-[#642337] bg-[#210e14] text-sm text-[#ff5268]">
            K.
          </span>
          <span>Kevin <span className="text-[#c8aeb4]">Masangya</span></span>
        </a>

        <div className="nav-links-pill hidden md:flex items-center gap-7">
          {LINKS.map(([href, label]) => (
            <NavLink key={href} href={href}>{label}</NavLink>
          ))}
        </div>

        <div className="nav-mobile-pill md:hidden">
          <button
            className="nav-menu-button text-[#f0dfe2] transition-colors hover:text-[#ff7180]"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            <span aria-hidden="true">{menuOpen ? "×" : "☰"}</span>
          </button>
        </div>

        {menuOpen && (
          <div id="mobile-navigation" className="nav-mobile-menu md:hidden">
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
