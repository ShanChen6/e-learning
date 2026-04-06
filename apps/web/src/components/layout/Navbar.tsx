"use client";

/**
 * Navbar – eLearning global layout
 *
 * Figma audit (Header – node 1:693):
 *   - Background:      #49bbbd (teal) → var(--color-teal-500)
 *   - Logo text:       "TOTC", Poppins 32px Bold, white
 *   - Logo polygon:    #65daff → var(--color-teal-300) fill
 *   - Polygon stroke:  #00c2ff → var(--color-teal-400)
 *   - Nav links:       Poppins 22px Regular, white, letter-spacing 2%
 *   - "Login" button:  transparent, text #5b5b5b → var(--color-neutral-600), radius 80px
 *   - "Sign Up" btn:   #ffffff4d bg, white text, radius 80px
 *   - Navbar height:   ~92px (y:−1 to ~91)
 *   - Horizontal pad:  ~120px each side on 1920px canvas → container-custom
 */

import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

const NAV_LINKS = [
  { label: "Home",     href: "/" },
  { label: "Courses",  href: "/courses" },
  { label: "Careers",  href: "/careers" },
  { label: "Blog",     href: "/blog" },
  { label: "About Us", href: "/about" },
];

export function Navbar() {
  const [menuOpen, setMenuOpen] = React.useState(false);

  return (
    <header
      style={{
        backgroundColor: "var(--color-teal-500)", /* Figma: #49bbbd */
        boxShadow:       "var(--shadow-md)",
        position:        "sticky",
        top:             0,
        zIndex:          50,
      }}
    >
      <div
        className="container-custom"
        style={{
          display:        "flex",
          alignItems:     "center",
          justifyContent: "space-between",
          height:         "92px", /* Figma: navbar ~92px */
          gap:            "calc(var(--spacing) * 6)",
        }}
      >
        {/* ── Logo ──────────────────────────────────────────────── */}
        <Link
          href="/"
          style={{ display: "flex", alignItems: "center", gap: "calc(var(--spacing) * 2)", textDecoration: "none" }}
          aria-label="TOTC Home"
        >
          {/* Figma: Polygon 2 – teal square with rounded corners */}
          <span
            aria-hidden="true"
            style={{
              display:         "inline-flex",
              alignItems:      "center",
              justifyContent:  "center",
              width:           "48px",
              height:          "48px",
              borderRadius:    "var(--radius-sm)",      /* Figma: 6px */
              backgroundColor: "var(--color-teal-300)", /* Figma: #65daff */
              border:          "2px solid var(--color-teal-400)", /* Figma: #00c2ff */
              flexShrink:      0,
            }}
          >
            {/* Minimal logo mark */}
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M12 3L21 8.5V15.5L12 21L3 15.5V8.5L12 3Z" fill="white" />
            </svg>
          </span>

          <span
            style={{
              fontFamily:     "var(--font-sans)",
              fontSize:       "var(--font-size-4xl)",  /* Figma: 32px Bold */
              fontWeight:     "var(--font-weight-bold)",
              color:          "var(--color-white)",
              letterSpacing:  "var(--tracking-wider)",
              lineHeight:     1,
            }}
          >
            TOTC
          </span>
        </Link>

        {/* ── Desktop nav links ──────────────────────────────────── */}
        <nav aria-label="Main navigation" className="hidden lg:flex">
          <ul
            style={{
              display:    "flex",
              alignItems: "center",
              gap:        "calc(var(--spacing) * 8)", /* ~32px between items */
              listStyle:  "none",
              margin:     0,
              padding:    0,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  style={{
                    fontFamily:    "var(--font-sans)",
                    fontSize:      "var(--font-size-xl)",     /* Figma: 22px */
                    fontWeight:    "var(--font-weight-regular)",
                    color:         "var(--color-white)",
                    letterSpacing: "var(--tracking-wide)",    /* Figma: 2% */
                    textDecoration: "none",
                    transition:    "opacity 150ms ease",
                    opacity:       1,
                    lineHeight:    1,
                  }}
                  onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.opacity = "0.75")}
                  onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.opacity = "1")}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* ── Auth buttons ───────────────────────────────────────── */}
        <div
          className="hidden lg:flex"
          style={{
            display:    "flex",
            alignItems: "center",
            gap:        "calc(var(--spacing) * 3)", /* 12px */
          }}
        >
          {/* Login – Figma: transparent bg, text #5b5b5b, radius 80px */}
          <Button
            as={Link}
            href="/login"
            variant="ghost"
            size="md"
            style={{
              color:           "var(--color-neutral-800)",
              backgroundColor: "rgba(255,255,255,0.85)",
              fontWeight:      "var(--font-weight-medium)", /* Figma: Medium 500 */
              fontSize:        "var(--font-size-xl)",       /* Figma: 22px */
            }}
          >
            Login
          </Button>

          {/* Sign Up – Figma: #ffffff4d bg, white text, radius 80px */}
          <Button
            as={Link}
            href="/register"
            variant="ghost"
            size="md"
            style={{
              color:           "var(--color-white)",
              backgroundColor: "rgba(255,255,255,0.30)", /* Figma: #ffffff4d ≈ 30% opacity */
              border:          "1.5px solid rgba(255,255,255,0.50)",
              fontWeight:      "var(--font-weight-medium)",
              fontSize:        "var(--font-size-xl)",
            }}
          >
            Sign Up
          </Button>
        </div>

        {/* ── Mobile hamburger ───────────────────────────────────── */}
        <button
          className="lg:hidden"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display:         "flex",
            flexDirection:   "column",
            gap:             "5px",
            padding:         "8px",
            background:      "transparent",
            border:          "none",
            cursor:          "pointer",
            borderRadius:    "var(--radius-sm)",
          }}
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              style={{
                display:         "block",
                width:           "24px",
                height:          "2px",
                backgroundColor: "var(--color-white)",
                borderRadius:    "var(--radius-pill)",
                transition:      "transform 200ms ease, opacity 200ms ease",
                ...(menuOpen && i === 0 ? { transform: "translateY(7px) rotate(45deg)" } : {}),
                ...(menuOpen && i === 1 ? { opacity: 0 } : {}),
                ...(menuOpen && i === 2 ? { transform: "translateY(-7px) rotate(-45deg)" } : {}),
              }}
            />
          ))}
        </button>
      </div>

      {/* ── Mobile drawer ────────────────────────────────────────── */}
      {menuOpen && (
        <nav
          aria-label="Mobile navigation"
          style={{
            backgroundColor: "var(--color-teal-600)",
            borderTop:       "1px solid rgba(255,255,255,0.15)",
            padding:         "calc(var(--spacing) * 4) calc(var(--spacing) * 6)",
          }}
        >
          <ul
            style={{
              display:       "flex",
              flexDirection: "column",
              gap:           "calc(var(--spacing) * 4)",
              listStyle:     "none",
              margin:        0,
              padding:       0,
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <li key={href}>
                <Link
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily:     "var(--font-sans)",
                    fontSize:       "var(--font-size-lg)",     /* 20px mobile */
                    fontWeight:     "var(--font-weight-medium)",
                    color:          "var(--color-white)",
                    textDecoration: "none",
                    letterSpacing:  "var(--tracking-wide)",
                    display:        "block",
                  }}
                >
                  {label}
                </Link>
              </li>
            ))}

            <li style={{ display: "flex", gap: "calc(var(--spacing) * 3)", paddingTop: "calc(var(--spacing) * 2)" }}>
              <Button as={Link} href="/login"    variant="ghost" size="sm" style={{ color: "var(--color-white)", border: "1px solid rgba(255,255,255,0.4)" }}>Login</Button>
              <Button as={Link} href="/register" variant="ghost" size="sm" style={{ color: "var(--color-white)", border: "1px solid rgba(255,255,255,0.4)" }}>Sign Up</Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
