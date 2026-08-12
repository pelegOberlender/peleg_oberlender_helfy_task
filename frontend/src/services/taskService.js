const API_URL = 'http://localhost:4000/api/tasks';

// Helper to extract error message from response
async function parseErrorMessage(response, fallbackMessage) {
  try {
    const data = await response.json();
    return data.error || fallbackMessage;
  } catch {
    return fallbackMessage;
  }
}

// Get all tasks
export async function getTasks() {
  const response = await fetch(API_URL);
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Failed to load tasks'));
  }
  return response.json();
}

// Create a new task
export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Failed to create task'));
  }
  return response.json();
}

// Update existing task by ID
export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Failed to update task'));
  }
  return response.json();
}

// Delete task by ID
export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Failed to delete task'));
  }
  return response.json();
}

// Toggle completed status
export async function toggleTask(id) {
  const response = await fetch(`${API_URL}/${id}/toggle`, { 
    method: 'PATCH' 
  });
  if (!response.ok) {
    throw new Error(await parseErrorMessage(response, 'Failed to toggle task'));
  }
  return response.json();
}