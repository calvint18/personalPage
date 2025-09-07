import React from "react";
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiDotnet,
  SiTailwindcss,
  SiDocker,
  SiGit,
  SiGithub,
  SiGitlab,
  SiVercel,
  SiStripe,
  SiNuget,
  SiC,
  SiRender,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { DiMsqlServer } from "react-icons/di";

const LANGUAGES = ["TypeScript","JavaScript","Java","C","C#","SQL","Python","HTML5","CSS3"];
const FRAMEWORKS = ["React","ASP.NET Core","Dapper","Tailwind CSS","Hangfire"];
const TOOLS = ["SQL Server","Azure","Docker","Git","GitHub","GitLab","Vercel","Stripe", "Render"];

// Custom "C#" glyph: C icon with a small '#' overlaid
function CSharpIcon({ size = 16, className = "" }: { size?: number; className?: string }) {
  const box = { width: size, height: size };
  return (
    <span className={`relative inline-block ${className}`} style={box} aria-hidden>
      <SiC size={size} className="absolute inset-0" />
      <span
        className="absolute text-[9px] leading-none"
        style={{ right: -2, top: -2 }}
      >
        #
      </span>
    </span>
  );
}

// Map labels to icon components 
const ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }> | undefined> = {
  // Languages
  TypeScript: SiTypescript,
  JavaScript: SiJavascript,
  Java: FaJava,
  C: SiC,
  SQL: DiMsqlServer,
  Python: SiPython,
  HTML5: SiHtml5,
  CSS3: SiCss3,

  // Frameworks / libs
  React: SiReact,
  "ASP.NET Core": SiDotnet,
  Dapper: SiNuget,
  "Tailwind CSS": SiTailwindcss,

  // Tools
  "SQL Server": DiMsqlServer,
  "Azure": VscAzure,
  Docker: SiDocker,
  Git: SiGit,
  GitHub: SiGithub,
  GitLab: SiGitlab,
  Vercel: SiVercel,
  Stripe: SiStripe,
  Render: SiRender,
};

function Pill({ text }: { text: string }) {
  const Icon = ICONS[text];
  const onlyIcon = text === "C" || text === "C#";
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white text-slate-900 px-3 py-1.5 text-sm shadow-sm">
      {text === "C#" ? (
        <CSharpIcon size={16} className="shrink-0" />
      ) : Icon ? (
        <Icon size={16} className="shrink-0" />
      ) : null}
      {!onlyIcon && text}
    </span>
  );
}

function TickerRow({
  items,
  speed = 24,
  reverse = false,
  multiplier = 4,
}: {
  items: string[];
  speed?: number;
  reverse?: boolean;
  multiplier?: number;
}) {
  const base = Array.from({ length: multiplier }, () => items).flat();
  const sequence = [...base, ...base];

  return (
    <div className="relative overflow-hidden py-1 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]">
      <div
        className="flex gap-3 w-max whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {sequence.map((t, i) => (
          <Pill key={`${t}-${i}`} text={t} />
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-6">Skills</h2>

      <div className="rounded-3xl border border-slate-200 p-6 sm:p-7 space-y-5">
        <div>
          <h3 className="text-lg font-semibold mb-2">Programming Languages</h3>
          <TickerRow items={LANGUAGES} speed={40} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Frameworks & Libraries</h3>
          <TickerRow items={FRAMEWORKS} speed={40} />
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-2">Developer Tools</h3>
          <TickerRow items={TOOLS} speed={40} />
        </div>
      </div>
    </section>
  );
}
