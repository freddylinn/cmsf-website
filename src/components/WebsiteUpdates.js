import { SPANISH_ENABLED, FITI_ENABLED } from "../config/features";
import React from 'react';

const WebsiteUpdates = () => {
  return (
    <div className="max-w-5xl mx-auto px-6 py-16 bg-white shadow-2xl rounded-3xl mb-20 border border-slate-200">
      <h2 className="text-xl font-black mb-12 uppercase tracking-widest text-slate-900 border-b-4 border-sky-500 w-max pb-2">
        Clinical Update Log
      </h2>

      {/* SEPTEMBER 2026 */}
      <div className="relative pl-8 border-l-4 border-sky-500 mb-16 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-sky-500 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-6 text-slate-900">September 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {FITI_ENABLED && (
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Modular FITI Assessment</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Added a <strong>Modular FITI Assessment</strong> page: a scoring interface for the 15-module functional importance to intelligibility phrase list of Gurevich &amp; Kim (2024), used with the authors' permission.</li>
              <li>• Corrected the target sounds throughout. Only phonemes occurring in each module's specific positional contexts are marked as targets; every phrase was verified against the published appendix.</li>
              <li>• Each module now states its own phoneme group and positional contexts, so a single module can be documented on its own.</li>
              <li>• Added the full reference and DOI for the modular FITI paper, carried into the copyable documentation summary.</li>
              <li>• Added guidance on interpreting scores against a module's functional importance, and on administering a subset of modules when time or stamina is limited.</li>
            </ul>
          </div>
          )}
          {SPANISH_ENABLED && (
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Spanish Adaptation</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Released a <strong>Chilean Spanish edition</strong> of the framework, adapted with Sebastián Contreras Cubillos and colleagues at Universidad Santo Tomás, Talca.</li>
              <li>• All 90 perceptual features, definitions, and task instructions translated, with culturally adapted reading passages and stimuli.</li>
              <li>• Diagnostic indicators are identical across editions, so scores are directly comparable.</li>
              <li>• Added Spanish downloads: the CMSF SPCh assessment workbook and the Chilean reading passages, plus a link to the PEVH protocol at the Universidad de Chile repository.</li>
            </ul>
          </div>
          )}
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Mobile &amp; Tablet</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• New layout for phones and tablets in portrait: features appear as a scrollable list, with your diagnostic pattern shown as a compact grid.</li>
              <li>• Task and definition pop-ups now open on tap rather than hover, so they work on touchscreens.</li>
              <li>• The full side-by-side matrix is unchanged on larger screens.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Install as an App</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• The CMSF can now be added to a phone, tablet, or desktop home screen and opened like an app.</li>
              <li>• Once installed it <strong>works with no internet connection</strong>, for use in clinic rooms with unreliable wifi.</li>
              <li>• Installation instructions are on the home page. As always, nothing entered is stored or transmitted.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Instrument Changes</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Revised <strong>Reduced vocal loudness (&lt;70dB)</strong> to <strong>(&lt;70 dB SPL)</strong> to specify the reference scale.</li>
              <li>• Added a <strong>laterality selector</strong> (Bilateral / L / R) to the eight oral mechanism features where a side should be recorded, including facial drooping, lip asymmetry, jaw deviation, palate asymmetry, and tongue deviation, weakness, and range of motion.</li>
              <li>• The recorded side now appears in the generated clinical summary alongside the feature.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-sky-600 mb-4 tracking-widest">Accessibility &amp; Fixes</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Raised text and button contrast across the site to meet WCAG AA, and added a visible keyboard focus indicator.</li>
              <li>• Oral mechanism sections now display correctly as <strong>OME</strong> rather than "Ome".</li>
              <li>• Fixed a scoring bug where "Limited range of motion" was linked between the Lips and Jaw sections.</li>
              <li>• Restored missing definitions for eight oral mechanism features.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* JULY 2026 */}
      <div className="relative pl-8 border-l-4 border-slate-200 mb-16 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-slate-200 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-6 text-slate-600">July 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Resources & Education</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Launched the dedicated <strong>Resources & Tutorials Hub</strong> featuring embedded video guides and podcast deep-dives.</li>
              <li>• Added the 50-minute <strong>ACRM CEU Webinar Walkthrough</strong> detailing feature pattern analysis and differential diagnosis.</li>
              <li>• Integrated MedSLP podcast features including <em>MedBridge Speech Scope</em> and <em>Speech Uncensored</em>.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Platform & Navigation</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Streamlined primary navigation and dropdown menu structure for fast clinical access.</li>
              <li>• Added home page resource callout banner for onboarding first-time framework users.</li>
              <li>• Expanded access points for the <strong>CMSF Clinician Network</strong> research and training initiatives.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MARCH 2026 */}
      <div className="relative pl-8 border-l-4 border-slate-200 mb-16 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-slate-200 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-6 text-slate-600">March 2026</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Platform & UI</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Updated website aesthetic for improved clinical workflow and visual scanning.</li>
              <li>• Added the <strong>FITI Modules Page</strong> for assessment of indirect task interference.</li>
              <li>• Integrated the <strong>EPIC Smart Phrase generator</strong> for automated clinical summaries.</li>
            </ul>
          </div>
          <div>
            <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Diagnostic Logic</h4>
            <ul className="space-y-3 text-xs text-slate-600 leading-relaxed font-medium">
              <li>• Removed X (Flaccid) for slow rate of speech.</li>
              <li>• Vocal Tremor: Removed X (Hypokinetic) and added <strong>XX (Hyperkinetic)</strong>.</li>
              <li>• Added X (Hyperkinetic) for <strong>resting tremor</strong>.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* MAY 2025 */}
      <div className="relative pl-8 border-l-4 border-slate-200 text-left">
        <div className="absolute -left-[14px] top-0 w-6 h-6 bg-white border-4 border-slate-200 rounded-full"></div>
        <h3 className="text-2xl font-bold mb-8 text-slate-600">May 2025</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Voice & Respiration</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Revised MPT cutoffs: 15s (&lt;65) / 12s (&gt;65).</li>
                <li>— Added features: <strong>Pitch Instability</strong>, <strong>Pitch Breaks</strong>, and <strong>Runs out of air</strong>.</li>
                <li>— Revised "Strained-Strangled" to <strong>Strained</strong>.</li>
                <li>— Removed "Vocal Harshness" to reduce clinical overlap.</li>
                <li>— Added XX (Flaccid) for breathiness and aphonia.</li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">OME & Face</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Added feature: <strong>Reduced sensation to the face</strong>.</li>
                <li>— Added XX (Flaccid) for hypotonia and bilateral facial weakness.</li>
                <li>— Revised "Weak Cough" to include laryngeal and respiratory involvement.</li>
              </ul>
            </div>
          </div>
          <div className="space-y-8">
            <div>
              <h4 className="text-[10px] font-black uppercase text-slate-600 mb-4 tracking-widest">Tasks & Articulation</h4>
              <ul className="space-y-2 text-[11px] text-slate-500 leading-relaxed">
                <li>— Added CAPE-V sentence "Mama makes lemon muffins" to Resonance.</li>
                <li>— Revised DDK instructions: Obtain exact counts; cue for comfortable/max rates.</li>
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
