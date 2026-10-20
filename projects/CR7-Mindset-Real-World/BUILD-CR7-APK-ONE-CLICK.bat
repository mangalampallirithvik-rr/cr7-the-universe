@echo off
setlocal
cd /d "%~dp0"
title CR7 Mindset - One Click Android APK Builder

echo ================================================
echo        CR7 MINDSET - ANDROID APK BUILDER
echo ================================================
echo.
where node >nul 2>nul
if errorlevel 1 (
  echo ERROR: Node.js is not installed or not on PATH.
  echo Install Node.js LTS, then reopen this file.
  pause
  exit /b 1
)
if not exist "android\gradlew.bat" (
  echo ERROR: Android project not found.
  echo Put this BAT file in the CR7-Mindset-Real-World project root.
  echo Then run BUILD-ANDROID.bat once to create the Android project.
  pause
  exit /b 1
)

echo [1/3] Installing/checking project dependencies...
call npm install
if errorlevel 1 goto fail

echo.
echo [2/3] Syncing the app into Android...
call npm run android:sync
if errorlevel 1 goto fail

echo.
echo [3/3] Building debug APK with Gradle...
pushd android
call gradlew.bat assembleDebug
if errorlevel 1 (
  popd
  goto fail
)
popd

if exist "android\app\build\outputs\apk\debug\app-debug.apk" (
  echo.
  echo SUCCESS! APK created:
  echo %CD%\android\app\build\outputs\apk\debug\app-debug.apk
  start "" explorer.exe "%CD%\android\app\build\outputs\apk\debug"
  echo Copy app-debug.apk to your Android phone to install it for testing.
  pause
  exit /b 0
)

echo Gradle completed, but the expected APK was not found.
echo Check the Gradle output above for the actual output path.
pause
exit /b 1

:fail
echo.
echo BUILD FAILED. Read the error messages above.
echo Common causes: Android SDK missing, Java/JDK setup, or no internet for Gradle downloads.
pause
exit /b 1
