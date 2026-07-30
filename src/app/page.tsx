import { profile } from "@/data/profile";
import ChatWidget from "@/components/ChatWidget";
import AskButton from "@/components/AskButton";

// The span: every role drawn against one shared axis.
const AXIS_START = 2001;
const AXIS_END = 2027;
const AXIS_SPAN = AXIS_END - AXIS_START;
const TICKS = [2005, 2010, 2015, 2020, 2025];

const pct = (year: number) => ((year - AXIS_START) / AXIS_SPAN) * 100;

function Gridlines() {
  return (
    <>
      {TICKS.map((t) => (
        <div
          key={t}
          aria-hidden
          className="absolute top-0 bottom-0 w-px bg-rule"
          style={{ left: `${pct(t)}%` }}
        />
      ))}
    </>
  );
}

function SectionHead({
  label,
  title,
  note,
  compact = false,
}: {
  label: string;
  title: string;
  note?: string;
  compact?: boolean;
}) {
  return (
    <div className={compact ? "mb-6" : "mb-10"}>
      <div className="flex items-center gap-3 mb-4">
        <span className="w-6 h-px bg-brass" aria-hidden />
        <span className="label text-brass">{label}</span>
      </div>
      <h2
        className={`font-display font-bold tracking-tight ${
          compact ? "text-2xl" : "text-3xl sm:text-4xl"
        }`}
      >
        {title}
      </h2>
      {note && (
        <p className="text-muted text-sm mt-3 max-w-xl leading-relaxed">
          {note}
        </p>
      )}
    </div>
  );
}

function Chip({ children }: { children: React.ReactNode }) {
  return (
    <span className="readout text-[11px] text-muted border border-rule bg-surface-2 rounded px-2 py-1">
      {children}
    </span>
  );
}

