import React from "react";
import { Link } from "react-router-dom";
import UpdatesModal from "../components/UpdatesModal";
import InstallInstructions from "../components/InstallInstructions";

function Intro() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 relative">

      <UpdatesModal />

      {/* Hero Section */}
      <div className="max-w-5xl mx-auto px-6 py-16 md:py-24 text-left">
        {/* HEADER RESTORED TO ORIGINAL DARK TEXT */}
        <h1 className="text-4xl md:text-6xl tracking-tight mb-6 leading-tight">
          <span className="font-bold text-slate-900">CMSF</span>{" "}
          <span className="font-normal text-slate-600">Motor Speech Framework</span>
        </h1>

        <p className="text-xl md:text-2xl text-slate-600 max-w-3xl leading-relaxed mb-10">
          An advanced clinical framework designed to assist Speech-Language Pathologists 
          in the differential diagnosis and classification of motor speech disorders.
        </p>

        {/* EVENLY STRUCTURED BUTTON LAYOUT */}
        <div className="space-y-4 mb-12 max-w-4xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link 
              to="/tool" 
              className="px-5 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:bg-sky-600 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Start Assessment
            </Link>

            <Link 
              to="/resources" 
              className="px-5 py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:bg-slate-800 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Tutorials & Resources
            </Link>

            <Link 
              to="/movement" 
              className="px-5 py-4 bg-white border-2 border-slate-500 text-slate-700 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 hover:border-slate-700 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Body Movement Form
            </Link>

            <Link 
              to="/patient-view" 
              className="px-5 py-4 bg-white border-2 border-slate-500 text-slate-700 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 hover:border-slate-700 transition-all text-center text-xs flex items-center justify-center min-h-[56px]"
            >
              Patient View Stimuli
            </Link>
          </div>

          {/* CLINICIAN NETWORK BUTTON - FULL WIDTH ANCHOR */}
          <Link 
            to="/research" 
            className="w-full block px-6 py-4 bg-white border-2 border-emerald-700 text-emerald-800 font-black uppercase tracking-widest rounded-2xl hover:bg-emerald-50 hover:border-emerald-800 transition-all text-center text-xs shadow-sm"
          >
            Join the CMSF Clinician Network: Research & Training Opportunities
          </Link>
        </div>

        {/* TUTORIALS & RESOURCES BANNER CARD */}
        <div className="bg-slate-50 rounded-3xl p-6 md:p-8 border border-slate-200 mb-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="px-2.5 py-1 bg-sky-100 text-sky-700 text-[10px] font-black uppercase rounded-lg tracking-wider">
                Video & Podcast Guides
              </span>
              <span className="text-xs font-bold text-slate-600">• 50-Min ACRM Walkthrough</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              New to the Colorado Motor Speech Framework?
            </h3>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl leading-relaxed">
              Watch our complete tutorial video, listen to podcast deep-dives from <em>MedBridge</em> and <em>Speech Uncensored</em>, and learn how to use features like Blind Mode and the EPIC Smart Phrase Generator.
            </p>
          </div>
          <Link
            to="/resources"
            className="px-6 py-3.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-black uppercase tracking-widest rounded-xl transition-all shadow-md shrink-0 w-full md:w-auto text-center"
          >
            Explore Resources →
          </Link>
        </div>

        <hr className="border-slate-100 mb-16" />

        {/* HOW TO USE & PRIVACY */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-24">
          <div>
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-sky-600 mb-6 font-bold">How to Use the CMSF</h2>
            <ul className="space-y-4 text-slate-600 leading-relaxed font-medium">
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Administer standard motor speech assessment tasks.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Elicit multiple speech contexts (e.g., connected speech, repetition).</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Observe deviant speech features across subsystems.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Mark “Y” for features clearly present in the CMSF.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Review the Scorecard to visually examine diagnostic patterns.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Use patterns to support neuroanatomical reasoning.</li>
              <li className="flex gap-4"><span className="text-sky-500 font-black">—</span> Document impressions using the EPIC Smart Phrase generator.</li>
            </ul>
          </div>

          <div className="bg-slate-50 p-8 rounded-3xl border border-slate-200">
            <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-6 font-bold">Clinical Privacy & Integrity</h2>
            <p className="text-sm text-slate-600 leading-relaxed italic font-medium">
              To respect patient privacy, no input data are stored or transmitted. All clinical calculations occur locally within your browser.
            </p>
          </div>
        </div>

        {/* INSTALL AS AN APP */}
        <div className="mb-16">
          <InstallInstructions lang="en" />
        </div>

        {/* DEVELOPERS */}
        <div className="border-t border-slate-100 pt-12">
          <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-600 mb-8 font-bold">Framework Developers</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-sm">
            <div><p className="font-bold text-slate-900">Allison Hilger, PhD, CCC-SLP</p></div>
            <div><p className="font-bold text-slate-900">Caitlin Cloud, MA, CCC-SLP</p></div>
            <div><p className="font-bold text-slate-900">Kylie Dunne-Platero, MS, CCC-SLP</p></div>
          </div>
        </div>

        {/* CONTACT */}
        <div className="mt-20 p-8 bg-slate-900 rounded-3xl text-white flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="font-medium text-lg">Have feedback or want to collaborate?</p>
          <a href="mailto:allison.hilger@colorado.edu" className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-xl font-bold transition-colors">
            Contact the Lab
          </a>
        </div>
      </div>

      <footer className="py-16 bg-slate-50 border-t border-slate-100 text-center px-6">
        <p className="text-[11px] text-slate-600 font-bold uppercase tracking-widest leading-loose">
          © 2023-2026, Regents of the University of Colorado. Developed in the Colorado Motor Speech Lab. <br />
          Website by Frederick Linn (Frederick.Linn@colorado.edu)
        </p>
      </footer>
    </div>
  );
}

export default Intro;
