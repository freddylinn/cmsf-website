import React, { useState } from 'react';
import fitiData from '../data/fitiData.json';

function FitiAssessment() {
  const [phonemeScores, setPhonemeScores] = useState({});
  const [showInstructions, setShowInstructions] = useState(true); // Open by default

  const togglePhonemeScore = (moduleId, pIdx, partIdx, e) => {
    const key = `${moduleId}-${pIdx}-${partIdx}`;
    setPhonemeScores(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getModuleScore = (moduleId) => {
    return Object.keys(phonemeScores).filter(
      (key) => key.startsWith(`${moduleId}-`) && phonemeScores[key] === true
    ).length;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans bg-slate-50 min-h-screen">
      
      {/* 1. Header & Resources */}
      <div className="mb-10 text-center">
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Modular FITI Assessment</h1>
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-500 max-w-2xl text-sm leading-relaxed">
            A hierarchical approach to intelligibility assessment. Track specific phonemic targets 
            within each priority module to identify treatment goals.
          </p>
          <a 
            href="https://sites.pfw.edu/cladlab/fiti.html" 
            target="_blank" 
            rel="noreferrer" // Security fix added
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold text-sm bg-white px-4 py-2 rounded-full border border-sky-100 shadow-sm transition-all no-print"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Official FITI Resource Page
          </a>
        </div>
      </div>

      {/* 2. Clinical Instructions (Visible by default) */}
      <div className="mb-12 max-w-3xl mx-auto no-print">
        <button 
          onClick={() => setShowInstructions(!showInstructions)}
          className="w-full flex items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-slate-300 transition-all"
        >
          <span className="font-bold text-slate-700 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-sky-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Clinical Progression Instructions
          </span>
          <svg className={`h-5 w-5 text-slate-400 transition-transform ${showInstructions ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {showInstructions && (
          <div className="mt-2 p-6 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed shadow-inner animate-in fade-in slide-in-from-top-1">
            <ul className="space-y-4">
              <li>
                <strong className="text-slate-800 block mb-1">1. Priority Start:</strong>
                Begin with <span className="font-bold text-sky-600">Module A1</span>. It covers high-frequency phonemes in Tier 1 prominent contexts, which are most essential to functional intelligibility.
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">2. Complexity Jump:</strong>
                If A1 is within normal limits, jump to <span className="font-bold text-sky-600">Modules E2 and E3</span> to assess phonetically complex elements like fricatives and clusters.
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">3. Clinical Decision Making:</strong>
                Use the per-module scores to identify if deficits are linked to specific phoneme groups or positional salience.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 3. Modules Grid (Phonetics visible by default) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {fitiData.map((module) => {
          const moduleCorrect = getModuleScore(module.id);
          const isComplete = moduleCorrect === module.targets;

          return (
            <div key={module.id} className={`border rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col transition-all ${isComplete ? 'border-green-200 ring-1 ring-green-100' : 'border-slate-200'}`}>
              
              <div className={`border-b p-4 flex justify-between items-center ${isComplete ? 'bg-green-50 border-green-200' : 'bg-slate-50 border-slate-200'}`}>
                <div className="flex items-center gap-3">
                  <span className={`flex items-center justify-center w-8 h-8 rounded-lg font-black text-xs transition-colors ${isComplete ? 'bg-green-600 text-white' : 'bg-slate-800 text-white'}`}>
                    {module.id}
                  </span>
                  <h3 className="font-bold text-slate-800 text-sm">Module {module.id}</h3>
                </div>
                
                <div className="text-right">
                  <span className={`text-lg font-black leading-none ${isComplete ? 'text-green-700' : 'text-sky-600'}`}>
                    {moduleCorrect}
                  </span>
                  <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter ml-1">
                    / {module.targets} targets
                  </span>
                </div>
              </div>

              <div className="p-4 space-y-4 flex-grow">
                <p className="text-[11px] text-slate-400 italic mb-2 font-medium">{module.description}</p>
                {module.phrases.map((phrase, pIdx) => (
                  <div key={pIdx} className="border-b border-slate-50 last:border-0 pb-4">
                    <p className="text-sm font-semibold leading-snug text-slate-700 mb-3">
                      {phrase.text}
                    </p>
                    <div className="flex flex-wrap items-center gap-y-2 p-3 bg-slate-50 rounded-xl border border-slate-100 shadow-inner font-mono text-sm">
                      <span className="mr-1 text-slate-400">[</span>
                      {phrase.phoneticParts.map((part, partIdx) => (
                        part.isTarget ? (
                          <button
                            key={partIdx}
                            onClick={(e) => togglePhonemeScore(module.id, pIdx, partIdx, e)}
                            className={`mx-0.5 px-1.5 py-0.5 rounded border-2 transition-all font-black ${
                              phonemeScores[`${module.id}-${pIdx}-${partIdx}`]
                                ? 'bg-green-500 border-green-600 text-white'
                                : 'bg-white border-slate-300 text-slate-800 hover:border-sky-400 shadow-sm'
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
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* 4. Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-200 text-center pb-20 no-print">
        <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest">
          © 2023 to 2026, Regents of the University of Colorado. Developed in the Colorado Motor Speech lab.
        </p>
        <p className="mt-2 text-[10px] text-slate-300 italic">
          Gurevich, N., & Kim, H. (2024). Modular FITI Phrase List Analysis.
        </p>
      </footer>
    </div>
  );
}

export default FitiAssessment;
