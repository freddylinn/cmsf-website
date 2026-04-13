import React from "react";

const Research = () => {
  const studies = [
    {
      id: "pediatric-msd",
      isOpen: false, // Changed to false to close enrollment
      title: "Pediatric Acquired Motor Speech Disorders",
      description:
        "Complete a short online study on pediatric acquired motor speech disorders where participants will hear short audio clips and be asked to transcribe what they hear and then rate how effortful the transcription was.",
      eligibility: "Speech-Language Pathologists (SLPs) based in the United States.",
      compensation: "$5 gift card of your choice (via Tangocard.com) sent within one week of participation.",
      qualtricsLink: "https://cuboulder.qualtrics.com/jfe/form/SV_bPI8xbKbj4O4L8G",
    },
  ];

  return (
    <div className="p-4 md:p-10 max-w-5xl mx-auto min-h-screen bg-white font-sans text-slate-900 text-left">
      {/* HEADER */}
      <div className="mb-12 border-b-2 border-slate-100 pb-8">
        <h1 className="text-3xl font-black text-slate-900 mb-2 uppercase tracking-tighter">
          Research Participation
        </h1>
        <p className="text-slate-500 font-medium">
          Help advance the clinical utility of the Colorado Motor Speech Framework. 
          We are very appreciative of your time and expertise.
        </p>
      </div>

      {/* STUDIES LIST */}
      <div className="space-y-8">
        {studies.map((study) => (
          <div 
            key={study.id} 
            className={`group p-8 border-2 rounded-3xl transition-all ${
              study.isOpen 
                ? "bg-white border-slate-100 shadow-sm hover:border-sky-200 hover:shadow-md" 
                : "bg-slate-50 border-slate-200 opacity-80"
            }`}
          >
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex-grow">
                {/* DYNAMIC BADGE */}
                <div className={`inline-block px-3 py-1 text-[10px] font-black uppercase rounded-full mb-4 tracking-widest ${
                  study.isOpen ? "bg-sky-100 text-sky-700" : "bg-slate-200 text-slate-500"
                }`}>
                  {study.isOpen ? "Active Study" : "Enrollment Closed"}
                </div>

                <h2 className={`text-2xl font-black mb-4 leading-tight ${study.isOpen ? "text-slate-900" : "text-slate-500"}`}>
                  {study.title}
                </h2>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {study.description}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="p-4 bg-white/50 rounded-2xl border border-slate-200">
                    <h4 className="text-[10px] font-black uppercase text-slate-400 mb-1 tracking-widest">Eligibility</h4>
                    <p className="text-xs font-bold text-slate-700">{study.eligibility}</p>
                  </div>
                  <div className={`p-4 rounded-2xl border ${
                    study.isOpen ? "bg-emerald-50 border-emerald-100" : "bg-white/50 border-slate-200"
                  }`}>
                    <h4 className={`text-[10px] font-black uppercase mb-1 tracking-widest ${
                      study.isOpen ? "text-emerald-600" : "text-slate-400"
                    }`}>Compensation</h4>
                    <p className={`text-xs font-bold ${study.isOpen ? "text-emerald-800" : "text-slate-500"}`}>{study.compensation}</p>
                  </div>
                </div>

                {/* CONDITIONAL ACTION */}
                {study.isOpen ? (
                  <a
                    href={study.qualtricsLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-8 py-4 bg-slate-900 text-white font-black uppercase text-sm rounded-2xl shadow-lg transition-transform hover:scale-105"
                  >
                    Complete Eligibility Questionnaire
                  </a>
                ) : (
                  <div className="inline-block px-8 py-4 bg-slate-200 text-slate-500 font-black uppercase text-sm rounded-2xl cursor-not-allowed">
                    Thank you for your interest — Enrollment is full
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* PRIVACY NOTE */}
      <div className="mt-16 p-6 bg-slate-50 rounded-2xl border border-slate-200 text-center">
        <p className="text-xs text-slate-400 italic">
          Research studies are conducted under the oversight of the University of Colorado Institutional Review Board (IRB). 
          Data collection for closed studies is securely stored according to IRB protocol.
        </p>
      </div>
    </div>
  );
};

export default Research;
