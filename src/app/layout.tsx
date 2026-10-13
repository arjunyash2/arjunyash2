import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/geist-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./fonts/geist-mono-latin.woff2",
  weight: "100 900",
  display: "swap",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://arjunyash2.vercel.app",
  ),
  title: "Arjun S.D. — AI Developer & Python Engineer",
  description:
    "Arjun Shoba Dileep builds production AI, real-time voice agents, and resilient data pipelines. Explore selected work, research, and engineering experience.",
  openGraph: {
    title: "Arjun S.D. — AI systems. Built for reality.",
    description:
      "Applied AI, resilient data systems, and software built for real-world use.",
    type: "website",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Arjun S.D. — AI Developer & Python Engineer",
    description:
      "AI systems. Built for reality. Explore my work in AI and data engineering.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
