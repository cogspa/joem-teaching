import React, { useState, useRef, useCallback, useEffect } from "react";

const WALK_CYCLES = [
  "assets/alekyananush_LATE_3920591_86187685_walkcycle.mp4",
  "assets/alevrasriverasofia_LATE_3902740_86053069_AlevrasAzul_WalkcycleReapeated.mp4",
  "assets/alvarezjaquelyne_LATE_3918998_86019403_walk cycle.mp4",
  "assets/chenethan_LATE_3910646_86032031_walkCycle_video_EthanChen.mp4",
  "assets/cisnerosvanessa_LATE_3903406_86186748_OG WalkingAssign.prj.mp4",
  "assets/gallardotapiajessica_LATE_3886973_86067476_Faith_Gina-Walk.mp4",
  "assets/garciapablo_LATE_3887323_86068352_Walking Animation.mp4",
  "assets/gublerlauren_LATE_3927168_86030767_WalkCycle.mp4",
  "assets/rodriguezkimberly_LATE_3869193_85987069_Walking cycle.gif",
  "assets/urcuyobrianna_LATE_3948385_86187835_Zarden-1.mp4",
  "assets/vanstralenbrian_3623215_85965591_frogfoot_walk0001.mp4",
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Student Work", value: "student" },
  { label: "2D Animation", value: "2d" },
];

function isVideo(src) {
  return /\.(mp4|mov|webm)$/i.test(src);
}

function MediaElement({ src, isMain = false }) {
  if (isVideo(src)) {
    return (
      <video
        key={src}
        src={src}
        muted
        playsInline
        loop
        autoPlay
        controls={isMain}
        style={{ width: "100%", height: "100%", objectFit: isMain ? "contain" : "cover", background: "#000" }}
      />
    );
  }
  return (
    <img
      key={src}
      src={src}
      alt="Walk cycle animation"
      loading="lazy"
      style={{ width: "100%", height: "100%", objectFit: isMain ? "contain" : "cover", background: "#000" }}
    />
  );
}

