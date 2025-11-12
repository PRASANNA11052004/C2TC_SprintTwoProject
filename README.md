# Employee Frontend (React)

Simple React + Vite frontend to interact with the Spring Boot Employee service.

Prerequisites
- Node.js (16+ recommended)

Install & run

```powershell
cd "c:\Users\prasa\OneDrive\Desktop\Final project\frontend"
npm install
npm run dev
```

Open http://localhost:5173 (Vite default). The frontend talks to the backend at http://localhost:8080 (CORS must be enabled - backend already contains CORS config for http://localhost:3000; for development you can change allowed origin to http://localhost:5173 or use a proxy).

Notes
- Backend endpoints used:
  - GET  /api/Employees
  - GET  /employeeservice/{id}
  - POST /employeeservice
  - PUT  /employeeservice/{id}
  - DELETE /employeeservice/{id}

If CORS blocks requests, either update the backend allowed origin to http://localhost:5173 or start the frontend on port 3000 (e.g., using CRA) or use a dev proxy.
