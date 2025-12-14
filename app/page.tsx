import Link from 'next/link';
import FadeIn from './components/FadeIn';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center px-4 py-16 md:p-24">
      <div className="w-full max-w-6xl">
        {/* --- HERO / HEADLINE SECTION --- */}
        <div className="text-center">
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-6xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
              Pioneering the future of commerce from Web2 to Web3.
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="mt-6 text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              An award-winning global leader and subject matter expert with 20+ years of experience driving digital payment innovation at American Express and holder of 15 patents.
            </p>
          </FadeIn>
        </div>

        {/* --- FEATURED PROJECTS SECTION --- */}
        <div className="mt-20 md:mt-24 w-full">
            <FadeIn delay={0.5}>
              <h2 className="text-center text-sm font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-8">
                  Featured Personal Projects
              </h2>
            </FadeIn>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                
                {/* --- Project 1: AI Shopping Agent --- */}
                <FadeIn delay={0.6} className="h-full">
                  <div className="flex flex-col text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 h-full hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          AI Shopping Agent
                      </h3>
                      <p className="mt-4 flex-grow text-base text-gray-600 dark:text-gray-400">
                          A proof-of-concept for the future of e-commerce. This dApp uses an AI agent to research products and executes the purchase on-chain using a custom digital currency, demonstrating the integration of AI with programmable payments.
                      </p>
                      <div className="mt-6">
                          <Link 
                          href="/projects/agentic-commerce" 
                          className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700"
                          >
                          View the dApp
                          </Link>
                      </div>
                  </div>
                </FadeIn>

                {/* --- Project 2: Olivia's Art Minter --- */}
                <FadeIn delay={0.7} className="h-full">
                  <div className="flex flex-col text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 h-full hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Olivia's Art Minter
                      </h3>
                      <p className="mt-4 flex-grow text-base text-gray-600 dark:text-gray-400">
                          A project from the heart, for my daughter. This dApp allows her to mint her digital art as unique NFTs and transfer them directly to clients, showcasing a real-world, functional Web3 application.
                      </p>
                      <div className="mt-6">
                          <Link 
                          href="/projects/olivia-nft-minter" 
                          className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700"
                          >
                          View the dApp
                          </Link>
                      </div>
                  </div>
                </FadeIn>

                {/* --- Project 3: Token Wrapper --- */}
                <FadeIn delay={0.8} className="h-full">
                  <div className="flex flex-col text-center p-8 bg-gray-50 dark:bg-gray-800/50 rounded-2xl border border-gray-200 dark:border-gray-700 h-full hover:shadow-lg transition-shadow duration-300">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                          Token Wrapper
                      </h3>
                      <p className="mt-4 flex-grow text-base text-gray-600 dark:text-gray-400">
                          This two-contract system demonstrates the core concepts of fungible tokens (ERC-20) and tokenization, featuring a base token and a wrapper that converts it into a premium token—a foundational mechanism in DeFi.
                      </p>
                      <div className="mt-6">
                          <Link 
                          href="/projects/token-wrapper" 
                          className="inline-block rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white shadow-md transition hover:bg-indigo-700"
                          >
                          View the dApp
                          </Link>
                      </div>
                  </div>
                </FadeIn>

            </div>
        </div>

      </div>
    </main>
  );
}