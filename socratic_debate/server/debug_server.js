const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

// Debug ENV
console.log("Loading .env...");
if (!process.env.GEMINI_API_KEY) {
    console.error("ERROR: GEMINI_API_KEY is missing from process.env");
} else {
    console.log("GEMINI_API_KEY found:", process.env.GEMINI_API_KEY.substring(0, 5) + "...");
}

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    try {
        console.log("Attempting to generate content...");
        const result = await model.generateContent("Hello?");
        console.log("Success:", result.response.text());
    } catch (error) {
        console.error("Error Details:", JSON.stringify(error, null, 2));
        console.error("Full Error:", error);
    }
}

test();
