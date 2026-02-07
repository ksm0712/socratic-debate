import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DebateStage({ history, speakerA, speakerB, isThinking, activeSpeaker }) {
    const containerRef = useRef(null);
    const isAtBottomRef = useRef(true);

    useEffect(() => {
        if (containerRef.current) containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }, []);

    const handleScroll = () => {
        if (!containerRef.current) return;
        const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
        isAtBottomRef.current = scrollHeight - scrollTop - clientHeight <= 20;
    };

    useEffect(() => {
        if (isAtBottomRef.current && containerRef.current) {
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.scrollTo({ top: containerRef.current.scrollHeight, behavior: 'smooth' });
                }
            }, 100);
        }
    }, [history, isThinking]);

    return (
        <div className="flex flex-col h-full w-full max-w-4xl mx-auto p-4 gap-4 text-white">
            <div className="flex justify-between items-center mb-6">
                <PersonaCard persona={speakerA} isActive={activeSpeaker?.id === speakerA.id} align="left" />
                <div className="text-2xl font-bold text-gray-500">VS</div>
                <PersonaCard persona={speakerB} isActive={activeSpeaker?.id === speakerB.id} align="right" />
            </div>

            <div ref={containerRef} onScroll={handleScroll} className="flex-1 overflow-y-auto bg-gray-900/50 rounded-xl p-4 border border-white/10 space-y-4 min-h-[400px]">
                {history.map((msg, idx) => {
                    const isLeft = (msg.speakerId || msg.speaker) === speakerA.name || msg.speaker === speakerA.name;
                    return (
                        <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className={`flex stroke-none ${isLeft ? 'justify-start' : 'justify-end'}`}>
                            <div className={`max-w-[75%] p-4 rounded-xl border ${isLeft ? 'bg-blue-600/20 border-blue-500/30' : 'bg-red-600/20 border-red-500/30'}`}>
                                <p className="text-xs font-bold uppercase opacity-50 mb-1">{msg.speaker}</p>
                                <p>{msg.text}</p>
                            </div>
                        </motion.div>
                    );
                })}
                {isThinking && <div className="p-4 bg-gray-800/30 rounded-xl w-fit animate-pulse italic text-gray-400">Thinking...</div>}
            </div>
        </div>
    );
}

function PersonaCard({ persona, isActive, align }) {
    return (
        <motion.div animate={{ scale: isActive ? 1.1 : 1, opacity: isActive ? 1 : 0.8 }} className="flex flex-col items-center gap-2">
            <div className={`w-20 h-20 rounded-full overflow-hidden border-4 ${isActive ? 'border-blue-400 shadow-lg shadow-blue-400/20' : 'border-gray-700'}`}>
                <img src={persona.avatar} alt={persona.name} className="w-full h-full object-cover" />
            </div>
            <h4 className="font-bold text-sm">{persona.name}</h4>
        </motion.div>
    );
}
