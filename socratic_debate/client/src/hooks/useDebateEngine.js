import { useState, useEffect } from 'react';
import axios from 'axios';
import { PERSONAS } from '../lib/personas';

export function useDebateEngine() {
    const [history, setHistory] = useState([]);
    const [isThinking, setIsThinking] = useState(false);
    const [activeSpeaker, setActiveSpeaker] = useState(null);
    const [speakerA, setSpeakerA] = useState(PERSONAS[0]);
    const [speakerB, setSpeakerB] = useState(PERSONAS[1]);
    const [topic, setTopic] = useState('');
    const [isPaused, setIsPaused] = useState(true);

    const advanceTurn = async () => {
        if (isPaused || isThinking) return;

        let next = history.length % 2 === 0 ? speakerA : speakerB;
        setActiveSpeaker(next);
        setIsThinking(true);

        try {
            // Use window.location.hostname to match however the user is accessing it
            const apiHost = window.location.hostname || 'localhost';
            const res = await axios.post(`http://${apiHost}:3001/api/chat`, {
                topic,
                history,
                currentSpeaker: next
            });

            if (res.data && res.data.text) {
                setHistory(h => [...h, {
                    speaker: next.name,
                    text: res.data.text,
                    speakerId: next.id
                }]);
            }
        } catch (e) {
            console.error("Connection error to 3001:", e.message);
        } finally {
            setIsThinking(false);
        }
    };

    const startDebate = (t) => {
        setTopic(t);
        setHistory([]);
        setIsPaused(false);
    };

    return {
        history, isThinking, activeSpeaker, speakerA, setSpeakerA,
        speakerB, setSpeakerB, topic, isPaused, setIsPaused,
        cooldown: 0,
        startDebate, advanceTurn
    };
}
