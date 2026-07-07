import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Huraib Jan | AI Systems Engineer",
  description:
    "Portfolio of Huraib Jan — AI Systems Engineer building production-grade AI agents, RAG pipelines, voice agent automation, full-stack platforms, and mobile apps.",
  keywords: ["AI Engineer", "Machine Learning", "RAG", "Full Stack Developer", "Flutter", "Next.js", "Huraib Jan"],
  authors: [{ name: "Huraib Jan" }],
  openGraph: {
    title: "Huraib Jan | AI Systems Engineer",
    description: "Building production-grade AI systems, full-stack platforms, and mobile apps.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Huraib Jan | AI Systems Engineer",
    description: "Building production-grade AI systems, full-stack platforms, and mobile apps.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <link rel="apple-touch-icon" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500;700&display=swap"
          rel="stylesheet"
        />
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/devicon.min.css"
        />
      </head>
      <body className="antialiased">
        <div className="noise" />
        {children}
      </body>
    </html>
  );
}
