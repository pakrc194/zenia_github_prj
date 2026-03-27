FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# bust: 2025-03-27-002
COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests -e 2>&1 | tail -100
RUN ls -la target/

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]