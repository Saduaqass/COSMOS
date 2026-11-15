# COSMOS Web + Android architecture

## Existing web application audit (2026-11-15)

- The Git repository root is the inner `cosmos/` directory (`git rev-parse --show-toplevel`). It is a Next.js App Router site using Next.js 16.4.6, React 19.3.0, TypeScript 5, `next-intl` 4.15.1, Three.js 0.187.0, React Three Fiber 9.8.2, Drei 10.7.9, GSAP 3.15.1, and Zustand 5.1.0.
- Localized routes are `/kk`, `/ru`, and `/en`; `web/src/proxy.ts` reads/writes locale cookies and applies the locale prefix. `web/src/app/api/locale/route.ts` persists language changes. Dictionaries are the canonical translation source in `web/messages/{kk,ru,en}.json`.
- The interactive 3D scenes are client components under `web/src/components/three/`. Shared texture and logo sources are canonical in `assets/textures/` and `assets/logos/`; `scripts/sync-assets.mjs` copies them to `web/public/` so existing `/textures/...` and `/branding/...` URLs remain stable. Scenes use R3F canvases and touch-aware OrbitControls. Brand geometry is in `web/src/components/branding/`.
- There are no custom server data APIs used by the visible science pages. The two server-dependent features are locale routing/cookie persistence (proxy and POST handler); normal page content is server-rendered and has static params for locale and planet routes.
- The web site is a Next.js server application in `web/`. A direct `output: 'export'` is not compatible with the current proxy and request-based `POST /api/locale` route. Do not change the web deployment to static export. Android uses a separately generated static web build that excludes only those server-only routing helpers; app routes and content remain shared with the website.
- Android will be a Capacitor WebView app using the existing React/Three.js client. Because the configured Git root is the existing inner `cosmos/` repository, the versioned Capacitor project lives at that repository's `android/`. A local symlink at the requested outer `COSMOS/android/` points to it so Android Studio can open the specified path without copying or duplicating the native project. No Next.js server is run on device.

## Android runtime design

The Android bundle contains generated static HTML/JavaScript and web public assets, including planet textures. Capacitor configuration is in `web/capacitor.config.ts` and points to the native project at `../android`. It loads the localized static route directly. Locale choice is persisted client-side for native builds, while web cookie persistence remains unchanged. The native shell uses Android System WebView/WebGL and Capacitor's back-button bridge; the handler checks the WebView's JavaScript history because Next Router navigation is client-side. All three locale routes are built; the app entry page selects the saved locale and defaults to Kazakh (`/kk/`).

The Next.js static exporter rejects `proxy.ts` and a request-dependent POST handler. The repository-level `scripts/build-android-web.mjs` creates a temporary workspace from `web/`, omits those two server-only files there, adds a native-only entry route, enables static export, and copies the result into `web/android-web-build/` for Capacitor. It does not modify the normal web build configuration or the source files used by Vercel.

The Android module uses Kotlin for `MainActivity`. Capacitor's Android 8 template currently generates Groovy Gradle scripts; those generated scripts are retained while the project uses a stable Kotlin Gradle plugin for the native activity. The Gradle wrapper is 8.14.3 and requires JDK 21 for Capacitor 8's Java 21 source level.

## Known constraints

- WebGL performance depends on Android GPU and WebView version. The site already has adaptive render quality; target frame rate must be measured on representative devices before making performance claims.
- All current surface textures are local, so primary 3D content can be packaged for offline use. Any future remote API content must provide an explicit offline state.
- Android Studio and SDK are installed locally; this audit found Android Studio 2026.2, SDK platforms 36/37, and Java 26 on PATH. Capacitor's Android Gradle build should use the JDK bundled with Android Studio if the system Java version is unsupported by the selected Gradle version.
