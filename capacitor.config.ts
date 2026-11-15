import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
  appId: "com.cosmos.app",
  appName: "COSMOS",
  webDir: "android-web-build",
  android: {
    path: "android",
    backgroundColor: "#03050B",
    minWebViewVersion: 60,
  },
  server: {
    appStartPath: "/",
    androidScheme: "https",
  },
  plugins: {
    SystemBars: {
      style: "DARK",
    },
  },
};

export default config;
