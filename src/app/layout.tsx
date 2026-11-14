import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "COSMOS — Interactive 3D Universe",
  description: "Исследуй Вселенную без границ",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="ru" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
