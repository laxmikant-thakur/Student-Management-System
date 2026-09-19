# 🎓 Student Management System

A full-stack **Student Management System** built with **React 19 + Vite** on the frontend and **Spring Boot 4 (Java)** on the backend. Features a sleek glassmorphism UI for managing student records through complete CRUD operations — create, read (single + paginated), update, and soft-delete — backed by a RESTful API with MySQL persistence.

> **Status:** v1.0 — Core CRUD functionality complete. Authentication & authorization coming in v2.

---

## ✨ Features

- **Create Student** — Add new student records with validated form fields (name, email, age, roll number, subject)
- **View All Students** — Browse all student records in a paginated, responsive table
- **Search by ID** — Look up any student by their unique ID with a detailed card view
- **Edit Student** — Update student details via a smooth modal dialog with pre-filled data
- **Soft Delete** — Remove student records using soft-delete (data preserved in the database)
- **Responsive Design** — Fully responsive across desktop, tablet, and mobile screens
- **Modern UI** — Glassmorphism cards, gradient accents, micro-animations (shake on error, slide-in toasts, modal slide-up), and a dark theme
- **RESTful API** — Clean REST endpoints with DTO pattern, validation, and exception handling
- **MySQL Persistence** — JPA/Hibernate with automatic schema updates

---

## 🛠️ Tech Stack

### Frontend

