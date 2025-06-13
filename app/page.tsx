// This code goes in your file: app/page.tsx

import Link from 'next/link';

export default function Home() {
  return (
    // FIX: Added significant vertical padding (py-16 and py-24) to push all content down.
    <main className="flex flex-col items-center px-4 py-16 md:p-24">
      <div className="w-full max-w-4xl">
        {/* --- HERO / HEADLINE SECTION --- */}
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
            Pioneering the future of commerce from Web2 to Web3.
          </h1>
          <p className="mt-6 text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            An award-winning global leader and subject matter expert with 20+ years of experience driving digital payment innovation at American Express and holder of 15 patents.
          </p>
        </div>

        {/* --- NEW PERSONAL PROJECT SHOWCASE --- */}
        <div className="mt-20 md:mt-32 w-full text-center p-8 md:p-12 bg-gray-50 rounded-2xl border border-gray-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-indigo-600">
            Featured Personal Project
          </h2>
          <p className="mt-4 text-3xl md:text-4xl font-bold text-gray-900">
            Olivia's Art Minter
          </p>
          <p className="mt-6 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
            This is a project from the heart, for my daughter, Olivia. It's a fully functional decentralized application (dApp) that allows her to mint her digital art commissions as unique NFTs on the blockchain and transfer them directly to her clients. It brings together my passion for exploring Web3 technologies and my professional experience in leading projects from concept to deployment, creating a real-world tool that empowers the next generation of creators.
          </p>
          <div className="mt-8">
            <Link 
              href="/projects/olivia-nft-minter" 
              className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              View the Project
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}
