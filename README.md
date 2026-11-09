# Cafe Me

A cafe website with a React + Vite frontend and a Node/TypeScript backend.

## Run it locally

### 1. Backend
```bash
cd backend
npm install
npm run dev
```
Runs at http://localhost:5000

> Create a `.env` file in `backend` with your own settings (see `.env.example`).

### 2. Frontend
In a second terminal:
```bash
cd my-react-app
npm install
npm run dev
```
Open http://localhost:5173

## Project structure
- `my-react-app/` — frontend (React + Vite)
- `backend/` — server (Express, auth routes, seed data)
