import React, { useState, useCallback, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

/* ── Curated sculpt images from monsterrig.blogspot.com ── */
const SCULPT_GALLERY = [
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiY0YtRv_H1S83fT27WAtxgtG1EGSYbBCCmEc5cLtTZuIFTVO9Zx-FR3ejxDZic_ghiZ202Rvm1su0SgPcrcm2KGrqGNenMBB4WA3SngfUAGObt8-Lq9cVSEZShuBBi4RzPI2Uo6QxZ-izK/s400/skull+bowl2.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEiY0YtRv_H1S83fT27WAtxgtG1EGSYbBCCmEc5cLtTZuIFTVO9Zx-FR3ejxDZic_ghiZ202Rvm1su0SgPcrcm2KGrqGNenMBB4WA3SngfUAGObt8-Lq9cVSEZShuBBi4RzPI2Uo6QxZ-izK/s1600/skull+bowl2.jpg",
    title: "Mystic Skull Bowl",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQB8XmZ8wML_QfwwbqAs604sZa4V86oxZuoWrpB44ekECjmDMJYbuVWC795pFifmksP4yf5jfF6ZxaMKLUEkcG9VSMs10KzcVAHR3aX0Zw7lF9m7HCbyRYW1ejqMnjOPwSNXZps8VUa_0e/s400/cheetah+god+3views.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjQB8XmZ8wML_QfwwbqAs604sZa4V86oxZuoWrpB44ekECjmDMJYbuVWC795pFifmksP4yf5jfF6ZxaMKLUEkcG9VSMs10KzcVAHR3aX0Zw7lF9m7HCbyRYW1ejqMnjOPwSNXZps8VUa_0e/s1600/cheetah+god+3views.jpg",
    title: "Cheetah God",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtXc7jRzxEcCtAggR0chfz5uCBdSdZVa9zlpnMMkMKIViqyL6yj0ualPZ7_8Yc-zon9QkcVFc5Qr3aCWBlTWCNc-yLbRl-diVnHfvy9Apjy69Klqk5L6jSe3oaxP93kQhBOMc6_MNAMe1T/s400/werewolf_1.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgtXc7jRzxEcCtAggR0chfz5uCBdSdZVa9zlpnMMkMKIViqyL6yj0ualPZ7_8Yc-zon9QkcVFc5Qr3aCWBlTWCNc-yLbRl-diVnHfvy9Apjy69Klqk5L6jSe3oaxP93kQhBOMc6_MNAMe1T/s1600/werewolf_1.jpg",
    title: "Werewolf",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhT-Na1tKkfzWzTUHNJ2uoz8AdYjDpq5iM3nBk1Sc5RGBxXzY-lN0-kiFxdF6OwUy0TSGYmStQroRuAYQT-bQsA7Tmvkv6gXKGtwrW3tItiKFCD8aNS9y1p_4ePRQQkX7_tq3x__Xzne80s/s400/gentec+warrior+3+views.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhT-Na1tKkfzWzTUHNJ2uoz8AdYjDpq5iM3nBk1Sc5RGBxXzY-lN0-kiFxdF6OwUy0TSGYmStQroRuAYQT-bQsA7Tmvkv6gXKGtwrW3tItiKFCD8aNS9y1p_4ePRQQkX7_tq3x__Xzne80s/s1600/gentec+warrior+3+views.jpg",
    title: "Evil Warrior",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT9IQs4gJfh3REIPOhZ81ppAp787eS-LXBfhsQQnXgXhacjYFNTTrn5mgnhMcNRxWyJM918iEY1XBNHVbozfVA3Jik2d9SlBl_B-8tbTWxn-U7c_fU0TxoGchc4vsEjr_sbSR8XCbn2d-G/s400/alien+back+angle+render.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgT9IQs4gJfh3REIPOhZ81ppAp787eS-LXBfhsQQnXgXhacjYFNTTrn5mgnhMcNRxWyJM918iEY1XBNHVbozfVA3Jik2d9SlBl_B-8tbTWxn-U7c_fU0TxoGchc4vsEjr_sbSR8XCbn2d-G/s1600/alien+back+angle+render.jpg",
    title: "Weird Alien",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnQk0S5SOYjuPvyIArHNB1p7I-lsTX5wDGr7p_eJzjbffjg5T-Qt6q2Pa86ArnrHPdTPkV-kk7cuEkWbuFLb_1lJ_avNA4gK3Dsy-b80PJvwaW9AUWLM7Sn7-Sb1pcOtQhvVLoleY0ChpY/s400/otter_torse_1.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhnQk0S5SOYjuPvyIArHNB1p7I-lsTX5wDGr7p_eJzjbffjg5T-Qt6q2Pa86ArnrHPdTPkV-kk7cuEkWbuFLb_1lJ_avNA4gK3Dsy-b80PJvwaW9AUWLM7Sn7-Sb1pcOtQhvVLoleY0ChpY/s1600/otter_torse_1.jpg",
    title: "Medieval Otter",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVYn_a0zdhwX87tuvrvev4A4zQOdgBwVFSwiCPe897KJM7gNQMJDLFp8qlVEv791b1fCg4rdUSPLWBsYszoQaRCyMp20x-CDu36NW6Xg1fzKNfKCGAyeZCsSDRPSZcz-URNRtJ8KC8D-Km/s400/lich.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVYn_a0zdhwX87tuvrvev4A4zQOdgBwVFSwiCPe897KJM7gNQMJDLFp8qlVEv791b1fCg4rdUSPLWBsYszoQaRCyMp20x-CDu36NW6Xg1fzKNfKCGAyeZCsSDRPSZcz-URNRtJ8KC8D-Km/s1600/lich.jpg",
    title: "The Lich",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVa5NNf1rnzKtVz9dqUw_QgaP6tEDYJlbBj29V_i0HGUMSab6jecC1m7JyzKZdmvfQzYFlAvmqE842R7-zYxrLCVqBkoT_Y2rzcGPrlFfa2yu7PabJm_Y2wxwv6wl-Xo0aTVFCEgWIf-N3/s400/djinni2.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhVa5NNf1rnzKtVz9dqUw_QgaP6tEDYJlbBj29V_i0HGUMSab6jecC1m7JyzKZdmvfQzYFlAvmqE842R7-zYxrLCVqBkoT_Y2rzcGPrlFfa2yu7PabJm_Y2wxwv6wl-Xo0aTVFCEgWIf-N3/s1600/djinni2.jpg",
    title: "Genie",
  },
  {
    thumb: "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioGFMUGmiXqXAVDTiO7lr3S2DgPJTrhqjLou_ErBnotWjjSA6jYqltaVaLdTJ6YVdKoIuxiCA4u-qwQWPugrWKxPK-3p2iAkvxhSYC6pcDZHVD3ol-Hx9HaIp6rXHIa7aAanDoqffETcUB/s400/tuerke+spider+version1.jpg",
    full:  "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEioGFMUGmiXqXAVDTiO7lr3S2DgPJTrhqjLou_ErBnotWjjSA6jYqltaVaLdTJ6YVdKoIuxiCA4u-qwQWPugrWKxPK-3p2iAkvxhSYC6pcDZHVD3ol-Hx9HaIp6rXHIa7aAanDoqffETcUB/s1600/tuerke+spider+version1.jpg",
    title: "Spider Monster",
  },
];

