@echo off
setlocal

echo 🔄 Loading Docker images...

cd /d "%~dp0"
docker load -i "docker-mysql_db.tar"
docker load -i "docker-java_app.tar"
docker load -i "docker-angular_app.tar"

echo ✅ All images loaded.

echo 🚀 Starting containers with docker-compose...
docker compose up -d

echo 🟢 Done! All services are up.
pause
