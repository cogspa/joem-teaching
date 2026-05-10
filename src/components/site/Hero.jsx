import React, { useEffect, useRef, useState, useCallback } from "react";
import { ArrowDown } from "lucide-react";

const VIDEO_SRC_MP4 = "/media/hero-reel.mp4";
const VIDEO_SRC_WEBM = "/media/hero-reel.webm";

const lerp = (a, b, t) => a + (b - a) * t;

export default function Hero() {
  const sectionRef = useRef(null);
  const videoRef = useRef(null);
  const targetTimeRef = useRef(0);
  const rafRef = useRef(null);

  const [progress, setProgress] = useState(0);
  const [videoReady, setVideoReady] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);

  /* ── Prime video: load metadata, pause immediately, seek to 0 ── */
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = true;
    let cancelled = false;

    const prime = async () => {
      try {
        await v.play();
        v.pause();
        v.currentTime = 0;
      } catch {
        try { v.currentTime = 0; } catch {}
      }
      if (!cancelled) {
        setVideoDuration(v.duration || 0);
        setVideoReady(true);
      }
    };

    const onMeta = () => { if (!cancelled) prime(); };
    const onError = () => { if (!cancelled) setVideoReady(false); };

    if (v.readyState >= 1) { prime(); }
    else {
      v.addEventListener("loadedmetadata", onMeta, { once: true });
      v.addEventListener("error", onError, { once: true });
    }

    return () => {
      cancelled = true;
      v.removeEventListener("loadedmetadata", onMeta);
      v.removeEventListener("error", onError);
    };
  }, []);

  /* ── Scroll handler: maps scroll position → target video time ── */
  const handleScroll = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rect = section.getBoundingClientRect();
    const total = rect.height - window.innerHeight;
    const passed = Math.min(Math.max(-rect.top, 0), total);
    const p = total > 0 ? passed / total : 0;
    setProgress(p);

    if (videoDuration > 0) {
      targetTimeRef.current = p * videoDuration;
    }
  }, [videoDuration]);

  /* ── Animation loop: lerp video.currentTime toward target ── */
  useEffect(() => {
    const tick = () => {
      const v = videoRef.current;
      if (v && videoReady) {
        const target = targetTimeRef.current;
        const cur = v.currentTime;
        const diff = target - cur;
        if (Math.abs(diff) > 0.004) {
          v.currentTime = lerp(cur, target, 0.16);
        } else if (Math.abs(diff) > 0) {
          v.currentTime = target;
        }
      }
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [videoReady]);

  /* ── Attach scroll / resize listeners ── */
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
    <section ref={sectionRef} id="top" className="hero-wrap" data-testid="hero-section">
      <div className="hero-sticky">
        {/* Scroll-driven video — NO autoPlay, NO loop */}
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
          <source src={VIDEO_SRC_WEBM} type="video/webm" />
          <source src={VIDEO_SRC_MP4} type="video/mp4" />
        </video>

        {/* Gradient fallback (visible when video is missing or loading) */}
        <div
          className="absolute inset-0 z-[1]"
          style={{
            background:
              "radial-gradient(ellipse 80% 60% at 30% 40%, rgba(212,175,55,0.12) 0%, transparent 60%), " +
              "radial-gradient(ellipse 70% 50% at 75% 65%, rgba(139,161,187,0.1) 0%, transparent 55%), " +
              "linear-gradient(180deg, #0a111a 0%, #0e1724 50%, #0a111a 100%)",
          }}
        />
        <div className="hero-tint" />
        <div className="hero-vignette" />

        {/* Content overlay */}
        <div className="relative z-10 h-full w-full">
          <div className="grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 h-full pt-28 md:pt-32 pb-16">
            {/* Left: copy */}
            <div className="col-span-12 md:col-span-7 lg:col-span-7 flex flex-col justify-end">
              <div className="max-w-[640px]">
                <div className="cue-state cue-active inline-flex items-center gap-3 mb-6">
                  <span
                    className="font-mono-cap text-white/75 px-2.5 py-1 rounded-full"
                    style={{
                      background: "rgba(212,175,55,0.1)",
                      border: "1px solid rgba(212,175,55,0.3)",
                    }}
                  >
                    Joe Micallef &nbsp;•&nbsp; Educator &amp; Professor
                  </span>
                </div>

                <h1
                  className="cue-state cue-active font-display text-white"
                  style={{
                    fontSize: "clamp(40px, 6.5vw, 92px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.025em",
                  }}
                  data-testid="hero-title"
                >
                  Animation, Design{" "}
                  <span className="italic-display" style={{ color: "#d4af37" }}>
                    &amp; Development
                  </span>{" "}
                  Portfolio.
                </h1>

                <p
                  className="cue-state cue-active mt-6 max-w-[520px] text-white/70"
                  style={{
                    fontSize: "clamp(15px, 1.05vw, 17px)",
                    lineHeight: 1.6,
                    fontWeight: 400,
                  }}
                >
                  Showcasing student projects and personal work from my 15-year
                  history as an educator and professor at Pasadena City College
                  and OTIS. My focus encompasses Animation, UX, 3D Design, Web
                  Development, Graphic Design, and 3D printing.
                </p>

                {/* Quick actions */}
                <div className="mt-10 flex flex-wrap items-center gap-3">
                  <a href="#student-work" className="pill pill-light" data-testid="hero-student-cta">
                    Student Work
                  </a>
                  <a href="#personal-work" className="pill pill-dark" data-testid="hero-personal-cta">
                    Personal Work
                  </a>
                </div>
              </div>
            </div>

            {/* Right: floating info panel */}
            <aside className="col-span-12 md:col-span-5 lg:col-span-5 hidden md:flex justify-end">
              <div className="self-end mb-2 w-full max-w-[340px]">
                <div
                  className="rounded-2xl p-5"
                  style={{
                    background: "rgba(17, 26, 38, 0.7)",
                    border: "1px solid rgba(212,175,55,0.15)",
                    backdropFilter: "blur(18px)",
                  }}
                  data-testid="hero-info-panel"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono-cap text-white/55">Teaching</span>
                    <span className="flex items-center gap-2 font-mono-cap text-white/85">
                      <span
                        className="h-1.5 w-1.5 rounded-full"
                        style={{
                          background: "#d4af37",
                          boxShadow: "0 0 12px #d4af37",
                        }}
                      />
                      15+ Years
                    </span>
                  </div>
                  <div className="mt-4 space-y-3">
                    {[
                      ["Animation", "2D, Stop Motion, Cel"],
                      ["3D & VFX", "Houdini, Maya, Blender, ZBrush"],
                      ["Design", "UX, Graphic, Web Development"],
                    ].map(([t, s], i) => (
                      <div key={t} className="flex items-start gap-3">
                        <span className="font-mono-cap text-white/35 mt-1">0{i + 1}</span>
                        <div>
                          <div className="text-[14px] text-white">{t}</div>
                          <div className="text-[13px] text-white/55">{s}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>

          {/* Scroll cue — fades out after scroll starts */}
          <div
            className="absolute left-1/2 -translate-x-1/2 bottom-10 flex flex-col items-center gap-2 transition-opacity duration-500"
            style={{ opacity: progress < 0.04 ? 1 : 0 }}
          >
            <span className="font-mono-cap text-white/55">Scroll · video-led</span>
            <ArrowDown className="h-4 w-4 text-white/55 animate-bounce" />
          </div>

          {/* Progress bar */}
          <div className="hero-progress-track">
            <div className="hero-progress-fill" style={{ transform: `scaleX(${progress})` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
