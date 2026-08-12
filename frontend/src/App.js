import { useEffect, useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';

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

        setTasks((currentTasks) => [
          ...currentTasks,
          newTask
        ]);
      }
    } catch (error) {
      setError(error.message);
    }
  }

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

  async function handleDeleteTask(id) {
    try {
      setError('');

      await deleteTask(id);

      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== id)
      );

      if (editingTask?.id === id) {
        setEditingTask(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  function handleEditTask(task) {
    setEditingTask(task);
  }

  function handleCancelEdit() {
    setEditingTask(null);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === 'active') {
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

      <div className="filters">
        <button
          type="button"
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>

        <button
          type="button"
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>

        <button
          type="button"
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggle={handleToggleTask}
      />
    </main>
  );
}