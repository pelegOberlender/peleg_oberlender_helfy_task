export default function TaskItem({
    task,
    onEdit,
    onDelete,
    onToggle
}) {
    function handleDelete() {
        const shouldDelete = window.confirm(
            `Are you sure you want to delete "${task.title}"?`
        );

        if (shouldDelete) {
            onDelete(task.id);
        }
    }

  return (
    <article className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <h3>{task.title}</h3>

        <span className={`priority priority-${task.priority}`}>
          {task.priority}
        </span>
      </div>

      {task.description && (
        <p className="task-description">{task.description}</p>
      )}

      <p className="task-date">
        Created: {new Date(task.createdAt).toLocaleDateString()}
      </p>

      <div className="task-actions">
        <button
          type="button"
          onClick={() => onToggle(task.id)}
        >
          {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
        </button>

        <button
          type="button"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          type="button"
          onClick={handleDelete}
        >
          Delete
        </button>
      </div>
    </article>
  );
}