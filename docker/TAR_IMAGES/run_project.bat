@echo off
setlocal

echo Loading Docker images...

cd /d "%~dp0"
docker load -i "docker-mysql_db.tar"
docker load -i "docker-java_app.tar"
docker load -i "docker-angular_app.tar"
docker load -i "docker-python_app.tar"

echo All images loaded.

echo Starting containers with docker-compose...
docker compose up -d

echo Done! All services are up.
echo MySQL:   localhost:33306
echo Java:    localhost:18080
echo Angular: localhost:14200
echo Python:  localhost:15000
pause
