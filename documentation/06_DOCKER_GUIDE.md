# Docker - Setup and Usage Guide

## Prerequisites

- **Docker 29.2.0** - Download from [docker.com](https://www.docker.com/products/docker-desktop/)
  - Verify: `docker --version`
  - Verify: `docker compose version`

## What Does the Docker Setup Do?

The `\docker` folder contains everything needed to containerize and run the entire application stack:

### Services

| Service       | Container Name | Internal Port | External Port | Description                    |
|---------------|----------------|---------------|---------------|--------------------------------|
| MySQL         | mysql_db       | 3306          | 33306         | Database server                |
| Java Backend  | java_app       | 8080          | 18080         | Spring Boot REST API           |
| Angular       | angular_app    | 4200          | 14200         | Frontend served via Nginx      |
| Python        | python_app     | 5000          | 15000         | AI OpenAI integration service  |

### Files

- `docker-compose.yml` - Orchestrates all 4 services, builds from source
- `java/Dockerfile` - Multi-stage build: Maven build then Java runtime
- `angular/Dockerfile` - Multi-stage build: Node build then Nginx serve
- `angular/nginx.conf` - Nginx config with API proxy to Java backend
- `python/Dockerfile` - Python slim image with Flask
- `mysql/Dockerfile` - MySQL with init script
- `mysql/init.sql` - Creates the database on first run
- `run-all.bat` - One-click script to build and start everything
- `tar-images.bat` - Exports built images as .tar files

## Building and Running (from source)

1. Open a terminal in the `docker` folder:
   ```
   cd docker
   ```

2. Run the batch script:
   ```
   run-all.bat
   ```

   Or manually:
   ```
   docker compose down -v --remove-orphans
   docker compose build --no-cache
   docker compose up -d
   ```

3. Access the application:
   - Frontend: http://localhost:14200
   - Backend API: http://localhost:18080
   - Python AI: http://localhost:15000
   - MySQL: localhost:33306

## Using Pre-built TAR Images

The `\docker\TAR_IMAGES` folder is designed for deploying without building from source:

1. First, build and export images:
   ```
   cd docker
   tar-images.bat
   ```

2. Copy the `TAR_IMAGES` folder to the target machine

3. On the target machine, run:
   ```
   cd TAR_IMAGES
   run_project.bat
   ```

   This will:
   - Load all `.tar` image files into Docker
   - Start all containers using docker-compose

## Stopping

```
docker compose down
```

To also remove volumes (database data):
```
docker compose down -v
```
