const express = require('express');
const router = express.Router();

const VALID_PRIORITIES = ['low', 'medium', 'high'];

// In-memory storage. Tasks are cleared whenever the server restarts.
let tasks = [] 

// GET /api/tasks - Return all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

// POST /api/tasks - Create a new task
router.post('/', (req, res) => {
    const {title, description, priority} = req.body;

    // A task must have a non-empty title
    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }

    // Description is optional, but must be text when provided
    if ( description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be text' });
    }

    // Use medium priority when no priority is provided
    const taskPriority = priority || 'medium';
    if (!VALID_PRIORITIES.includes(taskPriority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const newTask = {
        id: Date.now(),
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        createdAt: new Date().toISOString(),
        priority: taskPriority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});

// PUT /api/tasks/:id - Update an existing task
router.put('/:id',(req, res) => {
    const id = Number(req.params.id);
    const task = tasks.find((task) => task.id === id)

    if (!task) {
        return res.status(404).json({ error: 'Task not found' });
    }

    const {title, description, priority, completed} = req.body

    if (title !== undefined && (typeof title !== 'string' || !title.trim())) {
        return res.status(400).json({ error: 'Title cannot be empty' });
    }

    if (description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'Description must be text' });
    }

    if (priority !== undefined && !VALID_PRIORITIES.includes(priority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    if (completed !== undefined && typeof completed !== 'boolean') {
        return res.status(400).json({ error: 'Completed must be true or false' });
    }

    // Update only fields that were included in the request
    if (title !== undefined) task.title = title.trim();
    if (description !== undefined) task.description = description.trim();
    if (priority !== undefined) task.priority = priority;
    if (completed !== undefined) task.completed = completed;

    res.status(200).json(task);
});

// DELETE /api/tasks/:id - Delete a task
router.delete('/:id',(req, res) => {
    const id = Number(req.params.id)

    const idx = tasks.findIndex((task) => task.id === id);
    if (idx === -1) {
        return res.status(404).json({ error: 'Task not found' });
    }

    tasks.splice(idx, 1);
    res.status(200).json({ message: 'Task deleted' });
})

// PATCH /api/tasks/:id/toggle - Toggle completion status
router.patch('/:id/toggle', (req, res) => {
  const id = Number(req.params.id);
  const task = tasks.find((t) => t.id === id);

  if (!task) {
    return res.status(404).json({ error: 'Task not found' });
  }

  task.completed = !task.completed;
  res.status(200).json(task);
});

module.exports = router;
