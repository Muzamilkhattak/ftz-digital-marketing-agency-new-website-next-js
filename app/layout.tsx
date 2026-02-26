import type { Metadata } from "next";
import "./globals.css";
import CursorLines from "@/components/CursorLines";

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
      </head>
      <body className="antialiased bg-white">
        <CursorLines />
        {children}
      </body>
    </html>
  );
}
