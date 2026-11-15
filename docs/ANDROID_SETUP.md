# COSMOS for Android

## Requirements

- Node.js 22 or newer and npm.
- Android Studio 2025.2.1 or newer, Android SDK Platform 36, platform tools, and an API 24+ emulator/device.
- Use Android Studio's bundled JDK for Gradle when the system JDK is not supported by the Android Gradle Plugin.

## Build and open

From the web repository root:

```bash
npm install
npm run android:build:web
npx cap sync android
npx cap open android
```

The static web build is generated from the shared Next.js pages and local assets into `android-web-build/`. The Android project is configured at the sibling `../android/` directory so Android Studio opens the requested outer `COSMOS/android/` project. The normal web `npm run build` remains a server-rendered Next.js build.

To build a debug APK from Android Studio, select the `app` configuration and run it on a device/emulator, or use `./gradlew assembleDebug` from the Android project directory. The APK is written under `app/build/outputs/apk/debug/`.

## Release signing

Create and protect a keystore outside the repository. Configure signing credentials in local Gradle properties or environment variables; never commit the keystore or passwords. Release builds are unsigned until signing is configured. Build an AAB with `./gradlew bundleRelease` after configuring the release signing block in the local Gradle setup.

## Offline behavior and limitations

The generated bundle includes the locale pages, Three.js code, branding, and local planet textures. An internet connection is not required for those bundled pages. The Android build uses a dedicated static export workspace because Next.js `proxy.ts` and the POST locale-cookie handler require a server; the normal web app retains both and is not converted to static output. Language changes in the packaged app use local storage. If a future feature calls a network API, that feature must display an offline state.

## Troubleshooting

- If Gradle reports an unsupported Java version, select the JDK bundled in Android Studio under Settings → Build Tools → Gradle → Gradle JDK.
- If WebGL is unavailable, update Android System WebView/Chrome and verify the device has hardware acceleration enabled.
- If the native app has stale web assets, rerun the Android web build and then `npx cap sync android`.
