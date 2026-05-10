import React from "react";

const COL = [
  {
    title: "Portfolio",
    links: [
      ["Demo Reel", "https://joemdemo.com/"],
      ["Sculpt Blog", "https://monsterrig.blogspot.com/"],
      ["Student Work", "#student-work"],
      ["Personal Work", "#personal-work"],
    ],
  },
  {
    title: "Teaching",
    links: [
      ["About", "#about"],
      ["Disciplines", "#disciplines"],
      ["Process", "#process"],
      ["Contact", "#contact"],
    ],
  },
  {
    title: "External",
    links: [
      ["Pasadena City College", "https://pasadena.edu"],
      ["OTIS College", "https://otis.edu"],
      ["YouTube", "https://youtube.com"],
    ],
  },
];

export default function Footer() {
  return (
    <footer
      className="relative grain"
      style={{ background: "#070708" }}
      data-testid="site-footer"
    >
      <div
        className="relative z-[2] grid grid-cols-12 gap-6 px-5 md:px-10 lg:px-14 py-20 md:py-24 border-t"
        style={{ borderColor: "rgba(212,175,55,0.1)" }}
      >
        {/* Wordmark */}
        <div className="col-span-12 md:col-span-4">
          <div
            className="font-display text-white"
            style={{
              fontSize: "clamp(42px, 6vw, 96px)",
              lineHeight: 0.9,
              letterSpacing: "-0.04em",
            }}
            data-testid="footer-wordmark"
          >
            Joe Micallef
          </div>
          <p
            className="mt-6 max-w-[320px] text-[14px] font-normal"
            style={{ color: "rgba(255,255,255,0.45)" }}
          >
            Educator, professor, and animator. 15+ years shaping creative
            careers at PCC and OTIS — Los Angeles, CA.
          </p>
        </div>

        {/* Columns */}
        {COL.map((c) => (
          <div key={c.title} className="col-span-6 md:col-span-2 mt-10 md:mt-2">
            <span className="font-mono-cap" style={{ color: "rgba(212,175,55,0.55)" }}>
              {c.title}
            </span>
            <ul className="mt-4 space-y-2.5 list-none p-0">
              {c.links.map(([k, h]) => (
                <li key={k}>
                  <a
                    href={h}
                    className="text-[14px] hover:text-white transition"
                    style={{ color: "rgba(255,255,255,0.65)" }}
                    target={h.startsWith("http") ? "_blank" : undefined}
                    rel={h.startsWith("http") ? "noopener noreferrer" : undefined}
                    data-testid={`footer-${k.toLowerCase().replace(/[^a-z]/g, "-")}`}
                  >
                    {k}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        {/* Bottom */}
        <div
          className="col-span-12 mt-14 pt-6 flex flex-wrap items-center justify-between gap-4 border-t"
          style={{ borderColor: "rgba(212,175,55,0.08)" }}
        >
          <span className="font-mono-cap" style={{ color: "rgba(255,255,255,0.35)" }}>
            © 2026 Joe Micallef. All Rights Reserved.
          </span>
          <a
            href="#top"
            data-testid="footer-back-to-top"
            className="font-mono-cap"
            style={{ color: "rgba(212,175,55,0.55)" }}
          >
            Back to top ↑
          </a>
        </div>
      </div>
    </footer>
  );
}
