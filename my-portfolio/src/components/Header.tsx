import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

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
    if (open) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/10 bg-white backdrop-blur">
      <div className="mx-auto max-w-5xl px-4 py-3 flex items-center justify-between">
        {/* Left Side */}
        <a href="#top" className="font-bold tracking-tight">
          Cal Thompson
        </a>

        {/* Right Side*/}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          {LINKS.map(({ label, href }) => (
            <a
              key={href}
              href={href}
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
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-black/15"
        >
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden border-t border-black/10 bg-white">
          <nav className="mx-auto max-w-5xl px-4 py-3 grid gap-1.5 text-sm">
            {LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                className="block rounded px-2 py-2 hover:bg-black/[0.03]"
                onClick={() => setOpen(false)}
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
