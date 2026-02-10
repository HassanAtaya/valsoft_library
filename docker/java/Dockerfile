FROM maven:3.9.6-eclipse-temurin-17 AS build

WORKDIR /app

# Maven cache layer
COPY Technical/java_spring_boot/urlss/pom.xml ./pom.xml
RUN mvn -q -DskipTests dependency:go-offline

# Build
COPY Technical/java_spring_boot/urlss/src ./src
RUN mvn -q -DskipTests package

FROM eclipse-temurin:17-jdk

WORKDIR /app

COPY --from=build /app/target/*.jar ./app.jar

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]
