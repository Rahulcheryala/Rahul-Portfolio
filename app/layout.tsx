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
    default: "Rahul Cheryala | Full-Stack Developer & Software Engineer",
    template: "%s | Rahul Cheryala",
  },
  description:
    "Rahul Cheryala — Full-stack developer and software engineer specializing in React, Next.js, TypeScript, and Node.js. Explore interactive projects, open-source contributions, technical skills, and resume. Based in India, building modern web applications with cutting-edge technologies.",
  keywords: [
    "Rahul Cheryala",
    "Rahul Ch",
    "rahulcheryala",
    "Rahul Cheryala portfolio",
    "Rahul Cheryala developer",
    "Rahul Cheryala software engineer",
    "Rahul Cheryala full-stack developer",
    "Rahul Cheryala web developer",
    "Rahul Cheryala React developer",
    "Rahul Cheryala projects",
    "Rahul Cheryala resume",
    "Rahul Cheryala GitHub",
    "Rahul Cheryala LinkedIn",
    "full-stack developer portfolio",
    "software engineer portfolio",
    "React Next.js developer",
    "TypeScript developer India",
    "Rahul Cheryala Vethuk",
    "Rahul Cheryala VibeNear",
  ],
  authors: [
    { name: "Rahul Cheryala", url: "https://github.com/rahulcheryala" },
  ],
  creator: "Rahul Cheryala",
  publisher: "Rahul Cheryala",
  applicationName: "Rahul Cheryala Portfolio",
  category: "technology",
  manifest: "/manifest.json",
  alternates: {
    canonical: "https://rahulcheryala.com",
  },
  appleWebApp: {
    capable: true,
    title: "Rahul Cheryala",
    statusBarStyle: "default",
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-192x192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512x512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rahulcheryala.com",
    siteName: "Rahul Cheryala — Developer Portfolio",
    title: "Rahul Cheryala | Full-Stack Developer & Software Engineer",
    description:
      "Explore Rahul Cheryala's interactive portfolio — full-stack developer specializing in React, Next.js, TypeScript, and Node.js. View projects, skills, and resume.",
    images: [
      {
        url: "/images/rahul.webp",
        width: 1200,
        height: 630,
        alt: "Rahul Cheryala — Full-Stack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rahul Cheryala | Full-Stack Developer & Software Engineer",
    description:
      "Explore Rahul Cheryala's interactive portfolio — full-stack developer specializing in React, Next.js, TypeScript, and Node.js. View projects, skills, and resume.",
    images: [
      {
        url: "/images/rahul.webp",
        alt: "Rahul Cheryala — Full-Stack Developer Portfolio",
      },
    ],
    creator: "@rahulcheryala",
  },
  robots: {
    index: true,
    follow: true,
    "max-image-preview": "large",
    "max-snippet": -1,
    "max-video-preview": -1,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_VERIFICATION_CODE",
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
    givenName: "Rahul",
    familyName: "Cheryala",
    url: "https://rahulcheryala.com",
    jobTitle: "Full-Stack Developer",
    description:
      "Full-stack developer and software engineer specializing in React, Next.js, TypeScript, and Node.js. Building modern web applications with cutting-edge technologies.",
    sameAs: [
      "https://github.com/rahulcheryala",
      "https://linkedin.com/in/rahulcheryala",
    ],
    image: "https://rahulcheryala.com/images/rahul.webp",
    knowsAbout: [
      "React",
      "Next.js",
      "TypeScript",
      "JavaScript",
      "Node.js",
      "Tailwind CSS",
      "Full-Stack Development",
      "Web Development",
      "Software Engineering",
    ],
    alumniOf: {
      "@type": "Organization",
      name: "Vethuk Technologies Private Limited",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Rahul Cheryala Portfolio",
    url: "https://rahulcheryala.com",
    description:
      "Rahul Cheryala's interactive developer portfolio showcasing projects, skills, and experience.",
    author: {
      "@type": "Person",
      name: "Rahul Cheryala",
    },
  };

  return (
    <html lang="en">
      <head>
        <link rel="preload" href="/apple-logo.svg" as="image" type="image/svg+xml" />
        <link rel="preload" href="/images/wallpaper.webp" as="image" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([personSchema, websiteSchema]),
          }}
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
