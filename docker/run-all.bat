@echo off
setlocal
cd /d "%~dp0"

echo 🔄 Stopping and removing old containers...
docker compose down -v --remove-orphans

echo 🛠️ Building all services...
docker compose build --no-cache

echo 🚀 Starting Angular, Java, and MySQL in detached mode...
docker compose up -d mysql_db java_app angular_app

pause
