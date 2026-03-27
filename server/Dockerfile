FROM eclipse-temurin:17-jdk-focal
# target 폴더로 경로 변경!
ARG JAR_FILE=target/*.jar 
COPY ${JAR_FILE} app.jar
ENTRYPOINT ["java", "-jar", "/app.jar"]