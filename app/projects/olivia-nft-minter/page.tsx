"use client";

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { ethers, Contract } from 'ethers';

// Define an interface for the window.ethereum object
declare global {
  interface Window {
    ethereum?: any;
  }
}

// The full, correct ABI for your contract.
// The double bracket [[...]] error has been fixed.
const contractABI: any = [
	{ "inputs": [ { "internalType": "address", "name": "initialOwner", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" },
	{ "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "OwnableInvalidOwner", "type": "error" },
	{ "inputs": [ { "internalType": "address", "name": "account", "type": "address" } ], "name": "OwnableUnauthorizedAccount", "type": "error" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "approved", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Approval", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "owner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "operator", "type": "address" }, { "indexed": false, "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "ApprovalForAll", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "previousOwner", "type": "address" }, { "indexed": true, "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "OwnershipTransferred", "type": "event" },
	{ "anonymous": false, "inputs": [ { "indexed": true, "internalType": "address", "name": "from", "type": "address" }, { "indexed": true, "internalType": "address", "name": "to", "type": "address" }, { "indexed": true, "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "Transfer", "type": "event" },
	{ "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "approve", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "owner", "type": "address" } ], "name": "balanceOf", "outputs": [ { "internalType": "uint256", "name": "", "type": "uint256" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "getApproved", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "owner", "type": "address" }, { "internalType": "address", "name": "operator", "type": "address" } ], "name": "isApprovedForAll", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "name", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "owner", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "ownerOf", "outputs": [ { "internalType": "address", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "renounceOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "string", "name": "uri", "type": "string" } ], "name": "safeMint", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "data", "type": "bytes" } ], "name": "safeTransferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "operator", "type": "address" }, { "internalType": "bool", "name": "approved", "type": "bool" } ], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "bytes4", "name": "interfaceId", "type": "bytes4" } ], "name": "supportsInterface", "outputs": [ { "internalType": "bool", "name": "", "type": "bool" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [], "name": "symbol", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "tokenURI", "outputs": [ { "internalType": "string", "name": "", "type": "string" } ], "stateMutability": "view", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "from", "type": "address" }, { "internalType": "address", "name": "to", "type": "address" }, { "internalType": "uint256", "name": "tokenId", "type": "uint256" } ], "name": "transferFrom", "outputs": [], "stateMutability": "nonpayable", "type": "function" },
	{ "inputs": [ { "internalType": "address", "name": "newOwner", "type": "address" } ], "name": "transferOwnership", "outputs": [], "stateMutability": "nonpayable", "type": "function" }
];

// Use the confirmed contract address.
const contractAddress = "0x22aaf650c5303d3dd1cc9f555a898d2466d79f38";

export default function NftMinter() {
  const [walletAddress, setWalletAddress] = useState<string | null>(null);
  const [status, setStatus] = useState<string>("Not connected.");
  const [isOwner, setIsOwner] = useState<boolean | null>(null);

  // Form State
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [buyerAddress, setBuyerAddress] = useState<string>("");
  const [isMinting, setIsMinting] = useState<boolean>(false);

  useEffect(() => {
    const checkWalletConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({ method: 'eth_accounts' });
          if (accounts.length > 0) {
            setWalletAddress(accounts[0]);
          }
        } catch (error) {
          console.error("Error checking for wallet connection:", error);
        }
      } else {
        setStatus("MetaMask not found. Please install it.");
      }
    };
    checkWalletConnection();
  }, []);

  useEffect(() => {
    const verifyOwnership = async () => {
      // The condition is now correct.
      if (walletAddress && ethers.isAddress(contractAddress)) {
        setStatus("Verifying ownership...");
        try {
          const provider = new ethers.BrowserProvider(window.ethereum);
          const contract = new ethers.Contract(contractAddress, contractABI, provider);
          const ownerAddress = await contract.owner();
          
          if (ownerAddress.toLowerCase() === walletAddress.toLowerCase()) {
            setIsOwner(true);
            setStatus("Owner verified successfully. Ready to mint.");
          } else {
            setIsOwner(false);
            setStatus("Connected wallet is not the contract owner.");
          }
        } catch (error) {
          console.error("Could not check owner status:", error);
          setStatus("Error: Could not verify owner. Is the contract address correct and on the Sepolia network?");
          setIsOwner(false);
        }
      }
    };
    verifyOwnership();
  }, [walletAddress]);


  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        if (accounts.length > 0) {
          setWalletAddress(accounts[0]);
        }
      } catch (error) {
        console.error("Error connecting wallet: ", error);
        setStatus("Failed to connect wallet.");
      }
    }
  };
  
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
        setFile(e.target.files[0]);
    }
  }

  const handleMint = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    
    if (!ethers.isAddress(buyerAddress)) {
      setStatus("Error: Please enter a valid Ethereum wallet address for the buyer.");
      return;
    }
    if (!file || !title || !description) {
      setStatus("Please fill in all fields.");
      return;
    }
    if (!isOwner) {
        setStatus("Only the contract owner can mint NFTs.");
        return;
    }
    
    setIsMinting(true);
    setStatus("Minting process started...");

    const imageUri = await uploadToPinata(file);
    if (!imageUri) {
        setIsMinting(false);
        return;
    }

    const metadata = { name: title, description: description, image: imageUri };
    const metadataUri = await uploadToPinata(JSON.stringify(metadata, null, 2));
    if (!metadataUri) {
        setIsMinting(false);
        return;
    }

    await mintOnBlockchain(buyerAddress, metadataUri);
    setIsMinting(false);
  };

  const uploadToPinata = async (data: File | string): Promise<string | null> => {
    try {
      setStatus("Step 1/3: Uploading file to IPFS...");
      const formData = new FormData();
      if (typeof data === 'string') {
          const blob = new Blob([data], { type: 'application/json' });
          formData.append('file', blob, 'metadata.json');
      } else {
          formData.append('file', data);
      }
      const response = await fetch('/api/pinata-upload', { method: 'POST', body: formData });
      const result = await response.json();
      if (!response.ok) { throw new Error(result.error || 'Upload failed'); }
      return result.ipfsUri;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An unknown error occurred";
      console.error("Error uploading to Pinata:", errorMessage);
      setStatus(`Error: IPFS upload failed. ${errorMessage}`);
      return null;
    }
  };

  const mintOnBlockchain = async (toAddress: string, tokenUri: string) => {
    if (window.ethereum) {
      try {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contractWithSigner = new ethers.Contract(contractAddress, contractABI, signer);

        setStatus("Step 2/3: Awaiting transaction confirmation in wallet...");
        const tx = await contractWithSigner.safeMint(toAddress, tokenUri, { gasLimit: 300000 });

        setStatus("Step 3/3: Waiting for on-chain confirmation...");
        await tx.wait();
        
        setStatus(`Success! NFT minted and transferred. Tx: ${tx.hash.substring(0, 10)}...`);
        // Reset form
        setFile(null);
        setTitle("");
        setDescription("");
        setBuyerAddress("");
      } catch (error: any) {
        console.error("Blockchain minting error:", error);
        if (error.code === 'ACTION_REJECTED') {
          setStatus("Transaction rejected in wallet.");
        } else {
          setStatus("Minting failed. Check console for details.");
        }
      }
    }
  };

  return (
    <main className="flex flex-col items-center p-4 md:p-8">
      <div className="mx-auto max-w-xl w-full p-8 bg-white rounded-2xl shadow-lg mt-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Olivia's Art Minter</h1>
          <p className="text-gray-500 mt-2">Create a unique NFT for a digital art commission</p>
        </div>

        <div className="p-4 mb-6 bg-gray-50 rounded-lg text-center">
          <p className="text-sm font-medium text-gray-700">Status</p>
          <p className="text-sm text-gray-500 mt-1 break-all">{status}</p>
        </div>

        {!walletAddress ? (
          <button onClick={connectWallet} className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700">
            Connect Wallet
          </button>
        ) : isOwner === null ? (
          <div className="text-center p-4 bg-gray-100 text-gray-800 rounded-lg">
            Verifying ownership...
          </div>
        ) : !isOwner ? (
          <div className="text-center p-4 bg-yellow-100 text-yellow-800 rounded-lg">
              Connected wallet is not the contract owner.
          </div>
        ) : (
          <form onSubmit={handleMint} className="space-y-6">
            <div>
                <label htmlFor="art-file" className="block text-sm font-medium text-gray-700">Digital Art File</label>
                <input id="art-file" type="file" accept="image/*" onChange={handleFileChange} className="mt-1 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-violet-50 file:text-violet-700 hover:file:bg-violet-100" required />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
                <input id="title" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="e.g., 'Sunset Over the Lake'" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div>
                <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                <textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="A brief description of the artwork." rows={3} className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required></textarea>
            </div>
            <div>
                <label htmlFor="buyer-address" className="block text-sm font-medium text-gray-700">Buyer's Wallet Address</label>
                <input id="buyer-address" type="text" value={buyerAddress} onChange={(e) => setBuyerAddress(e.target.value)} placeholder="0x..." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
            </div>
            <div>
                <button type="submit" disabled={isMinting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                  {isMinting ? "Minting..." : "Mint and Transfer NFT"}
                </button>
            </div>
          </form>
        )}
      </div>
    </main>
  );
}
