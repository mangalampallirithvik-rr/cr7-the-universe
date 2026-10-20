@echo off
cd /d "%~dp0"
echo =============================================
echo CR7 MINDSET - ANDROID APK BUILD SETUP
echo =============================================
where node >nul 2>nul || (echo ERROR: Install Node.js LTS from https://nodejs.org/ & pause & exit /b 1)
where npm >nul 2>nul || (echo ERROR: npm was not found. Reinstall Node.js LTS. & pause & exit /b 1)
echo.
echo This will prepare the Android project and open Android Studio.
echo Android Studio and the Android SDK must be installed.
echo.
call npm install || (echo ERROR: npm install failed. & pause & exit /b 1)
call npm run android:setup || (echo ERROR: Android setup failed. Check the messages above. & pause & exit /b 1)
echo.
echo Android project opened. Wait for Gradle sync, then use Build ^> Build Bundle(s) / APK(s) ^> Build APK(s).
echo Debug APK output: android\app\build\outputs\apk\debug\app-debug.apk
pause
