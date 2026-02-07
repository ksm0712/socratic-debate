const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

async function test() {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    // const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    try {
        // const result = await model.generateContent("Hello, are you there?");
        // console.log("Success:", result.response.text());

        // LIST MODELS
        // Note: The SDK doesn't expose listModels directly easily in 0.1.3? 
        // Wait, it is not on the genAI instance. We might need to use fetch or check documentation.
        // Actually, newer SDK versions do have it. Let's try to infer or just try 'gemini-pro'.

        console.log("Testing gemini-pro...");
        const modelPro = genAI.getGenerativeModel({ model: "gemini-pro" });
        const resultPro = await modelPro.generateContent("Hello?");
        console.log("Success with gemini-pro:", resultPro.response.text());

    } catch (error) {
        console.error("Error with gemini-pro:", error);
    }
}

test();
