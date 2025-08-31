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
};

export default function Intro() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <section
      id="about"
      className="scroll-mt-24 mx-auto max-w-5xl px-4 pt-10 pb-8 sm:pt-12 md:pt-16"
    >
      <div className="flex flex-col items-center text-center gap-5 sm:gap-6">
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

        <div className="space-y-3 sm:space-y-4">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight">
              {PROFILE.name}
            </h1>
            <p className="mt-1 text-sm sm:text-base opacity-80">{PROFILE.title}</p>
            {PROFILE.location && (
              <p className="mt-1 inline-flex items-center justify-center gap-1.5 text-xs sm:text-sm opacity-60">
                <MapPin className="w-4 h-4" />
                {PROFILE.location}
              </p>
            )}
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2.5 sm:gap-3">
            <a
              href={PROFILE.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Linkedin className="w-5 h-5" />
              <span className="sm:inline">LinkedIn</span>
            </a>
            <a
              href={PROFILE.links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Github className="w-5 h-5" />
              <span className="sm:inline">GitHub</span>
            </a>
            <a
              href={`mailto:${PROFILE.links.email}`}
              aria-label="Email"
              className="inline-flex items-center gap-2 rounded-md border border-black/15 px-3 py-2 text-sm hover:bg-black/[0.03] active:scale-[0.99] focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30"
            >
              <Mail className="w-5 h-5" />
              <span className="sm:inline">Email</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
