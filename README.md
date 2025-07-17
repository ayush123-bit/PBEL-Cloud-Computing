# 📚 Courses API – Backend (Spring Boot)

This is the backend REST API service for managing university-level **courses** and their **delivery instances**, built using **Spring Boot**. It is part of the internship assignment for the **PBEL Cloud Computing**.

---

## 🧰 Tech Stack

- Java 17  
- Spring Boot  
- Maven  
- Docker  
- GitHub Actions (CI/CD)

---

## 🚀 Features

- Add and retrieve courses with prerequisite dependencies  
- Prevent deletion of courses that are prerequisites for others  
- Add and view course delivery instances (semester/year)  
- Proper HTTP status codes and validations  
- Dockerized backend for easy deployment  

---

## 📁 Project Structure

src/  
├── controller          → REST API endpoints  
├── model               → Data models for Course and Instance  
├── repository          → Spring Data JPA interfaces  
├── service             → Business logic and validations  
├── exception           → Custom exception handlers  
└── CoursesApiApp.java  → Application entry point  

---

## 🧪 API Endpoints

### 📌 Courses

| Method | Endpoint            | Description                                        |
|--------|---------------------|----------------------------------------------------|
| POST   | `/api/courses`      | Create a new course with prerequisites             |
| GET    | `/api/courses`      | Get all courses with their prerequisites           |
| GET    | `/api/courses/{id}` | Get a course by ID with prerequisites              |
| DELETE | `/api/courses/{id}` | Delete a course (only if not used as prerequisite) |

> ⚠️ Returns 409 Conflict if the course is a prerequisite of another.

---

### 📌 Course Instances

| Method | Endpoint                                      | Description                                 |
|--------|-----------------------------------------------|---------------------------------------------|
| POST   | `/api/instances`                              | Create a course delivery instance           |
| GET    | `/api/instances/{year}/{semester}`            | List all instances in a given year/semester |
| GET    | `/api/instances/{year}/{semester}/{courseId}` | View a specific course instance             |
| DELETE | `/api/instances/{year}/{semester}/{courseId}` | Delete a course instance                    |

---

## 🐳 Docker Setup

### Dockerfile

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

### Build and Run Locally

docker build -t ayushrai3108/courses-backend .  
docker run -p 8080:8080 ayushrai3108/courses-backend  

---

## 🔄 GitHub Actions CI/CD

The backend repo uses GitHub Actions to:

- ✅ Build the project using Maven  
- ✅ Login to DockerHub  
- ✅ Push the Docker image on every push to `main` branch  

Workflow is located at:  
`.github/workflows/build-and-push.yml`  

You must add two GitHub secrets:

- `DOCKER_USERNAME` → Your DockerHub username  
- `DOCKER_PASSWORD` → Your DockerHub password or personal access token  

---

## 📦 Submission Checklist

- ✅ Source code + Dockerfile in GitHub repo  
- ✅ GitHub Actions CI/CD builds and pushes image  
- ✅ `docker-compose.yml` for local testing  
- ✅ Full documentation included (this file)

---

## 👤 Author

**Ayush Rai**  
DockerHub: [ayushrai3108](https://hub.docker.com/u/ayushrai3108)  
GitHub: [@ayush123-bit](https://github.com/ayush123-bit)
# 🖥️ Courses Frontend – ReactJS

This is the frontend interface for managing and displaying **Courses** and their **Instances**, developed using **ReactJS**. It consumes REST APIs from the Spring Boot backend and is part of the internship assignment for the **PBEL Cloud Computing**.

---

## 🧰 Tech Stack

- **ReactJS**
- **Axios**
- **React Router DOM**
- **CSS Modules / Tailwind CSS**
- **Docker**
- **GitHub Actions** (CI/CD)

---

## 🚀 Features

- 📘 Create a course with multiple prerequisites  
- 📄 View all courses and their dependency chains  
- 📆 Create course instances by year and semester  
- 🔍 View instance details  
- ❌ Delete course and instance with validation (dependency safe)  
- 💡 Responsive, user-friendly UI

---

## 📁 Folder Structure

src/
├── components/
│   ├── CourseForm.js
│   ├── CourseList.js
│   ├── CourseInstanceForm.js
│   └── CourseInstanceList.js
├── pages/
│   ├── Home.js
│   ├── CreateCourse.js
│   ├── ViewCourses.js
│   ├── CreateInstance.js
│   └── ViewInstances.js
├── api/
│   └── api.js
├── App.js
└── index.js


---

## 🔗 API Integration

The frontend talks to the following REST APIs:

- GET /api/courses → fetch all courses  
- POST /api/courses → create a course  
- DELETE /api/courses/{id} → delete course  
- POST /api/instances → add a course instance  
- GET /api/instances/{year}/{semester} → list all instances for a semester  
- GET /api/instances/{year}/{semester}/{courseId} → view instance details  
- DELETE /api/instances/{year}/{semester}/{courseId} → delete course instance  

Ensure the backend server is running on http://localhost:8080.

---

## 🐳 Docker

### 🔧 Dockerfile

FROM node:16-alpine as build  
WORKDIR /app  
COPY package.json ./  
COPY package-lock.json ./  
RUN npm install  
COPY . ./  
RUN npm run build  

FROM nginx:stable-alpine  
COPY --from=build /app/build /usr/share/nginx/html  
EXPOSE 80  
CMD ["nginx", "-g", "daemon off;"]

---

### 🔨 Docker Commands

To build the Docker image locally:

docker build -t ayushrai3108/courses-frontend .

To run it locally:

docker run -p 3000:80 ayushrai3108/courses-frontend

---

## 🔄 GitHub Actions CI/CD

This project uses GitHub Actions to:

✅ Build the React app using Node  
✅ Log in to DockerHub  
✅ Push the image to DockerHub on push to the main branch

The CI/CD pipeline is defined in:

.github/workflows/build-and-push.yml

Make sure you’ve added the following GitHub secrets to your repository:

DOCKER_USERNAME → your DockerHub username  
DOCKER_PASSWORD → your DockerHub password or personal access token

---

## 🧪 Local Integration with Backend

You can run both frontend and backend together using docker-compose:

version: '3'  
services:  
  backend:  
    image: ayushrai3108/courses-backend  
    ports:  
      - "8080:8080"  

  frontend:  
    image: ayushrai3108/courses-frontend  
    ports:  
      - "3000:80"

Save this as docker-compose.yml in a separate folder and run:

docker compose up

This will start both containers and the React frontend will be accessible at http://localhost:3000.

---

## ✅ Submission Checklist

✅ Frontend source code and Dockerfile committed to GitHub  
✅ GitHub Actions workflow to build & push Docker image  
✅ Docker image available on DockerHub: ayushrai3108/courses-frontend  
✅ docker-compose.yml tested for full integration  
✅ This README.md added for documentation

---

## 👨‍💻 Author

**Ayush Rai**  
GitHub: https://github.com/ayush123-bit  
DockerHub: https://hub.docker.com/u/ayushrai3108
