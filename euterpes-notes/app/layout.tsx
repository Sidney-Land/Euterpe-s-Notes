import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TitleBar from "./components/TitleBar";
import SideBar from "./components/SideBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Euterpe's Notes",
  description: 'Social Media website for sharing and discussing music.',
  keywords: "music, social media, post, song, Euterpe's Notes"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </head>

      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {/* TitleBar stays at the top of every page */}
        <TitleBar /> 
        
        <div style={{ display: 'flex' }}>
          {/* SideBar stays on the left of every page */}
          <SideBar /> 
          <main style={{ flex: 1 }}>
            {/* This is where your Home Page (page.tsx) 
              or any other page will be "injected" 
            */}
            
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}