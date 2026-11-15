import { readFile } from "node:fs/promises";

const locales = ["kk", "ru", "en"];

function flatten(value, prefix = "", paths = []) {
  if (Array.isArray(value)) {
    value.forEach((item, index) => flatten(item, `${prefix}.${index}`, paths));
  } else if (value && typeof value === "object") {
    for (const [key, item] of Object.entries(value)) {
      flatten(item, prefix ? `${prefix}.${key}` : key, paths);
    }
  } else {
    paths.push({ key: prefix, value });
  }
  return paths;
}

const dictionaries = await Promise.all(locales.map(async (locale) => {
  const source = await readFile(new URL(`../web/messages/${locale}.json`, import.meta.url), "utf8");
  return [locale, flatten(JSON.parse(source))];
}));
const [, baseEntries] = dictionaries[0];
const expected = new Set(baseEntries.map(({ key }) => key));
const errors = [];

for (const [locale, entries] of dictionaries) {
  const actual = new Set(entries.map(({ key }) => key));
  for (const key of expected) if (!actual.has(key)) errors.push(`${locale}: missing ${key}`);
  for (const key of actual) if (!expected.has(key)) errors.push(`${locale}: unexpected ${key}`);
  for (const { key, value } of entries) {
    if (typeof value !== "string" || value.trim() === "") errors.push(`${locale}: empty or non-string value at ${key}`);
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else {
  console.log(`Message dictionaries match (${baseEntries.length} entries each: ${locales.join(", ")}).`);
}
