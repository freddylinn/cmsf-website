import React from "react";

// Announcement for the free CMSF–SPCh training run by the Chilean adaptation
// team (Universidad Santo Tomás), 3 December 2026.
//
// This is a dated announcement, so it removes itself rather than sitting on the
// site as a stale "upcoming" event. EVENT_ENDS is midnight in Chile at the end
// of the event day; after that nothing renders and the call sites can be
// deleted at leisure.
//
// To take it down early, set SHOW to false. To reuse this for a later session,
// change the copy and EVENT_ENDS together.
//
// COPY, REGISTER_URL and isWebinarLive are exported so WebinarModal.js shows
// the same text — the wording lives here only, in one place.

const SHOW = true;
const EVENT_ENDS = Date.parse("2026-12-04T03:00:00Z"); // 00:00, 4 Dec, Chile (UTC−3)

export const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLScfKd9ED_gxp0YybbjAqCC52upkP0oip3hYioQdlNfCaTaQmw/viewform";

export function isWebinarLive() {
  return SHOW && Date.now() <= EVENT_ENDS;
}

export const COPY = {
  en: {
    eyebrow: "Free webinar · held in Spanish · 3 December 2026",
    heading: "Free training on CMSF–SPCh, the Spanish (Chile) edition",
    body:
      "The Chilean adaptation team is hosting a free online training on CMSF–SPCh, the Spanish (Chile) edition of the framework. The session is held in Spanish, for speech-language pathologists working with adults who have dysarthria, acquired apraxia of speech, or another motor speech disorder. Presented by Allison Hilger, PhD, CCC-SLP, co-developer of the original instrument.",
    when: "Thursday 3 December 2026 · 6:30 p.m. Chile (4:30 p.m. ET / 1:30 p.m. PT) · Zoom",
    note:
      "The session is part of a pilot study at Universidad Santo Tomás, approved by its scientific ethics committee. Places are prioritised for clinicians who can apply the tool with at least one adult case and share the records with the research team.",
    cta: "Register",
    share: "Please pass this on to Spanish-speaking colleagues.",
    dismiss: "Close",
    later: "Not now",
  },
  es: {
    eyebrow: "Capacitación gratuita · 3 de diciembre de 2026",
    heading: "Capacitación internacional gratuita sobre el CMSF–SPCh",
    body:
      "Capacitación sobre la adaptación al español de Chile del CMSF, dirigida a fonoaudiólogas y fonoaudiólogos que trabajan con personas adultas con disartria, apraxia del habla adquirida u otros trastornos motores del habla. Impartida por Allison Hilger, PhD, CCC-SLP, codesarrolladora del instrumento original.",
    when: "Jueves 3 de diciembre de 2026 · 18:30 h (Chile) · Vía Zoom",
    note:
      "Forma parte de un estudio piloto de la Universidad Santo Tomás, con aprobación de su Comité Ético Científico. Los cupos priorizan a profesionales que puedan aplicar la herramienta en al menos un caso clínico y enviar los registros al equipo investigador.",
    cta: "Inscribirse",
    share: "Comparta esta convocatoria con colegas que puedan estar interesados.",
    dismiss: "Cerrar",
    later: "Ahora no",
  },
};

function WebinarBanner({ lang = "en" }) {
  if (!isWebinarLive()) return null;

  const t = COPY[lang] || COPY.en;

  return (
    <div className="bg-sky-50 rounded-3xl p-6 md:p-8 border border-sky-300 mb-8 shadow-sm no-print">
      <p className="text-[10px] font-black uppercase tracking-widest text-sky-700 mb-3">
        {t.eyebrow}
      </p>

      <h2 className="text-xl md:text-2xl font-bold text-slate-900 mb-3 leading-tight">
        {t.heading}
      </h2>

      <p className="text-base text-slate-700 leading-relaxed mb-4 max-w-3xl">
        {t.body}
      </p>

      <p className="text-sm font-bold text-sky-900 mb-4">{t.when}</p>

      <div className="flex flex-col sm:flex-row sm:items-center gap-4">
        <a
          href={REGISTER_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-4 bg-sky-500 text-white font-black uppercase tracking-widest rounded-2xl shadow-md hover:bg-sky-600 transition-all text-center text-xs min-h-[56px] flex items-center justify-center sm:w-auto"
        >
          {t.cta}
        </a>
        <p className="text-xs text-slate-600 font-medium">{t.share}</p>
      </div>

      <p className="text-xs text-slate-600 leading-relaxed mt-5 pt-4 border-t border-sky-200 max-w-3xl">
        {t.note}
      </p>
    </div>
  );
}

export default WebinarBanner;
