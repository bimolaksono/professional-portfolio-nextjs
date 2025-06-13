// This code goes in the file: app/api/pinata-upload/route.ts

import { NextResponse } from 'next/server';

// FIX: Changed from 'export default async function POST' to 'export async function POST'
export async function POST(request: Request) {
  // 1. Get the form data from the incoming request from the frontend.
  const formData = await request.formData();
  const file = formData.get('file');

  if (!file) {
    return NextResponse.json({ error: "No file provided." }, { status: 400 });
  }

  // 2. Create a new FormData object to send to the Pinata API.
  const pinataFormData = new FormData();
  pinataFormData.append('file', file);
  
  const pinataMetadata = JSON.stringify({
    name: file instanceof File ? file.name : 'metadata.json',
  });
  pinataFormData.append('pinataMetadata', pinataMetadata);
  
  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  pinataFormData.append('pinataOptions', pinataOptions);

  // --- DEBUGGING STEP ---
  // Let's print the JWT to the server console to ensure it's being read correctly.
  const pinataJwt = process.env.PINATA_JWT;
  
  // --------------------

  // 3. Make the API call to Pinata.
  try {
    const res = await fetch("https://api.pinata.cloud/pinning/pinFileToIPFS", {
      method: 'POST',
      headers: {
        // Use the JWT from your .env.local file
        Authorization: `Bearer ${pinataJwt}`, 
      },
      body: pinataFormData
    });

    // 4. Handle the response from Pinata.
    if (!res.ok) {
        const errorBody = await res.text();
        console.error("Pinata API Error Response:", errorBody);
        throw new Error(`Pinata API Error: ${res.status} ${res.statusText}`);
    }

    const data = await res.json();

    // 5. Return a successful JSON response to our frontend.
    const ipfsUri = `ipfs://${data.IpfsHash}`;
    return NextResponse.json({ ipfsUri }, { status: 200 });

  } catch (e) {
    console.error("Error in pinata-upload API route:", e);
    const errorMessage = e instanceof Error ? e.message : "An unknown error occurred.";
    return NextResponse.json({ error: 'Error uploading file to Pinata', details: errorMessage }, { status: 500 });
  }
}
