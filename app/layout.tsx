import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Georama, Roboto_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const georama = Georama({
  variable: "--font-georama",
  subsets: ["latin"],
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["100", "400", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#ffffff",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://rahulcheryala.com"),
  title: {
    default: "Rahul Cheryala | Full-Stack Developer Portfolio",
    template: "%s | Rahul Cheryala",
  },
  description:
    "Rahul Cheryala's portfolio. Full-stack developer showcasing projects, skills, and experience. View projects, resume, and get in touch.",
  keywords: [
    "Rahul Cheryala",
    "Rahul Ch",
    "Rahul Cheryala portfolio",
    "Rahul Cheryala developer",
    "Rahul Cheryala full-stack",
    "rahulcheryala",
    "Rahul Cheryala software engineer",
    "Rahul Cheryala projects",
  ],
  authors: [
    { name: "Rahul Cheryala", url: "https://github.com/rahulcheryala" },
  ],
  creator: "Rahul Cheryala",
  applicationName: "Rahul Cheryala Portfolio",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    title: "Rahul Cheryala",
    statusBarStyle: "default",
  },
  icons: {
    icon: "/macbook.png",
    apple: "/macbook.png",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulcheryala.com",
    siteName: "Rahul Cheryala Portfolio",
    title: "Rahul Cheryala | Full-Stack Developer Portfolio",
    description:
      "Rahul Cheryala's portfolio - Full-stack developer showcasing projects, skills, and experience.",
    images: ["/images/rahul.webp"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Cheryala | Full-Stack Developer Portfolio",
    description:
      "Rahul Cheryala's portfolio - Full-stack developer showcasing projects, skills, and experience.",
    images: ["/images/rahul.webp"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Rahul Cheryala",
    url: "https://rahulcheryala.com",
    jobTitle: "Full-Stack Developer",
    description:
      "Rahul Cheryala - Full-stack developer portfolio showcasing projects, skills, and experience.",
    sameAs: [
      "https://github.com/rahulcheryala",
      "https://linkedin.com/in/rahulcheryala",
    ],
    image: "https://rahulcheryala.com/images/rahul.webp",
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/images/wallpaper.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${georama.variable} ${robotoMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
