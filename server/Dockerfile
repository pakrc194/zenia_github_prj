FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 이 줄 추가 — 숫자 바꿀 때마다 캐시 무효화됨
ARG CACHEBUST=2

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src
RUN mvn package -DskipTests

RUN ls -la target/

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]