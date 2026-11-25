// One-Line Roast: The Gadget You Use Every Day.
// This program writes a single roast line to the entry file and nothing else.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ROAST =
  "My left AirPod dies at 80% while the right one carries the whole phone call like a single parent.";

function abort(message: string): never {
  console.error(`roast entry: ${message}`);
  process.exit(1);
}

// The gate wants 1-200 characters, a single line, and real text.
if (ROAST.length < 1 || ROAST.length > 200) {
  abort(`roast is ${ROAST.length} characters long, but the limit is 1-200`);
}
if (ROAST.trim().length === 0) {
  abort("roast is only whitespace");
}
if (ROAST.includes("\n") || ROAST.includes("\r")) {
  abort("roast must be one line");
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outputDir, { recursive: true });
const entryPath = join(outputDir, "entry.txt");

writeFileSync(entryPath, ROAST, "utf8");

// Read it back and confirm the bytes on disk are exactly the roast.
const written = readFileSync(entryPath, "utf8");
if (written !== ROAST) {
  abort("entry.txt on disk does not match the roast byte for byte");
}

console.log(`wrote ${ROAST.length} characters to ${entryPath}`);
