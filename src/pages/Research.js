import React from "react";

const Research = () => {
  const researchFocusAreas = [
    {
      id: "neuro-conditions",
      title: "Neurological Condition Mapping",
      description: "Collaborate on identifying and validating CMSF speech feature patterns across various neurological conditions to refine diagnostic accuracy."
    },
    {
      id: "pediatric-abi",
      title: "Pediatric Acquired Brain Injury",
      description: "Specialized projects focused on identifying CMSF features in children with acquired brain injury to support pediatric-specific frameworks."
    },
    {
      id: "perceptual-rating",
      title: "Intelligibility & Severity Scaling",
      description: "Participate in expert listening panels to rate the intelligibility, naturalness, and severity of clinical speech samples."
    }
  ];

  const faqs = [
    {
      question: "How often will I be contacted?",
      answer: "You will only be emailed when a new research study is available for participation. We value your time and aim to send no more than two opportunities per month."
    },
    {
      question: "What is the compensation model?",
      answer: "All studies include a guaranteed honorarium for your time and expertise. Compensation is provided as an online gift card of your choice (via Tangocard.com), delivered electronically upon completion."
    },
    {
      question: "What about my privacy?",
      answer: "Your email and professional data will never be shared with third parties. You are in control of your participation and can unsubscribe from the mailing list at any time."
    }
  ];

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      
      {/* HEADER SECTION */}
      <div className="mb-12 border-b-2 border-slate-100 pb-10">
        <h1 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 uppercase tracking-tighter">
          CMSF Clinician Research Group
        </h1>
        <p className="text-lg text-slate-600 font-medium leading-relaxed max-w-3xl">
          Join a dedicated community of experts helping to advance the clinical utility of the Colorado Motor Speech Framework. Members are contacted for <strong>paid research opportunities</strong> to provide expert perceptual ratings and validate framework features.
        </p>
      </div>

      {/* CALL TO ACTION & ELIGIBILITY */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-20">
        <div className="lg:col-span-3 bg-slate-900 rounded-3xl p-8 md:p-10 text-white shadow-xl flex flex-col justify-between">
          <div>
            <h2 className="text-2xl font-black uppercase tracking-tight mb-4 text-emerald-400">Join the Mailing List</h2>
            <p className="text-slate-300 mb-8 font-medium leading-relaxed">
              Complete our quick eligibility screener to join the CMSF clinician research group. We will contact you directly when new paid opportunities match your expertise.
            </p>
          </div>
          <a
            href="https://cuboulder.qualtrics.com/jfe/form/SV_6lDkuxZ8fcPNg1M"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full md:w-max px-10 py-5 bg-white text-slate-900 font-black uppercase text-sm rounded-2xl shadow-lg transition-all hover:bg-emerald-50 hover:scale-105 text-center"
          >
            Apply to Join the Group
          </a>
        </div>

        <div className="lg:col-span-2 bg-emerald-50 border-2 border-emerald-100 rounded-3xl p-8 flex flex-col">
          <h3 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-700 mb-6">Group Eligibility</h3>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-bold text-emerald-900">Current SLP (including CFs)</p>
            </li>
            <li className="flex gap-3 items-start">
              <svg className="w-5 h-5 text-emerald-600 mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
              <p className="text-sm font-bold text-emerald-900">Live/Work in the United States</p>
            </li>
          </ul>
        </div>
      </div>

      {/* SAMPLE PROJECTS */}
      <div className="mb-24">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 text-center md:text-left">Sample Research Projects</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {researchFocusAreas.map((area) => (
            <div key={area.id} className="p-8 bg-white border-2 border-slate-100 rounded-3xl shadow-sm hover:border-sky-100 hover:shadow-md transition-all">
              <div className="w-10 h-10 bg-sky-50 rounded-xl flex items-center justify-center mb-6 text-sky-600">
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
              </div>
              <h4 className="text-lg font-black text-slate-900 mb-3 leading-tight">{area.title}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{area.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* NEW FAQ SECTION */}
      <div className="border-t-2 border-slate-100 pt-16 mb-20">
        <h3 className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 mb-10 text-center md:text-left">Frequently Asked Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {faqs.map((faq, index) => (
            <div key={index}>
              <h4 className="text-sm font-black text-slate-900 uppercase mb-3 tracking-wide">{faq.question}</h4>
              <p className="text-sm text-slate-500 leading-relaxed font-medium">{faq.answer}</p>
            </div>
          ))}
        </div>
      </div>

      {/* IRB FOOTER */}
      <div className="p-8 bg-slate-50 rounded-3xl border border-slate-200">
        <p className="text-[11px] text-slate-400 font-bold uppercase tracking-widest leading-loose text-center italic">
          Research participation is voluntary and conducted under the oversight of the University of Colorado Institutional Review Board (IRB). 
          Mailing list data is stored securely and used exclusively for CMSF research recruitment.
        </p>
      </div>

    </div>
  );
};

export default Research;
