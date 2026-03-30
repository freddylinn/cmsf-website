import React, { useState } from 'react';
import fitiData from '../data/fitiData.json';

function FitiAssessment() {
  const [visibleTranscriptions, setVisibleTranscriptions] = useState({});
  const [scores, setScores] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);

  const toggleTranscription = (moduleId, phraseIdx) => {
    const key = `${moduleId}-${phraseIdx}`;
    setVisibleTranscriptions(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const toggleScore = (moduleId, phraseIdx, targets, e) => {
    e.stopPropagation();
    const key = `${moduleId}-${phraseIdx}`;
    setScores(prev => ({
      ...prev,
      [key]: prev[key] ? null : { targets }
    }));
  };

  // Calculate Total Score
  const totalPossibleTargets = fitiData.reduce((sum, m) => sum + m.targets, 0);
  const currentCorrectTargets = Object.values(scores).reduce((sum, val) => sum + (val?.targets || 0), 0);
  const percentage = totalPossibleTargets > 0 ? ((currentCorrectTargets / totalPossibleTargets) * 100).toFixed(1) : 0;

  return (
    <div className="p-6 max-w-6xl mx-auto font-sans bg-slate-50 min-h-screen">
      
      {/* 1. Header & Official Link */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black text-slate-800 mb-2 tracking-tight">Modular FITI Assessment</h1>
        <div className="flex flex-col items-center gap-3">
          <p className="text-slate-500 max-w-2xl text-sm">
            A hierarchical approach to efficient intelligibility assessment based on phonemic frequency and positional prominence.
          </p>
          <a 
            href="https://sites.pfw.edu/cladlab/fiti.html" 
            target="_blank" 
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-sky-600 hover:text-sky-700 font-bold text-sm bg-white px-4 py-2 rounded-full border border-sky-100 shadow-sm transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
            Visit Official FITI Resource Page
          </a>
        </div>
      </div>

      {/* 2. Clinical Instructions Toggle */}
      <div className="mb-8 max-w-3xl mx-auto">
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
          <div className="mt-2 p-6 bg-white border border-slate-200 rounded-xl text-sm text-slate-600 leading-relaxed shadow-inner">
            <ul className="space-y-4">
              <li>
                <strong className="text-slate-800 block mb-1">1. Starting Point:</strong>
                Always begin with <span className="font-bold text-sky-600">Module A1</span>. It assesses the most essential elements for functional intelligibility (High frequency / Tier 1 prominence).
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">2. The "Jump" Rule (Time-Constrained):</strong>
                If higher-priority categories (like A1) are within normal limits, a clinician may jump directly to <span className="font-bold text-sky-600">Modules E2 and E3</span> to assess the most phonetically complex elements (fricatives and clusters).
              </li>
              <li>
                <strong className="text-slate-800 block mb-1">3. Modular Progression:</strong>
                With every subsequent module used, the assessment becomes more comprehensive, helping to draw a clearer picture of function and identify specific treatment targets.
              </li>
            </ul>
          </div>
        )}
      </div>

      {/* 3. Floating Score Counter */}
      <div className="sticky top-20 z-40 mb-8 bg-white/90 backdrop-blur-md shadow-md border border-sky-100 rounded-2xl p-5 flex justify-between items-center no-print max-w-4xl mx-auto">
        <div>
          <h2 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Intelligibility Score</h2>
          <p className="text-4xl font-black text-sky-600">{percentage}%</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-black text-slate-800 leading-none">{currentCorrectTargets} / {totalPossibleTargets}</p>
          <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">Phonemic Targets</p>
        </div>
      </div>

      {/* 4. Modules Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {fitiData.map((module) => (
          <div key={module.id} className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm flex flex-col">
            <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-slate-800 text-white font-black text-xs">
                  {module.id}
                </span>
                <h3 className="font-bold text-slate-800 text-sm">Module {module.id}</h3>
              </div>
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">
                {module.targets} Targets
              </span>
            </div>

            <div className="p-4 space-y-2 flex-grow">
              <p className="text-[11px] text-slate-400 italic mb-3 font-medium">{module.description}</p>
              {module.phrases.map((phrase, idx) => {
                const isVisible = visibleTranscriptions[`${module.id}-${idx}`];
                const isCorrect = !!scores[`${module.id}-${idx}`];
                
                return (
                  <div key={idx} className="flex gap-2 items-start">
                    <button 
                      onClick={(e) => toggleScore(module.id, idx, module.targets / module.phrases.length, e)}
                      className={`mt-1 flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
                        isCorrect ? 'bg-green-500 border-green-500 text-white' : 'border-slate-200 text-transparent'
                      }`}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </button>

                    <div className="flex-grow">
                      <button
                        onClick={() => toggleTranscription(module.id, idx)}
                        className={`w-full text-left p-3 rounded-xl transition-all border ${
                          isVisible ? 'bg-sky-50 border-sky-100' : 'border-transparent hover:bg-slate-50'
                        }`}
                      >
                        <p className={`text-sm font-semibold leading-snug ${isCorrect ? 'text-slate-900' : 'text-slate-600'}`}>
                          {phrase.text}
                        </p>
                        {isVisible && (
                          <div className="mt-2 p-2 bg-white rounded-lg border border-sky-100 shadow-inner">
                            <p className="font-mono text-[11px] text-sky-600 italic tracking-wide">
                              [{phrase.phonetic}]
                            </p>
                          </div>
                        )}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* 5. Footer */}
      <footer className="mt-16 pt-8 border-t border-slate-200 text-center pb-20">
        <p className="text-[10px] text-slate-400 leading-relaxed uppercase font-bold tracking-widest">
          © 2023 to 2026, Regents of the University of Colorado. Developed in the Colorado Motor Speech lab.
        </p>
        <p className="mt-2 text-[10px] text-slate-300">
          Source: Gurevich & Kim (2024). A Hierarchical Approach to Efficient Assessment of Functional Intelligibility.
        </p>
      </footer>
    </div>
  );
}

export default FitiAssessment;
