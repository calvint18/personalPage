import React from "react";

const LANGUAGES = ["TypeScript","JavaScript","Java","C#","SQL","Python","HTML5","CSS3"];
const FRAMEWORKS = ["React","Next.js","ASP.NET Core","Entity Framework Core","Dapper","Vite","Tailwind CSS","D3","Hangfire"];
const TOOLS = ["SQL Server","Azure SQL","Docker","Git","GitHub","GitLab CI","Vercel","Postman","Stripe"];

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
    <div
      className="relative overflow-hidden py-1
                 [mask-image:linear-gradient(to_right,transparent,black_6%,black_94%,transparent)]"
    >
      <div
        className="flex gap-3 w-max whitespace-nowrap will-change-transform"
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: reverse ? "reverse" as const : "normal" as const,
        }}
      >
        {sequence.map((t, i) => (
          <span
            key={`${t}-${i}`}
            className="inline-flex items-center rounded-full border border-slate-300/70 px-3 py-1.5 text-sm"
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
}


export default function Skills() {
  return (
    <section id="skills" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-10 sm:py-12">
      <h2 className="text-xl md:text-2xl font-semibold tracking-tight mb-6">Skills</h2>

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
