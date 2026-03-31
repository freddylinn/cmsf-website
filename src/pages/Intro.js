import React from "react";
import { Link } from "react-router-dom";

function Intro() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-left">
        
        {/* LOGO STYLE MATCHED TO NAVBAR */}
        <h1 className="text-4xl md:text-6xl tracking-tight mb-6">
          <span className="font-bold text-slate-900">Colorado</span>{" "}
          <span className="font-normal text-slate-400">Motor Speech Framework</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed mb-10">
          A  clinical framework designed to assist Speech-Language Pathologists 
          in the differential diagnosis and classification of motor speech disorders.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link 
            to="/tool" 
            className="px-8 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 hover:-translate-y-1 transition-all text-center"
          >
            Start Assessment
          </Link>
          <Link 
            to="/movement" 
            className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all text-center"
          >
            Body Movement Form
          </Link>
        </div>

        <hr className="border-slate-100 mb-16" />

        {/* HOW TO USE SECTION - BASED ON CLINICAL TUTORIAL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-6">
              How to Use the CMSF
            </h2>
            <ul className="space-y-4">
              {[
                "Administer standard motor speech evaluation tasks (e.g., connected speech, maximum phonation time, DDK's, etc.).",
                "Observe deviant speech and non-speech features across respiratory, phonatory, resonance, prosodic, and articulatory subsystems.",
                "Mark 'Y' for features that are clearly present using the binary selection tool.",
                "Review the Diagnostic Scorecard to identify which motor speech subtype aligns most closely with observed features.",
                "If more than one motor speech subtype lines up with the observations, determine if there is evidence for a mixed diagnosis. For example, if there are distinguishing features that cannot be explained by the primary motor speech diagnosis.",
                "Utilize the Net Differential Diagnostic Score to guide clinical classification, evaluation reports, and treatment goals."
              ].map((bullet, i) => (
                <li key={i} className="flex gap-4 text-slate-600 leading-relaxed">
                  <span className="font-black text-sky-500">—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">
              Clinical Privacy & Integrity
            </h2>
            <p className="text-sm text-slate-500 leading-relaxed mb-4">
              To respect patient privacy, <strong>no input data are stored or transmitted</strong> to any servers. All calculations occur locally within your browser.
            </p>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              Key element of the tool: Don’t discount your observations if they don’t 'fit' with a neurological diagnosis. Use the framework to guide clinical judgment, not replace it.
            </p>
          </div>
        </div>

        {/* FRAMEWORK DEVELOPERS */}
        <div className="border-t border-slate-100 pt-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">
            Framework Developers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <p className="font-bold text-slate-900">Allison Hilger</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">PhD, CCC-SLP</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Caitlin Cloud</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">MA, CCC-SLP</p>
            </div>
            <div>
              <p className="font-bold text-slate-900">Kylie Dunne-Platero</p>
              <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">MS, CCC-SLP</p>
            </div>
          </div>
        </div>

        {/* CONTACT SECTION */}
        <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-medium text-center md:text-left">Questions, comments, or clinical feedback?</p>
          <a 
            href="mailto:allison.hilger@colorado.edu" 
            className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors text-sm"
          >
            allison.hilger@colorado.edu
          </a>
        </div>
      </div>

      {/* FOOTER: COPYRIGHT & WEBSITE DEVELOPER */}
      <footer className="py-16 bg-slate-50 border-t border-slate-100 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
            © 2023-2026, Regents of the University of Colorado, a body corporate. <br />
            Developed in the Colorado Motor Speech lab. All rights reserved.
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto"></div>
          <p className="text-[10px] text-slate-400 font-medium">
            Website developed by Frederick Linn (<a href="mailto:Frederick.Linn@colorado.edu" className="hover:text-sky-500 underline transition-colors">Frederick.Linn@colorado.edu</a>)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Intro;
