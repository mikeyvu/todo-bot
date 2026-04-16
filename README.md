# Todo Bot

A full-stack task management application built with React, Express, and MongoDB.

## Overview

Todo Bot helps users manage daily tasks with a clean UI and practical filtering options.
It supports:

- Creating, updating, and deleting tasks
- Task status tracking (`active` or `complete`)
- Time-based filtering (`today`, `week`, `month`, `all`)
- Status-based filtering (`all`, `active`, `completed`)
- Paginated task list view

## Tech Stack

### Frontend

- React (Vite)
- Axios
- Tailwind CSS
- shadcn/ui components
- Sonner (toast notifications)

### Backend

- Node.js + Express
- MongoDB + Mongoose

## Project Structure

```text
todo-bot/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |   |-- db.js
|   |   |-- controller/
|   |   |   |-- taskControllers.js
|   |   |-- models/
|   |   |   |-- Task.js
|   |   |-- routes/
|   |   |   |-- tasksRouters.js
|   |   |-- server.js
|   |-- package.json
|-- frontend/
|   |-- src/
|   |-- package.json
|-- package.json
```

## Prerequisites

- Node.js 18+ (Node.js 22 recommended)
- npm 9+
- MongoDB connection string (Atlas or local)

## Environment Variables

Create a `.env` file inside `backend/`:

```env
MONGODB_CONNECTIONSTRING=your_mongodb_connection_string
PORT=5001
NODE_ENV=development
```

Notes:

- `PORT` defaults to `5001` if omitted.
- In production, set `NODE_ENV=production` so Express serves the built frontend.

## Installation

From the repository root:

```bash
npm install --prefix backend
npm install --prefix frontend
```

## Run Locally

Start backend (Terminal 1):

```bash
npm run dev --prefix backend
```

Start frontend (Terminal 2):

```bash
npm run dev --prefix frontend
```

Default local URLs:

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001/api`

## Available Scripts

From root:

- `npm run build`
	- Installs dependencies in backend/frontend and builds frontend.
- `npm run start`
	- Starts backend server (`backend/src/server.js`).

Backend:

- `npm run dev --prefix backend` - Start backend with nodemon
- `npm run start --prefix backend` - Start backend with node

Frontend:

- `npm run dev --prefix frontend` - Start Vite dev server
- `npm run build --prefix frontend` - Production build
- `npm run preview --prefix frontend` - Preview production build
- `npm run lint --prefix frontend` - Lint frontend code

## API Reference

Base URL:

- Local: `http://localhost:5001/api`
- Production: `/api`

Endpoints:

### GET `/tasks`

Returns tasks and aggregate counts.

Query params:

- `filter`: `today | week | month | all` (default: `today`)

Response shape:

```json
{
	"tasks": [],
	"activeCount": 0,
	"completeCount": 0
}
```

### POST `/tasks`

Create a new task.

Request body:

```json
{
	"title": "My new task"
}
```

### PUT `/tasks/:id`

Update a task.

Request body (example):

```json
{
	"title": "Updated title",
	"status": "complete",
	"completedAt": "2026-04-16T12:00:00.000Z"
}
```

### DELETE `/tasks/:id`

Delete a task by id.

## Deployment

This project is configured so the backend can serve the built frontend in production.

Typical flow:

1. Build frontend.
2. Start backend.
3. Backend serves static files from `frontend/dist` when `NODE_ENV=production`.

If deploying to Render or similar providers:

- Ensure `frontend/` is a normal tracked folder in this repository (not a Git submodule).
- Build command: `npm run build`
- Start command: `npm run start`
- Add required environment variables (`MONGODB_CONNECTIONSTRING`, `NODE_ENV`, `PORT` if needed).

## Troubleshooting

- `ENOENT ... frontend/package.json` during deploy:
	- Usually means `frontend/` was committed as a submodule pointer instead of normal files.
- Database connection failure:
	- Verify `MONGODB_CONNECTIONSTRING` is valid and accessible from your runtime environment.
- CORS issues in development:
	- Frontend should run on allowed origins configured in backend (`localhost:5173` / `localhost:5174`).

## License

ISC
