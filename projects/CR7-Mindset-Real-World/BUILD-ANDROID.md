# Build CR7 Mindset for Android (APK)

## Easiest Windows method
1. Install **Node.js LTS**: https://nodejs.org/
2. Install **Android Studio**: https://developer.android.com/studio
3. In Android Studio's Setup Wizard, install the recommended Android SDK, SDK Platform Tools, and Build Tools. Use the JDK bundled with Android Studio unless Gradle reports a version issue.
4. Extract this ZIP and open the `CR7-Mindset-Real-World` folder.
5. Double-click **`BUILD-ANDROID.bat`**. It installs npm dependencies, creates the Capacitor Android project if needed, syncs the app, applies the included launcher icon and opens Android Studio.
6. In Android Studio, wait until Gradle sync finishes. Choose **Build → Build Bundle(s) / APK(s) → Build APK(s)**.
7. Click **Locate** in the build notification, or open `android\app\build\outputs\apk\debug\app-debug.apk`. Copy this APK to your phone and install it for testing.

## Terminal method
Run these commands from the project folder:

```bat
npm install
npm run android:setup
```

The setup command creates a clean `web/` copy of the app, creates the Android platform when it is missing, syncs the web app and opens Android Studio. If you already have an Android folder, it syncs the existing project.

## Release builds
The debug APK is for testing. For distribution, create a signed release APK in Android Studio and keep your signing key private and backed up. Do not publish your private keystore or passwords.

## Troubleshooting
- **`npx` or `npm` not found:** install Node.js LTS, close and reopen the terminal.
- **Android SDK not found:** open Android Studio → SDK Manager and install the SDK Platform and Build Tools.
- **Gradle sync fails:** check the exact JDK/Gradle error in Android Studio; use its bundled JDK unless the project reports otherwise.
- **APK not found:** wait for the build to finish and open the Build output panel.

This ZIP contains source and build configuration, not a precompiled APK. The APK is produced on your computer by Android Studio.