export default function Home() {
  const now = new Date();
  const nowPoint = now.getFullYear() + now.getMonth() / 12;
  const totalYears = Math.floor(nowPoint - profile.careerStart);
  const currentRole = profile.experience.find((e) => e.current);
  const tenure = currentRole
    ? Math.floor(nowPoint - currentRole.start)
    : 0;

  const readout = [
    { value: String(totalYears), unit: "yrs", label: "Shipping software" },
    { value: String(profile.experience.length), unit: "", label: "Roles held" },
    { value: String(tenure), unit: "yrs", label: "At Niup, current" },
    { value: String(profile.countries.length), unit: "", label: "Countries" },
  ];

  return (
    <>
      <main className="max-w-5xl mx-auto px-6 sm:px-10">
        {/* ── Hero ─────────────────────────────────────────────── */}
        <section className="pt-20 sm:pt-28 pb-14">
          <div className="rise flex items-center gap-3 mb-7">
            <span className="relative flex w-2 h-2">
              <span className="now-pip absolute inset-0 rounded-full" aria-hidden />
              <span className="relative w-2 h-2 rounded-full bg-patina" />
            </span>
            <span className="label text-muted">
              {profile.location} · Senior engineer since 2005
            </span>
          </div>

          <h1
            className="rise font-display font-extrabold uppercase leading-[0.9] tracking-[-0.03em] text-[clamp(2.5rem,8vw,4.75rem)]"
            style={{ animationDelay: "60ms" }}
          >
            <span className="block">{profile.firstName}</span>
            <span className="block">{profile.lastName}</span>
          </h1>

          <div
            className="rise mt-10 flex flex-wrap items-center gap-3"
            style={{ animationDelay: "140ms" }}
          >
            <a
              href={`mailto:${profile.email}`}
              className="readout text-sm bg-brass text-on-brass font-medium rounded px-5 py-3 hover:bg-brass-light transition-colors"
            >
              {profile.email}
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="readout text-sm border border-rule-strong rounded px-5 py-3 hover:border-brass hover:text-brass transition-colors"
            >
              LinkedIn ↗
            </a>
            <AskButton className="readout text-sm border border-rule-strong rounded px-5 py-3 hover:border-brass hover:text-brass transition-colors">
              Ask about my work
            </AskButton>
          </div>
        </section>

        {/* ── Readout panel ────────────────────────────────────── */}
        <section
          className="rise border-y border-rule"
          style={{ animationDelay: "300ms" }}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-rule">
            {readout.map((cell) => (
              <div key={cell.label} className="bg-background py-7 px-5">
                <p className="readout text-4xl sm:text-5xl font-medium leading-none">
                  {cell.value}
                  {cell.unit && (
                    <span className="text-base text-muted ml-1.5 font-normal">
                      {cell.unit}
                    </span>
                  )}
                </p>
                <p className="label text-muted mt-3">{cell.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── The span: signature ──────────────────────────────── */}
        <section className="pt-20 sm:pt-24">
          <SectionHead
            label="The span"
            title={`${totalYears} years, to scale`}
            note="Every role drawn against one axis, at true width. Continuous since 2001 — from mainframe support to SaaS architecture."
          />

          <div className="grid grid-cols-[3.75rem_1fr] sm:grid-cols-[6.5rem_1fr] gap-x-3 sm:gap-x-5">
            {profile.experience.map((exp, i) => {
              const end = exp.end ?? nowPoint;
              const delay = (profile.experience.length - 1 - i) * 80;
              return (
                <div key={exp.company} className="contents">
                  <div className="flex items-center justify-end h-10">
                    <span
                      className={`readout text-[11px] truncate ${
                        exp.current ? "text-patina" : "text-muted"
                      }`}
                    >
                      {exp.short}
                    </span>
                  </div>
                  <div className="relative h-10">
                    <Gridlines />
                    <div
                      role="img"
                      aria-label={`${exp.company}: ${exp.period}, ${exp.duration}`}
                      className="span-bar absolute top-1/2 -translate-y-1/2 h-2.5 rounded-full"
                      style={{
                        left: `${pct(exp.start)}%`,
                        width: `${pct(end) - pct(exp.start)}%`,
                        minWidth: "10px",
                        animationDelay: `${delay}ms`,
                        backgroundColor: exp.current
                          ? "var(--patina)"
                          : "var(--brass)",
                        // Older roles recede.
                        opacity: exp.current ? 1 : 0.8 - i * 0.05,
                      }}
                      title={`${exp.short} · ${exp.period} · ${exp.duration}`}
                    />
                  </div>
                </div>
              );
            })}

            {/* Axis */}
            <div />
            <div className="relative h-8 border-t border-rule-strong">
              {[AXIS_START, ...TICKS].map((t) => (
                <span
                  key={t}
                  className="readout absolute top-2 text-[10px] text-muted"
                  style={{
                    left: `${pct(t)}%`,
                    transform: t === AXIS_START ? "none" : "translateX(-50%)",
                  }}
                >
                  {t === AXIS_START ? t : `’${String(t).slice(2)}`}
                </span>
              ))}
              <span className="readout absolute top-2 right-0 text-[10px] text-patina">
                now
              </span>
            </div>
          </div>
        </section>

        {/* ── Experience ───────────────────────────────────────── */}
        <section className="pt-20 sm:pt-28">
          <SectionHead
            label="Track record"
            title="Where the time went"
          />

          <div className="space-y-4">
            {profile.experience.map((exp) => {
              const [from, to] = exp.period.split(" – ");
              return (
                <article
                  key={exp.company}
                  className={`bg-surface border rounded-lg p-6 sm:p-7 transition-colors ${
                    exp.current
                      ? "border-patina/45"
                      : "border-rule hover:border-rule-strong"
                  }`}
                >
                  <div className="grid gap-5 sm:grid-cols-[7.5rem_1fr] sm:gap-8">
                    {/* Left rail: the measurements */}
                    <div className="flex flex-wrap items-baseline gap-x-3 sm:block">
                      <p className="readout text-xs text-foreground">
                        {from}
                        <span className="hidden sm:inline">
                          <br />
                        </span>
                        <span className="sm:hidden"> – </span>
                        {to}
                      </p>
                      <p className="readout text-[11px] text-brass mt-0 sm:mt-2">
                        {exp.duration}
                      </p>
                      {exp.location && (
                        <p className="readout text-[11px] text-muted sm:mt-1">
                          {exp.location}
                        </p>
                      )}
                    </div>

                    {/* Right: the substance */}
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-1">
                        <h3 className="font-display font-bold text-xl tracking-tight">
                          {exp.company}
                        </h3>
                        {exp.current && (
                          <span className="label text-patina border border-patina/40 rounded px-2 py-0.5 text-[10px]">
                            Now
                          </span>
                        )}
                      </div>
                      <p className="text-sm font-medium text-brass mb-4">
                        {exp.role}
                      </p>

                      <ul className="space-y-2.5 mb-5">
                        {exp.highlights.map((h) => (
                          <li key={h} className="flex gap-3">
                            <span
                              aria-hidden
                              className="mt-[0.45rem] w-1.5 h-1.5 shrink-0 bg-brass rounded-sm"
                            />
                            <span className="text-sm text-foreground/80 leading-relaxed">
                              {h}
                            </span>
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-1.5">
                        {exp.stack.map((s) => (
                          <Chip key={s}>{s}</Chip>
                        ))}
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* ── Stack ────────────────────────────────────────────── */}
        <section className="pt-20 sm:pt-28">
          <SectionHead
            label="Toolkit"
            title="What I build with"
            note="Grouped from the work above, not a wish list."
          />
          <div className="grid gap-x-10 gap-y-8 sm:grid-cols-2">
            {profile.stack.map((group) => (
              <div key={group.group}>
                <div className="flex items-center gap-3 mb-4">
                  <p className="label text-muted">{group.group}</p>
                  <span className="flex-1 h-px bg-rule" aria-hidden />
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((item) => (
                    <span
                      key={item}
                      className="text-sm border border-rule bg-surface rounded px-3 py-1.5 hover:border-brass hover:text-brass transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Education & languages ────────────────────────────── */}
        <section className="pt-20 sm:pt-28 grid gap-12 md:grid-cols-[1.4fr_1fr] md:gap-16">
          <div>
            <SectionHead label="Education" title="Formal grounding" compact />
            <div className="space-y-3">
              {profile.education.map((edu) => (
                <div
                  key={edu.institution}
                  className="bg-surface border border-rule rounded-lg p-5"
                >
                  <div className="flex items-baseline justify-between gap-4 mb-1">
                    <h3 className="font-display font-bold text-base tracking-tight">
                      {edu.institution}
                    </h3>
                    <span className="readout text-[11px] text-muted whitespace-nowrap">
                      {edu.period}
                    </span>
                  </div>
                  <p className="text-sm text-foreground/75">{edu.degree}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionHead label="Languages" title="How I communicate" compact />
            <ul className="space-y-5">
              {profile.languages.map((lang) => (
                <li key={lang.name}>
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="flex gap-1" aria-hidden>
                      {[1, 2, 3, 4, 5].map((n) => (
                        <span
                          key={n}
                          className={`w-1.5 h-1.5 rounded-full ${
                            n <= lang.scale ? "bg-brass" : "bg-rule-strong"
                          }`}
                        />
                      ))}
                    </span>
                  </div>
                  <p className="readout text-[11px] text-muted">{lang.level}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* ── Contact ──────────────────────────────────────────── */}
        <footer className="pt-20 sm:pt-28 pb-32">
          <div className="border border-rule rounded-lg bg-surface p-8 sm:p-12">
            <div className="flex items-center gap-3 mb-5">
              <span className="w-6 h-px bg-brass" aria-hidden />
              <span className="label text-brass">Get in touch</span>
            </div>
            <h2 className="font-display font-bold text-3xl sm:text-4xl tracking-tight mb-4">
              Hiring for a senior or lead role?
            </h2>
            <p className="text-muted text-sm leading-relaxed max-w-xl mb-8">
              Email is the fastest way to reach me. If you would rather dig
              through the detail first, the assistant at the corner of this page
              answers questions about my experience.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="readout text-sm bg-brass text-on-brass font-medium rounded px-5 py-3 hover:bg-brass-light transition-colors"
              >
                {profile.email}
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="readout text-sm border border-rule-strong rounded px-5 py-3 hover:border-brass hover:text-brass transition-colors"
              >
                LinkedIn ↗
              </a>
            </div>

            <div className="mt-10 pt-8 border-t border-rule">
              <p className="label text-muted mb-3">How I see it</p>
              <p className="text-sm text-foreground/70 leading-relaxed max-w-xl italic">
                {profile.summary}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 mt-8">
            <p className="readout text-[11px] text-muted">
              {profile.location} · {profile.title} at {profile.company}
            </p>
            <p className="readout text-[11px] text-muted">
              {profile.careerStart}—present
            </p>
          </div>
        </footer>
      </main>

      <ChatWidget />
    </>
  );
}
