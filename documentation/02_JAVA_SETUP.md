# Java Spring Boot - Local Setup Guide

## Prerequisites

1. **Java 21** - Download and install JDK 21 from [Adoptium](https://adoptium.net/) or [Oracle](https://www.oracle.com/java/technologies/downloads/)
   - Verify: `java -version` should show `21.x.x`
2. **Maven 3.9+** - Download from [Maven](https://maven.apache.org/download.cgi)
   - Verify: `mvn -version`
3. **MySQL 8.2** - Must be running with the `valsoft_library` database created (see `04_MYSQL_SETUP.md`)

## Installation Steps

1. Open a terminal and navigate to the backend folder:
   ```
   cd back_end_javaspringboot
   ```

2. Install dependencies and build:
   ```
   mvn clean install -DskipTests
   ```

3. Run the application:
   ```
   mvn spring-boot:run
   ```

   Or run the JAR directly:
   ```
   java -jar target/library-0.0.1-SNAPSHOT.jar
   ```

4. The backend will be available at: `http://localhost:8080`

## Configuration

- `src/main/resources/application.properties` - Main config (used locally)
- `src/main/resources/DOCKERapplication.properties` - Docker-specific config
- Database connection defaults: `localhost:3306/valsoft_library` with user `root` / password `root`

## Default Admin Account

- Username: `admin`
- Password: `123456`

## API Base URL

All API endpoints are under: `http://localhost:8080/api/`
