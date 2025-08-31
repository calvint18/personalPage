import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import React, { useState } from "react";

const PROFILE = {
  name: "Cal Thompson",
  title: "Software Engineer",
  location: "Boston, MA",
  avatar: "/me.jpg",
  links: {
    github: "https://github.com/calvint18",
    linkedin: "https://www.linkedin.com/in/calvin-thompson-904b88249/",
    email: "cthompson@bowdoin.edu",
  },
  available: true, 
};

export default function Intro() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section
      id="about"
      className="scroll-mt-24 w-full min-h-[calc(100vh-4rem)] flex items-center"
    >
      <div className="mx-auto w-full max-w-5xl px-4">
        <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
          <div
            className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:0ms]"
          >
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full ring-1 ring-black/10 overflow-hidden bg-white">
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

          <h1
            className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:120ms] text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight"
          >
            {PROFILE.name}
          </h1>

          <p
            className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:220ms] mt-[-6px] text-sm sm:text-base opacity-80"
          >
            {PROFILE.title}
          </p>

          {PROFILE.location && (
            <p
              className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:300ms] inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm opacity-60"
            >
              <MapPin className="w-4 h-4" />
              {PROFILE.location}
            </p>
          )}

          <div
            className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:420ms] flex flex-wrap items-center justify-center gap-2.5 sm:gap-3"
          >
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sm:inline">LinkedIn</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Github className="w-5 h-5" />
              <span className="sm:inline">GitHub</span>
            </a>
            <a
              href={`mailto:${PROFILE.links.email}`}
              aria-label="Email"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Mail className="w-5 h-5" />
              <span className="sm:inline">Email</span>
            </a>
          </div>

          {PROFILE.available && (
            <div
              className="reveal opacity-0 animate-[fade-up_600ms_ease-out_forwards] [animation-delay:520ms] flex justify-center"
            >
              <span
                className="inline-flex items-center gap-2 rounded-full border border-emerald-300/60 bg-emerald-50 px-3 py-1.5 text-xs font-medium text-emerald-700"
                aria-label="Status: Available for work"
                title="Available for work"
              >
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" aria-hidden />
                Available for work
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
