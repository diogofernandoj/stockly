import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "./_components/sidebar";

export const metadata: Metadata = {
  title: "Stockly",
  description: "Gerencie o estoque do seu negócio de forma simples e prática.",
};

const inter = Inter({
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>
        <div className="h-full flex">
          <Sidebar />
          {children}
        </div>
      </body>
    </html>
  );
}
