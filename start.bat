@echo off
echo ======================================
echo Legal Document Search Portal - Setup
echo ======================================
echo.

REM 
docker info >nul 2>&1
if %errorlevel% neq 0 (
    echo X Docker is not running. Please start Docker Desktop and try again.
    exit /b 1
)

echo + Docker is running
echo.

REM 
echo * Building and starting services...
echo.

docker-compose up --build

echo.
echo + Setup complete!
echo.
echo Access the application at:
echo   Frontend: http://localhost:3000
echo   Backend:  http://localhost:8000
echo   API Docs: http://localhost:8000/docs
echo.
echo Press Ctrl+C to stop the services.

pause
