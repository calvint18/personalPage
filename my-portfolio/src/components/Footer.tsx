import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="mt-16 border-t border-slate-200 dark:border-slate-800">
      <div className="mx-auto max-w-6xl px-4 py-8 grid grid-cols-[1fr_auto_1fr] items-center">
        <p className="text-sm opacity-70 justify-self-start">
          © Calvin Thompson. All rights reserved.
        </p>

        <button
          onClick={scrollTop}
          aria-label="Back to top"
          className="justify-self-center inline-flex h-10 w-10 items-center justify-center rounded-full border border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-900"
        >
          <ArrowUp className="w-5 h-5" />
        </button>

        <span aria-hidden className="justify-self-end" /> 
      </div>
    </footer>
  );
}
