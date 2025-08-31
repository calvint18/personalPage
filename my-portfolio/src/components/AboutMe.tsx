import { Download } from "lucide-react";
import React, { useState } from "react";


const ABOUT = {
  heading: "About Me",
  avatar: "/portrait.jpg",      
  bio: `I’m Cal Thompson, a software engineer focused on fast, reliable frontends
and clean APIs. I like shipping iteratively, measuring impact, and building tools
people actually use.`,
  email: "cal@example.com",
  resumeUrl: "/resume.pdf",
};

export default function AboutMe() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section id="about" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">
        {ABOUT.heading}
      </h2>

      <div className="rounded-xl border border-black/10 p-5 sm:p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-start">
          {/* Photo */}
          <div className="w-full md:max-w-[440px]">
            <div className="aspect-square w-full overflow-hidden rounded-lg ring-1 ring-black/10 bg-white">
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

          {/* Bio */}
          <div className="md:max-w-[50vw] text-left">
            <p className="text-sm sm:text-base leading-relaxed opacity-90">
              {ABOUT.bio}
            </p>

            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 items-stretch">
              <a
                href={ABOUT.resumeUrl}
                download
                className="w-full inline-flex items-center justify-center gap-2 rounded-md border border-black/15 px-4 py-3 text-sm hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
              >
                <Download className="w-4 h-4" />
                Download Resume
              </a>

              {/* Email (full-width cell) */}
              <div className="w-full rounded-md border border-black/15 px-4 py-3 text-sm">
                <span className="opacity-60 mr-1">Email:</span>
                <a href={`mailto:${ABOUT.email}`} className="underline break-all">
                  {ABOUT.email}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