/* ── Video / iframe cards (Demo Reel, Mind Wiggles, Interlopers) ── */
const WORKS = [
  {
    type: "iframe",
    src: "https://www.youtube.com/embed/4MNYk7o3sCs?si=63XoSh3Bc__BNJQV",
    title: "Joe Micallef Demo Reel",
    tags: ["Personal / Professional", "Demo Reel", "3D / VFX"],
    desc: "Personal demo reel featuring VFX work in Houdini, Maya, and Blender, with the reel hosted at joemdemo.com.",
    actions: [
      { label: "Open Demo Reel", href: "https://joemdemo.com/", primary: true },
    ],
  },
  {
    type: "iframe",
    src: "https://www.youtube.com/embed/XguKsssIP_k",
    title: "Mind Wiggles",
    tags: ["Personal Work", "2D Animation", "Traditional / Cel"],
    desc: "2D traditional cel animation shot on an Oxberry camera.",
    actions: [
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=XguKsssIP_k", primary: true },
    ],
  },
  {
    type: "iframe",
    src: "https://www.youtube.com/embed/g59mluClY8k",
    title: "The Interlopers",
    tags: ["Personal Work", "Stop Motion", "Collaboration"],
    desc: "Stop motion collaboration with Jan Pfenninger.",
    actions: [
      { label: "Watch on YouTube", href: "https://www.youtube.com/watch?v=g59mluClY8k", primary: true },
    ],
  },
];

