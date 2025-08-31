import React, { useEffect, useRef, useState } from "react";

type Exp = {
  company: string;
  role: string;
  location?: string;
  period: string;
  bullets: string[];
};

const EXPERIENCES: Exp[] = [
  {
    company: "Cavicchio Greenhouses",
    role: "Software Engineer Intern",
    location: "Onsite",
    period: "Jun–Aug 2025",
    bullets: [
      "Built QuickPick traversal and redesigned multi-recipient email modal.",
      "Implemented Hangfire job to detect MCT discrepancies and notify stakeholders.",
      "Shipped iterative improvements with ops feedback.",
    ],
  },
  {
    company: "Arctic Global Management (Student Fund)",
    role: "Portfolio Manager",
    location: "Bowdoin College",
    period: "Feb 2024–Present",
    bullets: [
      "Led equity research; presented NYSE stock pitches bi-weekly.",
      "Built DCF/football-field models; mentored analysts.",
    ],
  },
  {
    company: "Bowdoin IT",
    role: "IT Support Representative",
    location: "Campus",
    period: "2023–2024",
    bullets: ["Resolved tickets and improved documentation for student/staff workflows."],
  },
];

function useInView(threshold = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);

  {/* Intersection observer to track visibility */}
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  return { ref, inView };
}

function ExperienceCard({ exp, dir }: { exp: Exp; dir: "left" | "right" }) {
  const { ref, inView } = useInView();
  const [hasMounted, setHasMounted] = useState(false);

  const [hasEntered, setHasEntered] = useState(false);
  useEffect(() => setHasMounted(true), []);
  useEffect(() => {
    if (inView) setHasEntered(true);
  }, [inView]);

  const base =
    "reveal rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/60 dark:bg-slate-900/40 p-5 sm:p-6 shadow-sm will-change-transform";

  const initialOffset =
    dir === "left" ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12";

  const anim = inView
    ? dir === "left"
      ? "animate-[slide-in-left_700ms_ease-out_forwards]"
      : "animate-[slide-in-right_700ms_ease-out_forwards]"
    : hasEntered
    ? dir === "left"
      ? "animate-[slide-out-left_550ms_ease-in_forwards]"
      : "animate-[slide-out-right_550ms_ease-in_forwards]"
    : initialOffset;

  return (
    <article ref={ref} className={`${base} ${hasMounted ? anim : initialOffset}`}>
      <h3 className="text-lg md:text-xl font-semibold leading-tight">
        {exp.role} · <span className="font-normal opacity-80">{exp.company}</span>
      </h3>
      <p className="text-sm opacity-70 mt-1">
        {[exp.location, exp.period].filter(Boolean).join(" • ")}
      </p>
      <ul className="mt-3 list-disc pl-5 space-y-1 text-sm leading-relaxed">
        {exp.bullets.map((b, i) => (
          <li key={i}>{b}</li>
        ))}
      </ul>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <div className="flex items-center gap-4 mb-6">
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Experience</h2>
        <div className="h-px flex-1 bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 gap-6">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.company + i} exp={exp} dir={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}
