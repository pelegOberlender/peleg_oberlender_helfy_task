import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import TaskFilter from './components/TaskFilter';
import './styles/App.css';

import {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} from './services/taskService';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Load the tasks once when the application starts.
  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();
        setTasks(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }

    loadTasks();
  }, []);

  // Create a new task or update the task currently being edited.
  async function handleSaveTask(taskData) {
    try {
      setError('');

      if (editingTask) {
        const updatedTask = await updateTask(editingTask.id, {
          ...editingTask,
          ...taskData
        });

        setTasks((currentTasks) =>
          currentTasks.map((task) =>
            task.id === updatedTask.id ? updatedTask : task
          )
        );

        setEditingTask(null);
      } else {
        const newTask = await createTask(taskData);

        // Add the new task to the existing tasks.
        setTasks((currentTasks) => [
          ...currentTasks,
          newTask
        ]);
      }

      return true;
    } catch (error) {
      setError(error.message);
      return false;
    }
  }

  // Toggle the completed status of a task.
  async function handleToggleTask(id) {
    try {
      setError('');

      const updatedTask = await toggleTask(id);

      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === updatedTask.id ? updatedTask : task
        )
      );
    } catch (error) {
      setError(error.message);
    }
  }
  
  // Delete a task from the backend and from the local state.
  async function handleDeleteTask(id) {
    try {
      setError('');

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );

      // Close the edit form if the deleted task was being edited.
      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }
  
  // Send the selected task to the form for editing.
  function handleEditTask(task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  // Show only the tasks that match the selected filter.
  const filteredTasks = tasks.filter((task) => {
    if (filter === 'pending') {
      return !task.completed;
    }

    if (filter === 'completed') {
      return task.completed;
    }

    return true;
  });

  if (loading) {
    return <p>Loading tasks...</p>;
  }

  return (
    <main className="app">
      <h1>Task Manager</h1>

      {error && (
        <p className="error" role="alert">
          {error}
        </p>
      )}

      <TaskForm
        editingTask={editingTask}
        onSave={handleSaveTask}
        onCancel={handleCancelEdit}
      />

      <TaskFilter
        filter={filter}
        onFilterChange={setFilter}
      />

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
      />
    </main>
  );
}