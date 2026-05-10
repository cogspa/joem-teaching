import React, { useEffect, useRef, useState, useCallback } from "react";

const FACTS = [
  ["Institutions", "PCC · OTIS"],
  ["Based", "Los Angeles, CA"],
  ["Experience", "15+ years in education"],
  ["Disciplines", "Animation · Design · 3D · Web"],
];



export default function About() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);

  const [progress, setProgress] = useState(0);

  /* ── Prime video: play/pause to unlock seeking ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;

    const prime = async () => {
      try {
        await v.play();
        v.pause();
        v.currentTime = 0;
      } catch {
        try { v.currentTime = 0; } catch {}
      }
    };

    if (v.readyState >= 1) prime();
    else v.addEventListener("loadedmetadata", prime, { once: true });

    return () => v.removeEventListener("loadedmetadata", prime);
  }, []);

  /* ── Scroll → directly set currentTime ── */
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    const v = videoRef.current;
    if (!section || !v) return;

    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    if (total <= 0) return;

    const passed = Math.min(Math.max(-rect.top, 0), total);
    const p = passed / total;
    setProgress(p);

    // Direct seek — no lerp, no RAF
    const dur = v.duration;
    if (dur && isFinite(dur) && dur > 0) {
      const targetTime = p * dur;
      // Only seek if difference is meaningful (avoids redundant seeks)
      if (Math.abs(v.currentTime - targetTime) > 0.05) {
        v.currentTime = targetTime;
      }
    }
  }, []);

  /* ── Listeners ── */
  useEffect(() => {
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [handleScroll]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="about-wrap"
      data-testid="about-section"
    >
      <div className="about-sticky">
        {/* Background scroll-driven video */}
        <video
          ref={videoRef}
          className="hero-video"
          muted
          playsInline
          preload="auto"
          tabIndex={-1}
          aria-hidden="true"
          onError={(e) => { e.target.style.display = 'none'; }}
        >
          <source src="/media/hero-reel2.webm" type="video/webm" />
          <source src="/media/hero-reel2.mp4" type="video/mp4" />
        </video>

        {/* Gradient fallback */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 60%), " +
              "radial-gradient(ellipse 70% 50% at 75% 65%, rgba(139,161,187,0.1) 0%, transparent 55%), " +
              "linear-gradient(180deg, #0e1724 0%, #0a111a 50%, #0e1724 100%)",
          }}
        />
        <div className="hero-tint" />
        <div className="hero-vignette" />

        {/* Content overlay */}
        <div className="relative z-10 h-full w-full">
          <div className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-24 md:py-32">
            <div className="col-span-12 md:col-span-3">
              <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.7)" }}>
                About
              </span>
            </div>
            <div className="col-span-12 md:col-span-9">
              <h2
                className="font-display text-white"
                style={{
                  fontSize: "clamp(40px, 5.4vw, 80px)",
                  lineHeight: 1,
                  letterSpacing: "-0.025em",
                }}
                data-testid="about-headline"
              >
                A career built at the{" "}
                <span className="italic-display" style={{ color: "#d4af37" }}>
                  intersection of art
                </span>{" "}
                and technology.
              </h2>

              <div className="mt-12 grid grid-cols-12 gap-6">
                {/* Portrait card */}
                <div
                  className="col-span-12 md:col-span-5 rounded-3xl overflow-hidden"
                  style={{
                    aspectRatio: "4/5",
                    background:
                      "linear-gradient(160deg, #1b2430 0%, #111a26 60%, #0a111a 100%)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    position: "relative",
                  }}
                  data-testid="educator-portrait"
                >
                  <img
                    src="/assets/joe-portrait.png"
                    alt="Joe Micallef"
                    className="absolute inset-0 w-full h-full object-cover"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "radial-gradient(50% 40% at 60% 35%, rgba(212,175,55,0.2) 0%, rgba(0,0,0,0) 60%), radial-gradient(40% 35% at 30% 75%, rgba(139,161,187,0.15) 0%, rgba(0,0,0,0) 60%)",
                    }}
                  />
                  <div className="absolute inset-0 grain opacity-30" />
                  <div
                    className="absolute inset-x-0 bottom-0 h-1/3"
                    style={{ background: "linear-gradient(to top, rgba(10,17,26,0.85), transparent)" }}
                  />
                  <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">
                    <div>
                      <div className="font-display text-[22px] tracking-tight text-white">Joe Micallef</div>
                      <div className="font-mono-cap mt-1" style={{ color: "rgba(255,255,255,0.5)" }}>
                        Educator · 2026
                      </div>
                    </div>
                    <div
                      className="font-mono-cap px-2.5 py-1 rounded-full"
                      style={{
                        background: "rgba(212,175,55,0.2)",
                        color: "#d4af37",
                        border: "1px solid rgba(212,175,55,0.3)",
                      }}
                    >
                      Professor
                    </div>
                  </div>
                </div>

                {/* Text + facts */}
                <div className="col-span-12 md:col-span-7">
                  <h3
                    className="font-display text-white"
                    style={{
                      fontSize: "clamp(26px, 2.6vw, 38px)",
                      lineHeight: 1.05,
                      letterSpacing: "-0.02em",
                    }}
                  >
                    Hi, I&rsquo;m Joe.
                  </h3>
                  <p
                    className="mt-5 text-[15px] leading-relaxed font-normal max-w-[540px]"
                    style={{ color: "rgba(255,255,255,0.62)" }}
                  >
                    For over fifteen years I&rsquo;ve taught animation, design, and
                    development at Pasadena City College and OTIS College of Art
                    and Design. My practice spans 2D cel animation, 3D modeling and
                    VFX, stop motion, UX design, web development, and 3D printing.
                    This site collects the best work from my students alongside my
                    own professional projects.
                  </p>

                  <dl className="mt-10 grid grid-cols-2 gap-y-5 gap-x-8 max-w-[520px]">
                    {FACTS.map(([k, v]) => (
                      <div key={k} className="flex flex-col" data-testid={`fact-${k.toLowerCase()}`}>
                        <dt className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
                          {k}
                        </dt>
                        <dd className="mt-1 text-[15px]" style={{ color: "rgba(255,255,255,0.85)" }}>
                          {v}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="mt-10 flex flex-wrap items-center gap-3">
                    <a href="#contact" data-testid="about-contact-cta" className="pill pill-light">
                      Get in touch
                    </a>
                    <a
                      href="https://joemdemo.com/"
                      target="_blank"
                      rel="noopener noreferrer"
                      data-testid="about-reel"
                      className="text-[14px] underline-offset-4 hover:underline"
                      style={{ color: "rgba(255,255,255,0.7)" }}
                    >
                      joemdemo.com →
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="hero-progress-track">
          <div className="hero-progress-fill" style={{ transform: `scaleX(${progress})` }} />
        </div>
      </div>
    </section>
  );
}
