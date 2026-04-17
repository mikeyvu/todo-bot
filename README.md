# Todo Bot

A side project I built to get hands-on experience with shadcn/ui, and Tailwind CSS for cleaner and more maintainable class composition in reusable UI components.

I used the MERN stack (MongoDB, Express, React, Node.js) to build and connect the full application end to end.

## Overview

Todo Bot helps users manage daily tasks with a clean UI while exploring component-driven styling and frontend architecture.
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

## Next Stage

Planned improvements for the next version:

- User authentication and personalized data
	- Implement sign up, login, and logout.
	- Add protected routes and per-user task ownership so each user sees only their own task list.
	- Suggested stack: JWT (access token) + hashed passwords (bcrypt) + auth middleware in Express.

- RAG assistant for daily planning
	- Integrate a Retrieval-Augmented Generation workflow to help users generate and refine daily task plans.
	- Use user context (existing tasks, priorities, due dates, completion history) as retrieval input.
	- Return actionable suggestions such as time-blocked schedules, priority ordering, and focus recommendations.
	- Add user controls to accept, edit, or dismiss AI-generated tasks before saving.

## License

ISC
