FROM maven:3.9.6-eclipse-temurin-21 AS build

WORKDIR /app

# Maven cache layer
COPY back_end_javaspringboot/pom.xml ./pom.xml
RUN mvn -q -DskipTests dependency:go-offline

# Build
COPY back_end_javaspringboot/src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:21-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
