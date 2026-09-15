import { SPANISH_ENABLED, FITI_ENABLED } from "../config/features";
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

// One-per-session announcement of recent changes.
//
// Bump RELEASE_KEY to re-announce after a future release; delete the component
// from Intro.js (or leave the key unchanged) once this round has been seen.
const RELEASE_KEY = "cmsfSeenUpdates-2026-09b";

function UpdatesModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(RELEASE_KEY)) setOpen(true);
    } catch {
      // Private browsing can block sessionStorage; failing closed is fine.
    }
  }, []);

  const close = () => {
    setOpen(false);
    try {
      sessionStorage.setItem(RELEASE_KEY, "true");
    } catch {
      /* no-op */
    }
  };

  // Escape closes, matching the backdrop click.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  const items = [
    ...(FITI_ENABLED ? [{
      title: "New: Modular FITI Assessment",
      body: "A scoring interface for Gurevich and Kim's modular FITI phrase list, organised by functional importance to intelligibility. Modules stand alone, so you can administer as few or as many as time allows.",
      to: "/fiti",
      linkLabel: "Open the FITI assessment",
    }] : []),
    ...(SPANISH_ENABLED ? [{
      title: "Now available in Spanish",
      body: "A Chilean Spanish adaptation of the framework, developed with Sebastián Contreras Cubillos and colleagues at Universidad Santo Tomás.",
      to: "/es",
      linkLabel: "Ver en español",
    }] : []),
    {
      title: "Redesigned for phones and tablets",
      body: "On smaller screens the tool now presents features as a scrollable list, then shows your diagnostic pattern as a compact grid. The full side-by-side matrix remains on larger screens.",
    },
    {
      title: "Install it as an app",
      body: "Add the CMSF to your home screen and it opens like an app — and works with no internet connection, which matters in clinic rooms with unreliable wifi.",
      anchor: "#install",
      linkLabel: "How to install",
    },
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 no-print">
      <div
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
        onClick={close}
        aria-hidden="true"
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="updates-title"
        className="relative bg-white w-full max-w-lg max-h-[85vh] overflow-y-auto rounded-3xl shadow-2xl p-6 sm:p-8 border border-slate-300"
      >
        <button
          onClick={close}
          aria-label="Close"
          className="absolute top-5 right-5 w-9 h-9 rounded-xl text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors flex items-center justify-center"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-sky-700 mb-2">
          What's new
        </p>
        <h2
          id="updates-title"
          className="text-2xl font-black text-slate-900 leading-tight mb-6 pr-8"
        >
          {items.length === 1 ? "One update" : `${items.length} updates`} to the CMSF
        </h2>

        <ul className="space-y-5 mb-8">
          {items.map((item, i) => (
            <li key={item.title} className="flex gap-4">
              <span className="shrink-0 w-7 h-7 rounded-lg bg-slate-900 text-white text-xs font-black flex items-center justify-center">
                {i + 1}
              </span>
              <div>
                <h3 className="font-bold text-slate-900 leading-snug">{item.title}</h3>
                <p className="text-sm text-slate-700 leading-relaxed mt-1">{item.body}</p>
                {item.to && (
                  <Link
                    to={item.to}
                    onClick={close}
                    className="inline-block mt-2 text-sm font-bold text-sky-700 underline"
                  >
                    {item.linkLabel}
                  </Link>
                )}
                {item.anchor && (
                  <a
                    href={item.anchor}
                    onClick={close}
                    className="inline-block mt-2 text-sm font-bold text-sky-700 underline"
                  >
                    {item.linkLabel}
                  </a>
                )}
              </div>
            </li>
          ))}
        </ul>

        <button
          onClick={close}
          className="w-full py-4 bg-slate-900 text-white font-black uppercase tracking-widest rounded-2xl hover:bg-slate-700 transition-colors text-xs"
        >
          Got it
        </button>
      </div>
    </div>
  );
}

export default UpdatesModal;
