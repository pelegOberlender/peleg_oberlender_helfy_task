# Task Manager App

A full-stack task manager built with React, Express.js, and Node.js.

The application allows users to create, edit, delete, filter, and mark tasks as completed. Tasks are displayed in an animated endless carousel.

## Technologies

- React
- Express.js
- Node.js
- Regular CSS
- In-memory data storage

## Project Structure

```text
task-manager/
├── backend/
│   ├── middleware/
│   ├── routes/
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── services/
│   │   └── styles/
│   └── package.json
├── .gitignore
└── README.md
```

## Backend Setup

```bash
cd backend
npm install
npm start
```

The backend runs on:

```text
http://localhost:4000
```

For development with automatic restart:

```bash
npm run dev
```

## Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm start
```

The frontend normally runs on:

```text
http://localhost:3000
```

Both servers need to run at the same time.

## API Endpoints

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/api/tasks` | Get all tasks |
| POST | `/api/tasks` | Create a task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle completion status |

### Task Structure

```json
{
  "id": 1234,
  "title": "Add README.md",
  "description": "",
  "completed": false,
  "createdAt": "2026-08-12T10:00:00.000Z",
  "priority": "high"
}
```

## Features

- Create and edit tasks
- Delete tasks with confirmation
- Mark tasks as completed or pending
- Filter by all, pending, or completed tasks
- Display task priority using colored badges
- Animated endless carousel
- Loading and error messages
- Responsive layout for desktop and mobile
- Input validation on both frontend and backend

## Endless Carousel

The carousel was implemented with React and CSS.

Copies of the first and last tasks are added to the carousel. After reaching a copied task, the carousel moves to the matching original task without a transition. This creates a continuous loop without a visible jump.

The carousel also handles empty lists, one task, filtering, and repeated button clicks during an animation.

## Validation

A title is required when creating a task. The backend also validates the description, priority, and completed fields and returns meaningful HTTP status codes for invalid requests or missing tasks.

## Design Decisions

- Tasks are stored in memory as required, so they are removed when the backend restarts.
- The same form is used for creating and editing tasks.
- API requests are kept in a separate service file.
- The application uses regular CSS without a UI framework.
- The implementation focuses on the required features without adding unnecessary dependencies.

## Time Spent

- Backend API: approximately 90 minutes
- Frontend and carousel: approximately 120 minutes
- Styling and responsive design: approximately 30 minutes
- Testing and fixes: approximately 30 minutes

