import type { Metadata } from "next";
import "./globals.css";
import dynamic from "next/dynamic";

// Lazy load cursor effect for better initial load
const CursorLines = dynamic(() => import("@/components/CursorLines"), { ssr: false });

export const metadata: Metadata = {
  title: "FTZ Digital - Transform Your Brand with 30+ Digital Solutions",
  description: "FTZ Digital - Where Innovation Meets Results. Premium marketing agency offering 30+ digital solutions including SEO, SEM, Social Media, Content Creation, Web Development, and more.",
  keywords: "digital marketing, SEO, SEM, social media marketing, web development, branding, content creation, FTZ Digital",
  authors: [{ name: "FTZ Digital" }],
  openGraph: {
    title: "FTZ Digital - Transform Your Brand",
    description: "Premium marketing agency offering 30+ digital solutions",
    type: "website",
  },
  viewport: "width=device-width, initial-scale=1, maximum-scale=5",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
        <meta name="theme-color" content="#0A1F44" />
      </head>
      <body className="antialiased bg-white">
        <CursorLines />
        {children}
      </body>
    </html>
  );
}
