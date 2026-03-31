import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Intro() {
  const [showAnnounce, setShowAnnounce] = useState(false);

  // Trigger the pop-up on load, but only once per session
  useEffect(() => {
    const hasSeenUpdate = sessionStorage.getItem("hasSeenMarchUpdate");
    if (!hasSeenUpdate) {
      setShowAnnounce(true);
    }
  }, []);

  const closeAnnounce = () => {
    setShowAnnounce(false);
    sessionStorage.setItem("hasSeenMarchUpdate", "true");
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">
      
      {/* UPDATE ANNOUNCEMENT POP-UP */}
      {showAnnounce && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 no-print">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity"
            onClick={closeAnnounce}
          ></div>
          
          {/* Modal Content */}
          <div className="relative bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 md:p-10 border border-slate-200 animate-in fade-in zoom-in duration-300">
            <button 
              onClick={closeAnnounce}
              className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="mb-6 p-3 bg-sky-50 rounded-2xl w-max">
              <svg className="w-8 h-8 text-sky-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>

            <h2 className="text-2xl font-black text-slate-900 leading-tight mb-4 uppercase tracking-tight">
              New Website Design <br />
              <span className="text-sky-600">& Clinical Features</span>
            </h2>

            <p className="text-slate-600 leading-relaxed mb-8 font-medium">
              Check out the updated website design, including a new 
              <strong className="text-slate-900"> EPIC Smart Phrase generator</strong> at the end of the tool to streamline your clinical documentation.
            </p>

            <div className="flex flex-col gap-3">
              <Link 
                to="/tool"
                onClick={closeAnnounce}
                className="w-full py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-lg hover:bg-sky-600 transition-all text-center text-sm"
              >
                Explore the Tool
              </Link>
              <button 
                onClick={closeAnnounce}
                className="w-full py-3 text-slate-400 font-bold uppercase tracking-widest text-[10px] hover:text-slate-600 transition-all"
              >
                Dismiss Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-left">
        <h1 className="text-4xl md:text-6xl tracking-tight mb-6">
          <span className="font-bold text-slate-900">Colorado</span>{" "}
          <span className="font-normal text-slate-400">Motor Speech Framework</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-500 max-w-3xl leading-relaxed mb-10">
          A clinical framework designed to assist Speech-Language Pathologists 
          in the differential diagnosis and classification of motor speech disorders.
        </p>

        <div className="flex flex-col sm:flex-row flex-wrap gap-4 mb-20">
          <Link to="/tool" className="px-8 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-xl hover:bg-sky-600 hover:-translate-y-1 transition-all text-center">
            Start Assessment
          </Link>
          <Link to="/movement" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all text-center">
            Body Movement Form
          </Link>
          <Link to="/stimuli" className="px-8 py-4 bg-white border-2 border-slate-200 text-slate-600 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-50 transition-all text-center">
            Patient View Stimuli
          </Link>
        </div>

        <hr className="border-slate-100 mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-6">How to Use the CMSF</h2>
            <ul className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Administer standard motor speech evaluation tasks.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Observe deviant features across all speech subsystems.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Mark 'Y' for features clearly present in the tool.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Utilize the Scorecard and EPIC summary to guide classification.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">Clinical Privacy & Integrity</h2>
            <p className="text-sm text-slate-500 leading-relaxed italic">
              Note: To respect patient privacy, no input data are stored or transmitted. All calculations occur locally.
            </p>
          </div>
        </div>

        {/* DEVELOPERS */}
        <div className="border-t border-slate-100 pt-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-8">Framework Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div><p className="font-bold text-slate-900">Allison Hilger, PhD, CCC-SLP</p></div>
            <div><p className="font-bold text-slate-900">Caitlin Cloud, MA, CCC-SLP</p></div>
            <div><p className="font-bold text-slate-900">Kylie Dunne-Platero, MS, CCC-SLP</p></div>
          </div>
        </div>

        <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-medium">Questions or feedback?</p>
          <a href="mailto:allison.hilger@colorado.edu" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
            allison.hilger@colorado.edu
          </a>
        </div>
      </div>

      <footer className="py-16 bg-slate-50 border-t border-slate-100 text-center px-6">
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
          © 2023-2026, Regents of the University of Colorado. Developed in the Colorado Motor Speech lab. <br />
          Website developed by Frederick Linn (Frederick.Linn@colorado.edu)
        </p>
      </footer>
    </div>
  );
}

export default Intro;
