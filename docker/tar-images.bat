@echo off
setlocal
cd /d "%~dp0"

echo Saving docker-mysql_db...
docker save -o TAR_IMAGES/docker-mysql_db.tar docker-mysql_db:latest

echo Saving docker-java_app...
docker save -o TAR_IMAGES/docker-java_app.tar docker-java_app:latest

echo Saving docker-angular_app...
docker save -o TAR_IMAGES/docker-angular_app.tar docker-angular_app:latest

echo Saving docker-python_app...
docker save -o TAR_IMAGES/docker-python_app.tar docker-python_app:latest

echo DONE!
pause
