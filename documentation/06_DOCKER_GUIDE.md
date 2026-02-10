# Docker - Setup and Usage Guide

## Prerequisites

- **Docker 29.2.0** - Download from [docker.com](https://www.docker.com/products/docker-desktop/)
  - Verify: `docker --version`
  - Verify: `docker compose version`
- **Java 21** and **Maven** (for building the backend JAR)
- **Node.js 18+** and **Angular CLI** (for building the frontend dist)

## Project Path Configuration

All Docker scripts read the project root path from `PATH.txt` located at the project root:

```
PATH=C:\Users\Admin\Desktop\valsoft_library\valsoft_library
```

> If you move the project to a different location, update this file with the new absolute path.

## What Does the Docker Setup Do?

The `\docker` folder contains everything needed to containerize and run the entire application stack.

### Services

| Service       | Container Name | Internal Port | External Port | Description                    |
|---------------|----------------|---------------|---------------|--------------------------------|
| MySQL         | mysql_db       | 3306          | 33306         | Database server                |
| Java Backend  | java_app       | 8080          | 18080         | Spring Boot REST API           |
| Angular       | angular_app    | 4200          | 14200         | Frontend served via Nginx      |
| Python        | python_app     | 5000          | 15000         | AI OpenAI integration service  |

### Files

```
docker/
  docker-compose.yml          Orchestrates all 4 services (uses ${PROJECT_PATH} from bat scripts)
  run-all.bat                 One-click: reads PATH.txt, builds and starts everything
  tar-images.bat              Exports built images as .tar files for offline deployment
  java/
    Dockerfile                Copies pre-built JAR (back_end_javaspringboot/target/*.jar)
  angular/
    Dockerfile                Copies pre-built dist (front_end_angular/dist/...)
    nginx.conf                Nginx config: proxies /api/ to Java, /pyapi/ to Python, SPA fallback
  python/
    Dockerfile                Python slim image with Flask
  mysql/
    Dockerfile                MySQL 8.0 with init script
    init.sql                  Creates the valsoft_library database on first run
  TAR_IMAGES/
    docker-compose.yml        Uses pre-built image tags (no build context)
    run_project.bat           Loads .tar images and starts all containers
```

## Application Properties (Local vs Docker)

Two property files exist in `back_end_javaspringboot\src\main\resources\`:

| File                          | DB Host      | Used By        |
|-------------------------------|--------------|----------------|
| `application.properties`      | `mysql_db`   | Docker (active) |
| `LOCALapplication.properties` | `localhost`  | Local dev       |

- **Docker** uses `application.properties` which connects to `mysql_db:3306` (the Docker service name).
- **Local dev** via VS Code tasks uses `LOCALapplication.properties` which connects to `localhost:3306`.

> The VS Code task `valsoft: Java Backend` automatically loads `LOCALapplication.properties` via the `--spring.config.location` argument.

## Angular Production Build for Docker

The Angular production build (`ng build --configuration production`) uses `environment.prod.ts`:

```typescript
export const environment = {
  production: true,
  javaApiUrl: '/',
  pythonApiUrl: '/pyapi/'
};
```

- **Java API**: Calls go to `/api/...` (relative), Nginx proxies them to `java_app:8080`
- **Python AI**: Calls go to `/pyapi/...` (relative), Nginx proxies them to `python_app:5000`

> The `angular.json` has `fileReplacements` configured to swap `environment.ts` with `environment.prod.ts` during production builds.

## Nginx Proxy Configuration

The Angular container runs Nginx (`docker/angular/nginx.conf`) which handles:

| Location   | Proxy Target            | Purpose                       |
|------------|-------------------------|-------------------------------|
| `/api/`    | `http://java_app:8080`  | Spring Boot REST API          |
| `/pyapi/`  | `http://python_app:5000/` | Python AI service (strips /pyapi/ prefix) |
| `/`        | Static files            | Angular SPA with fallback to index.html   |

## Building and Running

### Step 1: Build the Java JAR

```
cd back_end_javaspringboot
mvn clean install -DskipTests
```

This produces `target\library-0.0.1-SNAPSHOT.jar`.

### Step 2: Build the Angular dist

```
cd front_end_angular
npx ng build --configuration production
```

This produces `dist\valsoft-library\browser\`.

### Step 3: Run Docker

Double-click `docker\run-all.bat` or run from terminal:

```
cd docker
run-all.bat
```

The script will:
1. Read `PATH.txt` to get the project root (`PROJECT_PATH`)
2. Stop and remove old containers (`docker compose down -v --remove-orphans`)
3. Build all 4 Docker images using the pre-built JAR and Angular dist
4. Start all containers in detached mode

### Step 4: Access the application

| Service  | URL                      |
|----------|--------------------------|
| Frontend | http://localhost:14200   |
| Java API | http://localhost:18080/api/ |
| MySQL    | localhost:33306 (user: root / pass: root) |

> All API traffic goes through the Angular Nginx proxy at port 14200. You do not need to access Java (18080) or Python (15000) ports directly from the browser.

## Using Pre-built TAR Images (Offline Deployment)

The `\docker\TAR_IMAGES` folder is designed for deploying on a machine without needing the source code.

### Export images

After a successful `run-all.bat` (images exist in Docker), run:

```
cd docker
tar-images.bat
```

This saves 4 `.tar` files into `TAR_IMAGES/`:
- `docker-mysql_db.tar`
- `docker-java_app.tar`
- `docker-angular_app.tar`
- `docker-python_app.tar`

### Deploy on target machine

1. Copy the entire project folder (or at minimum: `PATH.txt` + `docker\TAR_IMAGES\` folder) to the target machine
2. Update `PATH.txt` with the new project path on the target machine
3. Run:

```
cd docker\TAR_IMAGES
run_project.bat
```

This will:
- Read `PATH.txt` to get the project root
- Load all 4 `.tar` image files into Docker
- Start all containers using `TAR_IMAGES\docker-compose.yml` (image-based, no build needed)

## Stopping

From the `docker` folder (or `TAR_IMAGES` folder if using TAR deployment):

```
docker compose down
```

To also remove volumes (deletes all database data):

```
docker compose down -v
```

## Troubleshooting

| Symptom | Cause | Fix |
|---------|-------|-----|
| `ERR_CONNECTION_REFUSED` on port 8080 or 5000 | Browser calling localhost ports directly instead of going through Nginx | Use `http://localhost:14200` only. All API calls are proxied by Nginx. |
| `No static resource .` on `localhost:18080/` | Normal. Java backend only serves `/api/...` endpoints, not root `/`. | Not a bug. Access the app at `http://localhost:14200`. |
| `PATH variable not found` error in bat script | `PATH.txt` missing or incorrectly formatted | Ensure `PATH.txt` exists at project root with `PATH=<absolute path>` |
| Java app fails to connect to MySQL | `application.properties` pointing to wrong host | For Docker: use `application.properties` (mysql_db). For local: use `LOCALapplication.properties` (localhost). |
| Angular shows old/cached behavior | Browser cache or stale Docker image | Clear browser cache. Rebuild Angular (`ng build --configuration production`) and then re-run `run-all.bat`. |
