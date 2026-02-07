const Groq = require('groq-sdk');
require('dotenv').config();

// Debug ENV
console.log("Loading .env...");
if (!process.env.GROQ_API_KEY) {
    console.error("ERROR: GROQ_API_KEY is missing from process.env");
} else {
    console.log("GROQ_API_KEY found:", process.env.GROQ_API_KEY.substring(0, 5) + "...");
}

async function test() {
    const groq = new Groq({
        apiKey: process.env.GROQ_API_KEY
    });

    try {
        console.log("Attempting to generate content with llama3-70b-8192...");
        const completion = await groq.chat.completions.create({
            messages: [{ role: 'user', content: 'Hello?' }],
            model: "llama3-70b-8192",
        });
        console.log("Success:", completion.choices[0]?.message?.content);
    } catch (error) {
        console.error("Error Details:", JSON.stringify(error, null, 2));
        console.error("Full Error:", error);
    }
}

test();
