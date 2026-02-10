@echo off
setlocal
cd /d "%~dp0"

echo Start docker-mysql_db
docker save -o docker-mysql_db.tar docker-mysql_db:latest

echo Start docker-java_app
docker save -o docker-java_app.tar docker-java_app:latest

echo Start docker-angular_app
docker save -o docker-angular_app.tar docker-angular_app:latest

echo 🚀 DONE!

pause
