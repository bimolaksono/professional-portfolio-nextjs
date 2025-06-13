// This code goes in your file: app/layout.tsx

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link"; // Import the Link component

const inter = Inter({ subsets: ["latin"] });

// FIX: Updated the title to be more dynamic and catchy.
export const metadata: Metadata = {
  title: "Lucky Bimolaksono | Building the Future of Commerce",
  description: "Digital Payments Leader & Web3 Innovator, exploring the intersection of finance and technology.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* --- NAVIGATION HEADER --- */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-10">
          <nav className="mx-auto max-w-4xl px-4 sm:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-gray-900">
              Lucky Bimolaksono
            </Link>
            <div className="space-x-4 sm:space-x-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Home
              </Link>
              {/* NEW: Link to the Projects page */}
              <Link href="/projects/olivia-nft-minter" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Projects
              </Link>
              <Link href="/patents" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Patents
              </Link>
            </div>
          </nav>
        </header>
        
        {children}
        
      </body>
    </html>
  );
}
