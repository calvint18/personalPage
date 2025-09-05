import { ExternalLink, Github } from "lucide-react";
import { useEffect, useRef, useState } from "react";

export type Project = {
  title: string;
  blurb: string;
  image: string;
  tags: string[];
  live?: string;
  code?: string; 
  contactForCode?: boolean;  
};

const CONTACT_EMAIL = "cthompson2@bowdoin.edu";

function buildMailto(title: string) {
  const subject = `Request for code: ${title}`;
  const body = `Hello Cal, I'm reaching out to learn more about the code for the ${title} project.`;
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body
  )}`;
}

const PROJECTS: Project[] = [
  {
    title: "Donation Platform",
    blurb:
      "Full-stack donation platform for a non-profit charity enabling one-time donations via Stripe with saved donation history in the database. Built with React and TypeScript frontend, C# and ASP.NET Core, and SQL Server to manage data.",
    image: "project/charity.jpeg",
    tags: ["React", "TypeScript", "Stripe", "ASP.NET", "SQL"],
    contactForCode: true,
    live: "https://www.gailthompsonfoundation.org/",
  },
  {
    title: "Price Center",
    blurb:
      "Full-stack pricing app for over 22,000 items with batch updates, audit trails, and a high-performance editing grid. Built with React and TypeScript frontend, C# and ASP.NET Core backend, and MS SQL to manage data.",
    image: "/project/pricecenter.jpeg",
    tags: ["React", "TypeScript", "REST", "C#", "EF Core", "SQL Server", "Hangfire", "Azure"],
    live: "https://youtu.be/aSEACBSi920",
  },
  {
    title: "Bowdoin Shell",
    blurb:
      "Mini Unix shell with job control such as foreground/background execution, jobs/fg/bg built-ins, and robust SIGINT/SIGTSTP/SIGCHLD handling.",
    image: "/project/bwdshell.png",
    tags: ["C", "CLI", "Process Control", "Signal Handling", "Job Control"],
    contactForCode: true,
  },
  {
    title: "Cache Simulator",
    blurb:
      "Simulates a hardware data cache on real-world memory traces reporting hits, misses, and evictions under an LRU replacement policy.",
    image: "/project/cache.jpg",
    tags: ["C", "CLI", "Memory Management", "LRU"],
    contactForCode: true,
  },
  {
    title: "Trie-Based Lexicon",
    blurb:
      "Trie-based lexicon with word/prefix membership, regex matching, and edit-distance suggestions.",
    image: "/project/lexicon.jpeg",
    tags: ["Java", "Algorithms", "Regex", "Spell Correction", "Recursion"],
    contactForCode: true,
  },
];

function useInOut(threshold = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setInView(entry.isIntersecting);
        if (entry.isIntersecting) setHasEntered(true);
      },
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView, hasEntered };
}

function Tag({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-white text-slate-900 px-2.5 py-1 text-xs shadow-sm">
      {text}
    </span>
  );
}

function ProjectCard({ p, index }: { p: Project; index: number }) {
  const { ref, inView, hasEntered } = useInOut();
  const dir: "left" | "right" = index % 2 === 0 ? "left" : "right";

  const imgInitial =
    dir === "left" ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12";
  const imgAnim = inView
    ? dir === "left"
      ? "animate-[slide-in-left_700ms_ease-out_forwards]"
      : "animate-[slide-in-right_700ms_ease-out_forwards]"
    : hasEntered
    ? dir === "left"
      ? "animate-[slide-out-left_450ms_ease-in_forwards]"
      : "animate-[slide-out-right_450ms_ease-in_forwards]"
    : imgInitial;

  const panelInitial = "opacity-0 translate-y-3 scale-95";
  const panelAnim = inView
    ? "animate-[pop-in_600ms_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
    : hasEntered
    ? "animate-[pop-out_300ms_ease-in_forwards]"
    : panelInitial;

  return (
    <article ref={ref} className="relative">
      <div className="rounded-xl border border-white/5 bg-black/20 p-5 sm:p-6">
        <div className="relative rounded-3xl overflow-hidden shadow-lg">
          <div className={`relative h-64 sm:h-80 md:h-[420px] will-change-transform ${imgAnim}`}>
            <img
              src={p.image}
              alt={`${p.title} preview`}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>

          <div
            className={`md:absolute md:top-1/2 md:-translate-y-1/2 ${
              dir === "left" ? "md:right-6" : "md:left-6"
            } md:max-w-[55%] z-10`}
          >
            <div
              className={`rounded-2xl bg-white text-slate-900 ring-1 ring-black/10 p-5 sm:p-6 shadow-xl ${panelAnim}`}
            >
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{p.title}</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t} text={t} />
                ))}
              </div>

              <p className="mt-3 text-sm sm:text-base leading-relaxed">{p.blurb}</p>

              {/* Render buttons independently so they can co-exist */}
              <div className="mt-4 flex gap-4 text-sm">
                {p.live && (
                  <a
                    href={p.live}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white text-slate-900 hover:!text-slate-900 focus-visible:!text-slate-900 px-3 py-1.5 text-sm shadow-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 transition"
                    aria-label={`Open live demo: ${p.title}`}
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
                {p.code && (
                  <a
                    href={p.code}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white text-slate-900 hover:!text-slate-900 focus-visible:!text-slate-900 px-3 py-1.5 text-sm shadow-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 transition"
                    aria-label={`Open code repo: ${p.title}`}
                  >
                    <Github className="w-4 h-4" /> Code
                  </a>
                )}
                {p.contactForCode && (
                  <a
                    href={buildMailto(p.title)}
                    className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white text-slate-900 hover:!text-slate-900 focus-visible:!text-slate-900 px-3 py-1.5 text-sm shadow-sm hover:bg-slate-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-900/20 active:translate-y-px transition"
                    aria-label={`Contact for code: ${p.title}`}
                  >
                    Contact for code
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8">
        Projects
      </h2>

      <div className="grid grid-cols-1 gap-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title + i} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
