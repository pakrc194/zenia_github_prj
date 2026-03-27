# 1단계: Maven으로 빌드
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app

# 의존성 먼저 캐시 (빌드 속도 향상)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# 소스 복사 후 빌드
COPY src ./src
RUN mvn package -DskipTests

# 2단계: 실행만
FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]