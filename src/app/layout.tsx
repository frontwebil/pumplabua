import type { Metadata } from "next";
import { Open_Sans } from "next/font/google";
import "./globals.css";

const openSans = Open_Sans({
  subsets: ["latin"],
  variable: "--font-open-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Pamplab",
  description:
    "Підтримай своє тіло і досягай результатів з продуктами топових брендів спортивного харчування для будь-якого рівня підготовки",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="uk">
      <body className={`${openSans.variable} antialiased`}>{children}</body>
    </html>
  );
}
