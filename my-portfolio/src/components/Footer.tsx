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
          className="
            justify-self-center inline-flex h-10 w-10 items-center justify-center
            rounded-full border shadow-md hover:shadow-lg
            focus:outline-none focus-visible:ring-2 focus-visible:ring-black/20
            bg-white text-black
          "
          style={{
            backgroundColor: "#fff",
            color: "#000",
            borderColor: "rgba(0,0,0,0.15)",
          }}
        >
          <ArrowUp className="w-7 h-7 text-black shrink-0" strokeWidth={2.5} />
        </button>

        <span aria-hidden className="justify-self-end" />
      </div>
    </footer>
  );
}
