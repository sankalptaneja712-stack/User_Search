# Use official Java 17 JDK
FROM eclipse-temurin:17-jdk-alpine

# Set working directory
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
RUN ./mvnw clean package -DskipTests

# Copy the generated JAR
COPY target/*.jar app.jar

# Expose port (Render will use PORT)
EXPOSE 8080

# Run the JAR
ENTRYPOINT ["java","-jar","app.jar"]
