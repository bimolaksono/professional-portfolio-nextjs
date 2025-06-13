// This code goes in a new file: app/projects/agentic-commerce/page.tsx

"use client";

import { useState, useEffect, FormEvent } from 'react';
import { ethers, Contract, parseUnits, formatUnits } from 'ethers';

// --- Define an interface for the window.ethereum object ---
declare global {
  interface Window {
    ethereum?: any;
  }
}

// --- CONTRACT DETAILS ---
const lrtContractAddress = "0xa991a1Cc42fE58D33BD9240Db35bd240D8E8810d"; 

// ABI for your LuckyRewardToken (LRT)
const lrtContractABI: any = [
    {"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type": "function"}
];

// A simulated merchant wallet address for the demo
const merchantWalletAddress = "0xAb5801a7D398351b8bE11C439e05C5B3259aeC9B"; // Vitalik Buterin's address for demo purposes

interface ProductResult {
  productName: string;
  merchantName: string;
  price: number;
  reasoning: string;
  productUrl: string; 
}

export default function AgenticCommercePage() {
  const [prompt, setPrompt] = useState<string>("");
  const [result, setResult] = useState<ProductResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Web3 State
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [lrtBalance, setLrtBalance] = useState<string>("0");
  const [isAuthorizing, setIsAuthorizing] = useState<boolean>(false);

  // Confirmation Modal State
  const [showModal, setShowModal] = useState<boolean>(false);
  const [txResult, setTxResult] = useState<'success' | 'failed' | null>(null);
  const [txDetails, setTxDetails] = useState<any>(null);


  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) setWalletAddress(accounts[0]);
        } catch (error) { console.error(error); }
      }
    };
    checkWalletConnection();
  }, []);

  const fetchBalances = async () => {
    if (walletAddress && ethers.isAddress(lrtContractAddress)) {
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const contract = new Contract(lrtContractAddress, lrtContractABI, provider);
            const balance = await contract.balanceOf(walletAddress);
            setLrtBalance(formatUnits(balance, 18));
        } catch (err) {
            console.error("Failed to fetch balance:", err);
            setError("Could not fetch token balance.");
        }
    }
  };

  useEffect(() => {
    fetchBalances();
  }, [walletAddress]);

  const connectWallet = async () => {
     if (window.ethereum) {
        try {
            const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
            if (accounts.length > 0) setWalletAddress(accounts[0]);
        } catch (error) {
            setError("Failed to connect wallet.");
        }
    } else {
        setError("MetaMask not found. Please install it.");
    }
  };


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!prompt) return;
    
    setResult(null);
    setError(null);
    setIsLoading(true);

    try {
      const response = await fetch('/api/agentic-commerce', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to get a response from the agent.');
      }
      const data: ProductResult = await response.json();
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthorizePurchase = async (proposal: ProductResult) => {
      if (!walletAddress) {
          setError("Cannot authorize purchase. Wallet not connected.");
          return;
      }

      const priceInLRT = proposal.price;
      const userBalance = parseFloat(lrtBalance);

      if (userBalance < priceInLRT) {
          setTxDetails({ status: `Insufficient balance. You have ${userBalance.toFixed(2)} LRT but need ${priceInLRT}.`, proposal });
          setTxResult('failed');
          setShowModal(true);
          return;
      }
      
      setIsAuthorizing(true);

      try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const signer = await provider.getSigner();
          const contract = new Contract(lrtContractAddress, lrtContractABI, signer);
          const amountToTransfer = parseUnits(priceInLRT.toString(), 18);
          
          const tx = await contract.transfer(merchantWalletAddress, amountToTransfer);
          await tx.wait();
          
          setTxResult('success');
          setTxDetails({ status: `Purchase successful! ${priceInLRT.toFixed(2)} LRT transferred.`, proposal });
          await fetchBalances(); 
      } catch (err: any) {
          console.error("Purchase authorization failed:", err);
          let failureReason = "Purchase failed. See console for details.";
          if (err.code === 'ACTION_REJECTED') {
              failureReason = "Transaction rejected in wallet.";
          }
          setTxResult('failed');
          setTxDetails({ status: failureReason, proposal });
      } finally {
          setIsAuthorizing(false);
          setShowModal(true);
          setResult(null);
      }
  }
  
  const closeModal = () => {
      setShowModal(false);
      setTxDetails(null);
      setTxResult(null);
  }
  
  const ConfirmationModal = () => {
      if (!showModal) return null;

      const isSuccess = txResult === 'success';
      const summary = txDetails?.proposal;
      const statusText = txDetails?.status;

      return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-40 flex justify-center items-center">
            <div className="relative bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
                {isSuccess ? (
                    <>
                        <svg className="w-24 h-24 mx-auto text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">Purchase Successful!</h2>
                    </>
                ) : (
                    <>
                        <svg className="w-24 h-24 mx-auto text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                        <h2 className="mt-4 text-2xl font-bold text-gray-800">Transaction Failed</h2>
                    </>
                )}
                <p className="mt-2 text-gray-600">{statusText}</p>
                {summary && (
                    <div className="mt-6 p-4 bg-gray-100 rounded-lg text-left text-sm space-y-2">
                        <p><strong>Product:</strong> {summary.productName}</p>
                        <p><strong>Amount:</strong> {summary.price?.toFixed(2)} LRT</p>
                    </div>
                )}
                <button onClick={closeModal} className="mt-8 w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700">
                    {isSuccess ? "Done" : "Try Again"}
                </button>
            </div>
        </div>
      );
  }

  return (
    <main className="flex w-full flex-col items-center px-4 pt-28 pb-8">
        <ConfirmationModal />
        <div className="w-full max-w-2xl text-center mb-12">
            <h1 className="text-4xl font-bold">AI Shopping Agent</h1>
            <p className="mt-4 text-gray-600">
            A proof-of-concept demonstrating agentic commerce. Give the AI agent a shopping goal, and it will research a product and present a proposal for purchase using a custom on-chain digital currency (LRT).
            </p>
        </div>
        <div className="w-full max-w-xl p-8 bg-white rounded-2xl shadow-lg">
            {!walletAddress ? (
                <button onClick={connectWallet} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors mb-6">
                    Connect Wallet to Get Started
                </button>
            ) : (
                <>
                    <div className="p-4 mb-6 bg-gray-50 rounded-lg text-center">
                        <p className="text-sm font-medium text-gray-700">Your LRT Balance</p>
                        <p className="text-2xl font-bold text-indigo-600">{parseFloat(lrtBalance).toFixed(2)}</p>
                    </div>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label htmlFor="prompt" className="block text-sm font-medium text-gray-700">Enter your shopping goal</label>
                            <textarea id="prompt" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="e.g., 'Find me a business class flight to Melbourne for next Tuesday'" rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading || !walletAddress} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                {isLoading ? "Agent is thinking..." : "Ask Agent to Find Product"}
                            </button>
                        </div>
                    </form>
                    <div className="mt-8">
                        {isLoading && ( <div className="flex justify-center items-center"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div></div> )}
                        {error && ( <div className="p-4 bg-red-100 text-red-700 rounded-lg"><p><strong>Error:</strong> {error}</p></div> )}
                        {result && (
                            <div className="p-6 bg-gray-50 rounded-lg border">
                                <h3 className="text-lg font-semibold text-gray-900">Agent's Proposal:</h3>
                                <div className="mt-4 space-y-3 text-left text-gray-800">
                                    <p><strong>Product:</strong> {result.productName}</p>
                                    <p><strong>Merchant:</strong> {result.merchantName}</p>
                                    <p><strong>Price:</strong> {result.price.toFixed(2)} LRT</p>
                                    <p><strong>Reasoning:</strong> <span className="text-gray-600">{result.reasoning}</span></p>
                                    {result.productUrl && ( <p><strong>Link:</strong> <a href={result.productUrl} target="_blank" rel="noopener noreferrer" className="ml-2 text-indigo-600 hover:text-indigo-800 underline break-all">{result.productUrl}</a></p> )}
                                </div>
                                <div className="mt-6 text-center">
                                    <button onClick={() => handleAuthorizePurchase(result)} disabled={isAuthorizing} className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed">
                                        {isAuthorizing ? "Processing transaction..." : "Authorize Purchase with LRT"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </>
            )}
        </div>
    </main>
  );
}
