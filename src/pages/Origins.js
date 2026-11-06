import React from "react";
import { Link } from "react-router-dom";

// Attribution and development history for the CMSF.
//
// WORDING NOTE — please read before editing this page.
// In October 2026 Dr. Joseph Duffy asked not to be recognised personally on
// this website, because he did not want to imply that he had a formal role in
// the development of the CMSF. He is acknowledged in the AJSLP manuscript
// instead. This page therefore cites the Mayo Clinic literature — including
// Duffy (2005) and Duffy (2020) — and says nothing about his review of the
// forms, his correspondence with the lab, or his attendance at ASHA 2022. The
// photograph taken with him has been deleted from the repository. Please do
// not re-add any of that material.

const REFERENCES = [
  {
    key: "dab1969a",
    text:
      "Darley, F. L., Aronson, A. E., & Brown, J. R. (1969). Differential diagnostic patterns of dysarthria. Journal of Speech and Hearing Research, 12(2), 246–269.",
    doi: "https://doi.org/10.1044/jshr.1202.246",
  },
  {
    key: "dab1969b",
    text:
      "Darley, F. L., Aronson, A. E., & Brown, J. R. (1969). Clusters of deviant speech dimensions in the dysarthrias. Journal of Speech and Hearing Research, 12(3), 462–496.",
    doi: "https://doi.org/10.1044/jshr.1203.462",
  },
  {
    key: "dab1975",
    text:
      "Darley, F. L., Aronson, A. E., & Brown, J. R. (1975). Motor speech disorders. W. B. Saunders.",
  },
  {
    key: "duffy2005",
    text:
      "Duffy, J. R. (2005). Pearls of wisdom — Darley, Aronson, and Brown and the classification of the dysarthrias. Perspectives on Neurophysiology and Neurogenic Speech and Language Disorders, 15(3), 22–27.",
    doi: "https://doi.org/10.1044/nnsld15.3.22",
  },
  {
    key: "duffy2020",
    text:
      "Duffy, J. R. (2020). Motor speech disorders: Substrates, differential diagnosis, and management (4th ed.). Elsevier.",
  },
];

function Origins() {
  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      <div className="max-w-3xl mx-auto px-6 py-16 md:py-20">
        <p className="text-[10px] font-black uppercase tracking-widest text-sky-700 mb-4">
          Attribution &amp; history
        </p>
        <h1 className="text-4xl md:text-5xl tracking-tight mb-6 leading-tight">
          <span className="font-bold text-slate-900">Built on the</span>{" "}
          <span className="font-normal text-slate-600">Mayo Clinic framework</span>
        </h1>

        <p className="text-lg text-slate-700 leading-relaxed mb-6">
          The CMSF is not a new classification of motor speech disorders, and
          the speech features it scores are not new either. It is a
          translational tool: it takes the perceptual framework developed at
          the Mayo Clinic by Frederic Darley, Arnold Aronson and Joe Brown, and
          carried forward over five decades in Duffy&rsquo;s textbook, and puts
          it into a form a clinician can work through during an evaluation.
          What the CMSF contributes is the workflow — the organisation of
          those features, the scoring, and the side-by-side comparison against
          each diagnosis. The features themselves, and the patterns that
          distinguish one dysarthria from another, come from that literature.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          The two 1969 papers established what the field still works from. The
          first set out the differential diagnostic patterns that distinguish
          the dysarthrias from one another; the second identified the clusters
          of deviant speech dimensions that tend to travel together. The
          distinction the CMSF draws between features that are common to a
          subtype and features that are highly distinguishing descends directly
          from that cluster analysis.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-10">
          Duffy&rsquo;s textbook, now in its fourth edition, is the source the
          CMSF leans on most heavily. Its summary table of deviant speech
          characteristics by dysarthria type was the explicit starting point
          for the scoring grid: the feature rows, the diagnosis columns and the
          indicators marking which features are common to a subtype and which
          are highly distinguishing were assembled from that table, then
          extended against the wider literature catalogued in the references
          for each feature. Duffy&rsquo;s 2005 retrospective on the Darley,
          Aronson and Brown classification is the clearest short account of why
          the perceptual method has held up.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">
          How the tool came about
        </h2>

        <p className="text-base text-slate-700 leading-relaxed mb-6">
          The CMSF began in 2022 as a spreadsheet. Kylie Dunne-Platero, working
          in acute care, was frustrated that existing tools recorded
          observations without helping a clinician interpret them toward a
          dysarthria diagnosis. Together with Caitlin Cloud and Allison Hilger,
          she laid out the speech features as rows and the motor speech
          diagnoses as columns, working from the summary table in Duffy (2020)
          and from the research literature behind each feature. No feature was
          invented for the CMSF; the work was in organising what the literature
          already described into something usable at the bedside. That grid is
          still the structure of the scoring tool today.
        </p>

        <p className="text-base text-slate-700 leading-relaxed mb-10">
          Kylie and Caitlin presented the framework at the ASHA Convention in
          November 2022, and it has been revised steadily since. One early
          decision still shapes how the tool is used: body movement
          observations were separated into a supplemental form rather than
          feeding the diagnostic grid, because they fall outside the diagnostic
          scope of practice for speech-language pathologists and should not
          contribute directly to a speech diagnosis. The supplemental form
          records them as confirmatory signs only.
        </p>

        <h2 className="text-2xl font-bold text-slate-900 mb-4 mt-12">
          Foundational references
        </h2>
        <p className="text-sm text-slate-600 leading-relaxed mb-5">
          These are the sources the framework rests on. Each individual feature
          in the scoring tool also carries its own supporting literature.
        </p>
        <ol className="space-y-4 mb-10">
          {REFERENCES.map((r) => (
            <li
              key={r.key}
              className="text-sm text-slate-700 leading-relaxed pl-5 border-l-2 border-slate-300"
            >
              {r.text}
              {r.doi && (
                <>
                  {" "}
                  <a
                    href={r.doi}
                    target="_blank"
                    rel="noreferrer"
                    className="underline font-semibold text-sky-700 hover:text-sky-900 break-all"
                  >
                    {r.doi}
                  </a>
                </>
              )}
            </li>
          ))}
        </ol>

        <div className="rounded-2xl border border-slate-300 bg-slate-50 p-6">
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-2">
            Citing the CMSF
          </p>
          <p className="text-sm text-slate-700 leading-relaxed">
            Hilger, A., Cloud, C., &amp; Dunne-Platero, K. (2023). Colorado Motor
            Speech Framework (CMSF) [Clinical assessment tool].{" "}
            <a
              href="https://cmsf.info"
              className="underline font-semibold text-sky-700 hover:text-sky-900"
            >
              https://cmsf.info
            </a>
          </p>
        </div>

        <div className="mt-10">
          <Link
            to="/"
            className="text-sm font-black uppercase tracking-widest text-sky-700 hover:text-sky-900"
          >
            ← Back to the framework
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Origins;
