import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PhotoBox ✨ — Aesthetic Photo Booth",
  description: "Buat kenangan indah dengan photobox aesthetic. Pilih template grid, filter, dan frame favoritmu!",
  keywords: ["photobox", "photo booth", "aesthetic", "selfie", "foto"],
  openGraph: {
    title: "PhotoBox ✨ — Aesthetic Photo Booth",
    description: "Buat kenangan indah dengan photobox aesthetic",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
