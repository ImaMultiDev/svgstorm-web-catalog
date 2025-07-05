import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "SVGStorm - Professional Icon Library",
  description:
    "Discover and implement beautiful SVG icons with the SVGStorm library. Professional, elegant, and developer-friendly.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className="bg-gradient-to-br from-gray-50 to-blue-50/30 min-h-screen">
        <Navbar />
        <main className="min-h-screen">{children}</main>
      </body>
    </html>
  );
}
