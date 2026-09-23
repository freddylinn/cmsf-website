import React, { useState, useMemo } from "react";
import fitiData from "../data/fitiData.json";

// Modular FITI assessment.
//
// The stimuli are Gurevich & Kim's published material; this page provides a
// scoring interface for them, not the framework itself. Denominators are
// derived from the phrases actually present in fitiData.json rather than from
// the published totals, so a partially transcribed module can never report a
// score against targets it does not contain. Modules whose stimuli are
// incomplete are labelled as such.

const GROUP_LABELS = {
  A: "/r, t, n, s, l, k/",
  B: "/p, d, m/",
  C: "/f, b, ʃ, v/",
  D: "/\u0261, w, z, ʤ, ŋ, j, ʧ, h/",
  E: "/θ, ð, ʒ/",
};

function FitiAssessment() {
  // Each target is unrated, clear, or in error.
  //
  // A module is either administered or not. Within a module that WAS
  // administered, every target counts against the total, so anything left
  // unrated is an error — modules are designed to be given in full. A module
  // with nothing rated was not administered at all, and reports NA rather
  // than a zero, because a zero would be indistinguishable from a module in
  // which every single target was in error.
  const [scores, setScores] = useState({});
  const [showRef, setShowRef] = useState(false);
  const [copied, setCopied] = useState(false);

  const cycle = (key) =>
    setScores((prev) => {
      const cur = prev[key];
      const next = cur === undefined ? "clear" : cur === "clear" ? "unclear" : undefined;
      const out = { ...prev };
      if (next === undefined) delete out[key];
      else out[key] = next;
      return out;
    });

  const moduleStats = useMemo(() => {
    const stats = {};
    fitiData.forEach((m) => {
      let clear = 0,
        unclear = 0;
      m.phrases.forEach((ph, pIdx) =>
        ph.phoneticParts.forEach((part, partIdx) => {
          if (!part.isTarget) return;
          const v = scores[`${m.id}-${pIdx}-${partIdx}`];
          if (v === "clear") clear += 1;
          if (v === "unclear") unclear += 1;
        })
      );
      stats[m.id] = {
        clear,
        unclear,
        administered: clear + unclear > 0,
        scored: clear + unclear,
        available: m.availableTargets,
        published: m.publishedTargets,
        complete: m.complete,
      };
    });
    return stats;
  }, [scores]);

  const incomplete = fitiData.filter((m) => !m.complete);
  const totalScored = Object.values(moduleStats).reduce((a, s) => a + s.scored, 0);

  const summary = () => {
    const lines = [
      "Modular FITI (Functional Importance to Intelligibility) — scoring summary",
      "Stimuli and FITI framework: Gurevich, N., & Kim, H. (2024). A hierarchical",
      "approach to efficient assessment of functional intelligibility: The modular FITI",
      "(functional importance to intelligibility) phrase list. Perspectives of the ASHA",
      "Special Interest Groups, 9(3), 892–907. https://doi.org/10.1044/2024_PERSP-23-00247",
      "",
    ];
    ["A", "B", "C", "D", "E"].forEach((g) => {
      const row = [1, 2, 3]
        .map((tier) => {
          const s = moduleStats[`${g}${tier}`];
          if (!s) return `T${tier}: —`;
          if (!s.administered) return `T${tier}: NA/${s.available}`;
          return `T${tier}: ${s.clear}/${s.available}`;
        })
        .join("  |  ");
      lines.push(`Group ${g} (${GROUP_LABELS[g]})  ${row}`);
    });
    lines.push("");
    lines.push(
      "Scores reflect the clarity of phonemic production, out of the targets in each module. Each module administered is administered in full, so any target not produced clearly counts against the total."
    );
    lines.push(
      "Higher-priority targets appear in earlier groups and lower tiers; deficits there carry the greatest expected impact on functional intelligibility."
    );
    const notGiven = fitiData.filter((m) => !moduleStats[m.id].administered);
    if (notGiven.length) {
      lines.push("");
      lines.push(
        `NA = not administered: ${notGiven.map((m) => m.id).join(", ")}.`
      );
    }
    if (incomplete.length) {
      lines.push("");
      lines.push(
        `Note: stimuli are incomplete for module(s) ${incomplete
          .map((m) => m.id)
          .join(", ")}; scores reflect only the items present.`
      );
    }
    return lines.join("\n");
  };

  const reset = () => {
    setScores({});
    setCopied(false);
  };

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto font-sans bg-white min-h-screen text-slate-900 text-left">
      {/* HEADER */}
      <div className="mb-8 border-b border-slate-200 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="flex-grow">
          <h1 className="text-3xl font-black text-slate-900 mb-3 tracking-tight uppercase">
            Modular FITI Assessment
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed max-w-3xl">
            A scoring interface for the Modular FITI phrase list. The framework
            and all stimuli are the work of{" "}
            <strong>Naomi Gurevich (Purdue University Fort Wayne)</strong> and{" "}
            <strong>Heejin Kim (University of Illinois Urbana-Champaign)</strong>.
          </p>
          <p className="text-xs text-slate-700 leading-relaxed max-w-3xl mt-3 italic">
            Gurevich, N., &amp; Kim, H. (2024). A hierarchical approach to
            efficient assessment of functional intelligibility: The modular FITI
            phrase list. <em>Perspectives of the ASHA Special Interest Groups,
            9</em>(3), 892–907.{" "}
            <a
              href="https://doi.org/10.1044/2024_PERSP-23-00247"
              target="_blank"
              rel="noreferrer"
              className="underline not-italic font-bold text-sky-700 hover:text-sky-900"
            >
              https://doi.org/10.1044/2024_PERSP-23-00247
            </a>
          </p>
        </div>

        <a
          href="https://sites.pfw.edu/cladlab/fiti.html"
          target="_blank"
          rel="noreferrer"
          className="shrink-0 inline-flex items-center gap-2 text-sky-700 hover:text-sky-900 font-bold text-sm bg-white px-5 py-3 rounded-2xl border-2 border-sky-600 transition-all no-print"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          CLAD Lab — official FITI resources
        </a>
      </div>

      {/* INCOMPLETE STIMULI NOTICE */}
      {incomplete.length > 0 && (
        <div className="mb-8 rounded-2xl border-2 border-amber-500 bg-amber-50 p-6 no-print">
          <h2 className="text-sm font-black uppercase tracking-widest text-amber-900 mb-2">
            Stimuli incomplete
          </h2>
          <p className="text-sm text-amber-900 leading-relaxed">
            {incomplete.length} of {fitiData.length} modules do not yet reconcile
            to the published target counts — some hold fewer phrases than the
            published list, others have targets marked that need checking against
            the published bolding. Those modules are scored against the items
            present here, not the published totals, and are marked below.
            Complete phrase lists are available from the authors at{" "}
            <a href="mailto:cladlab@pfw.edu" className="underline font-bold">
              cladlab@pfw.edu
            </a>
            .
          </p>
          <p className="text-xs text-amber-900 mt-3 font-bold">
            Affected: {incomplete.map((m) => m.id).join(", ")}
          </p>
        </div>
      )}

      {/* HOW TO SCORE */}
      <div className="mb-8 rounded-2xl border border-sky-300 bg-sky-50 p-6 no-print">
        <h2 className="text-[10px] font-black uppercase tracking-widest text-sky-800 mb-3">
          How to score
        </h2>
        {/* Wording in this block is the authors' own, supplied by Gurevich and
            Kim as tracked edits. Please keep it verbatim rather than
            paraphrasing — the distinction between clarity of phonemic
            production and intelligibility is the point of the framework. */}
        <p className="text-sm text-sky-900 leading-relaxed mb-4">
          You are scoring the clarity of phonemic production (reaching the
          phonetic target for each phoneme). FITI helps determine where
          production clarity is most important to intelligibility.
        </p>
        <p className="text-sm text-sky-900 leading-relaxed mb-4">
          Have the person read or repeat each phrase. Tap each highlighted
          target sound to cycle its rating.
        </p>
        <p className="text-sm text-sky-900 leading-relaxed mb-4">
          Each one stands alone, and they are ordered so that the earlier
          modules carry the greatest expected weight on intelligibility. To get
          meaningful data, each module should be administered in full, but you
          do not need to administer every module. Adding modules progressively
          builds a more complete, systematic picture of potential barriers to
          intelligibility.
        </p>
        <div className="mb-4 rounded-xl bg-white/70 border border-sky-300 p-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-sky-800 mb-2">
            Meaningful results in limited time
          </p>
          <ul className="text-sm text-sky-900 leading-relaxed space-y-1.5 list-disc pl-5">
            <li>
              Have only 5 min? Start with <strong>A1</strong>. It holds the most
              frequent consonants in the most salient positions, so it is the
              single most informative module. Any errors here suggest
              significant intelligibility deficits.
            </li>
            <li>
              If A1 comes back clean, skip ahead to <strong>E2</strong> and{" "}
              <strong>E3</strong>. These are short and carry the phonetically
              complex targets — clusters and the least frequent consonants —
              where deficits are most easily missed.
            </li>
            <li>
              If A1 shows errors, treatment for intelligibility is indicated. If
              you have additional time, work down in order (A2, A3, B1 …) rather
              than jumping, so the profile stays interpretable against the
              hierarchy.
            </li>
            <li>
              Each module can be run as full phrases, particularly when prosody
              matters, or as the target words alone to focus on phonemic
              articulation.
            </li>
          </ul>
          <p className="text-xs text-sky-900 leading-relaxed mt-3">
            When the higher-priority modules are within normal limits,
            intelligibility is less likely to be the highest-value treatment
            target. If treating, complete the full set of modules to identify
            treatment targets and prioritize them by modules. Scores below are
            always calculated against the modules you actually administered.
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1.5 rounded-lg border-2 border-slate-400 bg-white text-sm font-bold text-slate-800">
            Not evaluated
          </span>
          <span className="px-3 py-1.5 rounded-lg border-2 border-green-700 bg-green-600 text-white text-sm font-bold">
            Clear production
          </span>
          <span className="px-3 py-1.5 rounded-lg border-2 border-red-700 bg-red-600 text-white text-sm font-bold">
            In error
          </span>
        </div>
      </div>

      {/* SUMMARY */}
      <div className="mb-10 no-print">
        <button
          onClick={() => setShowRef(!showRef)}
          className="w-full flex items-center justify-between p-6 bg-slate-900 text-white rounded-2xl hover:bg-slate-700 transition-all"
        >
          <div className="flex items-center gap-4 text-left">
            <div className="w-10 h-10 rounded-full bg-sky-500 flex items-center justify-center font-black shrink-0">
              ∑
            </div>
            <div>
              <p className="font-black uppercase tracking-widest text-xs text-sky-300">
                Results
              </p>
              <p className="text-lg font-bold">
                Scoring summary{totalScored > 0 ? ` — ${totalScored} target${totalScored === 1 ? "" : "s"} rated` : ""}
              </p>
            </div>
          </div>
          <span className="text-2xl font-black">{showRef ? "−" : "+"}</span>
        </button>

        {showRef && (
          <div className="mt-4 p-6 md:p-8 bg-slate-50 border-2 border-slate-300 rounded-3xl">
            <h3 className="font-black text-slate-900 uppercase tracking-widest text-sm mb-3">
              Functional importance hierarchy
            </h3>
            <p className="text-sm text-slate-700 mb-6 leading-relaxed max-w-3xl">
              Priority runs from <strong>Group A</strong> (greatest functional
              importance to intelligibility) through <strong>Group E</strong>,
              and from <strong>Tier 1</strong> (most salient positions) through{" "}
              <strong>Tier 3</strong>. Errors in earlier groups and lower tiers
              carry the greatest expected impact on intelligibility.
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-400 mb-8">
              <table className="w-full text-center border-collapse bg-white min-w-[560px]">
                <thead>
                  <tr className="bg-slate-800 text-white text-[10px] uppercase tracking-widest">
                    <th className="p-3 border border-slate-700 text-left pl-4">Group</th>
                    <th className="p-3 border border-slate-700">Tier 1</th>
                    <th className="p-3 border border-slate-700">Tier 2</th>
                    <th className="p-3 border border-slate-700">Tier 3</th>
                  </tr>
                </thead>
                <tbody className="text-sm font-bold">
                  {["A", "B", "C", "D", "E"].map((group) => (
                    <tr key={group}>
                      <td className="p-3 bg-slate-100 border border-slate-300 text-left pl-4">
                        <span className="text-slate-900">Group {group}</span>
                        <span className="block text-[10px] font-mono font-normal text-slate-700">
                          {GROUP_LABELS[group]}
                        </span>
                      </td>
                      {[1, 2, 3].map((tier) => {
                        const s = moduleStats[`${group}${tier}`];
                        if (!s)
                          return (
                            <td key={tier} className="p-3 border border-slate-300 text-slate-500">
                              —
                            </td>
                          );
                        return (
                          <td key={tier} className="p-3 border border-slate-300">
                            {s.administered ? (
                              <span className="text-sky-700">
                                {s.clear}/{s.available}
                              </span>
                            ) : (
                              <span
                                className="text-slate-500"
                                title="Not administered"
                              >
                                NA/{s.available}
                              </span>
                            )}
                            {!s.complete && (
                              <span
                                className="block text-[9px] font-black uppercase text-amber-700"
                                title={`Published list has ${s.published} targets`}
                              >
                                partial
                              </span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300 mb-8">
              <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700 mb-3">
                Interpreting and documenting these scores
              </h4>
              <p className="text-sm text-slate-800 leading-relaxed mb-4">
                Read a score together with the functional weight of the module it
                came from, rather than on its own. The same percentage means
                something different in A1 than in E3, so documentation is most
                useful when it ties the clarity of the targets to the expected
                consequence for intelligibility.
              </p>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-300">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1.5">
                    Low score in a high-priority module
                  </p>
                  <p className="text-sm text-slate-800 leading-relaxed italic">
                    “Clarity of production for 40% of A1 targets. Given the high
                    functional importance to intelligibility of this group and
                    tier, significant intelligibility deficits are expected.”
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-slate-50 border border-slate-300">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-600 mb-1.5">
                    Deficits confined to low-priority modules
                  </p>
                  <p className="text-sm text-slate-800 leading-relaxed italic">
                    “Clarity of production above 90% for all modules except E2 and E3.
                    Overall intelligibility is not substantially reduced, but
                    given the phonetic complexity and low frequency of the sounds
                    involved, apraxia may warrant consideration.”
                  </p>
                </div>
              </div>
              <p className="text-xs text-slate-700 leading-relaxed mt-4">
                The table above doubles as a documentation grid: each cell is the
                number of targets produced clearly out of the targets in that
                module. Modules you did not administer read NA rather than zero,
                and carry through to the copied summary that way, so an
                unassessed module is never read as one in which every target was
                in error.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-300">
              <div className="flex items-center justify-between gap-4 mb-3">
                <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-700">
                  Draft documentation summary
                </h4>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(summary());
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2 rounded-xl bg-sky-600 text-white text-[10px] font-black uppercase tracking-widest hover:bg-sky-700 transition-colors"
                >
                  {copied ? "Copied" : "Copy"}
                </button>
              </div>
              <pre className="whitespace-pre-wrap font-mono text-xs text-slate-800 leading-relaxed">
                {summary()}
              </pre>
            </div>

            <button
              onClick={reset}
              className="mt-6 px-5 py-3 rounded-xl border-2 border-slate-500 text-slate-800 text-[10px] font-black uppercase tracking-widest hover:bg-slate-100 transition-colors"
            >
              Reset all ratings
            </button>
          </div>
        )}
      </div>

      {/* MODULES */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {fitiData.map((module) => {
          const s = moduleStats[module.id];
          return (
            <div
              key={module.id}
              className="bg-white border-2 border-slate-300 rounded-3xl overflow-hidden flex flex-col"
            >
              <div className="p-5 bg-slate-50 border-b border-slate-300 flex flex-wrap justify-between items-center gap-3">
                <div className="min-w-0">
                  <span className="px-3 py-1 bg-slate-800 text-white text-[10px] font-black rounded-full mr-2 uppercase">
                    Module {module.id}
                  </span>
                  {!module.complete && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-900 border border-amber-600 text-[9px] font-black rounded-full uppercase mr-2">
                      Partial
                    </span>
                  )}
                  <p className="text-xs font-bold text-slate-800 mt-2">
                    Group {module.group}{" "}
                    <span className="font-mono font-normal">
                      {module.groupPhonemes}
                    </span>
                  </p>
                  <p className="text-xs font-bold text-slate-800">
                    Tier {module.tier}{" "}
                    <span className="font-mono font-normal">
                      ({module.tierContexts})
                    </span>
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span
                    className={`text-xl font-black ${
                      s.administered ? "text-sky-700" : "text-slate-500"
                    }`}
                  >
                    {s.administered ? s.clear : "NA"}
                  </span>
                  <span className="text-[10px] font-black text-slate-700 uppercase ml-1">
                    / {s.available}
                  </span>
                  {!module.complete && (
                    <span className="block text-[9px] text-slate-600 font-bold">
                      published list: {s.published}
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5 sm:p-6 space-y-8 flex-grow">
                {module.phrases.map((phrase, pIdx) => (
                  <div key={pIdx} className="space-y-3">
                    <div className="flex items-start gap-3">
                      <span className="text-slate-600 font-black text-xs mt-1.5">
                        {pIdx + 1}
                      </span>
                      <p className="text-lg font-bold text-slate-900 leading-snug">
                        {phrase.text}
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-1.5 p-4 bg-slate-50 rounded-2xl border border-slate-300 font-mono text-sm">
                      <span className="text-slate-600 mr-1">[</span>
                      {phrase.phoneticParts.map((part, partIdx) => {
                        if (!part.isTarget)
                          return (
                            <span key={partIdx} className="text-slate-800 px-0.5">
                              {part.val}
                            </span>
                          );
                        const key = `${module.id}-${pIdx}-${partIdx}`;
                        const v = scores[key];
                        return (
                          <button
                            key={partIdx}
                            onClick={() => cycle(key)}
                            aria-label={`Target ${part.val}: ${v || "not evaluated"}`}
                            className={`px-3 py-1 rounded-lg border-2 transition-all font-black text-base min-w-[36px] min-h-[36px] ${
                              v === "clear"
                                ? "bg-green-600 border-green-700 text-white"
                                : v === "unclear"
                                ? "bg-red-600 border-red-700 text-white"
                                : "bg-white border-slate-400 text-slate-900 hover:border-sky-600 hover:text-sky-700"
                            }`}
                          >
                            {part.val}
                          </button>
                        );
                      })}
                      <span className="text-slate-600 ml-1">]</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <footer className="mt-20 py-10 border-t border-slate-200 text-center">
        <p className="text-xs text-slate-700 leading-relaxed max-w-2xl mx-auto">
          The FITI framework, phrase list, and phonetic annotations are the work
          of Naomi Gurevich and Heejin Kim, reproduced here with attribution.
          This scoring interface was built for the Colorado Motor Speech
          Framework. Nothing entered on this page is stored or transmitted.
        </p>
      </footer>
    </div>
  );
}

export default FitiAssessment;
