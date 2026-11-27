@echo off
title CTU Kiosk Launcher
echo ========================================================
echo   Launching Cebu Technological University Merch Kiosk
echo ========================================================
echo.
echo Starting FastAPI Backend on http://127.0.0.1:8000...
start "CTU Kiosk Backend" "%~dp0start_backend.bat"

echo Waiting 2 seconds for backend initialization...
timeout /t 2 /nobreak >nul

echo Starting Vite Frontend on http://localhost:5173...
start "CTU Kiosk Frontend" "%~dp0start_frontend.bat"

echo.
echo Kiosk system launched! Opening browser at http://localhost:5173...
timeout /t 2 /nobreak >nul
start http://localhost:5173
