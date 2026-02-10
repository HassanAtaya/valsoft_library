@echo off
setlocal
cd /d "%~dp0"

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
