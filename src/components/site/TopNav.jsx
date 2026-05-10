import React, { useEffect, useState } from "react";
import { ArrowRight, Menu, X } from "lucide-react";

const NAV = [
  { label: "About", href: "#about" },
  { label: "Student Work", href: "#student-work" },
  { label: "Personal Work", href: "#personal-work" },
  { label: "Process", href: "#process" },
  { label: "Contact", href: "#contact" },
];

export default function TopNav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      data-testid="top-nav"
      className="fixed top-0 left-0 right-0 z-50 pointer-events-none"
    >
      <div className="flex items-start justify-between gap-3 px-5 md:px-8 pt-5 md:pt-6">
        {/* Brand */}
        <a
          href="#top"
          data-testid="brand-mark"
          className="pointer-events-auto flex items-center gap-2.5 group"
        >
          <span
            className="flex items-center justify-center h-9 w-9 rounded-full text-white font-display text-[15px]"
            style={{
              background: "rgba(212,175,55,0.15)",
              border: "1px solid rgba(212,175,55,0.35)",
              backdropFilter: "blur(10px)",
            }}
          >
            JM
          </span>
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[15px] font-display tracking-tight text-white">
              Joe Micallef
            </span>
            <span className="font-mono-cap text-white/55">
              Educator · Professor
            </span>
          </span>
        </a>

        {/* Center nav (desktop only) */}
        <nav
          className="pointer-events-auto hidden md:flex items-center gap-1.5 rounded-full px-2 py-1.5"
          style={{
            background: "rgba(8,8,9,0.72)",
            border: "1px solid rgba(255,255,255,0.10)",
            backdropFilter: "blur(14px)",
          }}
          data-testid="primary-nav"
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, "-")}`}
              className="px-3.5 py-1.5 rounded-full text-[13px] text-white/85 hover:text-white hover:bg-white/[0.06] transition"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* CTA + Mobile toggle */}
        <div className="flex items-center gap-3 pointer-events-auto">
          <a href="#contact" data-testid="contact-button" className="pill pill-light hidden sm:inline-flex">
            Get in touch
            <span className="flex items-center justify-center h-5 w-5 rounded-full bg-[#0a0a0a] text-white">
              <ArrowRight className="h-3 w-3" strokeWidth={2.2} />
            </span>
          </a>
          <button
            className="md:hidden h-10 w-10 flex items-center justify-center rounded-full text-white"
            style={{ background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <nav
          className="pointer-events-auto md:hidden mt-3 mx-5 rounded-2xl p-4 space-y-2"
          style={{
            background: "rgba(10,17,26,0.95)",
            border: "1px solid rgba(255,255,255,0.1)",
            backdropFilter: "blur(20px)",
          }}
        >
          {NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="block px-4 py-3 rounded-xl text-[14px] text-white/85 hover:text-white hover:bg-white/[0.06] transition"
              onClick={() => setMobileOpen(false)}
            >
              {item.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
