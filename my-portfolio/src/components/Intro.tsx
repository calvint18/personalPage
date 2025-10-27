import { useEffect, useRef, useState } from "react";
import { Github, Linkedin, Mail, ArrowDown } from "lucide-react";

const PROFILE = {
  name: "Cal Thompson",
  title: "Software Engineer",
  avatar: "/intro.jpg",
  links: {
    github: "https://github.com/calvint18",
    linkedin: "https://www.linkedin.com/in/calvin-thompson-904b88249/",
    email: "cthompson@bowdoin.edu",
  },
  available: true,
};

function CanvasNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number | null; y: number | null }>({ x: null, y: null });
  const rafRef = useRef<number | null>(null);
  const pointsRef = useRef<{ x: number; y: number; vx: number; vy: number }[]>([]);
  const pulsesRef = useRef<
    { x0: number; y0: number; x1: number; y1: number; start: number; dur: number }[]
  >([]);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const dpr = Math.max(1, window.devicePixelRatio || 1);

    const setSize = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    setSize();

    const makePoints = () => {
      const count = Math.floor((canvas.width / dpr) * (canvas.height / dpr) / 5500) + 70;
      pointsRef.current = Array.from({ length: count }, () => {
        const speed = 0.15 + Math.random() * 0.25;
        const angle = Math.random() * Math.PI * 2;
        return {
          x: Math.random() * (canvas.width / dpr),
          y: Math.random() * (canvas.height / dpr),
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
        };
      });
    };
    makePoints();

    const onResize = () => {
      setSize();
      makePoints();
    };
    window.addEventListener("resize", onResize);

    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const MAX_DIST = 150;
    const BASE_LINE_ALPHA = 0.08;
    const POINT_ALPHA = 0.35;

    const spawnPulse = (now: number) => {
      const m = mouseRef.current;
      if (m.x == null || m.y == null) return;
      const near = pointsRef.current.filter((p) => {
        const dx = p.x - (m.x as number);
        const dy = p.y - (m.y as number);
        return dx * dx + dy * dy < MAX_DIST * MAX_DIST;
      });
      if (!near.length) return;
      const p = near[Math.floor(Math.random() * near.length)];
      const dist = Math.hypot(p.x - (m.x as number), p.y - (m.y as number));
      const dur = Math.max(450, Math.min(1200, dist * 6 + Math.random() * 400));
      pulsesRef.current.push({
        x0: m.x as number,
        y0: m.y as number,
        x1: p.x,
        y1: p.y,
        start: now,
        dur,
      });
      if (pulsesRef.current.length > 60) pulsesRef.current.splice(0, pulsesRef.current.length - 60);
    };

    let lastSpawn = 0;

    const loop = (now: number) => {
      const canvas = canvasRef.current!;
      const ctx = canvas.getContext("2d")!;
      const dpr = Math.max(1, window.devicePixelRatio || 1);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      const pts = pointsRef.current;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;
        if (p.y < -10) p.y = h + 10;
        if (p.y > h + 10) p.y = -10;
      }

      ctx.fillStyle = `rgba(255,255,255,${POINT_ALPHA})`;
      for (let i = 0; i < pts.length; i++) {
        const p = pts[i];
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2);
        ctx.fill();
      }

      const m = mouseRef.current;
      if (m.x != null && m.y != null) {
        for (let i = 0; i < pts.length; i++) {
          const p = pts[i];
          const dx = p.x - (m.x as number);
          const dy = p.y - (m.y as number);
          const d2 = dx * dx + dy * dy;
          if (d2 < MAX_DIST * MAX_DIST) {
            const d = Math.sqrt(d2);
            const a = Math.max(0, 1 - d / MAX_DIST);
            ctx.strokeStyle = `rgba(120,200,255,${BASE_LINE_ALPHA + a * 0.25})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(m.x as number, m.y as number);
            ctx.lineTo(p.x, p.y);
            ctx.stroke();
          }
        }
      }

      if (!prefersReduced && m.x != null && m.y != null) {
        if (now - lastSpawn > 110) {
          spawnPulse(now);
          lastSpawn = now;
        }
        ctx.globalCompositeOperation = "lighter";
        for (let i = pulsesRef.current.length - 1; i >= 0; i--) {
          const s = pulsesRef.current[i];
          const t = (now - s.start) / s.dur;
          if (t >= 1) {
            pulsesRef.current.splice(i, 1);
            continue;
          }
          const x = s.x0 + (s.x1 - s.x0) * t;
          const y = s.y0 + (s.y1 - s.y0) * t;
          const r = 1.8 + 2.2 * Math.sin(t * Math.PI);
          const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4);
          g.addColorStop(0, "rgba(180,230,255,0.9)");
          g.addColorStop(1, "rgba(180,230,255,0)");
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, r * 4, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.globalCompositeOperation = "source-over";
      }

      rafRef.current = requestAnimationFrame(loop);
    };
    rafRef.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", onResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const c = canvasRef.current;
      if (!c) return;
      const rect = c.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
    };
    const onLeave = () => {
      mouseRef.current.x = null;
      mouseRef.current.y = null;
    };
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
}

export default function Intro() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section
      id="intro"
      className="
        relative w-screen -mt-16 min-h-[calc(100vh)]
        -mx-[calc((100vw-100%)/2)]
        flex items-center bg-black text-white pb-16 
      "
    >
      <CanvasNetwork />

      <div className="relative mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
          <div className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:0ms]">
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-1 ring-white/10 overflow-hidden bg-white/5">
              {imgOk ? (
                <img
                  src={PROFILE.avatar}
                  alt={`${PROFILE.name} headshot`}
                  className="w-full h-full object-cover"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-lg font-semibold">
                  CT
                </div>
              )}
            </div>
          </div>

          <h1 className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:120ms] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
            {PROFILE.name}
          </h1>

          <p className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:220ms] mt-[-6px] text-sm sm:text-base text-white/80">
            {PROFILE.title}
          </p>

          <div className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:420ms] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <Linkedin className="w-5 h-5 text-white" />
              <span className="sm:inline text-white">LinkedIn</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <Github className="w-5 h-5 text-white" />
              <span className="sm:inline text-white">GitHub</span>
            </a>
            <a
              href={`mailto:${PROFILE.links.email}`}
              aria-label="Email"
              className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-2 text-sm hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
            >
              <Mail className="w-5 h-5 text-white" />
              <span className="sm:inline text-white">Email</span>
            </a>
          </div>

          {PROFILE.available && (
            <div className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:520ms] flex justify-center">
              <span
                className="inline-flex items-center gap-2 rounded-full border border-emerald-400/40 bg-emerald-400/10 px-3 py-1.5 text-xs font-medium text-emerald-300"
                aria-label="Status: Available for work"
                title="Available for work"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" aria-hidden />
                Available for work
              </span>
            </div>
          )}
        </div>
      </div>

      <button
        onClick={() => {
          const target = document.querySelector("#about") as HTMLElement | null;
          if (!target) return;
          const header = document.getElementById("site-header");
          const offset = header?.offsetHeight ?? 72;
          const y = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: y, behavior: "smooth" });
        }}
        aria-label="Scroll to next section"
        className="
          absolute bottom-6 left-1/2 -translate-x-1/2
          z-10 inline-flex h-14 w-14 items-center justify-center rounded-full
          bg-white text-black border border-black/15 shadow-md
          hover:bg-white/90 hover:shadow-lg
          focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20
          motion-safe:animate-bounce
        "
        style={{
          backgroundColor: "#fff",
          color: "#000",
          borderColor: "rgba(0,0,0,0.15)",
        }}
      >
        <ArrowDown className="h-12 w-12 text-black" strokeWidth={2.5} />
      </button>
    </section>
  );
}
