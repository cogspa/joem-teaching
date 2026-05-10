import React, { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

const QUOTES = [
  {
    q: "Professor Micallef's animation class changed the way I think about movement and storytelling. The walk cycle project alone taught me more about patience and craft than anything I'd done before.",
    name: "Spring 2026 Student",
    role: "2D Animation, Pasadena City College",
  },
  {
    q: "The way Joe breaks down complex VFX pipelines into approachable steps made me realize I could actually work in this industry. His demo reel alone is inspiring.",
    name: "Former OTIS Student",
    role: "Summer of Art Program",
  },
  {
    q: "What sets Joe apart is that he's still actively making work. He's not teaching from a textbook — he's teaching from the studio floor.",
    name: "PCC Graduate",
    role: "Now working in motion design",
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const cur = QUOTES[idx];
  const total = QUOTES.length;

  return (
    <section
      className="relative"
      style={{ background: "var(--c-ink)" }}
      data-testid="testimonials-section"
    >
      <div className="grain glow-bg">
        <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-24 md:py-32">
          <div className="col-span-12 md:col-span-3">
            <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
              From the classroom
            </span>
            <p className="mt-3 text-[14px] font-normal" style={{ color: "rgba(255,255,255,0.45)" }}>
              Words from students who&rsquo;ve
              <br />
              been through the program.
            </p>
          </div>
          <div className="col-span-12 md:col-span-9">
            <blockquote
              className="font-display text-white"
              style={{
                fontSize: "clamp(24px, 3vw, 46px)",
                lineHeight: 1.15,
                letterSpacing: "-0.02em",
              }}
              data-testid={`testimonial-quote-${idx}`}
            >
              <span className="italic-display" style={{ color: "rgba(212,175,55,0.5)" }}>&ldquo;</span>
              {cur.q}
              <span className="italic-display" style={{ color: "rgba(212,175,55,0.5)" }}>&rdquo;</span>
            </blockquote>

            <div className="mt-10 flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="font-display text-[20px] text-white" style={{ letterSpacing: "-0.01em" }}>
                  {cur.name}
                </div>
                <div className="font-mono-cap mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                  {cur.role}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="font-mono-cap" style={{ color: "rgba(255,255,255,0.4)" }}>
                  {String(idx + 1).padStart(2, "0")} / 0{total}
                </span>
                <button
                  onClick={() => setIdx((idx - 1 + total) % total)}
                  className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-white/10 text-white transition"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Previous"
                  data-testid="testimonial-prev"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>
                <button
                  onClick={() => setIdx((idx + 1) % total)}
                  className="h-10 w-10 rounded-full border flex items-center justify-center hover:bg-white/10 text-white transition"
                  style={{ borderColor: "rgba(255,255,255,0.15)" }}
                  aria-label="Next"
                  data-testid="testimonial-next"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
