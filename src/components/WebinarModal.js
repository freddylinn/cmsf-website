import React, { useState, useEffect, useRef } from "react";
import { COPY, REGISTER_URL, isWebinarLive } from "./WebinarBanner";

// One-time pop-up for the 3 December 2026 CMSF–SPCh training.
//
// It shows once per browser and then stays quiet: a clinician who has already
// seen it should not meet it again every visit. Dismissal is recorded under
// SEEN_KEY, so changing that string re-shows the pop-up to everyone — useful if
// the details change before the event.
//
// Wording, the registration link and the expiry date all come from
// WebinarBanner.js, so the pop-up and the on-page banner cannot drift apart.
//
// localStorage is wrapped throughout: it throws in private windows and with
// site data blocked, and a pop-up must never be the reason a page fails to
// render. If storage is unavailable the pop-up simply shows each visit.

const SEEN_KEY = "cmsfWebinarSPCh-2026-12-03";

function readSeen() {
  try {
    return window.localStorage.getItem(SEEN_KEY) === "1";
  } catch (err) {
    return false;
  }
}

function markSeen() {
  try {
    window.localStorage.setItem(SEEN_KEY, "1");
  } catch (err) {
    // Nothing to do — the pop-up will appear again next visit.
  }
}

function WebinarModal({ lang = "es" }) {
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);
  const t = COPY[lang] || COPY.es;

  useEffect(() => {
    if (isWebinarLive() && !readSeen()) setOpen(true);
  }, []);

  const dismiss = () => {
    markSeen();
    setOpen(false);
  };

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") dismiss();
    };
    document.addEventListener("keydown", onKey);
    // Move focus into the dialog so keyboard users are not left behind it.
    if (closeRef.current) closeRef.current.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center bg-slate-900/60 p-4 sm:p-6 no-print"
      onClick={dismiss}
      role="presentation"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="webinar-modal-heading"
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-3xl border border-slate-300 shadow-2xl w-full max-w-2xl max-h-[88vh] overflow-y-auto p-6 md:p-8"
      >
        <div className="flex items-start justify-between gap-4 mb-3">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-700">
            {t.eyebrow}
          </p>
          <button
            type="button"
            ref={closeRef}
            onClick={dismiss}
            aria-label={t.dismiss}
            className="shrink-0 -mt-1 -mr-1 w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-lg leading-none font-bold"
          >
            ×
          </button>
        </div>

        <h2
          id="webinar-modal-heading"
          className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight"
        >
          {t.heading}
        </h2>

        <p className="text-base text-slate-700 leading-relaxed mb-4">{t.body}</p>

        <p className="text-sm font-bold text-sky-900 mb-5">{t.when}</p>

        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={dismiss}
            className="flex-1 px-6 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:bg-sky-600 transition-all text-center text-xs min-h-[56px] flex items-center justify-center"
          >
            {t.cta}
          </a>
          <button
            type="button"
            onClick={dismiss}
            className="px-6 py-4 bg-white border-2 border-slate-400 text-slate-700 font-black uppercase tracking-widest rounded-2xl hover:bg-slate-100 transition-all text-xs min-h-[56px]"
          >
            {t.later}
          </button>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed mt-5 pt-4 border-t border-slate-200">
          {t.note}
        </p>
      </div>
    </div>
  );
}

export default WebinarModal;
