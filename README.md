# RFP Management System – Frontend

## 1. Project Overview
**Project Name:** RFP Management System (Frontend)  
**Description:**  
An intuitive interface for creating, managing, and reviewing RFPs using AI. Includes vendor management, proposal comparison, and automated email parsing/processing (backend controlled).

### Key Features
- Generate structured RFPs from natural language input.
- Review, edit, and send RFPs to vendors.
- Manage RFPs through a dashboard.
- Manage vendor details and communication.
- Compare vendor proposals using AI insights.

### Goals
Deliver a seamless and efficient UI for the end-to-end RFP workflow.

---

## 2. Project Setup

### a. Prerequisites
- **Node.js v20+**  
- **npm v9+**  
- **Docker v24+** *(optional)*

### b. Environment Variables
Create a `.env` file in the project root:

```
VITE_API_URL="http://localhost:8080/api/v1"
```

---

## 3. Installation Steps

### 🔹 Clone the Repository
```bash
git clone https://github.com/SivaGuruK/RFP-Management-System-Frontend.git
cd RFP-Management-System-Frontend
```

---

## 3.1 Manual Installation (Vite + React + TypeScript)

### 🔹 Install Dependencies
```bash
npm install
```

### 🔹 Run the Development Server
```bash
npm run dev
```

App runs at:  
👉 http://localhost:5173

---

## 3.2 Running with Docker

### 🔹 Build & Start the Container
```bash
docker-compose up --build
```

### 🔹 Stop the Containers
```bash
docker-compose down
```

---

## 4. Tech Stack

| Category | Tech |
|---------|------|
| Frontend Framework | React |
| Bundler | Vite |
| Language | TypeScript |
| Styling | TailwindCSS |
| State Management | Redux Toolkit |
| Side Effects | Redux Saga |
| API Client | Axios |
| Server State | React Query |
| Notifications | React Toastify |
| Additional | Custom Hooks, Utility Helpers |


---

## 5. API Usage

The frontend communicates with the backend using:

```
VITE_API_URL=/api/v1
```

### Common API Routes

## 5. API Usage (Used in Frontend)

| Feature / Usage | Endpoint |
|-----------------|----------|
| Dashboard Stats | /rfps/stats/dashboard |
| Fetch All RFPs | /rfps |
| Create RFP | /rfps/create-rfp |
| Generate RFP (AI) | /rfps/generate-rfp |
| Get Single RFP / Update / Delete | /rfps/:id |
| Vendor List | /vendors |
| Create Vendor | /vendors/create-vendor |
| Update/Delete Vendor | /vendors/:id |
| Vendor Search | /vendors?search=<query> |
| Compare Proposals (AI Analysis) | /compare/analyze |
| Get Comparison by RFP | /compare/rfp/:id |
| Get All Email Messages | /emails?direction=inbound |
| Get Parsed Email Messages | /emails?direction=inbound&status=parsed |


---

## 6. Decisions & Assumptions

### a. Design Decisions
- Clean, minimal, functional UI.
- Reusable component-driven architecture.
- React Query for caching + state sync.
- Axios interceptors for consistent API handling.

### b. Assumptions
- Backend strictly follows `/api/v1` routes.
- All AI scoring, parsing, cron jobs happen in backend.
- Proposal comparison depends on backend AI insights.

### c. Limitations
- English-only content.
- No offline support.
- Email parsing depends on backend cron schedules.

---

## 7. AI Tools Usage

### a. Tools Used
- ChatGPT  
- Claude AI 

### b. Contributions from AI Tools
- UI Design Planning  
- UX improvements for dashboard
- Redux and Redux Saga setup And Boilerplate
- Debugging API integration  

---

## 8. Folder Structure (Simplified)

```css
src/
 ├── components/
 ├── pages/
 ├── store/
 ├── cards/
 ├── layouts/
 ├── utils/
 ├── hooks/
 └── main.tsx
```

---

## 9. Running in Production

### Build Production Bundle
```bash
npm run build
```

### Preview Build
```bash
npm run preview
```

---

## 10. License
This project is for evaluation purposes only.
