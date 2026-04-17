# Todo Bot

A side project I built to get hands-on experience with shadcn/ui, and Tailwind CSS for cleaner and more maintainable class composition in reusable UI components.

I used the MERN stack (MongoDB, Express, React, Node.js) to build and connect the full application end to end.

Next stage: implement user authentication for a personalized to-do experience and integrate a RAG assistant to help users build smarter daily task plans.

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

## Next Stage

Planned improvements for the next version:

- User authentication and personalized data
	- Implement sign up, login, and logout.
	- Add protected routes and per-user task ownership so each user sees only their own task list using JWT (access token) + hashed passwords (bcrypt) + auth middleware in Express.

- RAG assistant for daily planning
	- Integrate a Retrieval-Augmented Generation workflow to help users generate and refine daily task plans.
	- Use user context (existing tasks, priorities, due dates, completion history) as retrieval input.
	- Return actionable suggestions such as time-blocked schedules, priority ordering, and focus recommendations.
	- Add user controls to accept, edit, or dismiss AI-generated tasks before saving.
    
