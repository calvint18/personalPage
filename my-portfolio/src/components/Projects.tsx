import { ExternalLink, Github } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";

export type Project = {
  title: string;
  blurb: string;
  image: string;
  tags: string[];
  live?: string;
  code?: string;
};

const PROJECTS: Project[] = [
  {
    title: "Donation Platform",
    blurb:
      "Fundraising app with Stripe Checkout, admin dashboards, and donor analytics.",
    image: "/project-donation.jpg",
    tags: ["React", "TypeScript", "Stripe", "ASP.NET", "SQL"],
    live: "#",
    code: "#",
  },
  {
    title: "Price Center",
    blurb:
      "Internal pricing system centralizing item updates; cut errors and improved throughput.",
    image: "/project-price.jpg",
    tags: ["React", "REST", "EF Core", "Hangfire"],
    live: "#",
    code: "#",
  },
  {
    title: "Algorithms Visualizer",
    blurb:
      "Interactive visualizations for graphs, DP, and greedy algorithms—built for teaching.",
    image: "/project-algo.jpg",
    tags: ["Vite", "D3", "Tailwind"],
    live: "#",
    code: "#",
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

  const imgInitial = dir === "left" ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12";
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
            <div className={`rounded-2xl bg-white text-slate-900 ring-1 ring-black/10 p-5 sm:p-6 shadow-xl ${panelAnim}`}>
              <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{p.title}</h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {p.tags.map((t) => (
                  <Tag key={t} text={t} />
                ))}
              </div>

              <p className="mt-3 text-sm sm:text-base leading-relaxed">{p.blurb}</p>

              <div className="mt-4 flex gap-4 text-sm">
                {p.live && (
                  <a
                    href={p.live}
                    className="inline-flex items-center gap-1.5 underline underline-offset-2 !text-slate-900 hover:opacity-80"
                  >
                    <ExternalLink className="w-4 h-4" /> Live
                  </a>
                )}
                {p.code && (
                  <a
                    href={p.code}
                    className="inline-flex items-center gap-1.5 underline underline-offset-2 !text-slate-900 hover:opacity-80"
                  >
                    <Github className="w-4 h-4" /> Code
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
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-white">Projects</h2>
        <div className="h-px flex-1 bg-white/10" />
      </div>

      <div className="grid grid-cols-1 gap-10">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.title + i} p={p} index={i} />
        ))}
      </div>
    </section>
  );
}
