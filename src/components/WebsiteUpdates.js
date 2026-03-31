import React from 'react';

const WebsiteUpdates = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white shadow-2xl rounded-3xl mb-20 border border-slate-200">
      <h2 className="text-xl font-black mb-12 uppercase tracking-widest text-slate-900 border-b-4 border-sky-500 w-max pb-2">
        Clinical Update Log
      </h2>

      {/* MARCH 2026 */}
      <div className="relative pl-8 border-l-4 border-sky-500 mb-16 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-sky-500 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-6 text-slate-900">March 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Platform & UI</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Updated website aesthetic for improved clinical workflow.</li>
              <li>• Added the <strong>FITI Modules Page</strong> for indirect task interference assessment.</li>
              <li>• Integrated the <strong>EPIC Smart Phrase generator</strong> for automated documentation.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Diagnostic Logic</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Removed X (Flaccid) for slow rate of speech.</li>
              <li>• Removed X (Hypokinetic) for vocal tremor; added <strong>XX (Hyperkinetic)</strong>.</li>
              <li>• Added X (Hyperkinetic) for <strong>resting tremor</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MAY 2025 */}
      <div className="relative pl-8 border-l-4 border-slate-200 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-slate-200 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-8 text-slate-400">May 2025</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Voice & Respiration</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Revised MPT cutoffs: 15s (&lt;65) / 12s (&gt;65).</li>
                <li>— Added features: <strong>Pitch Instability</strong>, <strong>Pitch Breaks</strong>, and <strong>Runs out of air</strong>.</li>
                <li>— Revised "Strained-Strangled" to <strong>Strained</strong>.</li>
                <li>— Removed "Vocal Harshness" to reduce overlap.</li>
                <li>— Added XX (Flaccid) for breathiness and aphonia.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">OME (Face, Lip, Lingual)</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Added feature: <strong>Reduced sensation to the face</strong>.</li>
                <li>— Added XX (Flaccid) for hypotonia and bilateral facial weakness.</li>
                <li>— Added X (UUMN/Hypo/Hyper) for <strong>pseudobulbar affect</strong>.</li>
                <li>— Revised "Weak Cough" to include laryngeal/respiratory involvement.</li>
                <li>— Removed X (AOS) for drooping, lip weakness, and lingual weakness.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-400 mb-4 tracking-widest">Tasks & Articulation</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Added CAPE-V sentence "Mama makes lemon muffins" to Resonance tasks.</li>
                <li>— Revised DDK instructions: Obtain exact counts; cue for comfort vs. max rates.</li>
                <li>— Added XX (Spastic) for monopitch and monoloudness.</li>
                <li>— Added XX (AOS) for syllable segregation.</li>
                <li>— Added "inconsistent breakdowns" for hyperkinetic dysarthria.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteUpdates;
