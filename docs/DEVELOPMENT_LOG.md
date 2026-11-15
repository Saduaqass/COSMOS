# COSMOS Android development log

## Stage 1 — Existing project audit (2026-11-15)

- Confirmed the existing repository is the inner `cosmos/` directory on branch `main`, connected to `origin` (`Saduaqass/COSMOS`). The outer parent has no Git repository. Native project sources therefore stay versioned under this repository's `android/`; a local outer `../android/` symlink provides the requested Android Studio path without creating a second project.
- Confirmed Next.js 16.4.6 App Router, React 19.3.0, TypeScript, next-intl 4.15.1, Three.js/R3F, Zustand and GSAP versions. Locale prefixes, the cookie proxy, translation route handler, all three locale dictionaries, client Canvas scenes, and local textures were inspected.
- Static export is not supported by the current website build as-is: Next.js export does not support Proxy/middleware or request-dependent non-GET route handlers. Planned a temporary Android-only static build workspace; the regular web build and server behavior remain intact.
- Environment: Node 24.21.0, npm 11.19.0, Android Studio 2026.2, SDK platforms 36/37, adb available. Java 26 is on PATH; Android Studio bundles its own JDK for Gradle.
- Checks: project structure, package versions, Git remote/status, texture sizes, Android Studio/SDK/adb availability, and official Next.js/Capacitor docs inspected. Android debug build has not yet been attempted in this audit stage.
- Next: validate the Android-only static export approach, integrate Capacitor and generate the native Android project.

## Stage 2 — Android architecture and Capacitor integration (2026-11-15)

- Added Capacitor 8.6.2 with the Android platform, app back-button plugin, and an Android-only static export script. The script builds from a temporary copy, removes server-only locale proxy/cookie handler from that copy, and leaves the ordinary Next.js website build untouched.
- The generated offline bundle includes static pages for kk/ru/en, shared React Three Fiber scenes, brand assets, and all local planet textures. A generated app-entry route selects stored locale from localStorage and falls back to Kazakh. Language changes now persist to localStorage in native builds while web cookie persistence remains intact.
- Checks: Android static export succeeded for root + all localized sections and 27 localized page routes; Earth texture present. `npm run lint`, `npx tsc --noEmit`, `npm run check:messages`, `npm run build`, and `git diff --check` passed.
- Next: generate the Android Studio project, add native navigation/branding, build and run the APK on the installed emulator.
