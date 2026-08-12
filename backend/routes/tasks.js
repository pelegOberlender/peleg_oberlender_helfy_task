const express = require('express');
const router = express.Router();

const VALID_PRIORITIES = ['low', 'medium', 'high'];

let tasks = [] 

// GET /api/tasks - return all tasks
router.get('/', (req, res) => {
  res.status(200).json(tasks);
});