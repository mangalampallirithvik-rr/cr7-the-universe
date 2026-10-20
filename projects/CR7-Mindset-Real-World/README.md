# CR7 Mindset — Project 05 (Local Accounts Edition)

A responsive, local-first motivation and discipline app with a custom CR7 Mindset-inspired black/red/gold icon, account profiles, goals, habits, challenges, progress, mindset library, and backup import/export.

## Start here
- **Windows installer:** double-click `BUILD-WINDOWS.bat`. When it finishes, look in `release/` for `CR7 Mindset Setup 1.0.1.exe` and the portable build.
- **Android APK:** install Node.js LTS and Android Studio, then double-click `BUILD-ANDROID.bat`. Follow the Android Studio build instructions displayed and in `BUILD-ANDROID.md`.
- **Logo files:** `assets/icon.ico` is used for the Windows installer/app; `assets/icon.png`, `assets/logo.svg`, and PNG size variants are included for app UI and Android launcher icon setup.

## Android output
After a successful debug build, find `android/app/build/outputs/apk/debug/app-debug.apk`. The setup script prepares a clean `web/` folder for Capacitor so desktop build files and `node_modules` are not bundled into Android. The APK is generated on your PC; it is not precompiled in this ZIP.

## Features
- Local create-account/login flow supporting multiple profiles on the same device
- Passwords hashed with PBKDF2-HMAC-SHA-256, 310,000 iterations and per-account salt
- Separate goals, habits, check-ins, challenges, display name and focus for each local account
- Daily motivation, progress dashboard, challenges and searchable mindset library
- Profile-specific JSON backup export/import and clear-profile action
- Responsive mobile/desktop layout and included original logo/icon assets

## Security and limitations
Accounts and profile data are local to this device; there is no cloud identity server or sync. Passwords are salted and hashed, but profile data is not encrypted at rest. This is local profile separation, not protection against someone with access to the same OS account or developer tools. Do not reuse a sensitive password. Review `SECURITY.md`.

Motivational writing is original and is not presented as direct Cristiano Ronaldo quotations or endorsement. This project is not affiliated with or endorsed by Cristiano Ronaldo.
