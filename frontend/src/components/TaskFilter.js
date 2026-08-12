export default function TaskFilter({ filter, onFilterChange }) {
  return (
    <div className="filters">
      <button
        type="button"
        onClick={() => onFilterChange('all')}
        className={filter === 'all' ? 'active' : ''}
      >
        All
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('pending')}
        className={filter === 'pending' ? 'active' : ''}
      >
        Pending
      </button>

      <button
        type="button"
        onClick={() => onFilterChange('completed')}
        className={filter === 'completed' ? 'active' : ''}
      >
        Completed
      </button>
    </div>
  );
}