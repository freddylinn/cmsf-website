import React, { useState } from 'react';
// Updated to match your file name
import fitiData from '../data/fitiData.json'; 

function FitiAssessment() {
  const [phonemeScores, setPhonemeScores] = useState({});
  const [showRef, setShowRef] = useState(false);

  const togglePhonemeScore = (moduleId, pIdx, partIdx) => {
    const key = `${moduleId}-${pIdx}-${partIdx}`;
    setPhonemeScores(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const getModuleScore = (moduleId) => {
    return Object.keys(phonemeScores).filter(
      (key) => key.startsWith(`${moduleId}-`) && phonemeScores[key] === true
    ).length;
  };

  // Live calculation for the Documentation Table
  const getTableScore = (groupId, tier) => {
    const moduleId = `${groupId}${tier}`;
    const module = fitiData.find(m => m.id === moduleId);
    if (!module) return "N/A";
    return `${getModuleScore(moduleId)} / ${module.targets}`;
  };

  const generateReport = () => {
    const a1Score = getModuleScore("A1");
    let report = `FITI Analysis Summary:\n`;
    
    // Clinical Logic for High Priority Deficits (A1)
    if (a1Score < 15) {
      report += `- Patient has clear production of only ${a1Score}/18 targets in Module A1. Given its high functional importance to intelligibility [FITI], expect significant intelligibility deficits.\n`;
    } else {
      report += `- Functional intelligibility for high-frequency Tier 1 targets (Group A) is relatively preserved.\n`;
    }

    // Complexity Logic (Groups E)
    const e2 = getModuleScore("E2");
    const e3 = getModuleScore("E3");
    if (e2 < 1 || e3 < 5) {
      report += `- Deficits noted in phonetic complexity (E2/E3). Given the low frequency of these sounds, difficulties may indicate specific sequencing or motor planning involvement [Apraxia].\n`;
    }

    return report;
  };

  return (
    <div className="p-4 md:p-10 max-w-7xl mx-auto font-sans bg-white min-h-screen text-slate-900 text-left">
      
      {/* HEADER & CITATION */}
      <div className="mb-10 border-b pb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-4 tracking-tighter uppercase">Modular FITI Assessment</h1>
        <p className="text-sm text-slate-500 leading-relaxed max-w-4xl italic">
          <strong>Reference:</strong> Gurevich, N., & Kim, H. (2024). A hierarchical approach to efficient assessment of functional intelligibility: The modular FITI phrase list. 
          <span className="ml-1 text-sky-600">Perspectives of the ASHA Special Interest Groups, 9(3), 892–907.</span>
        </p>
      </div>

      {/* DOCUMENTATION & SCORING ORIENTATION */}
      <div className="mb-12 no-print">
        <button 
          onClick={() => setShowRef(!showRef)}
          className="w-full flex items-center justify-between p-6 bg-slate-900 text-white rounded-2xl shadow-xl hover:bg-slate-800 transition-all"
        >
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-black">?</div>
            <div className="text-left">
              <p className="font-black uppercase tracking-widest text-xs text-sky-400">Clinical Resource</p>
              <p className="text-lg font-bold">Documentation & Scoring Orientation</p>
            </div>
          </div>
          <span className="text-2xl">{showRef ? '−' : '+'}</span>
        </button>

        {showRef && (
          <div className="mt-4 p-8 bg-slate-50 border-2 border-slate-200 rounded-3xl animate-in fade-in slide-in-from-top-4">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-4">Functional Importance Hierarchy</h3>
            <p className="text-sm text-slate-600 mb-8 leading-relaxed">
              Intelligibility priority flows from <strong>Group A (Most Important)</strong> to <strong>Group E (Least)</strong>, 
              and from <strong>Tier 1 (Most Salient)</strong> to <strong>Tier 3 (Least Salient)</strong>.
            </p>

            {/* LIVE SCORING TABLE */}
            <div className="overflow-x-auto rounded-xl border border-slate-300 shadow-sm mb-8">
              <table className="w-full text-center border-collapse bg-white">
                <thead>
                  <tr className="bg-slate-800 text-white text-[10px] uppercase tracking-widest">
                    <th className="p-3 border border-slate-700">Group</th>
                    <th className="p-3 border border-slate-700">Tier 1 (#_V, V_V, C_V)</th>
                    <th className="p-3 border border-slate-700">Tier 2 (#_C)</th>
                    <th className="p-3 border border-slate-700">Tier 3 (V_C, V_#, C_C, C_#)</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  {['A', 'B', 'C', 'D', 'E'].map(group => (
                    <tr key={group}>
                      <td className="p-3 bg-slate-100 border border-slate-200">Group {group}</td>
                      <td className="p-3 border border-slate-200 text-sky-600">{getTableScore(group, 1)}</td>
                      <td className="p-3 border border-slate-200 text-sky-600">{getTableScore(group, 2)}</td>
                      <td className="p-3 border border-slate-200 text-sky-600">{getTableScore(group, 3)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-inner">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-3">Draft Documentation Summary</h4>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-700 leading-relaxed">{generateReport()}</pre>
            </div>
          </div>
        )}
      </div>

      {/* ASSESSMENT MODULES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
        {fitiData.map((module) => (
          <div key={module.id} className="bg-white border-2 border-slate-100 rounded-3xl shadow-sm overflow-hidden flex flex-col">
            <div className="p-5 bg-slate-50 border-b flex justify-between items-center">
              <div>
                <span className="px-3 py-1 bg-slate-800 text-white text-[10px] font-black rounded-full mr-2 uppercase">Module {module.id}</span>
                <p className="inline text-xs font-bold text-slate-500 uppercase tracking-tighter">{module.description}</p>
              </div>
              <div className="text-right">
                <span className="text-xl font-black text-sky-600">{getModuleScore(module.id)}</span>
                <span className="text-[10px] font-black text-slate-300 uppercase ml-1">/ {module.targets} Targets</span>
              </div>
            </div>

            <div className="p-6 space-y-8 flex-grow">
              {module.phrases.map((phrase, pIdx) => (
                <div key={pIdx} className="space-y-4">
                  <div className="flex items-start gap-3">
                    <span className="text-slate-300 font-black text-xs mt-1">{pIdx + 1}</span>
                    <p className="text-lg font-bold text-slate-800 leading-tight">
                      {phrase.text}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-200/50 font-mono text-sm shadow-inner">
                    <span className="text-slate-300 mr-2">[</span>
                    {phrase.phoneticParts.map((part, partIdx) => (
                      part.isTarget ? (
                        <button
                          key={partIdx}
                          onClick={() => togglePhonemeScore(module.id, pIdx, partIdx)}
                          className={`px-3 py-1 rounded-lg border-2 transition-all font-black text-base ${
                            phonemeScores[`${module.id}-${pIdx}-${partIdx}`]
                              ? 'bg-green-500 border-green-600 text-white shadow-md'
                              : 'bg-white border-slate-300 text-slate-900 hover:border-sky-500 hover:text-sky-600 shadow-sm'
                          }`}
                        >
                          {part.val}
                        </button>
                      ) : (
                        <span key={partIdx} className="text-slate-400 px-1">{part.val}</span>
                      )
                    ))}
                    <span className="text-slate-300 ml-2">]</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <footer className="mt-20 py-10 border-t border-slate-100 text-center">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest leading-loose">
          Functional Importance to Intelligibility (FITI) © 2024 <br />
          Developed for the University of Colorado
        </p>
      </footer>
    </div>
  );
}

export default FitiAssessment;
