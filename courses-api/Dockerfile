# Use an official OpenJDK runtime as a parent image
FROM openjdk:17-jdk-slim

# Set working directory
WORKDIR /app

# Install dependencies needed for running Maven wrapper
RUN apt-get update && apt-get install -y curl unzip

# Copy Maven wrapper scripts and settings
COPY mvnw .
COPY .mvn .mvn

# Make mvnw executable
RUN chmod +x mvnw

# Copy the pom.xml and download dependencies
COPY pom.xml .
RUN ./mvnw dependency:go-offline

# Copy the full source code
COPY src ./src

# Build the application
RUN ./mvnw clean package -DskipTests

# Expose the application's port
EXPOSE 8080

# Run the Spring Boot JAR
ENTRYPOINT ["java", "-jar", "target/courses-api-0.0.1-SNAPSHOT.jar"]
