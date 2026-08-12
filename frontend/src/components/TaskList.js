import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
  tasks,
  onEdit,
  onDelete,
  onToggle
}) {
  const [currentIndex, setCurrentIndex] = useState(
    tasks.length > 1 ? 1 : 0
  );
  const [transitionEnabled, setTransitionEnabled] = useState(true);
  const [isAnimating, setIsAnimating] = useState(false);

  const carouselTasks =
    tasks.length > 1
      ? [tasks[tasks.length - 1], ...tasks, tasks[0]]
      : tasks;

  useEffect(() => {
    setTransitionEnabled(false);
    setCurrentIndex(tasks.length > 1 ? 1 : 0);
    setIsAnimating(false);
  }, [tasks]);

  function handleNext() {
    if (tasks.length <= 1 || isAnimating) {
      return;
    }

    setTransitionEnabled(true);
    setIsAnimating(true);
    setCurrentIndex((index) => index + 1);
  }

  function handlePrevious() {
    if (tasks.length <= 1 || isAnimating) {
      return;
    }

    setTransitionEnabled(true);
    setIsAnimating(true);
    setCurrentIndex((index) => index - 1);
  }

  function handleTransitionEnd() {
    if (currentIndex === 0) {
      setTransitionEnabled(false);
      setCurrentIndex(tasks.length);
    } else if (currentIndex === tasks.length + 1) {
      setTransitionEnabled(false);
      setCurrentIndex(1);
    }

    setIsAnimating(false);
  }

  if (tasks.length === 0) {
    return (
      <p className="empty-message">
        No tasks to display.
      </p>
    );
  }

  return (
    <section className="task-list">
      <h2>Tasks</h2>

      <div className="carousel">
        <div
          className="carousel-track"
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            transition: transitionEnabled
              ? 'transform 0.4s ease'
              : 'none'
          }}
        >
          {carouselTasks.map((task, index) => (
            <div
              className="carousel-slide"
              key={`${task.id}-${index}`}
            >
              <TaskItem
                task={task}
                onEdit={onEdit}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            </div>
          ))}
        </div>
      </div>

      {tasks.length > 1 && (
        <div className="carousel-controls">
          <button
            type="button"
            onClick={handlePrevious}
            aria-label="Previous task"
          >
            Previous
          </button>

          <button
            type="button"
            onClick={handleNext}
            aria-label="Next task"
          >
            Next
          </button>
        </div>
      )}
    </section>
  );
}