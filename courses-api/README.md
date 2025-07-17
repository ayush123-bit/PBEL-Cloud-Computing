# 📚 Courses API – Backend (Spring Boot)

This is the backend REST API for managing university-level **Courses** and their delivery **Instances**. It is developed using **Java Spring Boot** and designed as part of an internship assignment for the Application Software Centre, IIT Bombay.

---

## 🧰 Tech Stack

- **Java 17**
- **Spring Boot**
- **Maven**
- **Docker**
- **GitHub Actions** (CI/CD)

---

## 🚀 Features

- Create and manage courses with prerequisite dependencies.
- Prevent deletion of prerequisite courses in use.
- Add and list course delivery instances (by year/semester).
- Retrieve detailed information of any course or instance.
- RESTful design with proper status codes and validation.

---

## 🧪 API Endpoints

### 🔹 Courses

| Method | Endpoint             | Description                                        |
|--------|----------------------|----------------------------------------------------|
| POST   | `/api/courses`       | Create a new course with prerequisites             |
| GET    | `/api/courses`       | Get all courses with their prerequisites           |
| GET    | `/api/courses/{id}`  | Get a specific course with its prerequisites       |
| DELETE | `/api/courses/{id}`  | Delete a course (only if not used as prerequisite) |

> 🔒 A course **cannot** be deleted if it is a prerequisite for another.

---

### 🔸 Instances

| Method | Endpoint                                       | Description                                  |
|--------|------------------------------------------------|----------------------------------------------|
| POST   | `/api/instances`                               | Create a course delivery instance            |
| GET    | `/api/instances/{year}/{semester}`             | List all course instances by year + semester |
| GET    | `/api/instances/{year}/{semester}/{courseId}`  | Get detailed info about a course instance    |
| DELETE | `/api/instances/{year}/{semester}/{courseId}`  | Delete a specific instance                   |

---

## 🐳 Docker Setup

### 🔧 Dockerfile

The backend Dockerfile builds a Spring Boot JAR using Maven:

```dockerfile
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .
RUN ./mvnw dependency:go-offline
COPY src ./src
RUN ./mvnw package -DskipTests
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app/target/courses-api-0.0.1-SNAPSHOT.jar"]
---

### 📦 Build Docker Image Locally

```bash
docker build -t ayushrai3108/courses-backend .
