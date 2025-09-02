import { useEffect, useState } from "react";
import { IoIosMenu, IoMdClose } from "react-icons/io";

const LINKS = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Education", href: "#education" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  const handleNavClick = (e: React.MouseEvent, href: string) => {
    const el = document.querySelector(href) as HTMLElement | null;
    if (!el) return;
    e.preventDefault();
    const header = document.getElementById("site-header");
    const offset = header?.offsetHeight ?? 72;
    const y = el.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top: y, behavior: "smooth" });
    setOpen(false);
  };

  return (
    <header
      id="site-header"
      className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80"
    >
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Left */}
        <a href="#top" className="font-bold tracking-tight">
          Cal Thompson
        </a>

        {/* Right */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => handleNavClick(e, href)}
              className="opacity-80 hover:opacity-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30 rounded"
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Mobile menu button */}
        <button
          type="button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="mobile-drawer"
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md bg-white text-black border border-black/15 shadow-sm hover:bg-white/90 focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
        >
          {open ? (
            <IoMdClose className="w-5 h-5 shrink-0 text-white" />
          ) : (
            <IoIosMenu className="w-5 h-5 shrink-0 text-white" />
          )}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div id="mobile-drawer" className="md:hidden border-t border-black/10 bg-white">
          <nav className="mx-auto max-w-5xl px-4 py-3 grid gap-1.5 text-sm">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={(e) => handleNavClick(e, href)}
                className="block rounded px-2 py-2 hover:bg-black/[0.03]"
              >
                {label}
              </a>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
