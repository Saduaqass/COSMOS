# COSMOS Android development log

## Stage 1 — Existing project audit (2026-11-15)

- Confirmed the existing repository is the inner `cosmos/` directory on branch `main`, connected to `origin` (`Saduaqass/COSMOS`). The outer parent has no Git repository. This matters because Capacitor's Android project is being targeted at the outer sibling `../android/` while web source remains here.
- Confirmed Next.js 16.4.6 App Router, React 19.3.0, TypeScript, next-intl 4.15.1, Three.js/R3F, Zustand and GSAP versions. Locale prefixes, the cookie proxy, translation route handler, all three locale dictionaries, client Canvas scenes, and local textures were inspected.
- Static export is not supported by the current website build as-is: Next.js export does not support Proxy/middleware or request-dependent non-GET route handlers. Planned a temporary Android-only static build workspace; the regular web build and server behavior remain intact.
- Environment: Node 24.21.0, npm 11.19.0, Android Studio 2026.2, SDK platforms 36/37, adb available. Java 26 is on PATH; Android Studio bundles its own JDK for Gradle.
- Checks: project structure, package versions, Git remote/status, texture sizes, Android Studio/SDK/adb availability, and official Next.js/Capacitor docs inspected. Android debug build has not yet been attempted in this audit stage.
- Next: validate the Android-only static export approach, integrate Capacitor and generate the sibling Android project.
