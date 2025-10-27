import { Download, Mail, MapPin, Phone } from "lucide-react";

const CONTACT = {
  heading: "Contact Info",
  subheading: "I'm actively seeking 2026 Software Development and Engineering internships!",
  blurb:
    "I would love to discuss how I can contribute to your team, what your interview process is like, and any other advice you may have!",
  email: "cthompson2@bowdoin.edu",
  phone: "978-618-7073",
  location: "Boston, Massachusetts",
  resumeUrl: "/thompsonCalvinResume.pdf",
};

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 sm:py-14">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-tight text-white text-center mb-4">
        Get In Touch
      </h2>
      <p className="text-sm sm:text-base text-white/80 leading-relaxed text-center mb-6">
        {CONTACT.subheading}
      </p>

      <div className="mx-auto max-w-3xl rounded-xl border border-white/5 bg-black/20 p-5 sm:p-6">
        <div className="rounded-xl bg-white text-slate-900 shadow-xl ring-1 ring-black/10 p-6 sm:p-7">
          <h3 className="text-xl font-semibold mb-2">{CONTACT.heading}</h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed mb-5">
            {CONTACT.blurb}
          </p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-300">
                <Mail className="w-5 h-5 text-slate-700" />
              </span>
              <a
                href={`mailto:${CONTACT.email}`}
                className="underline break-all !text-slate-900 hover:!text-slate-900 visited:!text-slate-900"
              >
                {CONTACT.email}
              </a>
            </li>

            {CONTACT.phone && (
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-300">
                  <Phone className="w-5 h-5 text-slate-700" />
                </span>
                <a
                  href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`}
                  className="underline !text-slate-900 hover:!text-slate-900 visited:!text-slate-900"
                >
                  {CONTACT.phone}
                </a>
              </li>
            )}

            {CONTACT.location && (
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 border border-slate-300">
                  <MapPin className="w-5 h-5 text-slate-700" />
                </span>
                <span>{CONTACT.location}</span>
              </li>
            )}
          </ul>

          <hr className="my-6 border-slate-200" />

          <div className="grid">
            <a
              href={CONTACT.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 px-4 py-3 text-sm font-medium !text-slate-900 hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
            >
              <Download className="w-4 h-4" />
              Download Resume
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
