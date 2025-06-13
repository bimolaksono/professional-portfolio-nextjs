import Image from "next/image";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col items-center p-8 pt-16 md:p-24">
  <div className="max-w-4xl w-full text-center">
    {/* OPTION 2 HEADLINE - FEEL FREE TO SWAP */}
    <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
      Transforming global payments through innovation.
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-600">
      Holder of 15 American Express patents in digital and Web3 payment innovations, with several more inventions currently in the pipeline. 
    </p>

    {/* YOUR SUMMARY */}
    <p className="mt-8 text-base md:text-lg text-gray-700 max-w-2xl mx-auto">
      An award-winning leader with over two decades of experience at American Express, currently leading global teams in the development of digital payment products and e-commerce capabilities. A subject matter expert in emerging digital payment trends and Web3 technologies, I drive enterprise innovation initiatives and collaborate with global teams across the US, Europe, and Asia. 
    </p>
  </div>
</main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/file.svg"
            alt="File icon"
            width={16}
            height={16}
          />
          Learn
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/window.svg"
            alt="Window icon"
            width={16}
            height={16}
          />
          Examples
        </a>
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://nextjs.org?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            aria-hidden
            src="/globe.svg"
            alt="Globe icon"
            width={16}
            height={16}
          />
          Go to nextjs.org →
        </a>
      </footer>
    </div>
  );
}
