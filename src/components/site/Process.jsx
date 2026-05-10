import React from "react";

const STEPS = [
  {
    n: "01",
    label: "step 1 / 4",
    t: "Foundation",
    d: "Students begin with the fundamentals — principles of animation, design thinking, and the tools of the trade. Every skill gets built on solid ground.",
    tags: ["Principles", "Tools", "Technique"],
  },
  {
    n: "02",
    label: "step 2 / 4",
    t: "Exploration",
    d: "Experimentation across mediums — 2D, 3D, stop motion, digital design. Students find their voice by working through diverse creative challenges.",
    tags: ["2D", "3D", "Stop Motion"],
  },
  {
    n: "03",
    label: "step 3 / 4",
    t: "Refinement",
    d: "Critique, revision, and polish. Students learn to see their work through professional eyes and iterate until the craft meets the concept.",
    tags: ["Critique", "Revision", "Polish"],
  },
  {
    n: "04",
    label: "step 4 / 4",
    t: "Portfolio",
    d: "The finished piece enters the portfolio. Students leave with professional-quality work, ready for industry applications and further education.",
    tags: ["Showcase", "Industry", "Career"],
  },
];

export default function Process() {
  return (
    <section
      id="process"
      className="relative"
      style={{ background: "var(--c-ink-2)" }}
      data-testid="process-section"
    >
      <div className="grain glow-bg">
        <div
          className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-24 md:py-32"
          style={{ borderTop: "1px solid rgba(212,175,55,0.1)" }}
        >
          <div className="col-span-12 md:col-span-4">
            <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
              Teaching Process
            </span>
            <h2
              className="mt-4 font-display text-white"
              style={{
                fontSize: "clamp(40px, 5.2vw, 76px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
              }}
              data-testid="process-headline"
            >
              From concept to{" "}
              <span className="italic-display" style={{ color: "#d4af37" }}>
                portfolio piece.
              </span>
            </h2>
            <p className="mt-5 text-[14px] font-mono-cap" style={{ color: "rgba(212,175,55,0.45)" }}>
              Four phases · every semester
            </p>
          </div>

          <div className="col-span-12 md:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            {STEPS.map((s) => (
              <article
                key={s.n}
                className="rounded-3xl p-7 md:p-8"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                data-testid={`process-step-${s.n}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="font-display text-[34px] md:text-[42px] text-white"
                    style={{ letterSpacing: "-0.02em" }}
                  >
                    {s.n}
                  </span>
                  <span className="font-mono-cap" style={{ color: "rgba(255,255,255,0.4)" }}>
                    {s.label}
                  </span>
                </div>
                <h3
                  className="mt-5 font-display text-white"
                  style={{
                    fontSize: "clamp(24px, 2.4vw, 34px)",
                    lineHeight: 1,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {s.t}
                </h3>
                <p className="mt-4 text-[14.5px] leading-relaxed font-normal" style={{ color: "rgba(255,255,255,0.55)" }}>
                  {s.d}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
