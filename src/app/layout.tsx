import { ClerkProvider } from "@clerk/nextjs";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReactNode } from "react";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { ThemeProvider } from "@/context/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Dropbox",
    template: "%s | Dropbox",
  },
  description:
    "Dropbox lets you save and access all your files and photos in one place for easy sharing. Easily share files & access team content from your computer, mobile or any web browser. Join today for free. Iterate in real time. Comment with style. Share instantly.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            {children}
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
