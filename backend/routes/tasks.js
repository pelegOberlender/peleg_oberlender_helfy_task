const express = require('express');
const router = express.Router();

const VALID_PRIORITIES = ['low', 'medium', 'high'];

let tasks = [] 

// GET /api/tasks - return all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});

router.post('/', (req, res) => {
    const {title, description, priority} = req.body;

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }

})

router.post('/', (req, res) => {
    const {title, description, priority} = req.body;

    if (typeof title !== 'string' || !title.trim()) {
        return res.status(400).json({ error: 'Title is required' });
    }

    if ( description !== undefined && typeof description !== 'string') {
        return res.status(400).json({ error: 'Title is required' });
    }

    const taskPriority = priority || 'medium';
    if (!VALID_PRIORITIES.includes(taskPriority)) {
        return res.status(400).json({ error: 'Priority must be low, medium, or high' });
    }

    const newTask = {
        id: nextId++,
        title: title.trim(),
        description: description ? description.trim() : '',
        completed: false,
        createdAt: new Date().toISOString(),
        priority: taskPriority
    };

    tasks.push(newTask);
    res.status(201).json(newTask);
});
