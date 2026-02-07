import { useState, useEffect } from 'react';
import { useDebateEngine } from './hooks/useDebateEngine';
import { DebateStage } from './components/DebateStage';
import { PERSONAS } from './lib/personas';
import { Play, Pause, RefreshCw } from 'lucide-react';

function App() {
  const {
    history, isThinking, activeSpeaker, speakerA, setSpeakerA,
    speakerB, setSpeakerB, isPaused, setIsPaused, startDebate, advanceTurn
  } = useDebateEngine();

  const [inputTopic, setInputTopic] = useState('');
  const [hasStarted, setHasStarted] = useState(false);

  // Auto-play loop
  useEffect(() => {
    if (!isPaused && hasStarted && !isThinking) {
      const timer = setTimeout(() => advanceTurn(), 1500);
      return () => clearTimeout(timer);
    }
  }, [isPaused, hasStarted, isThinking, history]);

  const handleStart = () => {
    if (!inputTopic.trim()) return;
    setHasStarted(true);
    startDebate(inputTopic);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white font-sans">
      <div className="max-w-5xl mx-auto py-10 px-4">
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-extrabold bg-gradient-to-r from-blue-400 to-red-400 bg-clip-text text-transparent">
            Socratic Debate Arena
          </h1>
          <p className="text-gray-400 mt-2">Two AI Minds. One Topic. Infinite Possibilities.</p>
        </header>

        {!hasStarted ? (
          <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl border border-gray-800 shadow-2xl space-y-6">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-3">
                <img src={speakerA.avatar} className="w-12 h-12 rounded-full border-2 border-blue-500 mx-auto" alt={speakerA.name} />
                <select value={speakerA.id} onChange={(e) => setSpeakerA(PERSONAS.find(p => p.id === e.target.value))} className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm">
                  {PERSONAS.map(p => <option key={p.id} value={p.id} disabled={p.id === speakerB.id}>{p.name}</option>)}
                </select>
              </div>
              <div className="space-y-3">
                <img src={speakerB.avatar} className="w-12 h-12 rounded-full border-2 border-red-500 mx-auto" alt={speakerB.name} />
                <select value={speakerB.id} onChange={(e) => setSpeakerB(PERSONAS.find(p => p.id === e.target.value))} className="w-full bg-black border border-gray-700 rounded-lg p-2 text-sm">
                  {PERSONAS.map(p => <option key={p.id} value={p.id} disabled={p.id === speakerA.id}>{p.name}</option>)}
                </select>
              </div>
            </div>
            <input type="text" value={inputTopic} onChange={(e) => setInputTopic(e.target.value)} placeholder="Enter a topic..." className="w-full bg-black border border-gray-700 rounded-lg p-3" onKeyDown={(e) => e.key === 'Enter' && handleStart()} />
            <button onClick={handleStart} className="w-full bg-blue-600 hover:bg-blue-500 p-3 rounded-lg font-bold flex items-center justify-center gap-2">
              <Play size={18} /> Begin Debate
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 mb-8">
            <div className="flex gap-4">
              <button onClick={() => setIsPaused(!isPaused)} className={`px-8 py-2 rounded-full font-bold transition ${isPaused ? 'bg-green-600' : 'bg-red-600'}`}>
                {isPaused ? <><Play size={18} className="inline mr-2" /> Resume</> : <><Pause size={18} className="inline mr-2" /> Pause</>}
              </button>
              <button onClick={() => window.location.reload()} className="px-8 py-2 rounded-full bg-gray-800 hover:bg-gray-700 font-bold border border-gray-700">
                <RefreshCw size={18} className="inline mr-2" /> Reset
              </button>
            </div>
          </div>
        )}

        <DebateStage history={history} speakerA={speakerA} speakerB={speakerB} isThinking={isThinking} activeSpeaker={activeSpeaker} />
      </div>
    </div>
  );
}

export default App;
