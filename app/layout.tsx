// This code goes in your file: app/layout.tsx
"use client";

import { useState } from 'react';
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <html lang="en" className="h-full bg-gray-50">
      <head>
          <title>Lucky Bimolaksono | Building the Future of Commerce</title>
          <meta name="description" content="Digital Payments Leader & Web3 Innovator, exploring the intersection of finance and technology." />
      </head>
      <body className="flex flex-col h-full">
        <header className="bg-white/80 backdrop-blur-md shadow-sm fixed top-0 left-0 right-0 z-10">
          <nav className="mx-auto max-w-4xl px-4 sm:px-8 py-4 flex justify-between items-center">
            <Link href="/" className="text-lg font-bold text-gray-900">
              Lucky Bimolaksono
            </Link>
            <div className="flex items-center space-x-4 sm:space-x-6">
              <Link href="/" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Home
              </Link>
              
              <div 
                className="relative"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button className="text-sm font-medium text-gray-600 hover:text-gray-900 focus:outline-none flex items-center py-2">
                  Projects
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                </button>
                {isDropdownOpen && (
                  // Increased width to w-52 to fit longer project title
                  <div className="absolute right-0 mt-0 w-52 bg-white rounded-md shadow-lg py-1 z-20 ring-1 ring-black ring-opacity-5">
                    {/* --- NEW LINK ADDED HERE --- */}
                    <Link href="/projects/agentic-commerce" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      AI Shopping Agent
                    </Link>
                    <Link href="/projects/olivia-nft-minter" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Olivia's Art Minter
                    </Link>
                    <Link href="/projects/token-wrapper" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                      Token Wrapper
                    </Link>
                  </div>
                )}
              </div>
              
              <Link href="/patents" className="text-sm font-medium text-gray-600 hover:text-gray-900">
                Patents
              </Link>

              <a href="https://www.linkedin.com/in/luckyb/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-gray-600 transition-colors">
                <span className="sr-only">LinkedIn</span>
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.25 6.5 1.75 1.75 0 016.5 8.25zM19 19h-3v-4.75c0-1.4-1.2-2.5-2.5-2.5S11 12.85 11 14.25V19h-3v-9h2.9v1.3a3.11 3.11 0 012.6-1.5c2.5 0 4.5 2 4.5 5.25V19z" />
                </svg>
              </a>

            </div>
          </nav>
        </header>
        
        <main className="flex-grow">
          <div className="pt-20">
              {children}
          </div>
        </main>
        
        <footer className="w-full text-center p-6 bg-white border-t border-gray-200 mt-auto">
            <p className="text-xs text-gray-500">
                The views and opinions expressed on this personal website are my own and do not represent the views, positions, or policies of my employer.
            </p>
            <p className="mt-2 text-xs text-gray-400">
                &copy; 2025 Lucky Bimolaksono
            </p>
        </footer>
      </body>
    </html>
  );
}
