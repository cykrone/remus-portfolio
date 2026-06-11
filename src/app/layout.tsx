import type { Metadata, Viewport } from "next";
import { Fraunces } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["opsz", "SOFT", "WONK"],
});

const siteUrl = "https://remuschan.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Remus Chan · Technical Consultant · Workato",
    template: "%s · Remus Chan",
  },
  description:
    "Remus Chan is a technical consultant at Workato in Singapore. He builds enterprise integrations, automation, and the agentic workflows that increasingly run on top of them.",
  keywords: [
    "Remus Chan",
    "Workato",
    "Technical Consultant",
    "iPaaS",
    "Enterprise Automation",
    "API Integration",
    "Agentic Workflows",
    "MCP",
    "Singapore",
  ],
  authors: [{ name: "Remus Chan" }],
  creator: "Remus Chan",
  openGraph: {
    type: "website",
    locale: "en_SG",
    url: siteUrl,
    title: "Remus Chan · Technical Consultant · Workato",
    description:
      "Enterprise integration and automation, built by Remus Chan in Singapore.",
    siteName: "Remus Chan",
  },
  twitter: {
    card: "summary_large_image",
    title: "Remus Chan · Technical Consultant · Workato",
    description:
      "Enterprise integration and automation, built by Remus Chan in Singapore.",
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#faf6ed",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${GeistSans.variable} ${GeistMono.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
