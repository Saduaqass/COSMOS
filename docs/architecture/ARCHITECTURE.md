# COSMOS Web + Android architecture

## Monorepo boundaries

- `web/` is the independently installable Next.js application. Its App Router, React components, Three.js scenes, localization dictionaries, and application state remain together under `web/src/` and `web/messages/` to preserve framework conventions.
- `android/` is the single Android Studio project. It is a Capacitor host for the web application, with the Kotlin `MainActivity` and platform resources. `web/capacitor.config.ts` resolves this project through `android.path: "../android"`.
- `assets/` stores source media shared across platforms. The build script copies it into Next.js `public/`; Capacitor then packages that same output for the Android WebView.
- `scripts/` contains repository-level tooling for dictionary validation, Android static export, and shared asset delivery.
- There is no standalone backend. The locale cookie route and request proxy are part of the Next.js web application.

## Clean Architecture decision

The web app keeps Next.js route conventions and existing feature-oriented folders (`components/`, `data/`, `hooks/`, `i18n/`, `store/`, `lib/`). Moving these into generic duplicate `pages/`, `services/`, or `utils/` trees would add indirection without creating a real boundary.

The current Kotlin code is a thin Capacitor entry point; the product interface and simulation logic run in the shared web client. There is no native business logic or repository layer to separate today, so the Android project does not contain placeholder `domain/`, `data/`, or dependency-injection packages. If native features with business rules are added later, introduce Kotlin `presentation/`, `domain/`, and `data/` packages around those features without replacing the current stack.

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

## Final verification

- The production website was started from `web/`; `/kk`, `/ru`, `/en`, representative localized planet routes, `/textures/earth-blue-marble.png`, and `/branding/cosmos-symbol.svg` returned HTTP 200.
- Android static export and `npx cap sync android` succeeded. Gradle `assembleDebug` succeeded with JDK 21. The earlier emulator run verified localized navigation and offline display; this restructuring did not change the native application behavior.
- Git contains one repository at the selected existing root, no nested `.git`, and no tracked build output or secrets. `main` is clean and in sync with `origin/main`.
