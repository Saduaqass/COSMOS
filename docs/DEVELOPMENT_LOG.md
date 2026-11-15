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
- Checks: Android static export succeeded for the app root and 30 localized pages (3 locales × home, planet index, and eight planets); Earth texture present. `npm run lint`, `npx tsc --noEmit`, `npm run check:messages`, `npm run build`, and `git diff --check` passed.
- Next: generate the Android Studio project, add native navigation/branding, build and run the APK on the installed emulator.

## Stage 3 — Android native project and emulator verification (2026-11-15)

- Generated the Capacitor Android project (application ID `com.cosmos.app`, min SDK 24, target SDK 36, compile SDK 36). Added Kotlin `MainActivity`, Capacitor App plugin, Android Back handling, COSMOS launcher/splash assets, dark system UI, and bundled static web assets. Capacitor's Android template generates Groovy Gradle scripts; the native Activity is Kotlin with Kotlin Gradle plugin 2.3.21.
- Configured Capacitor's tracked Android project under the existing Git root `cosmos/android/`; created a local `../android/` symlink so Android Studio opens the user-requested outer path without duplicating files.
- Installed JDK 21 locally because the project targets Java 21 and Gradle 8.14.3 does not run under the available JDK 25/26. `assembleDebug` succeeded and produced a 12 MB APK. `bundleRelease` succeeded and produced an 11 MB unsigned AAB; no production signing key was created.
- Installed and launched the app on the running Android 17 / API 37 emulator with WebView 145. Verified the 3D hero and local Earth texture rendered; navigation to `/en/planets/` worked; switching to English persisted after app restart; Android hardware Back returned from Planets to Home.
- Offline check: disabled emulator Wi-Fi and mobile data, force-restarted COSMOS, and confirmed the localized page and 3D Earth still rendered from bundled assets. Restored emulator networking afterward.
- Final website checks: `npm run lint`, `npx tsc --noEmit`, dictionary completeness (149 keys per locale), regular Next.js production build, Android static export, and `git diff --check` passed. We did not profile GPU memory or frame rate, so no FPS target is claimed.
- Remaining: commit and push the native Android project; release signing must be configured locally before distribution.