/* ── Lightbox Component ── */
function Lightbox({ images, activeIndex, onClose, onPrev, onNext }) {
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext]);

  const img = images[activeIndex];

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "rgba(0,0,0,0.92)", backdropFilter: "blur(12px)" }}
      onClick={onClose}
      data-testid="lightbox-overlay"
    >
      <button
        onClick={onClose}
        className="absolute top-5 right-5 h-10 w-10 rounded-full flex items-center justify-center text-white/80 hover:text-white transition z-10"
        style={{ background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.15)" }}
        aria-label="Close lightbox"
      >
        <X className="h-5 w-5" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onPrev(); }}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center text-white/80 hover:text-white transition z-10"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        aria-label="Previous image"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={(e) => { e.stopPropagation(); onNext(); }}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 h-12 w-12 rounded-full flex items-center justify-center text-white/80 hover:text-white transition z-10"
        style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
        aria-label="Next image"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      <div
        className="relative max-w-[90vw] max-h-[85vh] flex flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <img
          src={img.full}
          alt={img.title}
          className="max-w-full max-h-[78vh] object-contain rounded-xl"
          style={{ boxShadow: "0 24px 80px rgba(0,0,0,0.6)" }}
        />
        <div className="mt-4 text-center">
          <div className="font-display text-white text-[18px] tracking-tight">{img.title}</div>
          <div className="font-mono-cap mt-1" style={{ color: "rgba(212,175,55,0.6)" }}>
            {activeIndex + 1} / {images.length} &nbsp;·&nbsp; ZBrush Sculpts
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Section ── */
export default function PersonalWork() {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = useCallback((i) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  const closeLightbox = useCallback(() => setLightboxOpen(false), []);
  const prevImage = useCallback(() => setLightboxIndex((i) => (i - 1 + SCULPT_GALLERY.length) % SCULPT_GALLERY.length), []);
  const nextImage = useCallback(() => setLightboxIndex((i) => (i + 1) % SCULPT_GALLERY.length), []);

  return (
    <section
      className="relative"
      id="personal-work"
      style={{ background: "var(--c-ink)" }}
      data-testid="personal-work-section"
    >
      <div className="grain glow-bg">
        <div className="relative z-[2] px-5 md:px-10 lg:px-14 py-24 md:py-32">
          {/* Section header */}
          <div className="grid grid-cols-12 gap-6 mb-10">
            <div className="col-span-12 md:col-span-4">
              <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
                Personal / Professional Work
              </span>
              <h2
                className="mt-4 font-display text-white"
                style={{
                  fontSize: "clamp(36px, 5vw, 72px)",
                  lineHeight: 0.96,
                  letterSpacing: "-0.03em",
                }}
                data-testid="personal-work-headline"
              >
                My personal and{" "}
                <span className="italic-display" style={{ color: "#d4af37" }}>
                  professional projects.
                </span>
              </h2>
              <p className="mt-5 text-[14px] text-white/55 leading-relaxed max-w-[400px]">
                Demo reel, traditional animation, stop motion, and sculpt work presented in a unified portfolio layout.
              </p>
            </div>
          </div>

          {/* 2-column cards grid — 3 video cards + 1 sculpt gallery card */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Video / iframe cards */}
            {WORKS.map((w, i) => (
              <article key={i} className="media-card" data-testid={`personal-card-${i}`}>
                <div className="media">
                  <iframe
                    src={w.src}
                    title={w.title}
                    loading="lazy"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </div>
                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    {w.tags.map((t) => (
                      <span key={t} className="tag">{t}</span>
                    ))}
                  </div>
                  <h3 className="font-display text-white text-[20px] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                    {w.title}
                  </h3>
                  <p className="mt-2 text-[14px] text-white/55 leading-relaxed">
                    {w.desc}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-2.5">
                    {w.actions.map((a) => (
                      <a
                        key={a.label}
                        className={`pill ${a.primary ? "pill-light" : "pill-dark"} text-[13px]`}
                        href={a.href}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {a.label}
                      </a>
                    ))}
                  </div>
                </div>
              </article>
            ))}

            {/* ZBrush Sculpt Gallery Card — same size as the others, 3×3 thumbnail grid as "media" */}
            <article className="media-card" data-testid="sculpt-gallery-card">
              <div
                className="media grid grid-cols-3 gap-[1px]"
                style={{ background: "rgba(212,175,55,0.1)" }}
              >
                {SCULPT_GALLERY.map((img, i) => (
                  <button
                    key={i}
                    className="relative overflow-hidden group cursor-pointer border-0 bg-transparent p-0 aspect-[16/9]"
                    onClick={() => openLightbox(i)}
                    aria-label={`View ${img.title}`}
                    data-testid={`sculpt-thumb-${i}`}
                  >
                    <img
                      src={img.thumb}
                      alt={img.title}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      style={{ background: "#0e1724" }}
                    />
                    <div
                      className="absolute inset-0 flex items-end p-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{ background: "linear-gradient(to top, rgba(10,17,26,0.85) 0%, transparent 60%)" }}
                    >
                      <span className="font-mono-cap text-white text-[9px] leading-tight">{img.title}</span>
                    </div>
                  </button>
                ))}
              </div>
              <div className="p-5">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="tag">Personal Work</span>
                  <span className="tag">ZBrush</span>
                  <span className="tag">3D Sculpts</span>
                </div>
                <h3 className="font-display text-white text-[20px] tracking-tight" style={{ letterSpacing: "-0.02em" }}>
                  ZBrush / 3D Sculpts
                </h3>
                <p className="mt-2 text-[14px] text-white/55 leading-relaxed">
                  Click any thumbnail to view full-size. 9 of 142 sculpts from the full gallery.
                </p>
                <div className="mt-5 flex flex-wrap gap-2.5">
                  <a
                    className="pill pill-light text-[13px]"
                    href="https://monsterrig.blogspot.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                    data-testid="sculpt-blog-link"
                  >
                    Visit Full Sculpt Blog
                  </a>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={SCULPT_GALLERY}
          activeIndex={lightboxIndex}
          onClose={closeLightbox}
          onPrev={prevImage}
          onNext={nextImage}
        />
      )}
    </section>
  );
}
