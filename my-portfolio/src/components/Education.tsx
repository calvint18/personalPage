import { Calendar, GraduationCap, MapPin } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";

export type Edu = {
  school: string;
  degree: string;
  period: string;
  location?: string;
  gpa?: string;
  coursework?: string[];
};

const EDUCATION: Edu[] = [
  {
    school: "Bowdoin College",
    degree: "B.A. Computer Science, Interdisciplinary: Math & Economics",
    period: "Expected May 2027",
    location: "Brunswick, Maine",
    gpa: "3.77/4.0",
    coursework: [
      "Data Structures & Algorithms",
      "Linear Algebra",
      "Foundations of Computer Systems",
    ],
  },
  {
    school: "Advanced Math and Science Academy",
    degree: "High School Diploma",
    period: "May 2023",
    location: "Marlborough, Massachusetts",
    gpa: "4.5/5",
    coursework: [
      "AP Computer Science",
      "AP Calculus BC",
      "AP Micro",
      "Intro to Data Science",
      "Cybersecurity"
    ],
  },
];

function Pill({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-300 bg-slate-50 px-3 py-1.5 text-sm text-slate-800">
      {text}
    </span>
  );
}

function TickerRow({
  items,
  reverse = false,
  multiplier = 3,
  pxPerSecond = 55,
}: {
  items: string[];
  reverse?: boolean;
  multiplier?: number;
  pxPerSecond?: number;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [duration, setDuration] = useState(20);

  const base = Array.from({ length: multiplier }, () => items).flat();
  const sequence = [...base, ...base];

  useLayoutEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const halfWidth = el.scrollWidth / 2;
    const seconds = halfWidth / pxPerSecond;
    setDuration(seconds || 20);
  }, [items, pxPerSecond, multiplier]);

  return (
    <div className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        ref={trackRef}
        className="flex w-max gap-3 whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${duration}s linear infinite`,
          animationDirection: reverse ? ("reverse" as const) : ("normal" as const),
        }}
      >
        {sequence.map((t, i) => (
          <Pill key={`${t}-${i}`} text={t} />
        ))}
      </div>
    </div>
  );
}

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

function EducationCard({ edu }: { edu: Edu }) {
  const { ref, inView, hasEntered } = useInOut();

  const base =
    "rounded-3xl border border-slate-200 bg-white text-slate-900 shadow-lg p-5 sm:p-6 md:p-7";

  const initial = "opacity-0 translate-y-3 scale-95";
  const anim = inView
    ? "animate-[pop-in_650ms_cubic-bezier(0.2,0.8,0.2,1)_forwards]"
    : hasEntered
    ? "animate-[pop-out_350ms_ease-in_forwards]"
    : initial;

  return (
    <article ref={ref} className={`${base} ${anim}`}>
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto] md:items-start gap-4">
        <div>
          <div className="flex items-start gap-3">
            <div className="mt-1 rounded-full border border-slate-300 bg-slate-100 p-2 text-slate-600">
              <GraduationCap className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold leading-snug">{edu.school}</h3>
              <div className="mt-1 space-y-1 text-sm text-slate-600">
                {edu.location && (
                  <p className="flex items-center gap-2">
                    <MapPin className="w-4 h-4" /> {edu.location}
                  </p>
                )}
                <p className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" /> {edu.period}
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="md:text-right">
          <div className="font-semibold text-lg">{edu.degree}</div>
          {edu.gpa && <div className="text-sm text-slate-600 mt-1">GPA: {edu.gpa}</div>}
        </div>
      </div>

      {edu.coursework && edu.coursework.length > 0 && (
        <div className="mt-5">
          <div className="font-semibold mb-2">Relevant Coursework:</div>
          <TickerRow items={edu.coursework} pxPerSecond={55} />
        </div>
      )}
    </article>
  );
}

export default function Education() {
  return (
    <section id="education" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-8">
        Education
      </h2>
      <div className="grid grid-cols-1 gap-6">
        {EDUCATION.map((e, i) => (
          <EducationCard key={e.school + i} edu={e} />
        ))}
      </div>
    </section>
  );
}
