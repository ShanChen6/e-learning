import type { Metadata, Viewport } from "next";
import { Poppins, Nunito_Sans } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout";
import { Footer } from "@/components/layout";

/*
 * Figma fonts:
 *   Poppins     – headings, body, nav links (Regular/Medium/SemiBold/Bold)
 *   Nunito Sans – display hero, badges, stat numbers
 */
const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const nunitoSans = Nunito_Sans({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "TOTC – Online Learning Platform",
    template: "%s | TOTC",
  },
  description:
    "Virtual classes for everyone. Explore courses, grow your skills, and learn at your own pace.",
  keywords: ["e-learning", "online courses", "education", "virtual classroom"],
  authors: [{ name: "TOTC" }],
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#49bbbd" },
    { media: "(prefers-color-scheme: dark)",  color: "#13152a" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${nunitoSans.variable} h-full`}
      suppressHydrationWarning
    >
      <body
        className="min-h-full flex flex-col antialiased"
        style={{
          backgroundColor: "var(--app-bg)",
          color:           "var(--app-text)",
          fontFamily:      "var(--font-sans)",
        }}
      >
        <Navbar />

        {/* Page content */}
        <main className="flex-1">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  );
}
