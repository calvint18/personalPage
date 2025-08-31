import { Download, Mail, MapPin, Phone } from "lucide-react";


const CONTACT = {
  heading: "Contact Info",
  subheading: "I'd love to hear from you!",
  blurb:
    "Feel free to reach out if you have any questions, want to discuss a project, or just want to say hello.",
  email: "cthompson2@bowdoin.edu",
  phone: "978-618-7073",
  location: "Boston, Massachusetts",
  resumeUrl: "/resume.pdf",   
};

export default function Contact() {
  return (
    <section id="contact" className="scroll-mt-24 mx-auto max-w-6xl px-4 py-12 sm:py-14">
      <h2 className="text-2xl md:text-3xl font-semibold tracking-tight text-center mb-8">
        Get In Touch
      </h2>
      <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-5">{CONTACT.subheading}</p>

      <div className="mx-auto max-w-3xl rounded-[28px] p-[1px] bg-gradient-to-b from-indigo-500/25 via-indigo-500/10 to-transparent">
        <div className="rounded-[26px] border border-indigo-300/40 bg-white/70 dark:bg-slate-900/50 shadow-lg backdrop-blur p-6 sm:p-7">
          <h3 className="text-xl font-semibold text-indigo-600 mb-2">{CONTACT.heading}</h3>
          <p className="text-sm sm:text-base opacity-80 leading-relaxed mb-5">{CONTACT.blurb}</p>

          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50">
                <Mail className="w-5 h-5 text-indigo-600" />
              </span>
              <a href={`mailto:${CONTACT.email}`} className="underline break-all">
                {CONTACT.email}
              </a>
            </li>

            {CONTACT.phone && (
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50">
                  <Phone className="w-5 h-5 text-indigo-600" />
                </span>
                <a href={`tel:${CONTACT.phone.replace(/[^0-9+]/g, "")}`} className="underline">
                  {CONTACT.phone}
                </a>
              </li>
            )}

            {CONTACT.location && (
              <li className="flex items-center gap-3">
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-50 dark:bg-indigo-500/10 border border-indigo-200/50">
                  <MapPin className="w-5 h-5 text-indigo-600" />
                </span>
                <span>{CONTACT.location}</span>
              </li>
            )}
          </ul>

          <hr className="my-6 border-indigo-200/40 dark:border-indigo-800/40" />

          <div className="grid">
            <a
              href={CONTACT.resumeUrl}
              download
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-indigo-300/60 px-4 py-3 text-sm font-medium hover:bg-indigo-50 dark:hover:bg-indigo-900/20"
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