export default function StudentWork() {
  const [activeIndex, setActiveIndex] = useState(() => Math.floor(Math.random() * WALK_CYCLES.length));
  const [filter, setFilter] = useState("all");
  const thumbsRef = useRef(null);

  const selectWalk = useCallback((i) => {
    setActiveIndex(i);
  }, []);

  // Scroll active thumbnail into view (scoped to container only — no page shift)
  useEffect(() => {
    const container = thumbsRef.current;
    if (!container) return;
    const activeThumb = container.children[activeIndex];
    if (!activeThumb) return;
    const thumbLeft = activeThumb.offsetLeft;
    const thumbWidth = activeThumb.offsetWidth;
    const containerWidth = container.offsetWidth;
    const scrollTarget = thumbLeft - containerWidth / 2 + thumbWidth / 2;
    container.scrollTo({ left: scrollTarget, behavior: "smooth" });
  }, [activeIndex]);

  return (
    <section
      className="relative"
      id="student-work"
      style={{ background: "var(--c-ink-2)" }}
      data-testid="student-work-section"
    >
      <div className="grain glow-bg">
        <div className="relative z-[2] px-5 md:px-10 lg:px-14 py-24 md:py-32">
          {/* Section header */}
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
                Student Work
              </span>
              <h2
                className="mt-4 font-display text-white"
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.03em",
                }}
                data-testid="student-work-headline"
              >
                Animation examples from classes{" "}
                <span className="italic-display" style={{ color: "#d4af37" }}>
                  I have taught.
                </span>
              </h2>
              <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-[400px]">
                Examples from OTIS Summer of Art and Pasadena City College, presented as gallery cards with direct access to source material.
              </p>
            </div>
            <div className="col-span-12 md:col-span-8 flex items-end">
              <div className="flex flex-wrap gap-2.5">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    className={`filter-btn ${filter === f.value ? "active" : ""}`}
                    onClick={() => setFilter(f.value)}
                    data-testid={`filter-${f.value}`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Walk Cycle Showcase — full-width card */}
          <div
            className="media-card walk-cycle-showcase"
            data-testid="walk-cycle-showcase"
            style={{ display: filter === "all" || filter === "student" || filter === "2d" ? "flex" : "none" }}
          >
            <div className="media" style={{ aspectRatio: "16/9", background: "#000" }}>
              <MediaElement src={WALK_CYCLES[activeIndex]} isMain />
            </div>
            <div className="p-5 md:p-7">
              <div className="flex flex-wrap gap-2 mb-4">
                <span className="tag">Student Work</span>
                <span className="tag">Pasadena City College</span>
                <span className="tag">2D Animation</span>
              </div>
              <h3
                className="font-display text-white text-[22px] tracking-tight"
                style={{ letterSpacing: "-0.02em" }}
              >
                PCC Spring 2026 — Student Walk Cycles
              </h3>
              <p className="mt-3 text-[15px] text-white/60 leading-relaxed max-w-[600px]">
                An interactive gallery featuring walk cycle animations created by
                students in the Spring 2026 2D animation class at Pasadena City
                College. Select a thumbnail below to view different student works.
              </p>
              <div className="walk-cycle-thumbnails mt-5" ref={thumbsRef}>
                {WALK_CYCLES.map((src, i) => (
                  <div
                    key={i}
                    className={`walk-cycle-thumbnail ${i === activeIndex ? "active" : ""}`}
                    role="button"
                    aria-label={`View walk cycle ${i + 1}`}
                    onClick={() => selectWalk(i)}
                    data-testid={`walk-thumb-${i}`}
                  >
                    <MediaElement src={src} />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Additional student cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            {/* OTIS Summer of Art */}
            <article
              className="media-card"
              data-testid="otis-card"
              style={{ display: filter === "all" || filter === "student" || filter === "2d" ? "flex" : "none" }}
            >
              <div className="media">
                <video controls preload="metadata" playsInline>
                  <source
                    src="https://www.dropbox.com/scl/fi/kk08etc7kqrku9k8y34wk/Sequence-01.mp4?rlkey=a61ah7imuau5sd51cd7eqsir0&st=oc7nndvd&raw=1"
                    type="video/mp4"
                  />
                </video>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag">Student Work</span>
                  <span className="tag">OTIS Summer of Art</span>
                  <span className="tag">2D Animation</span>
                </div>
                <h3 className="font-display text-white text-[20px] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                  OTIS Summer of Art Student Animation
                </h3>
                <p className="mt-2 text-[14px] text-white/55 leading-relaxed">
                  Featured student animation example from the OTIS Summer of Art course.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    className="pill pill-light text-[13px]"
                    href="https://www.dropbox.com/scl/fi/kk08etc7kqrku9k8y34wk/Sequence-01.mp4?rlkey=a61ah7imuau5sd51cd7eqsir0&st=oc7nndvd&raw=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Play Direct
                  </a>
                  <a
                    className="pill pill-dark text-[13px]"
                    href="https://www.dropbox.com/scl/fi/kk08etc7kqrku9k8y34wk/Sequence-01.mp4?rlkey=a61ah7imuau5sd51cd7eqsir0&st=oc7nndvd&dl=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open in Dropbox
                  </a>
                </div>
              </div>
            </article>

            {/* PCC Folder */}
            <article
              className="media-card"
              data-testid="pcc-folder-card"
              style={{ display: filter === "all" || filter === "student" || filter === "2d" ? "flex" : "none" }}
            >
              <div className="placeholder-card" role="img" aria-label="PCC Dropbox folder">
                <div className="relative z-[1] text-center max-w-[32ch]">
                  <div
                    className="w-16 h-16 mx-auto mb-4 rounded-2xl grid place-items-center text-[1.65rem]"
                    style={{
                      border: "1px solid rgba(255,255,255,0.12)",
                      background: "rgba(255,255,255,0.08)",
                    }}
                  >
                    📁
                  </div>
                  <h3 className="font-display text-white text-[18px] tracking-tight m-0 mb-2">
                    PCC 2D Animation Examples
                  </h3>
                  <p className="text-[14px] text-white/55 leading-relaxed m-0">
                    Browse through a collection of top-tier student projects from Pasadena City College.
                  </p>
                </div>
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag">Student Work</span>
                  <span className="tag">Pasadena City College</span>
                  <span className="tag">2D Animation</span>
                </div>
                <h3 className="font-display text-white text-[20px] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                  Pasadena City College 2D Animation Examples
                </h3>
                <p className="mt-2 text-[14px] text-white/55 leading-relaxed">
                  A selection of exceptional 2D animation work created by students at Pasadena City College.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    className="pill pill-light text-[13px]"
                    href="https://www.dropbox.com/scl/fo/623bii2s0rjr389pai6zq/ABjtQr15XowCF4I9-XJKEwQ?rlkey=ogrwx9cy75160bvuml4adybrw&st=7jayrpod&dl=0"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Open Folder
                  </a>
                  <a
                    className="pill pill-dark text-[13px]"
                    href="https://www.dropbox.com/scl/fo/623bii2s0rjr389pai6zq/ABjtQr15XowCF4I9-XJKEwQ?rlkey=ogrwx9cy75160bvuml4adybrw&st=7jayrpod&dl=1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Download ZIP
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
