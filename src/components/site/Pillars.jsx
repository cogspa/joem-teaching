import React from "react";

const PILLARS = [
  {
    n: "01",
    t: "2D Animation",
    d: "Traditional cel animation, digital 2D workflows, walk cycles, and character animation. Students learn the fundamentals that have powered the art form for a century.",
    tags: ["Cel", "Digital 2D", "Walk Cycles"],
  },
  {
    n: "02",
    t: "3D Design & VFX",
    d: "Houdini, Maya, Blender, and ZBrush — modeling, rigging, compositing, and visual effects pipelines used in professional studios worldwide.",
    tags: ["Houdini", "Maya", "ZBrush"],
  },
  {
    n: "03",
    t: "Stop Motion",
    d: "Hands-on puppet and clay animation, armature building, and set construction. The discipline that teaches patience and precision above all else.",
    tags: ["Puppets", "Clay", "Sets"],
  },
  {
    n: "04",
    t: "Design & Development",
    d: "UX/UI design, web development, graphic design, and 3D printing. The bridge between creative thinking and technical execution.",
    tags: ["UX", "Web Dev", "3D Print"],
  },
];

export default function Pillars() {
  return (
    <section
      id="disciplines"
      className="relative"
      style={{ background: "var(--c-ink)" }}
      data-testid="pillars-section"
    >
      <div className="grain glow-bg">
        <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 pt-28 md:pt-40 pb-24">
          <div className="col-span-12 md:col-span-2">
            <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
              Disciplines
            </span>
          </div>
          <div className="col-span-12 md:col-span-9">
            <h2
              className="font-display text-white"
              style={{
                fontSize: "clamp(40px, 6.4vw, 96px)",
                lineHeight: 0.96,
                letterSpacing: "-0.03em",
              }}
              data-testid="pillars-headline"
            >
              The full spectrum of{" "}
              <span className="italic-display" style={{ color: "#d4af37" }}>
                creative practice.
              </span>
            </h2>
            <p
              className="mt-6 max-w-[640px] text-[15px] leading-relaxed font-normal"
              style={{ color: "rgba(255,255,255,0.62)" }}
            >
              Four disciplines, one mission: giving students the technical
              foundation and creative confidence to build real careers in
              animation and design.
            </p>
          </div>

          {/* Pillar grid */}
          <div className="col-span-12 mt-14 grid grid-cols-1 md:grid-cols-2 gap-4">
            {PILLARS.map((p, i) => (
              <article
                key={p.n}
                className="pillar-card rounded-3xl p-7 md:p-9"
                style={{
                  background: i % 2 === 0
                    ? "rgba(255,255,255,0.03)"
                    : "rgba(212,175,55,0.04)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                data-testid={`pillar-${p.n}`}
              >
                <div className="flex items-start justify-between">
                  <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.55)" }}>
                    {p.n}
                  </span>
                  <span className="font-mono-cap" style={{ color: "rgba(255,255,255,0.3)" }}>
                    Discipline
                  </span>
                </div>
                <h3
                  className="mt-10 font-display text-white"
                  style={{
                    fontSize: "clamp(26px, 2.7vw, 38px)",
                    lineHeight: 1.05,
                    letterSpacing: "-0.02em",
                  }}
                >
                  {p.t}
                </h3>
                <p
                  className="mt-5 text-[14.5px] leading-relaxed font-normal"
                  style={{ color: "rgba(255,255,255,0.55)" }}
                >
                  {p.d}
                </p>
                <div className="mt-8 flex flex-wrap gap-2">
                  {p.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
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
