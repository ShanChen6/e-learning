"use client";

/**
 * Footer – eLearning global layout
 *
 * Figma audit (Footer section):
 *   - Background:    #252641 (dark navy) → var(--color-surface-subtle)
 *   - Logo text:     "Skilline" (product name), Poppins Bold white
 *   - Tagline:       "Virtual Class for Zoom", Poppins Regular --color-neutral-300
 *   - Divider:       1px solid var(--color-neutral-600)
 *   - Nav links:     Poppins 22px Regular, --color-neutral-300 (#b2b3cf)
 *   - Copyright:     Poppins 22px Regular, --color-neutral-400
 *   - Horizontal pad: container-custom (1528px max-width)
 */

import Link from "next/link";

const FOOTER_LINKS = [
  { label: "Careers",            href: "/careers" },
  { label: "Privacy Policy",     href: "/privacy" },
  { label: "Terms & Conditions", href: "/terms" },
];

export function Footer() {
  const handleLinkEnter = (e: any) => {
    (e.currentTarget as HTMLElement).style.color = "var(--color-white)";
  };

  const handleLinkLeave = (e: any) => {
    (e.currentTarget as HTMLElement).style.color = "var(--color-neutral-400)";
  };

  return (
    <footer
      style={{
        backgroundColor: "var(--color-surface-subtle)", /* Figma: #252641 */
        padding: "calc(var(--spacing) * 10) 0",        /* 40px top/bottom */
        marginTop: "auto",
      }}
    >
      <div className="container-custom">
        {/* ── Top row: logo + links ─────────────────────────────── */}
        <div
          style={{
            display:        "flex",
            alignItems:     "center",
            justifyContent: "space-between",
            flexWrap:       "wrap",
            gap:            "calc(var(--spacing) * 6)",
          }}
        >
          {/* Logo + tagline */}
          <div style={{ display: "flex", flexDirection: "column", gap: "calc(var(--spacing) * 1)" }}>
            <Link
              href="/"
              style={{
                display:        "inline-flex",
                alignItems:     "center",
                gap:            "calc(var(--spacing) * 2)",
                textDecoration: "none",
              }}
              aria-label="TOTC Home"
            >
              {/* Logo polygon */}
              <span
                aria-hidden="true"
                style={{
                  display:         "inline-flex",
                  alignItems:      "center",
                  justifyContent:  "center",
                  width:           "40px",
                  height:          "40px",
                  borderRadius:    "var(--radius-sm)",
                  backgroundColor: "var(--color-teal-500)",
                  flexShrink:      0,
                }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" fill="white" />
                </svg>
              </span>

              <span
                style={{
                  fontFamily:    "var(--font-sans)",
                  fontSize:      "var(--font-size-2xl)",           /* 28px */
                  fontWeight:    "var(--font-weight-bold)",
                  color:         "var(--color-white)",
                  letterSpacing: "var(--tracking-wider)",
                  lineHeight:    1,
                }}
              >
                TOTC
              </span>
            </Link>

            <p
              style={{
                fontFamily:    "var(--font-sans)",
                fontSize:      "var(--font-size-sm)",              /* Figma: tagline smaller */
                fontWeight:    "var(--font-weight-regular)",
                color:         "var(--color-neutral-400)",         /* Figma: #b2b3cf */
                letterSpacing: "var(--tracking-wide)",
                margin:        0,
                paddingLeft:   "calc(40px + var(--spacing) * 2)", /* align under logo text */
              }}
            >
              Virtual Class for Zoom
            </p>
          </div>

          {/* Footer nav links */}
          <nav aria-label="Footer navigation">
            <ul
              style={{
                display:    "flex",
                flexWrap:   "wrap",
                alignItems: "center",
                gap:        "calc(var(--spacing) * 8)", /* ~32px */
                listStyle:  "none",
                margin:     0,
                padding:    0,
              }}
            >
              {FOOTER_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <Link
                    href={href}
                    style={{
                      fontFamily:     "var(--font-sans)",
                      fontSize:       "var(--font-size-base)",     /* ~16–18px */
                      fontWeight:     "var(--font-weight-regular)",
                      color:          "var(--color-neutral-400)",  /* Figma: #b2b3cf */
                      textDecoration: "none",
                      letterSpacing:  "var(--tracking-wide)",
                      transition:     "color 150ms ease",
                    }}
                    onMouseEnter={handleLinkEnter}
                    onMouseLeave={handleLinkLeave}
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* ── Divider ──────────────────────────────────────────── */}
        <hr
          style={{
            border:     "none",
            borderTop:  "1px solid var(--color-neutral-700)", /* Figma: divider on dark bg */
            margin:     "calc(var(--spacing) * 8) 0",         /* 32px top/bottom */
          }}
        />

        {/* ── Copyright ────────────────────────────────────────── */}
        <p
          style={{
            fontFamily:  "var(--font-sans)",
            fontSize:    "var(--font-size-sm)",
            fontWeight:  "var(--font-weight-regular)",
            color:       "var(--color-neutral-500)",           /* Figma: muted */
            textAlign:   "center",
            margin:      0,
          }}
        >
          © {new Date().getFullYear()} TOTC Technologies Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
