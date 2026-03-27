FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

COPY pom.xml .
RUN mvn dependency:go-offline -B

COPY src ./src

# 캐시 무효화 — 숫자 바꿀 때마다 아래 단계 새로 실행
ARG CACHEBUST=3
RUN mvn package -DskipTests
RUN ls -la target/

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]