| Layer       | Technology                                                     |
| ----------- | -------------------------------------------------------------- |
| Framework   | [React 19](https://react.dev/) with functional components      |
| Build Tool  | [Vite 8](https://vite.dev/)                                    |
| Routing     | [React Router DOM v7](https://reactrouter.com/)                |
| HTTP Client | [Axios](https://axios-http.com/)                               |
| Styling     | [Tailwind CSS v4](https://tailwindcss.com/) + Custom CSS       |
| Font        | [Inter](https://fonts.google.com/specimen/Inter) (Google Fonts)|
| Linting     | [ESLint](https://eslint.org/) with React Hooks plugin          |

### Backend

| Layer        | Technology                                                         |
| ------------ | ------------------------------------------------------------------ |
| Framework    | [Spring Boot 4.1](https://spring.io/projects/spring-boot) (Java)  |
| Language     | Java 25                                                            |
| ORM          | [Spring Data JPA](https://spring.io/projects/spring-data-jpa) + Hibernate |
| Database     | [MySQL](https://www.mysql.com/)                                    |
| Validation   | Hibernate Validator + Spring Boot Starter Validation               |
| Build Tool   | [Maven](https://maven.apache.org/)                                 |
| Utilities    | [Lombok](https://projectlombok.org/)                               |

---

## 📁 Project Structure

```
Student Management System/
├── Frontend/
│   ├── public/
│   │   ├── favicon.svg                  # App favicon
│   │   └── icons.svg                    # SVG icon sprite
│   ├── src/
│   │   ├── App.jsx                      # Root component with route definitions
│   │   ├── App.css                      # Complete design system & component styles
│   │   ├── main.jsx                     # Entry point — React root + BrowserRouter
│   │   ├── index.css                    # Global base styles
│   │   ├── Navbar.jsx                   # Sticky top navigation bar with active state
│   │   ├── CreateStudent.jsx            # Student creation form page
│   │   ├── GetStudentsPage.jsx          # Students page — search, list, edit, delete orchestrator
│   │   ├── GetAllStudents.jsx           # Paginated students table component
│   │   ├── GetOneStudent.jsx            # Single student detail card component
│   │   ├── EditModal.jsx                # Modal dialog for editing student details
│   │   ├── StudentForm.jsx              # Reusable student form component
│   │   └── assets/                      # Static assets
│   ├── index.html                       # HTML entry point
│   ├── vite.config.js                   # Vite + React + Tailwind plugin config
│   ├── package.json                     # Dependencies and scripts
│   └── eslint.config.js                 # ESLint configuration
│
├── Backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/example/crudSpringBootDemo/
│   │   │   │   ├── CrudSpringBootDemoApplication.java   # Spring Boot entry point
│   │   │   │   ├── controller/          # REST API controllers
│   │   │   │   ├── dto/                 # Data Transfer Objects
│   │   │   │   ├── entity/              # JPA entity classes
│   │   │   │   ├── exception/           # Custom exception handlers
│   │   │   │   ├── mapper/              # DTO ↔ Entity mappers
│   │   │   │   ├── repository/          # Spring Data JPA repositories
│   │   │   │   └── service/             # Business logic layer
│   │   │   └── resources/
│   │   │       └── application.properties  # App config (⚠️ gitignored — contains DB credentials)
│   │   └── test/                        # Unit & integration tests
│   ├── pom.xml                          # Maven dependencies and build config
│   └── mvnw / mvnw.cmd                  # Maven wrapper scripts
│
└── README.md                            # ← You are here
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** ≥ 18.x & **npm** ≥ 9.x
- **Java (JDK)** ≥ 21
- **Maven** (or use the included `mvnw` wrapper)
- **MySQL** server running locally

### 1. Database Setup

```sql
CREATE DATABASE student_crud_db;
```

### 2. Backend Configuration

Create (or update) the application properties file with your MySQL credentials:

```
Backend/src/main/resources/application.properties
```

```properties
spring.application.name=crudSpringBootDemo

spring.datasource.url=jdbc:mysql://localhost:3306/student_crud_db
spring.datasource.username=YOUR_MYSQL_USERNAME
spring.datasource.password=YOUR_MYSQL_PASSWORD

spring.jpa.hibernate.ddl-auto=update
```

> ⚠️ **Important:** `application.properties` is gitignored because it contains database credentials. Each developer must create their own copy locally.

### 3. Start the Backend

```bash
cd Backend

# Using Maven wrapper
./mvnw spring-boot:run

# Or with Maven installed globally
mvn spring-boot:run
```

The API server will start at **http://localhost:8080**.

### 4. Start the Frontend

```bash
cd Frontend

# Install dependencies
npm install

# Start the dev server
npm run dev
```

The app will be available at **http://localhost:5173**.

---

## 📜 Available Scripts

### Frontend

| Script         | Command            | Description                        |
| -------------- | ------------------- | ---------------------------------- |
| **Dev server** | `npm run dev`       | Start Vite dev server with HMR     |
| **Build**      | `npm run build`     | Create production build in `dist/` |
| **Preview**    | `npm run preview`   | Preview production build locally   |
| **Lint**       | `npm run lint`      | Run ESLint checks                  |

### Backend

| Script          | Command                    | Description                          |
| --------------- | --------------------------- | ------------------------------------ |
| **Run**         | `./mvnw spring-boot:run`   | Start the Spring Boot server         |
| **Build**       | `./mvnw clean package`     | Build JAR artifact                   |
| **Test**        | `./mvnw test`              | Run unit & integration tests         |

---

## 🔌 API Reference

Base URL: **`http://localhost:8080`**

| Method   | Endpoint                           | Description                  |
| -------- | ---------------------------------- | ---------------------------- |
| `POST`   | `/api/student/create`              | Create a new student         |
| `GET`    | `/api/student/getAll?page={n}`     | Get all students (paginated) |
| `GET`    | `/api/student/get?id={id}`         | Get a single student by ID   |
| `PUT`    | `/api/student/update?id={id}`      | Update a student by ID       |
| `DELETE` | `/api/student/delete-soft?id={id}` | Soft-delete a student by ID  |

### Student Object Schema

```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "age": 20,
  "rollNo": "CS-2024-001",
  "subject": "Computer Science"
}
```

---

## 📸 Pages Overview

### Create Student (`/`)
A clean form with validated inputs for adding new student records. Required fields (Name, Email, Age) are marked, with success/error feedback via animated toasts.

### Get Students (`/students`)
An all-in-one page to search, browse, edit, and delete students:
- **Search Panel** — Enter a student ID to view their detailed card
- **Students Table** — Paginated list with inline Edit / Delete actions
- **Edit Modal** — Overlay dialog for editing any student's data

---

## 🗺️ Roadmap

- [x] Full CRUD operations (Create, Read, Update, Soft-Delete)
- [x] Paginated student listing
- [x] Search student by ID
- [x] Edit modal with pre-filled data
- [x] Responsive design (mobile, tablet, desktop)
- [x] Glassmorphism UI with micro-animations
- [x] RESTful backend with DTO pattern & validation
- [ ] 🔐 **Authentication** — User login, registration, and session management
- [ ] 🛡️ **Authorization** — Role-based access control (Admin / Teacher / Student)
- [ ] 🔒 **Protected Routes** — Guard pages behind authentication
- [ ] 📊 **Dashboard** — Analytics and summary statistics
- [ ] 🔍 **Advanced Search** — Filter and sort by name, subject, age range
- [ ] 📤 **Export** — Export student data to CSV / PDF
- [ ] 🌐 **Deployment** — Production deployment guides

---

## 🤝 Contributing

Contributions are welcome! If you'd like to contribute:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-feature`)
3. **Commit** your changes (`git commit -m 'Add amazing feature'`)
4. **Push** to the branch (`git push origin feature/amazing-feature`)
5. **Open** a Pull Request

> **Note:** Remember to create your own `application.properties` file with your local MySQL credentials after cloning.

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).

---

<p align="center">
  Built with ❤️ using React + Spring Boot
</p>
