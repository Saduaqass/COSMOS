import { spawnSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, mkdtempSync, readFileSync, rmSync, symlinkSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const workspace = mkdtempSync(path.join(projectRoot, ".android-static-work-"));
const nextConfig = path.join(workspace, "next.config.ts");
const proxyFile = path.join(workspace, "src/proxy.ts");
const localeApi = path.join(workspace, "src/app/api/locale");

const files = [
  "src",
  "messages",
  "public",
  "next.config.ts",
  "next-env.d.ts",
  "tsconfig.json",
  "package.json",
  "package-lock.json",
  "eslint.config.mjs",
];

try {
  for (const name of files) {
    const source = path.join(projectRoot, name);
    if (existsSync(source)) cpSync(source, path.join(workspace, name), { recursive: true });
  }

  symlinkSync(path.join(projectRoot, "node_modules"), path.join(workspace, "node_modules"), "dir");
  rmSync(proxyFile);
  rmSync(localeApi, { recursive: true, force: true });

  const nativeStartRoute = path.join(workspace, "src/app/(native-start)");
  mkdirSync(nativeStartRoute, { recursive: true });
  writeFileSync(path.join(nativeStartRoute, "layout.tsx"), `import "../globals.css";

export default function NativeStartLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="kk-KZ"><body className="min-h-full bg-[#03050B]">{children}</body></html>;
}
`);
  writeFileSync(path.join(nativeStartRoute, "page.tsx"), `"use client";

import { useEffect } from "react";

const locales = ["kk", "ru", "en"] as const;
type Locale = (typeof locales)[number];

export default function NativeAppStart() {
  useEffect(() => {
    let locale: Locale = "kk";
    try {
      const saved = window.localStorage.getItem("COSMOS_LOCALE");
      if (locales.some((supported) => supported === saved)) locale = saved as Locale;
    } catch {
      // First launch stays in Kazakh when storage is unavailable.
    }
    window.location.replace(\`/\${locale}/index.html\`);
  }, []);
  return <main aria-busy="true" className="min-h-screen bg-[#03050B]" />;
}
`);

  const config = readFileSync(nextConfig, "utf8")
    .replace("const nextConfig: NextConfig = {", "const nextConfig: NextConfig = { output: \"export\", trailingSlash: true,")
    .replace("cacheComponents: true", "cacheComponents: false")
    .replace("partialPrefetching: true", "partialPrefetching: false")
    .replace("turbopack: {", "turbopack: { root: process.env.COSMOS_TURBOPACK_ROOT,");
  writeFileSync(nextConfig, config);

  const nextBin = path.join(projectRoot, "node_modules/.bin/next");
  const result = spawnSync(nextBin, ["build"], {
    cwd: workspace,
    stdio: "inherit",
    env: { ...process.env, COSMOS_TURBOPACK_ROOT: projectRoot },
  });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exitCode = result.status ?? 1;
  else {
    const androidWebDir = path.join(projectRoot, "android-web-build");
    rmSync(androidWebDir, { recursive: true, force: true });
    cpSync(path.join(workspace, "out"), androidWebDir, { recursive: true });
    console.log(`Android web assets written to ${androidWebDir}`);
  }
} finally {
  rmSync(workspace, { recursive: true, force: true });
}
