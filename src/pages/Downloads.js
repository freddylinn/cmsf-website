import React from "react";
import Download from "../components/Download";
import WebsiteUpdates from '../components/WebsiteUpdates';

function Downloads() {
  return (
    <div className="bg-[url('../public/images/greenmountain.webp')] bg-cover min-h-[calc(100vh-4rem)] max-w-full">
      <div className="h-4"></div>
      
      {/* BRANDING HEADER - MATCHED TO NAVBAR */}
      <h1 className="text-2xl md:text-4xl tracking-tight text-center py-4 mt-4 mb-8 bg-white/90 backdrop-blur-sm rounded-xl w-max px-10 mx-auto border border-slate-200 shadow-xl">
        <span className="font-bold text-slate-900">Colorado</span>{" "}
        <span className="font-normal text-slate-400">Motor Speech Framework</span>
        <span className="block text-[10px] font-black uppercase tracking-[0.3em] text-sky-600 mt-2">Downloads & Clinical Resources</span>
      </h1>

      <ul className="max-w-[100vw] md:w-2/3 flex flex-col flex-wrap items-center md:mx-auto md:items-start gap-1 pb-16">
        <Download
          name="CMSF_V7.xlsx"
          type="excel"
          alias="Downloadable Excel Version of the CMSF (Updated to V7 3/27/26)"
        />
        <Download
          name="CMSF_V7.pdf"
          type="pdf"
          alias="PDF Version of the CMSF (Updated to V7 3/27/26)"
        />
        <Download name="CMSF_References.pdf" type="pdf" alias="Clinical References and Evidence Base" />
        <Download name="CMSF_Documentation_Examples.pdf" type="pdf" alias="CMSF Documentation & Evaluation Examples" />
        <Download
          name="CMSF_Common_Diagnoses_by_Dysarthria_Subtype.pdf"
          type="pdf"
          alias="Common Neurological Diagnoses by Dysarthria Subtype"
        />
        <Download name="Kite_Picture.jpg" type="image" alias="Patient Stimuli: Kite Picture" />
      </ul>
            
      {/* CLINICAL LOG COMPONENT */}
      <WebsiteUpdates />

      {/* FOOTER: COPYRIGHT & DEVELOPER CREDITS */}
      <footer className="py-16 bg-white/95 backdrop-blur-md border-t border-slate-200 text-center px-6 mt-12">
        <div className="max-w-4xl mx-auto space-y-4">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
            Hilger, A., Cloud, L., & Dunne-Platero, C. (2024). <br />
            Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. <br />
            https://cmsf.info
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto"></div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose">
            © 2024-2026, Regents of the University of Colorado, a body corporate. <br />
            Developed in the Colorado Motor Speech lab. All rights reserved.
          </p>
          <p className="text-[10px] text-slate-400 font-medium">
            Website developed by Frederick Linn (<a href="mailto:Frederick.Linn@colorado.edu" className="hover:text-sky-500 underline transition-colors">Frederick.Linn@colorado.edu</a>)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Downloads;
