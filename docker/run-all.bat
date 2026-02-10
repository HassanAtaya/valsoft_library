@echo off
setlocal EnableDelayedExpansion

REM ── Read project path from PATH.txt ──
set "PATH_FILE=%~dp0..\PATH.txt"
if not exist "%PATH_FILE%" (
    echo ERROR: PATH.txt not found at "%PATH_FILE%"
    pause
    exit /b 1
)
for /f "tokens=1,* delims==" %%a in ('type "%PATH_FILE%"') do (
    if "%%a"=="PATH" set "PROJECT_PATH=%%b"
)
if not defined PROJECT_PATH (
    echo ERROR: PATH variable not found in PATH.txt
    pause
    exit /b 1
)
echo Project path: %PROJECT_PATH%

REM ── Run docker compose from the docker folder ──
cd /d "%PROJECT_PATH%\docker"

echo Stopping and removing old containers...
docker compose down -v --remove-orphans

echo Building all services...
docker compose build --no-cache

echo Starting MySQL, Java, Angular, and Python in detached mode...
docker compose up -d mysql_db java_app angular_app python_app

echo Done! Services are starting up.
echo MySQL:   localhost:33306
echo Java:    localhost:18080
echo Angular: localhost:14200
echo Python:  localhost:15000

pause
