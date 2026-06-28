import { profile } from "@/data/profile";
import ChatWidget from "@/components/ChatWidget";

export default function Home() {
  return (
    <>
      <main className="min-h-screen max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <section className="min-h-[60vh] flex flex-col justify-center mb-[70px]">
          <div className="mb-2">
            <span className="text-accent text-sm font-medium tracking-widest uppercase">
              Portfolio
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            {profile.name}
          </h1>
          <p className="text-xl md:text-2xl text-muted mb-2">
            {profile.title}
          </p>
          <p className="text-muted text-sm">{profile.location}</p>
          <blockquote className="mt-8 border-l-4 border-accent pl-4 italic text-muted max-w-xl">
            {profile.summary}
          </blockquote>
        </section>

        {/* Experience */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-10">Experience</h2>
          <div className="relative pl-8 border-l border-border">
            {profile.experience.map((exp, i) => (
              <div key={i} className="mb-10 relative">
                <div className="absolute -left-[calc(2rem+0.5px)] top-1 w-3 h-3 rounded-full bg-accent border-2 border-background" />
                <div className="bg-surface border border-border rounded-lg p-6">
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-bold">{exp.company}</h3>
                    <span className="text-xs text-muted whitespace-nowrap">
                      {exp.duration}
                    </span>
                  </div>
                  <p className="text-accent text-sm font-medium">{exp.role}</p>
                  <p className="text-muted text-xs mb-3">
                    {exp.period}
                    {exp.location && ` · ${exp.location}`}
                  </p>
                  <ul className="space-y-1">
                    {exp.highlights.map((h, j) => (
                      <li
                        key={j}
                        className="text-sm text-muted before:content-['–'] before:mr-2 before:text-accent"
                      >
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Skills & Languages */}
        <section className="mb-20 grid md:grid-cols-2 gap-10">
          <div>
            <h2 className="text-3xl font-bold mb-6">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <span
                  key={skill}
                  className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-6">Languages</h2>
            <ul className="space-y-2">
              {profile.languages.map((lang) => (
                <li key={lang.name} className="text-sm">
                  <span className="font-medium">{lang.name}</span>
                  <span className="text-muted ml-2">— {lang.level}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* Education */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Education</h2>
          <div className="grid gap-4">
            {profile.education.map((edu, i) => (
              <div
                key={i}
                className="bg-surface border border-border rounded-lg p-5"
              >
                <h3 className="font-bold">{edu.institution}</h3>
                <p className="text-sm text-accent">{edu.degree}</p>
                <p className="text-xs text-muted">{edu.period}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Publications */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-6">Publications</h2>
          <ul className="space-y-2">
            {profile.publications.map((pub, i) => (
              <li key={i} className="text-sm text-muted italic">
                &ldquo;{pub}&rdquo;
              </li>
            ))}
          </ul>
        </section>

        {/* Contact */}
        <footer className="border-t border-border pt-10 pb-20">
          <h2 className="text-3xl font-bold mb-6">Contact</h2>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href={`mailto:${profile.email}`}
              className="text-accent hover:text-accent-light text-sm transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-accent hover:text-accent-light text-sm transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </main>

      <ChatWidget />
    </>
  );
}
