@echo off
cd /d "%~dp0"
echo =============================================
echo CR7 MINDSET - WINDOWS BUILD
echo =============================================
where node >nul 2>nul || (echo ERROR: Install Node.js LTS from https://nodejs.org/ & pause & exit /b 1)
call npm install || (echo ERROR: npm install failed. & pause & exit /b 1)
call npm run dist:win || (echo ERROR: Windows build failed. Check the messages above. & pause & exit /b 1)
echo.
echo SUCCESS: Check the release folder for CR7 Mindset Setup 1.0.1.exe and the portable EXE.
pause
