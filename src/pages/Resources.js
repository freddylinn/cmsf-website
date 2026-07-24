import React from 'react';

const Resources = () => {
  return (
    <div className="p-6 md:p-12 max-w-6xl mx-auto min-h-screen bg-white">
      {/* HEADER */}
      <div className="mb-10 border-b border-slate-100 pb-8">
        <h1 className="text-3xl font-black text-slate-900 uppercase tracking-tight">
          Clinical Resources & Tutorials
        </h1>
        <p className="text-slate-600 mt-2 max-w-2xl font-medium text-sm md:text-base">
          Explore video walkthroughs, case tutorials, and podcast discussions explaining the clinical logic, features, and implementation of the CMSF.
        </p>
      </div>

      {/* FEATURED VIDEO */}
      <div className="bg-slate-900 rounded-3xl p-6 md:p-10 text-white mb-12 shadow-xl">
        <span className="px-3 py-1 bg-emerald-500/20 text-emerald-400 text-[10px] font-black uppercase tracking-wider rounded-full border border-emerald-500/30">
          Featured Tutorial
        </span>
        <h2 className="text-xl md:text-2xl font-black mt-4 mb-2">
          ACRM CEU Webinar: CMSF Clinical Walkthrough
        </h2>
        <p className="text-slate-300 text-xs md:text-sm mb-6 max-w-2xl leading-relaxed">
          A comprehensive tutorial presenting how to navigate the CMSF tool, interpret feature patterns, and translate perceptual observations into differential diagnoses with patient case examples.
        </p>

        {/* YOUTUBE EMBED */}
        <div className="aspect-video w-full rounded-2xl overflow-hidden border border-white/10 mb-2">
          <iframe
            className="w-full h-full"
            src="https://www.youtube.com/embed/TVwXcgVa0gk?start=92"
            title="ACRM CMSF Tutorial"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>

      {/* PODCASTS SECTION */}
      <h3 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-6">
        Podcast Interviews & Discussions
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* MEDBRIDGE PODCAST */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-sky-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-sky-600 tracking-wider">
              MedBridge • Speech Scope
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">
              Episode 18: What’s the Colorado Motor Speech Framework?
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              An in-depth discussion on the development of the framework, addressing diagnostic reliability, and how the CMSF streamlines assessment in fast-paced medical settings.
            </p>
          </div>
          <a
            href="https://podcasts.apple.com/ie/podcast/speech-scope-episode-18-whats-the-colorado-motor/id1740841545?i=1000722104171"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-xs font-black text-sky-600 hover:underline mt-2"
          >
            Listen on Apple Podcasts →
          </a>
        </div>

        {/* SPEECH UNCENSORED PODCAST */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-emerald-300 transition-all flex flex-col justify-between">
          <div>
            <span className="text-[10px] font-black uppercase text-emerald-600 tracking-wider">
              Speech Uncensored Podcast
            </span>
            <h4 className="text-base font-bold text-slate-900 mt-1 mb-2">
              Differential Diagnosis in Motor Speech
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed mb-4">
              A practical, conversational breakdown for medical SLPs on using structured frameworks to evaluate dysarthria and apraxia with greater confidence.
            </p>
          </div>
          <a
            href="https://open.spotify.com/episode/65UiFI9XGUyrl6qt00OhlH"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center text-xs font-black text-emerald-600 hover:underline mt-2"
          >
            Listen on Spotify →
          </a>
        </div>
      </div>
    </div>
  );
};

export default Resources;
