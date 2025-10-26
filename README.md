# 👤 User Search Application

A full-stack web application for searching and managing user data with a Spring Boot backend and Angular frontend.

**🔗 Live Demo:** [https://user-search-sankalp-s-projects.vercel.app/](https://user-search-sankalp-s-projects.vercel.app/)

---

## 📋 Table of Contents
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Backend APIs](#-backend-apis)
- [Frontend Architecture](#-frontend-architecture)
- [Application Flow](#-application-flow)
- [Setup & Installation](#-setup--installation)
- [Running Locally](#-running-locally)
- [Building for Production](#-building-for-production)
- [Features](#-features)

---

## 🛠 Tech Stack

### **Backend**
- ☕ **Java 17** – Programming language  
- ⚙️ **Spring Boot 3.x** – Web framework  
- 🗄️ **Spring Data JPA** – Data access layer  
- 🧠 **H2 Database** – In-memory database for development  
- 🧩 **Maven 3.9.3** – Build tool  
- 🧾 **Lombok** – Boilerplate code reduction  
- 🔄 **Jackson** – JSON processing  

### **Frontend**
- 🅰️ **Angular 17+** – Frontend framework  
- 💻 **TypeScript** – Programming language  
- 🎨 **Angular Material** – UI component library  
- ⚡ **Angular CLI 20.3.7** – Development tools  
- 🔁 **RxJS** – Reactive programming  
- 🎨 **CSS Variables** – Styling system  

### **DevOps & Deployment**
- 🐳 **Docker** – Containerization  
- ☁️ **Render** – Cloud deployment platform  

---

## 📁 Project Structure

<img width="398" height="496" alt="Screenshot 2025-10-26 at 10 48 36 PM" src="https://github.com/user-attachments/assets/78f9dfaa-1c03-4c87-81e7-a4c9d6424cdf" />


---

## 🔗 Backend APIs

### **User Controller (`/api/users`)**

| Method | Endpoint | Description | Parameters |
|--------|-----------|-------------|-------------|
| **GET** | `/api/users` | Get all users | None |
| **GET** | `/api/users/search` | Search users by text | `text` (query param) |
| **GET** | `/api/users/{id}` | Get user by ID | `id` (path param) |
| **GET** | `/api/users/email/{email}` | Get user by email | `email` (path param) |

### **API Details**
#### 🔍 Search Users
GET /api/users/search?text=john
- Searches through **firstName**, **lastName**, and **ssn** fields  
- Case-insensitive partial matching  
- Returns an array of matching user objects  

---

## 🧭 Application Flow

- [ ] **Landing Page:**  
  <img width="1664" height="931" alt="Screenshot 2025-10-26 at 9 47 36 PM" src="https://github.com/user-attachments/assets/33725fa5-0dc9-499c-a431-59618eea3d1b" />


- [ ] **User enters text and clicks search or presses enter**  
 <img width="1692" height="856" alt="Screenshot 2025-10-26 at 10 32 44 PM" src="https://github.com/user-attachments/assets/96794aad-2397-4b84-8976-7615dfd0c4e8" />

- [ ] **UI side filtering**  
  <img width="1710" height="922" alt="Screenshot 2025-10-26 at 10 34 05 PM" src="https://github.com/user-attachments/assets/6f70f694-4923-4660-93e6-c6baff746d21" />
<img width="1710" height="713" alt="Screenshot 2025-10-26 at 10 34 30 PM" src="https://github.com/user-attachments/assets/35f52506-4414-487e-9260-c293912d8b72" />


- [ ] **User details displayed when a user is clicked**  
  <img width="1488" height="955" alt="Screenshot 2025-10-26 at 10 35 27 PM" src="https://github.com/user-attachments/assets/f9561d33-9a16-47d1-ab09-f48a3a6cabdf" />


---

## 🎨 Frontend Architecture

### **Core Components**
1. **SearchBarComponent** – Reusable search input with validation  
2. **UserGridComponent** – Main user listing with filtering and sorting  
3. **UserDetailComponent** – Individual user details view  

### **Services**
- `UserService` – HTTP client for API communication  
- `LoadingService` – Global loading state management  

### **Routing**
- `/` – User grid with search functionality  
- `/user/:id` – User detail view  

---

## 🧠 Detailed User Interaction Flow

### **1. Initial Load**
- User visits the application  
- `UserGridComponent` renders with empty state  
- `SearchBarComponent` is ready for input  

### **2. Search Process**
- User types in search input (min 3 characters)  
- `SearchBarComponent` validates input  
- On submit, emits search event to parent component  
- `UserGridComponent` calls `UserService.searchUsers()`  
- Service makes HTTP request to backend `UserController.search()`  
- Backend queries database using `UserRepository`  
- Results returned and displayed in card layout  

### **3. Filtering & Sorting**
- Extract unique roles from search results  
- User can filter by role  
- User can sort by age (ascending/descending)  
- `UserGridComponent.applyFilters()` updates displayed results  

### **4. User Detail View**
- User clicks on a user card  
- Navigates to `/user/:id` route  
- `UserDetailComponent` loads  
- Fetch detailed user data via `UserService.getUserById()`  
- Display comprehensive user information  

---

## 🗺️ Data Flow Architecture


<img width="563" height="227" alt="Screenshot 2025-10-26 at 10 53 13 PM" src="https://github.com/user-attachments/assets/7918a911-b184-46b3-99c2-8519aaad12fe" />



🚀 Setup & Installation
Prerequisites
* Node.js 18+ and npm
* Java 17+
* Maven 3.6+
* Docker (optional)


Backend Setup

cd backend/Users
./mvnw clean install


Frontend Setup

cd frontend/user
npm install


🏃‍♂️ Running Locally
Start Backend Server

cd backend/Users
./mvnw spring-boot:run

* Server runs on: http://localhost:8080
* API base URL: http://localhost:8080/api
* H2 Console: http://localhost:8080/h2-console

Start Frontend Development Server

cd frontend/user
ng serve

* Application runs on: http://localhost:4200
* Auto-reloads on file changes


Using Docker (Backend)

cd backend/Users
docker build -t user-search-backend .
docker run -p 8080:8080 user-search-backend


🔨 Building for Production
Backend Production Build

cd backend/Users
./mvnw clean package -DskipTests

* Generates: target/Users-0.0.1-SNAPSHOT.jar


Frontend Production Build

cd frontend/user
ng build --configuration production

* Generates: dist/ directory with optimized assets
Environment Configuration
The application uses different API endpoints for development and production:
* Development: http://localhost:8080/api
* Production: https://user-search-1.onrender.com/api

Environment files:
* environment.ts - Development

📝 Features
* 🔍 Real-time Search - Search users by name or SSN
* 🎯 Advanced Filtering - Filter by user roles
* 📊 Sorting - Sort users by age
* 📱 Responsive Design - Works on all devices
* ⚡ Performance Optimized - Lazy loading and efficient rendering
* 🎨 Modern UI - Material Design components
* 📈 Loading States - User-friendly loading indicators













