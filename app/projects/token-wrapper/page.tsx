// This code goes in a new file: app/projects/token-wrapper/page.tsx

"use client";

import { useState, useEffect } from 'react';
import { ethers, Contract, parseUnits, formatUnits } from 'ethers';

// --- CONTRACT DETAILS (REPLACE WITH YOURS) ---

// Address of your deployed LuckyRewardToken (LRT) contract
const lrtContractAddress = "0xa991a1Cc42fE58D33BD9240Db35bd240D8E8810d"; 
// Address of your deployed PremiumTokenWrapper contract
const wrapperContractAddress = "0x3D4be9D3B8ec0cf514B0E22f329BB0964018e0C3"; 

// ABI for the base LRT token
const lrtContractABI: any = [
    {"inputs":[{"internalType":"address","name":"initialOwner","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"OwnableInvalidOwner","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"OwnableUnauthorizedAccount","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"previousOwner","type":"address"},{"indexed":true,"internalType":"address","name":"newOwner","type":"address"}],"name":"OwnershipTransferred","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mint","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"renounceOwnership","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"newOwner","type":"address"}],"name":"transferOwnership","outputs":[],"stateMutability":"nonpayable","type": "function"}
];

// ABI for the wrapper/premium token
const wrapperContractABI: any = [
    {"inputs":[{"internalType":"address","name":"underlyingTokenAddress","type":"address"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"allowance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientAllowance","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"},{"internalType":"uint256","name":"balance","type":"uint256"},{"internalType":"uint256","name":"needed","type":"uint256"}],"name":"ERC20InsufficientBalance","type":"error"},{"inputs":[{"internalType":"address","name":"approver","type":"address"}],"name":"ERC20InvalidApprover","type":"error"},{"inputs":[{"internalType":"address","name":"receiver","type":"address"}],"name":"ERC20InvalidReceiver","type":"error"},{"inputs":[{"internalType":"address","name":"sender","type":"address"}],"name":"ERC20InvalidSender","type":"error"},{"inputs":[{"internalType":"address","name":"spender","type":"address"}],"name":"ERC20InvalidSpender","type":"error"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":true,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type": "address"},{"internalType":"uint256","name":"value","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"underlyingToken","outputs":[{"internalType":"contract IERC20","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"unwrap","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"wrap","outputs":[],"stateMutability":"nonpayable","type":"function"}
];


export default function TokenWrapperPage() {
    const [walletAddress, setWalletAddress] = useState<string | null>(null);
    const [status, setStatus] = useState<string>("Please connect your wallet.");
    const [lrtBalance, setLrtBalance] = useState<string>("0");
    const [plrtBalance, setPlrtBalance] = useState<string>("0");
    const [amount, setAmount] = useState<string>("");
    const [isProcessing, setIsProcessing] = useState<boolean>(false);

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
                if (accounts.length > 0) {
                    setWalletAddress(accounts[0]);
                }
            } catch (error) {
                setStatus("Failed to connect wallet.");
                console.error(error);
            }
        } else {
            setStatus("MetaMask not found. Please install it.");
        }
    };

    const fetchBalances = async () => {
        if (walletAddress) {
            try {
                const provider = new ethers.BrowserProvider(window.ethereum);
                const lrtContract = new Contract(lrtContractAddress, lrtContractABI, provider);
                const wrapperContract = new Contract(wrapperContractAddress, wrapperContractABI, provider);

                const lrtBal = await lrtContract.balanceOf(walletAddress);
                const plrtBal = await wrapperContract.balanceOf(walletAddress);

                setLrtBalance(formatUnits(lrtBal, 18));
                setPlrtBalance(formatUnits(plrtBal, 18));
                setStatus("Balances updated.");
            } catch (error) {
                setStatus("Could not fetch balances.");
                console.error(error);
            }
        }
    };

    useEffect(() => {
        if (walletAddress) {
            fetchBalances();
        }
    }, [walletAddress]);
    
    const handleApprove = async () => {
        if (!walletAddress || !amount) {
            setStatus("Please enter an amount to approve.");
            return;
        }
        setIsProcessing(true);
        setStatus("Approving wrapper contract...");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const lrtContract = new Contract(lrtContractAddress, lrtContractABI, signer);
            
            const amountToApprove = parseUnits(amount, 18);
            const tx = await lrtContract.approve(wrapperContractAddress, amountToApprove);
            
            setStatus("Waiting for approval transaction...");
            await tx.wait();
            
            setStatus(`Successfully approved wrapper to spend ${amount} LRT.`);
        } catch (error) {
            setStatus("Approval failed.");
            console.error(error);
        }
        setIsProcessing(false);
    };

    const handleWrap = async () => {
        if (!walletAddress || !amount) {
            setStatus("Please enter an amount to wrap.");
            return;
        }
        setIsProcessing(true);
        setStatus("Wrapping tokens...");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const wrapperContract = new Contract(wrapperContractAddress, wrapperContractABI, signer);
            
            const amountToWrap = parseUnits(amount, 18);
            const tx = await wrapperContract.wrap(amountToWrap, { gasLimit: 200000 });
            
            setStatus("Waiting for wrap transaction...");
            await tx.wait();
            
            setStatus(`Successfully wrapped ${amount} LRT into PLRT.`);
            await fetchBalances(); // Refresh balances after successful wrap
            setAmount("");
        } catch (error) {
            setStatus("Wrap failed. Did you approve first?");
            console.error(error);
        }
        setIsProcessing(false);
    };

    const handleUnwrap = async () => {
        if (!walletAddress || !amount) {
            setStatus("Please enter an amount to unwrap.");
            return;
        }
        setIsProcessing(true);
        setStatus("Unwrapping tokens...");
        try {
            const provider = new ethers.BrowserProvider(window.ethereum);
            const signer = await provider.getSigner();
            const wrapperContract = new Contract(wrapperContractAddress, wrapperContractABI, signer);
            
            const amountToUnwrap = parseUnits(amount, 18);
            const tx = await wrapperContract.unwrap(amountToUnwrap, { gasLimit: 200000 });
            
            setStatus("Waiting for unwrap transaction...");
            await tx.wait();
            
            setStatus(`Successfully unwrapped ${amount} PLRT into LRT.`);
            await fetchBalances(); // Refresh balances after successful unwrap
            setAmount("");
        } catch (error) {
            setStatus("Unwrap failed.");
            console.error(error);
        }
        setIsProcessing(false);
    };


    return (
        // FIX: Using a specific padding-top class (pt-28) to clear the fixed header.
        <main className="flex w-full flex-col items-center px-4 pt-28 pb-8">
            <div className="w-full max-w-2xl text-center mb-12">
                <h1 className="text-4xl font-bold">Token Wrapper Showcase</h1>
                <p className="mt-4 text-gray-600">
                    An interactive demonstration of a two-contract system: a base ERC-20 token (LRT) and a wrapper that converts it into a premium token (PLRT). This showcases the core concepts of tokenization and programmability on the blockchain.
                </p>
            </div>

            <div className="w-full max-w-md p-8 bg-white rounded-2xl shadow-lg">
                {!walletAddress ? (
                    <button onClick={connectWallet} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">
                        Connect Wallet
                    </button>
                ) : (
                    <div className="space-y-6">
                        <div>
                            <p className="text-sm text-gray-500">Connected Wallet</p>
                            <p className="font-mono text-xs break-all">{walletAddress}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-center">
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">LRT Balance</p>
                                <p className="text-2xl font-bold">{parseFloat(lrtBalance).toFixed(2)}</p>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-lg">
                                <p className="text-sm font-medium">PLRT Balance</p>
                                <p className="text-2xl font-bold">{parseFloat(plrtBalance).toFixed(2)}</p>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="amount" className="block text-sm font-medium text-gray-700">Amount</label>
                            <input
                                id="amount"
                                type="number"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                                placeholder="e.g., 50"
                                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
                            />
                        </div>

                        <div className="space-y-3">
                            <p className="text-xs text-center text-gray-500">Step 1: Approve, Step 2: Wrap/Unwrap</p>
                            <button onClick={handleApprove} disabled={isProcessing} className="w-full flex justify-center py-3 px-4 border rounded-md shadow-sm text-sm font-medium text-indigo-700 bg-indigo-100 hover:bg-indigo-200 disabled:bg-gray-200">
                                {isProcessing ? "Processing..." : "Approve"}
                            </button>
                             <div className="grid grid-cols-2 gap-4">
                                <button onClick={handleWrap} disabled={isProcessing} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400">
                                    {isProcessing ? "Processing..." : "Wrap"}
                                </button>
                                <button onClick={handleUnwrap} disabled={isProcessing} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 disabled:bg-gray-400">
                                    {isProcessing ? "Processing..." : "Unwrap"}
                                </button>
                            </div>
                        </div>
                        
                        <div className="pt-4 border-t text-center">
                            <p className="text-sm font-medium text-gray-700">Status</p>
                            <p className="text-sm text-gray-500 mt-1 h-10">{status}</p>
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
