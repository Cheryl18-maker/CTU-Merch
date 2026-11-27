@echo off
title CTU Kiosk - FastAPI Backend
echo Starting CTU Merchandise Kiosk FastAPI Backend...
cd /d "%~dp0backend"
set PYTHONPATH=%~dp0backend
"C:\Users\nic\AppData\Local\Programs\Python311\python.exe" -m uvicorn main:app --reload --host 127.0.0.1 --port 8000
pause
