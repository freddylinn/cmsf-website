import React from "react";
import Download from "../components/Download";
import WebsiteUpdates from '../components/WebsiteUpdates';

function Downloads() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* Hero Section */}
      <div className="relative bg-[url('../public/images/greenmountain.webp')] bg-cover bg-center py-20 md:py-32">
        <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"></div>
        <div className="relative max-w-5xl mx-auto px-6 text-left">
          <h1 className="text-4xl md:text-6xl tracking-tight text-white mb-4">
            <span className="font-bold text-white">Colorado</span>{" "}
            <span className="font-normal text-white opacity-80">Motor Speech Framework</span>
          </h1>
          <p className="text-xl text-white/80 max-w-2xl font-medium">
            Access clinical assessment tools, standardized stimuli, and 
            framework version history for motor speech evaluation.
          </p>
        </div>
      </div>

      {/* Grid Section */}
      <div className="max-w-6xl mx-auto px-6 -mt-12 md:-mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <Download
            name="CMSF_V7.xlsx"
            type="excel"
            alias="CMSF Assessment (Excel)"
            description="Full diagnostic matrix with automated differential scoring (V7 - 3/27/26)."
          />
          <Download
            name="CMSF_V7.pdf"
            type="pdf"
            alias="CMSF Assessment (PDF)"
            description="Printable version of the primary diagnostic framework (V7 - 3/27/26)."
          />
          <Download 
            name="CMSF_References.pdf" 
            type="pdf" 
            alias="Evidence Base"
            description="Complete reference list and evidence supporting framework items."
          />
          <Download 
            name="CMSF_Documentation_Examples.pdf" 
            type="pdf" 
            alias="Documentation Examples"
            description="Sample evaluation reports and clinician write-up templates."
          />
          <Download
            name="CMSF_Common_Diagnoses_by_Dysarthria_Subtype.pdf"
            type="pdf"
            alias="Diagnostic Cheat Sheet"
            description="Common neurological correlates categorized by dysarthria subtype."
          />
          <Download 
            name="Kite_Picture.jpg" 
            type="image" 
            alias="Patient Stimuli"
            description="Standardized 'Kite' picture for connected speech samples."
          />
        </div>

        <WebsiteUpdates />
      </div>

      {/* Footer */}
      <footer className="py-20 bg-white border-t border-slate-200 text-center px-6">
        <div className="max-w-4xl mx-auto space-y-6">
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose text-center">
            Hilger, A., Cloud, C., & Dunne-Platero, K. (2024). <br />
            Colorado Motor Speech Framework (CMSF) [Clinical assessment tool]. <br />
            https://cmsf.info
          </p>
          <div className="h-px w-12 bg-slate-200 mx-auto"></div>
          <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose text-center">
            © 2023-2026, Regents of the University of Colorado, a body corporate. <br />
            Developed in the Colorado Motor Speech lab. All rights reserved. <br />
            Website developed by Frederick Linn (Frederick.Linn@colorado.edu)
          </p>
        </div>
      </footer>
    </div>
  );
}

export default Downloads;
