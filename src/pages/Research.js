import React from "react";

const Research = () => {
  const networkBenefits = [
    {
      title: "Priority Training Access",
      description: "Gain early access to motor speech training cases and educational materials derived from the library."
    },
    {
      title: "Clinician Discussions",
      description: "Receive invitations to exclusive clinician-researcher roundtables and case study discussions."
    },
    {
      title: "Tool Development",
      description: "Be the first to test and provide feedback on new CMSF clinical tools and documentation resources."
    },
    {
      title: "Continuing Education",
      description: "Eligibility for future discounted CMSF continuing education courses and certification tracks."
    }
  ];

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      
      {/* 1. VISION HEADLINE */}
      <div className="mb-12 border-b-2 border-slate-100 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
          Help Build the <span className="text-emerald-600">Motor Speech Case Library</span>
        </h1>
        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl">
          The Colorado Motor Speech Lab is building a national audiovisual library of motor speech evaluation cases to support clinician education, research, and improved assessment of motor speech disorders.
        </p>
      </div>

      {/* 2. THE INITIATIVE EXPLANATION */}
      <div className="mb-16">
        <h2 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-6">The Initiative</h2>
        <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
          <p className="text-lg text-slate-800 font-bold leading-relaxed">
            The CMSF Motor Speech Case Library aims to create one of the largest collections of recorded motor speech evaluation tasks. These recordings support research, perceptual training, and the development of educational resources for speech-language pathologists worldwide.
          </p>
        </div>
      </div>

      {/* 3. THE CLINICIAN NETWORK & BENEFITS */}
      <div className="mb-24">
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white shadow-xl">
          <div className="max-w-3xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-400 mb-4 text-center md:text-left">National Recruitment Now Open</h3>
            <h2 className="text-2xl md:text-3xl font-black text-white mb-6 uppercase tracking-tight">CMSF Clinician Network</h2>
            <p className="text-slate-300 font-medium leading-relaxed mb-10">
              Speech-language pathologists and Clinical Fellows across the United States and abroad are invited to join the CMSF Clinician Network. This inaugural group of members will contribute clinical cases, receive research updates, and gain early access to training materials.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 border-t border-white/10 pt-10">
            {networkBenefits.map((benefit, i) => (
              <div key={i} className="flex flex-col gap-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500/20 flex items-center justify-center">
                  <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-[10px] font-black uppercase text-white mb-2 tracking-wide">{benefit.title}</h4>
                  <p className="text-[11px] text-slate-400 font-bold leading-normal">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* 4. PARTICIPATION STEPS */}
      <div className="mb-24">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">How to Contribute a Case</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl relative">
            <span className="absolute -top-4 left-8 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">1</span>
            <p className="text-sm font-bold text-slate-700 leading-relaxed pt-2">Record 20–30 minutes of a routine motor speech evaluation.</p>
          </div>
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl relative">
            <span className="absolute -top-4 left-8 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">2</span>
            <p className="text-sm font-bold text-slate-700 leading-relaxed pt-2">Use recording equipment provided by our research team.</p>
          </div>
          <div className="p-8 bg-white border-2 border-slate-100 rounded-3xl relative">
            <span className="absolute -top-4 left-8 bg-emerald-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-black text-sm">3</span>
            <p className="text-sm font-bold text-slate-700 leading-relaxed pt-2">Securely upload the recording. Patients receive a global electronic gift card.</p>
          </div>
        </div>
      </div>

      {/* 5. CALL TO ACTION BUTTONS */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
        <a
          href="https://cuboulder.qualtrics.com/jfe/form/SV_6lDkuxZ8fcPNg1M"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full md:w-max px-12 py-5 bg-emerald-600 text-white font-black uppercase text-sm rounded-2xl shadow-xl transition-all hover:bg-emerald-700 hover:scale-105 text-center"
        >
          Join the Clinician Network
        </a>
        <a
          href="mailto:allison.hilger@colorado.edu"
          className="w-full md:w-max px-12 py-5 bg-white border-2 border-slate-200 text-slate-900 font-black uppercase text-sm rounded-2xl hover:bg-slate-50 transition-all text-center"
        >
          Learn About Contributing Recordings
        </a>
      </div>

      {/* FOOTER */}
      <footer className="mt-20 pt-16 border-t border-slate-100">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-4">Research Team</h4>
            <p className="text-sm font-black text-slate-900 uppercase">Colorado Motor Speech Lab</p>
            <p className="text-sm font-bold text-slate-500">Department of Speech, Language, and Hearing Sciences</p>
            <p className="text-sm font-bold text-slate-500 italic">University of Colorado Boulder</p>
          </div>
          <div className="bg-slate-50 p-6 rounded-2xl border border-slate-200">
            <p className="text-[10px] text-slate-400 font-bold leading-relaxed uppercase tracking-widest italic">
              Research participation is voluntary and conducted under the oversight of the University of Colorado Institutional Review Board (IRB).
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Research;
