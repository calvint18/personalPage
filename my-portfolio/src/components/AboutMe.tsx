import { useEffect, useRef, useState } from "react";

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

const ABOUT = {
  heading: "About Me",
  avatar: "/about.jpg",
  bio: `Hola! I’m Cal Thompson, a student-athlete at Bowdoin College double-majoring in Computer Science and Math & Economics interdisciplinary. 
  This semester I’m in Madrid, learning through a new lens how technology shapes society and immersing myself in European culture. 
  On campus, I’m part of Bowdoin Baseball, Arctic Global Management, the Polar Investment Club, and the CS Faculty Search Committee.
I care about building full-stack products that are impactful, like the nonprofit and its website I recently created.
I’m currently exploring ways to apply my CS and finance background to help people make more informed stock decisions. Thanks for checking out my site!
  `,
  email: "cthompson2@bowdoin.edu",
  resumeUrl: "/resume.pdf",
};

export default function AboutMe() {
  const [imgOk, setImgOk] = useState(true);
  const { ref } = useInView();

  return (
    <section id="about" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-7 text-white">
        {ABOUT.heading}
      </h2>

      <div ref={ref} className="rounded-xl border border-white/5 bg-black/20 p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-[440px_minmax(0,1fr)] gap-6 md:gap-10 items-stretch">
          <div className="w-full">
            <div className="aspect-square w-full overflow-hidden rounded-xl ring-1 ring-black/10 bg-white">
              {imgOk ? (
                <img
                  src={ABOUT.avatar}
                  alt="Portrait of Cal Thompson"
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

          <div className="h-full">
            <div className="h-full rounded-xl bg-white text-slate-900 shadow-xl ring-1 ring-black/10 p-5 sm:p-6 flex flex-col text-left">
              <p className="text-base sm:text-lg leading-relaxed text-left">
                {ABOUT.bio}
              </p>

              <div className="mt-auto pt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href={ABOUT.resumeUrl}
                  download
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-sm hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 !text-slate-900 hover:!text-slate-900 visited:!text-slate-900"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="shrink-0">
                    <path d="M12 3v12m0 0l4-4m-4 4l-4-4M5 21h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Download Resume
                </a>

                <a
                  href={`mailto:${ABOUT.email}`}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-slate-300 px-4 py-3 text-xs sm:text-sm underline-offset-2 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300 !text-slate-900 hover:!text-slate-900 visited:!text-slate-900 whitespace-nowrap"
                >
                  <span className="text-slate-500 mr-1">Email:</span>
                  <span className="underline">{ABOUT.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
