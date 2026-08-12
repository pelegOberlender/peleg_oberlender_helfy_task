import { useEffect, useState } from 'react';

export default function TaskForm({ editingTask, onSave, onCancel }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('medium');
  const [formError, setFormError] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setPriority(editingTask.priority);
    } else {
      resetForm();
    }
  }, [editingTask]);

  function resetForm() {
    setTitle('');
    setDescription('');
    setPriority('medium');
    setFormError('');
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (!title.trim()) {
      setFormError('Title is required');
      return;
    }

    setFormError('');

    const savedSuccessfully = await onSave({
      title: title.trim(),
      description: description.trim(),
      priority
    });

    if (savedSuccessfully) {
      resetForm();
    }
  }

  function handleCancel() {
    resetForm();
    onCancel();
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h2>{editingTask ? 'Edit Task' : 'Add New Task'}</h2>

      {formError && (
        <p className="form-error" role="alert">
          {formError}
        </p>
      )}

      <label htmlFor="title">Title</label>
      <input
        id="title"
        type="text"
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        placeholder="Enter task title"
      />

      <label htmlFor="description">Description</label>
      <textarea
        id="description"
        value={description}
        onChange={(event) => setDescription(event.target.value)}
        placeholder="Enter task description"
        rows="3"
      />

      <label htmlFor="priority">Priority</label>
      <select
        id="priority"
        value={priority}
        onChange={(event) => setPriority(event.target.value)}
      >
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>

      <div className="form-actions">
        <button type="submit">
          {editingTask ? 'Save Changes' : 'Add Task'}
        </button>

        {editingTask && (
          <button type="button" onClick={handleCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}