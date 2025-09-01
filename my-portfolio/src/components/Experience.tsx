import { useEffect, useRef, useState } from "react";
import { MapPin, Calendar } from "lucide-react";

type Exp = {
  company: string;
  role: string;
  location?: string;
  period: string;
  bullets: string[];
  logoSrc?: string;
};

const EXPERIENCES: Exp[] = [
  {
    company: "Cavicchio Greenhouses",
    role: "Software Engineer Intern",
    location: "Sudbury, MA",
    period: "Jun–Aug 2025",
    bullets: [
      "Built QuickPick traversal and redesigned multi-recipient email modal.",
      "Implemented Hangfire job to detect MCT discrepancies and notify stakeholders.",
      "Shipped iterative improvements with ops feedback.",
    ],
    logoSrc: "/logos/cavicchio.png",
  },
  {
    company: "Arctic Global Management",
    role: "Portfolio Manager",
    location: "Brunswick, ME",
    period: "Feb 2024–Present",
    bullets: [
      "Led equity research; presented NYSE stock pitches bi-weekly.",
      "Built DCF/football-field models; mentored analysts.",
    ],
    logoSrc: "/logos/arctic.png",
  },
  {
    company: "Bowdoin IT",
    role: "IT Support Representative",
    location: "Brunswick, ME",
    period: "2023–2024",
    bullets: ["Resolved tickets and improved documentation for student/staff workflows."],
    logoSrc: "/logos/bowdoin-it.png",
  },
];

function useInView(threshold = 0.35) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
      threshold,
      rootMargin: "0px 0px -10% 0px",
    });
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

function Initials({ name }: { name: string }) {
  const letters = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  return <span className="text-sm font-semibold text-slate-600">{letters}</span>;
}

function Logo({ name, src }: { name: string; src?: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className="h-14 w-14 rounded-2xl bg-white ring-1 ring-slate-200 shadow-sm flex items-center justify-center overflow-hidden">
      {src && ok ? (
        <img
          src={src}
          alt={`${name} logo`}
          className="h-full w-full object-contain p-2"
          onError={() => setOk(false)}
        />
      ) : (
        <Initials name={name} />
      )}
    </div>
  );
}

function ExperienceCard({ exp, dir }: { exp: Exp; dir: "left" | "right" }) {
  const { ref, inView } = useInView();
  const [mounted, setMounted] = useState(false);
  const [entered, setEntered] = useState(false);

  useEffect(() => setMounted(true), []);
  useEffect(() => {
    if (inView) setEntered(true);
  }, [inView]);

  const initial = dir === "left" ? "opacity-0 -translate-x-12" : "opacity-0 translate-x-12";
  const anim = inView
    ? dir === "left"
      ? "animate-[slide-in-left_700ms_ease-out_forwards]"
      : "animate-[slide-in-right_700ms_ease-out_forwards]"
    : entered
    ? dir === "left"
      ? "animate-[slide-out-left_550ms_ease-in_forwards]"
      : "animate-[slide-out-right_550ms_ease-in_forwards]"
    : initial;

  return (
    <article
      ref={ref}
      className={`will-change-transform rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg p-5 sm:p-6 text-left ${mounted ? anim : initial}`}
    >
      <div className="flex items-start gap-4">
        <Logo name={exp.company} src={exp.logoSrc} />
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-4">
            <h3 className="text-lg md:text-xl font-semibold leading-tight">
              {exp.role} · <span className="font-normal text-slate-600">{exp.company}</span>
            </h3>

            <div className="shrink-0 flex flex-col items-end gap-1 text-sm text-slate-600">
              {exp.location && (
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>{exp.location}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{exp.period}</span>
              </div>
            </div>
          </div>

          <ul className="mt-3 list-disc list-outside pl-5 space-y-1 text-sm leading-relaxed marker:text-slate-400">
            {exp.bullets.map((b, i) => (
              <li key={i} className="text-slate-800">
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8">
        Experience
      </h2>

      <div className="grid grid-cols-1 gap-6">
        {EXPERIENCES.map((exp, i) => (
          <ExperienceCard key={exp.company + i} exp={exp} dir={i % 2 === 0 ? "left" : "right"} />
        ))}
      </div>
    </section>
  );
}
