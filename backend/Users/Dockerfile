# Stage 1: Build the JAR
FROM maven:3.9.3-eclipse-temurin-17 AS build

WORKDIR /app

# Copy Maven wrapper and pom.xml first (for caching)
COPY mvnw .
COPY pom.xml .
COPY .mvn .mvn

# Copy the source code
COPY src ./src

# Make Maven wrapper executable
RUN chmod +x mvnw

# Build the project
RUN ./mvnw clean package

# Stage 2: Create runtime image
FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy the built JAR from the build stage
COPY --from=build /app/target/Users-0.0.1-SNAPSHOT.jar ./Users-0.0.1-SNAPSHOT.jar

# Expose port (Render will use PORT)
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java", "-jar", "Users-0.0.1-SNAPSHOT.jar"]
