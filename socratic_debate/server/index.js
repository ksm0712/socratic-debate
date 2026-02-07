const express = require('express');
const cors = require('cors');
const Groq = require('groq-sdk');
const axios = require('axios');
require('dotenv').config();

const app = express();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

app.use(cors());
app.use(express.json());

app.post('/api/chat', async (req, res) => {
    const { history, currentSpeaker, topic } = req.body;
    const prompt = `Persona: ${currentSpeaker.name}. Style: ${currentSpeaker.style}. Topic: ${topic}. Short debate turn (40 words).`;
    const messages = [{ role: "system", content: prompt }];
    history.slice(-4).forEach(m => messages.push({ role: m.speaker === currentSpeaker.name ? "assistant" : "user", content: m.text }));
    
    // TRY 1: GROQ
    try {
        const compl = await groq.chat.completions.create({ messages, model: "llama-3.3-70b-versatile", max_tokens: 150, timeout: 5000 });
        return res.json({ text: compl.choices[0]?.message?.content });
    } catch (e) {
        console.warn("Groq failed.");
    }

    // TRY 2: POLLINATIONS (Always free)
    try {
        const resp = await axios.get(`https://text.pollinations.ai/${encodeURIComponent(prompt)}?model=openai&cache=false`, { timeout: 5000 });
        if (resp.data) return res.json({ text: resp.data });
    } catch (e) {
        console.warn("Pollinations failed.");
    }

    // TRY 3: MOCK
    const mocks = ["We must return to first principles.", "Logic is the only way forward.", "That is an interesting but flawed point.", "Progress requires sacrifice."];
    res.json({ text: mocks[Math.floor(Math.random() * mocks.length)] });
});

app.listen(3001, '0.0.0.0', () => console.log('Indestructible Brain Ready'));
