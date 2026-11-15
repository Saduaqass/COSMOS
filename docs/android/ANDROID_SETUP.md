# COSMOS for Android

## Requirements

- Node.js 22 or newer and npm.
- Android Studio 2025.2.1 or newer, Android SDK Platform 36, platform tools, and an API 24+ emulator/device.
- Use JDK 21 for Gradle. The Capacitor 8 Gradle wrapper is 8.14.3 and its Android sources target Java 21; the Android Studio bundled JDK on this development machine is newer and incompatible with Gradle 8.14.3.

## Build and open

From the monorepo root, enter the web app first:

```bash
cd web
npm ci
npm run android:build:web
npx cap sync android
npx cap open android
```

The static web build is generated from shared Next.js pages and local assets into `web/android-web-build/`. Capacitor's config uses `android.path: "../android"`, so the native project stays beside the website at the monorepo root. The repository itself is the existing inner `cosmos/` directory; in this workspace, the outer `COSMOS/android/` path is a local symlink to the tracked project. The normal `npm run build` in `web/` remains a server-rendered Next.js build.

To build a debug APK from Android Studio, select the `app` configuration and run it on a device/emulator, or use `./gradlew assembleDebug` from the `android/` directory with JDK 21 selected as the Gradle JDK. The APK is written under `android/app/build/outputs/apk/debug/`.

## Release signing

Create and protect a keystore outside the repository. Configure signing credentials in local Gradle properties or environment variables; never commit the keystore or passwords. Release builds are unsigned until signing is configured. Build an AAB with `./gradlew bundleRelease` after configuring the release signing block in the local Gradle setup.

## Offline behavior and limitations

The generated bundle includes the locale pages, Three.js code, branding, and local planet textures. An internet connection is not required for those bundled pages. The Android build uses a dedicated static export workspace because Next.js `proxy.ts` and the POST locale-cookie handler require a server; the normal web app retains both and is not converted to static output. Language changes in the packaged app use local storage. If a future feature calls a network API, that feature must display an offline state.

## Troubleshooting

- Select a JDK 21 installation under Settings → Build Tools → Gradle → Gradle JDK. The Android Studio 2026 bundled JDK is newer than this Capacitor-generated wrapper supports; Java 17 is too old for the Java 21 source target.
- If WebGL is unavailable, update Android System WebView/Chrome and verify the device has hardware acceleration enabled.
- If the native app has stale web assets, run `cd web && npm run android:sync`.
