// This code goes in the file: app/api/agentic-commerce/route.ts

import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required." }, { status: 400 });
    }
    
    // --- Gemini API Call ---
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
        console.error("Gemini API key is missing from .env.local");
        return NextResponse.json({ error: "Gemini API key is not configured on the server." }, { status: 500 });
    }

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    // --- UPDATED PROMPT ---
    // Instructs the AI to be more detailed and provide a URL.
    const fullPrompt = `
      You are an expert shopping agent for a user in Australia.
      Your task is to find a single, specific product based on the user's request.
      Be detailed in your response. For flights, include the airline and flight number. For products, include the model or type.
      You must respond ONLY with a single, valid JSON object. Do not include any text before or after the JSON.
      The JSON object must have the following structure:
      {
        "productName": "string (be specific, e.g., 'Qantas Flight QF432' or 'Breville Barista Express Coffee Machine')",
        "merchantName": "string (a plausible Australian merchant, e.g., 'Qantas', 'JB Hi-Fi')",
        "price": "number (e.g., 459.50)",
        "productUrl": "string (a plausible, but not necessarily real, URL to the product page)",
        "reasoning": "string (a brief, one-sentence explanation for your choice)"
      }

      User's request: "${prompt}"
    `;
    
    const payload = {
        contents: [{
            parts: [{ text: fullPrompt }]
        }]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
        const errorData = await response.text(); 
        console.error("Gemini API Error Response:", errorData);
        throw new Error(`The AI agent failed to respond. Status: ${response.status}`);
    }
    
    const result = await response.json();
    
    if (result.candidates && result.candidates[0].content.parts[0].text) {
      const jsonText = result.candidates[0].content.parts[0].text;
      
      console.log("Raw text from Gemini:", jsonText);
      
      try {
        const cleanedJsonText = jsonText.replace(/```json/g, '').replace(/```/g, '').trim();
        const parsedResult = JSON.parse(cleanedJsonText);
        return NextResponse.json(parsedResult, { status: 200 });
      } catch (parseError) {
        console.error("Failed to parse JSON from AI response:", parseError);
        throw new Error("The AI returned a malformed response.");
      }
    } else {
      console.error("Invalid response structure from Gemini:", result);
      throw new Error("Received an invalid response structure from the AI agent.");
    }

  } catch (error) {
    console.error("Error in agentic-commerce API route:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
