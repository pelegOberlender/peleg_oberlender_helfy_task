const API_URL = 'http://localhost:4000/api/tasks';

// Helper function to handle both JSON parsing and errors in one place
async function handleResponse(res) {
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    const message = data.error || (data.errors && data.errors.join(', ')) || 'Request failed';
    throw new Error(message);
  }
  return data;
}

// Get all tasks
export async function getTasks() {
  const response = await fetch(API_URL);
  return handleResponse(response);  
}

// Create a new task
export async function createTask(task) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(task)
  });
  return handleResponse(response);
}

// Update existing task by ID
export async function updateTask(id, updates) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(updates)
  });
  return handleResponse(response);
}

// Delete task by ID
export async function deleteTask(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: 'DELETE'
  });
  return handleResponse(response);
}

// Toggle completed status
export async function toggleTask(id) {
  const response = await fetch(`${API_URL}/${id}/toggle`, { 
    method: 'PATCH' 
  });
  return handleResponse(response);
}