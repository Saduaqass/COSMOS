import { cpSync, existsSync, mkdirSync, readdirSync, rmSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mappings = [
  { source: "assets/logos", destination: "web/public/branding" },
  { source: "assets/textures", destination: "web/public/textures" },
];

for (const { source, destination } of mappings) {
  const sourcePath = path.join(repositoryRoot, source);
  const destinationPath = path.join(repositoryRoot, destination);
  if (!existsSync(sourcePath)) throw new Error(`Shared asset directory is missing: ${source}`);

  rmSync(destinationPath, { recursive: true, force: true });
  mkdirSync(path.dirname(destinationPath), { recursive: true });
  cpSync(sourcePath, destinationPath, { recursive: true });

  const files = readdirSync(sourcePath, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile());
  console.log(`${source} → ${destination} (${files.length} files)`);
}
