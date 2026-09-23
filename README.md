# Todo Bot

A side project I built to get hands-on experience with shadcn/ui, and Tailwind CSS for cleaner and more maintainable class composition in reusable UI components.

I used the MERN stack (MongoDB, Express, React, Node.js) to build and connect the full application end to end.

Next stage: integrate a RAG assistant to help users build smarter daily task plans.

## Overview

Todo Bot helps users manage daily tasks with a clean UI while exploring component-driven styling and frontend architecture.
It supports:

- Sign in with Google, with each user seeing only their own tasks
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
- `@react-oauth/google` (Google Identity Services sign-in button)

### Backend

- Node.js + Express
- MongoDB + Mongoose
- `google-auth-library` (verifies Google ID tokens)
- `jsonwebtoken` + `cookie-parser` (app session, httpOnly cookie)

## Project Structure

```text
todo-bot/
|-- backend/
|   |-- src/
|   |   |-- config/
|   |   |   |-- db.js
|   |   |   |-- google.js
|   |   |   |-- jwt.js
|   |   |-- controller/
|   |   |   |-- authControllers.js
|   |   |   |-- taskControllers.js
|   |   |-- middleware/
|   |   |   |-- protectRoute.js
|   |   |-- models/
|   |   |   |-- Task.js
|   |   |   |-- User.js
|   |   |-- routes/
|   |   |   |-- authRouters.js
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

Copy `backend/.env.example` to `backend/.env` and fill in real values:

```env
MONGODB_CONNECTIONSTRING=your_mongodb_connection_string
PORT=5001
NODE_ENV=development

GOOGLE_CLIENT_ID=your_google_oauth_client_id
# Not used by the current sign-in flow (no auth code is exchanged); kept for
# a possible future server-side redirect flow.
GOOGLE_CLIENT_SECRET=your_google_oauth_client_secret
JWT_SECRET=a_long_random_string
```

Copy `frontend/.env.example` to `frontend/.env`:

```env
VITE_GOOGLE_CLIENT_ID=your_google_oauth_client_id
```

Notes:

- `PORT` defaults to `5001` if omitted.
- In production, set `NODE_ENV=production` so Express serves the built frontend and marks the session cookie `Secure`.
- `GOOGLE_CLIENT_ID`, `JWT_SECRET`, and `MONGODB_CONNECTIONSTRING` are required — the server refuses to start without them.
- Get a Google Client ID from [Google Cloud Console](https://console.cloud.google.com) → APIs & Services → Credentials → Create Credentials → OAuth client ID (Web application). Add your dev and prod origins under **Authorized JavaScript origins**; no redirect URI is needed.
- `JWT_SECRET` can be generated with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`.

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

- RAG assistant for daily planning
	- Integrate a Retrieval-Augmented Generation workflow to help users generate and refine daily task plans.
	- Use user context (existing tasks, priorities, due dates, completion history) as retrieval input.
	- Return actionable suggestions such as time-blocked schedules, priority ordering, and focus recommendations.
	- Add user controls to accept, edit, or dismiss AI-generated tasks before saving.
    
