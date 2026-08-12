const express = require('express');
const cors = require('cors');
const taskRoutes = require('./routes/tasks');
const errorHandler = require('./middleware/errorHandler');

const app = express(); 
const PORT = 4000;

// Allow requests from the React frontend
app.use(cors());
// Parse incoming JSON request bodies
app.use(express.json());

// Handle all task-related API requests
app.use('/api/tasks', taskRoutes);

// Basic route to verify that the server is running
app.get('/', (req, res) => {
  res.send('Task Manager API is running!');
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.use(errorHandler);
// Start the backend server
app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}`);
});