#!/usr/bin/env node
// Adds phrases to src/data/fitiData.json from stimuli/pending.txt so that the
// phoneticParts segmentation never has to be written by hand.
//
//   node scripts/fiti-add.mjs            # dry run, prints what would change
//   node scripts/fiti-add.mjs --write
//
// Input format — one phrase per line, three fields separated by " | ":
//
//   MODULE | orthographic phrase | transcription with [t]argets in brackets
//
// For example:
//
//   D2 | What a great group. | wʌt ə greɪt [g]rup.
//
// Each bracketed span becomes one target; everything else becomes an unmarked
// chunk. Bracket exactly one phoneme per pair — in a cluster like /sk/ where
// only /k/ is the target, write s[k], not [sk]. Blank lines and lines starting
// with # are ignored.

import { readFileSync, writeFileSync, existsSync } from "node:fs";

const DATA = new URL("../src/data/fitiData.json", import.meta.url);
const PENDING = new URL("../stimuli/pending.txt", import.meta.url);
const write = process.argv.includes("--write");

if (!existsSync(PENDING)) {
  console.error("stimuli/pending.txt not found");
  process.exit(1);
}

const data = JSON.parse(readFileSync(DATA, "utf8"));
const byId = Object.fromEntries(data.map((m) => [m.id, m]));

/** "aɪ θɪŋk ðə [d]ɔ[g]z" -> [{val:"aɪ θɪŋk ðə ",isTarget:false},{val:"d",…}] */
function segment(tr2, where) {
  const parts = [];
  const re = /\[([^\]]*)\]/g;
  let last = 0;
  let m;
  while ((m = re.exec(transcription)) !== null) {
    if (m.index > last) {
      parts.push({ val: transcription.slice(last, m.index), isTarget: false });
    }
    if (m[1].length === 0) throw new Error(`${where}: empty [] bracket`);
    if ([...m[1]].length > 1) {
      throw new Error(
        `${where}: bracket "[${m[1]}]" holds more than one phoneme — ` +
          `bracket each target separately`
      );
    }
    parts.push({ val: m[1], isTarget: true });
    last = re.lastIndex;
  }
  if (last < transcription.length) {
    parts.push({ val: transcription.slice(last), isTarget: false });
  }
  if (!parts.some((p) => p.isTarget)) throw new Error(`${where}: no [targets] marked`);
  return parts;
}

const lines = readFileSync(PENDING, "utf8").split("\n");
let added = 0;

lines.forEach((raw, i) => {
  const line = raw.trim();
  if (!line || line.startsWith("#")) return;

  const fields = line.split("|").map((s) => s.trim());
  const where = `pending.txt line ${i + 1}`;
  if (fields.length !== 3) {
    console.error(`ERROR ${where}: expected 3 fields separated by "|", got ${fields.length}`);
    process.exitCode = 1;
    return;
  }

  const [id, rawText, transcription] = fields;
  // Curly apostrophes are common when pasting from a PDF; normalise so the
  // duplicate check below cannot be defeated by ’ vs '.
  const text = rawText.replace(/[\u2018\u2019]/g, "'");
  const mod = byId[id];
  if (!mod) {
    console.error(`ERROR ${where}: no module "${id}"`);
    process.exitCode = 1;
    return;
  }
  if (mod.phrases.some((p) => p.text.toLowerCase() === text.toLowerCase())) {
    console.warn(`skip  ${where}: ${id} already holds this phrase`);
    return;
  }

  const tr2 = transcription.replace(/g/g, "\u0261"); // ASCII g -> IPA script g
  let phoneticParts;
  try {
    phoneticParts = segment(tr2, where);
  } catch (e) {
    console.error(`ERROR ${e.message}`);
    process.exitCode = 1;
    return;
  }

  mod.phrases.push({ text, phoneticParts });
  added += 1;
  const n = phoneticParts.filter((p) => p.isTarget).length;
  console.log(`add   ${id}: ${n} target(s) — ${text}`);
});

if (process.exitCode) {
  console.error("\nno changes written — fix the errors above");
  process.exit(1);
}

for (const mod of data) {
  mod.availableTargets = mod.phrases.reduce(
    (n, p) => n + p.phoneticParts.filter((x) => x.isTarget).length,
    0
  );
  mod.complete = mod.availableTargets === mod.publishedTargets;
}

console.log(`\n${added} phrase(s) ${write ? "added" : "would be added"}`);
for (const mod of data) {
  if (!mod.complete) {
    console.log(
      `  ${mod.id}: ${mod.availableTargets}/${mod.publishedTargets} targets`
    );
  }
}

if (write) {
  writeFileSync(DATA, JSON.stringify(data, null, 2) + "\n", "utf8");
  console.log("\nfitiData.json written — now run: node scripts/fiti-validate.mjs");
} else {
  console.log("\ndry run — re-run with --write to apply");
}
