import React, { useState } from 'react';
import fitiData from '../data/fitiData.json';

function FitiAssessment() {
  const [visibleTranscriptions, setVisibleTranscriptions] = useState({});
  const [phonemeScores, setPhonemeScores] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleTranscription = (moduleId, pIdx) => {
    const key = `${moduleId}-${pIdx}`;
    setVisibleTranscriptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const togglePhonemeScore = (moduleId, pIdx, partIdx, e) => {
    e.stopPropagation();
    const key = `${moduleId}-${pIdx}-${partIdx}`;
    setPhonemeScores(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const totalPossibleTargets = fitiData.reduce((sum, m) => sum + m.targets, 0);
  const currentCorrectTargets = Object.values(phonemeScores).filter(v => v === true).length;
  const percentage = totalPossibleTargets > 0 ? ((currentCorrectTargets / totalPossibleTargets) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans bg-slate-50 min-h-screen">
      {/* Intelligibility Tracker */}
      <div className="sticky top-20 z-40 mb-8 bg-white/90 backdrop-blur-md shadow-md border border-sky-100 rounded-2xl p-5 flex justify-between items-center max-w-4xl mx-auto">
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none">Phonemic Intelligibility</h2>
          <p className="text-4xl font-black text-sky-600">{percentage}%</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-slate-800 leading-none">{currentCorrectTargets} / {totalPossibleTargets}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Targets Captured</p>
        </div>
      </div>

      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-slate-800 mb-2">Modular FITI Assessment</h1>
        <button onClick={() => setShowInstructions(!showInstructions)} className="text-sky-600 font-bold text-sm underline">
          {showInstructions ? "Hide" : "Show"} Clinical Progression Rules
        </button>
      </div>

      {showInstructions && (
        <div className="mb-8 p-6 bg-white border border-slate-200 rounded-xl shadow-inner text-sm text-slate-600 max-w-3xl mx-auto leading-relaxed">
          <p className="mb-3"><strong>1. Start at A1:</strong> Assess the most essential functional targets first[cite: 81, 414].</p>
          <p className="mb-3"><strong>2. The Jump Rule:</strong> If A1 is clear, jump to E2/E3 to test phonetic complexity (clusters/fricatives).</p>
          <p><strong>Official Resource:</strong> <a href="https://sites.pfw.edu/cladlab/fiti.html" target="_blank" className="text-sky-500 font-bold underline">Clad Lab FITI Page</a></p>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fitiData.map((module) => (
          <div key={module.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
              <span className="bg-slate-800 text-white px-3 py-1 rounded text-xs font-black">Module {module.id}</span>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">{module.targets} Phonemic Targets</span>
            </div>

            <div className="p-4 space-y-4 flex-grow">
              {module.phrases.map((phrase, pIdx) => {
                const isVisible = visibleTranscriptions[`${module.id}-${pIdx}`];
                return (
                  <div key={pIdx} className="border-b border-slate-50 last:border-0 pb-4">
                    <button onClick={() => toggleTranscription(module.id, pIdx)} className="w-full text-left group">
                      <p className="text-sm font-semibold text-slate-700 group-hover:text-sky-600 transition-colors leading-snug">
                        {phrase.text}
                      </p>
                      {isVisible && (
                        <div className="mt-3 flex flex-wrap items-center gap-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-inner font-mono text-sm">
                          <span className="mr-1 text-slate-400">[</span>
                          {phrase.phoneticParts.map((part, partIdx) => (
                            part.isTarget ? (
                              <button
                                key={partIdx}
                                onClick={(e) => togglePhonemeScore(module.id, pIdx, partIdx, e)}
                                className={`mx-0.5 px-1.5 py-0.5 rounded border-2 transition-all font-black ${
                                  phonemeScores[`${module.id}-${pIdx}-${partIdx}`]
                                    ? 'bg-green-500 border-green-600 text-white'
                                    : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400'
                                }`}
                              >
                                {part.val}
                              </button>
                            ) : (
                              <span key={partIdx} className="text-slate-500">{part.val}</span>
                            )
                          ))}
                          <span className="ml-1 text-slate-400">]</span>
                        </div>
                      )}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FitiAssessment;
