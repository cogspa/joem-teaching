import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

export default function StartCTA() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!email || !/.+@.+\..+/.test(email)) return;
    setSent(true);
    try {
      const list = JSON.parse(localStorage.getItem("joem.contacts") || "[]");
      list.push({ email, t: new Date().toISOString() });
      localStorage.setItem("joem.contacts", JSON.stringify(list));
    } catch {}
  };

  return (
    <section id="contact" className="relative glow-bg grain" data-testid="contact-cta">
      <div className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-28 md:py-40">
        <div className="col-span-12 md:col-span-3">
          <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }}>
            Get in touch
          </span>
        </div>

        <div className="col-span-12 md:col-span-9">
          <h2
            className="font-display text-white"
            style={{
              fontSize: "clamp(46px, 7vw, 110px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
            data-testid="cta-headline"
          >
            Let&rsquo;s{" "}
            <span className="italic-display" style={{ color: "#d4af37" }}>
              connect.
            </span>
          </h2>
          <p
            className="mt-7 max-w-[560px] text-[15.5px] leading-relaxed font-normal"
            style={{ color: "rgba(255,255,255,0.55)" }}
          >
            Whether you&rsquo;re a student, a fellow educator, or a studio looking
            for collaboration — drop a note. I read every message.
          </p>

          <form
            onSubmit={onSubmit}
            className="mt-10 flex w-full max-w-[560px] items-center gap-2 p-1.5 rounded-full"
            style={{
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(212,175,55,0.2)",
              backdropFilter: "blur(10px)",
            }}
            data-testid="cta-form"
          >
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="hello@youremail.com"
              className="flex-1 bg-transparent border-0 outline-none px-4 py-2 text-[14.5px] text-white placeholder:text-white/40"
              data-testid="cta-email-input"
            />
            <button type="submit" className="pill pill-light" data-testid="cta-submit">
              {sent ? "Sent!" : "Send"}
              {!sent && (
                <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[#0a0a0a] text-white">
                  <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
                </span>
              )}
            </button>
          </form>

          {sent && (
            <p className="mt-4 font-mono-cap" style={{ color: "rgba(212,175,55,0.6)" }} data-testid="cta-confirm">
              Thanks! I&rsquo;ll be in touch.
            </p>
          )}

          <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="https://joemdemo.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-white/85 underline-offset-4 hover:underline"
              data-testid="cta-demo"
            >
              joemdemo.com
            </a>
            <span className="font-mono-cap text-white/30" aria-hidden="true">·</span>
            <a
              href="https://monsterrig.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14.5px] text-white/70 hover:text-white"
              data-testid="cta-blog"
            >
              Sculpt Blog
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
