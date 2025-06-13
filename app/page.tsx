// This code goes in your file: app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    // The main container provides vertical padding to clear the fixed header
    <main className="flex flex-col items-center px-4 py-16 md:p-24">
      <div className="w-full max-w-5xl"> {/* Increased max-width for side-by-side layout */}
        {/* --- HERO / HEADLINE SECTION --- */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Pioneering the future of commerce from Web2 to Web3.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            An award-winning global leader and subject matter expert with 20+ years of experience driving digital payment innovation at American Express and holder of 15 patents.
          </p>
        </div>

        {/* --- NEW FEATURED PROJECTS SECTION --- */}
        <div className="mt-20 md:mt-24 w-full">
            <h2 className="text-center text-sm font-bold uppercase tracking-wider text-indigo-600 mb-8">
                Featured Personal Projects
            </h2>
            {/* Grid for side-by-side layout on medium screens and up */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                
                {/* --- Project 1: Olivia's Art Minter --- */}
                <div className="flex flex-col text-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">
                        Olivia's Art Minter
                    </h3>
                    <p className="mt-4 flex-grow text-base text-gray-700">
                        A project from the heart, for my daughter. This dApp allows her to mint her digital art as unique NFTs and transfer them directly to clients, showcasing my ability to lead a project from concept to a real-world, functional Web3 application.
                    </p>
                    <div className="mt-6">
                        <Link 
                        href="/projects/olivia-nft-minter" 
                        className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        View the dApp
                        </Link>
                    </div>
                </div>

                {/* --- Project 2: Token Wrapper --- */}
                <div className="flex flex-col text-center p-8 bg-gray-50 rounded-2xl border border-gray-200">
                    <h3 className="text-2xl font-bold text-gray-900">
                        Token Wrapper & Programmability
                    </h3>
                    <p className="mt-4 flex-grow text-base text-gray-700">
                        This two-contract system demonstrates the core concepts of fungible digital currency (ERC-20) and tokenization. It features a base 'Loyalty Token' and a wrapper that converts it into a 'Premium Token', showcasing a foundational mechanism used in DeFi and advanced financial products.
                    </p>
                    <div className="mt-6">
                        <Link 
                        href="/projects/token-wrapper" 
                        className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                        View the dApp
                        </Link>
                    </div>
                </div>

            </div>
        </div>

      </div>
    </main>
  );
}
