#!/usr/bin/env node
// Validates src/data/fitiData.json and rewrites the derived metadata
// (availableTargets, complete) from the phrase data itself.
//
//   node scripts/fiti-validate.mjs          # check only, non-zero exit on error
//   node scripts/fiti-validate.mjs --write  # also rewrite derived fields
//
// The point of this script is that availableTargets and complete are never
// hand-maintained. The scoring UI divides by availableTargets, so if that
// number is edited by hand and drifts from the data, every module percentage
// silently becomes wrong.

import { readFileSync, writeFileSync } from "node:fs";

const PATH = new URL("../src/data/fitiData.json", import.meta.url);
const data = JSON.parse(readFileSync(PATH, "utf8"));
const write = process.argv.includes("--write");

const GROUPS = {
  A: new Set(["r", "t", "n", "s", "l", "k"]),
  B: new Set(["p", "d", "m"]),
  C: new Set(["f", "b", "ʃ", "v"]),
  D: new Set(["\u0261", "w", "z", "ʤ", "ŋ", "j", "ʧ", "h"]),
  E: new Set(["θ", "ð", "ʒ"]),
};

// Two-character sequences that must be written as their single IPA glyph,
// otherwise group membership checks silently fail.
// ASCII g is not IPA; the published appendix uses U+0261 script g.
const BAD_GLYPHS = { "tʃ": "ʧ", "dʒ": "ʤ", g: "\u0261" };

const errors = [];
const warnings = [];

for (const mod of data) {
  const group = mod.id[0];
  const tier = Number(mod.id[1]);
  const allowed = GROUPS[group];
  if (!allowed) errors.push(`${mod.id}: unknown phoneme group "${group}"`);

  mod.phrases.forEach((phrase, pIdx) => {
    const parts = phrase.phoneticParts;
    const where = `${mod.id} phrase ${pIdx + 1} ("${phrase.text.slice(0, 38)}…")`;

    parts.forEach((part, i) => {
      if (!part.isTarget) return;

      if (BAD_GLYPHS[part.val]) {
        errors.push(`${where}: target "${part.val}" must be "${BAD_GLYPHS[part.val]}"`);
      } else if (allowed && !allowed.has(part.val)) {
        errors.push(
          `${where}: target "${part.val}" is not in Group ${group} {${[...allowed].join(", ")}}`
        );
      }

      // Tier 1 contexts are #_V, V_V and C_V — every one of them places the
      // target immediately before a vowel. Two adjacent targets therefore
      // cannot both be Tier 1; in practice this catches a word-initial /s/ in
      // an s-cluster being marked, which is #_C and belongs to Tier 2.
      if (tier === 1 && parts[i + 1]?.isTarget) {
        errors.push(
          `${where}: adjacent targets /${part.val}/ + /${parts[i + 1].val}/ ` +
            `are impossible in Tier 1 (all Tier 1 contexts are prevocalic)`
        );
      }
    });

    if (!parts.some((p) => p.isTarget)) {
      errors.push(`${where}: no targets marked`);
    }
    // The concatenated chunks must still read as one continuous transcription.
    if (parts.some((p) => typeof p.val !== "string" || p.val === "")) {
      errors.push(`${where}: empty or non-string phonetic chunk`);
    }
  });

  if (mod.groupPhonemes === undefined || mod.tierContexts === undefined) {
    errors.push(`${mod.id}: missing groupPhonemes/tierContexts metadata`);
  }

  const available = mod.phrases.reduce(
    (n, p) => n + p.phoneticParts.filter((x) => x.isTarget).length,
    0
  );

  if (available > mod.publishedTargets) {
    warnings.push(
      `${mod.id}: ${available} targets marked but the published module has ` +
        `${mod.publishedTargets} — likely a non-FITI word marked as a target`
    );
  } else if (available < mod.publishedTargets) {
    warnings.push(
      `${mod.id}: ${available}/${mod.publishedTargets} targets — stimuli incomplete`
    );
  }

  mod.availableTargets = available;
  mod.complete = available === mod.publishedTargets;
}

for (const w of warnings) console.warn(`warn  ${w}`);
for (const e of errors) console.error(`ERROR ${e}`);

if (write && errors.length === 0) {
  writeFileSync(PATH, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("\nderived fields rewritten");
}

const complete = data.filter((m) => m.complete).length;
console.log(
  `\n${complete}/${data.length} modules complete · ` +
    `${errors.length} error(s), ${warnings.length} warning(s)`
);

process.exit(errors.length ? 1 : 0);
