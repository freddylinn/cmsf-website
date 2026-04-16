import React from "react";

const Research = () => {
  const memberBenefits = [
    {
      title: "Paid Research Opportunities",
      description: "Receive guaranteed honorariums for participating in expert perceptual rating panels and diagnostic validation studies."
    },
    {
      title: "Early Access to CEUs",
      description: "Gain priority registration and early access to new CMSF continuing education courses and specialized training modules."
    },
    {
      title: "Case Library Contributions",
      description: "Contribute to the national library of motor speech evaluations. Help build the corpus used to train the next generation of SLPs."
    },
    {
      title: "Professional Growth",
      description: "Participate in exclusive clinician-researcher roundtables, case deep-dives, and tool feedback sessions."
    }
  ];

  const currentInitiatives = [
    {
      id: "case-library",
      title: "Motor Speech Case Library",
      description: "We are currently seeking clinicians to record and securely upload routine motor speech evaluations to build a national audiovisual corpus."
    },
    {
      id: "pattern-validation",
      title: "Feature Pattern Validation",
      description: "Help us refine diagnostic accuracy by identifying CMSF speech feature patterns across diverse neurological conditions."
    },
    {
      id: "pediatric-abi",
      title: "Pediatric Brain Injury Focus",
      description: "Specialized initiatives targeting the identification of speech features in children with acquired brain injuries (ABI)."
    }
  ];

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      
      {/* 1. NETWORK VISION */}
      <div className="mb-12 border-b-2 border-slate-100 pb-10">
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-6 uppercase tracking-tighter leading-none">
          Join the <span className="text-emerald-600">CMSF Clinician Network</span>
        </h1>
        <p className="text-xl text-slate-600 font-medium leading-relaxed max-w-3xl">
          The Colorado Motor Speech Lab invites SLPs and Clinical Fellows to join a global professional network dedicated to advancing the standard of care for motor speech disorders.
        </p>
      </div>

      {/* 2. CALL TO ACTION & ELIGIBILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-emerald-400">Join the Network</h2>
            <p className="text-slate-300 mb-8 font-medium leading-relaxed">
              Complete our quick eligibility screener to join the registry. Network members are the first to be contacted for paid research, training opportunities, and tool updates.
            </p>
          </div>
          <a
            href="https://cuboulder.qualtrics.com/jfe/form/SV_6lDkuxZ8fcPNg1M"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-max px-10 py-5 bg-white text-slate-900 font-black uppercase text-sm rounded-2xl shadow-lg transition-all hover:bg-emerald-50 hover:scale-105 text-center"
          >
            Apply to Join the Network
          </a>
        </div>

        <div className="lg:col-span-2 bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-8 flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 mb-6">Network Eligibility</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-bold text-emerald-900">Current SLP (including CFs or equivalent)</p>
            </li>
            <li className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-bold text-emerald-900">Global Participation: Open to clinicians worldwide</p>
            </li>
          </ul>
        </div>
      </div>

      {/* 3. MEMBER BENEFITS GRID */}
      <div className="mb-24">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Member Benefits</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {memberBenefits.map((benefit, i) => (
            <div key={i} className="p-8 bg-slate-50 rounded-3xl border border-slate-100 flex gap-6">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                <svg className="w-6 h-6 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <div>
                <h4 className="text-sm font-black uppercase text-slate-900 mb-2 tracking-wide">{benefit.title}</h4>
                <p className="text-sm text-slate-500 font-medium leading-relaxed">{benefit.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. CURRENT INITIATIVES */}
      <div className="mb-24 border-t-2 border-slate-50 pt-20">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10">Current Initiatives</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {currentInitiatives.map((item) => (
            <div key={item.id} className="p-8 bg-white border-2 border-slate-100 rounded-3xl hover:border-sky-100 transition-all">
              <h4 className="text-lg font-black text-slate-900 mb-4 leading-tight uppercase tracking-tight">{item.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium mb-6">{item.description}</p>
              {item.id === "case-library" && (
                <a href="mailto:allison.hilger@colorado.edu" className="text-xs font-black text-sky-600 hover:underline uppercase tracking-widest">
                  Inquire about recordings →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* 5. PRIVACY & IRB */}
      <footer className="mt-20 p-10 bg-slate-900 rounded-[40px] text-white overflow-hidden relative">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-10 text-center md:text-left">
          <div className="max-w-md">
            <h4 className="text-emerald-400 font-black uppercase text-xs tracking-[0.2em] mb-4">Privacy & Ethics</h4>
            <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
              Research participation is voluntary and overseen by the University of Colorado IRB. All mailing list data is stored securely and used exclusively for CMSF Network communications.
            </p>
          </div>
          <div className="shrink-0">
            <p className="text-sm font-black uppercase tracking-widest">Colorado Motor Speech Lab</p>
            <p className="text-xs font-bold text-slate-500 uppercase tracking-tighter">University of Colorado Boulder</p>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default Research;
