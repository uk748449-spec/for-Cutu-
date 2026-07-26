import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Just for you, Champa ❤️",
  description: "A small, handcrafted thing, made for one person.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="dark">
      <body className="selection:bg-primary-container selection:text-on-primary">
        {children}
      </body>
    </html>
  );
}
