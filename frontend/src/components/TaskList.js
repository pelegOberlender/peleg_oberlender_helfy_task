import { useEffect, useState } from 'react';
import TaskItem from './TaskItem';

export default function TaskList({
    tasks,
    onEdit,
    onDelete,
    onToggle
}) {
    // When there are multiple tasks, index 0 is a cloned task.
    // The first real task is therefore at index 1.
    const [currentIndex, setCurrentIndex] = useState(
        tasks.length > 1 ? 1 : 0
    );
    const [transitionEnabled, setTransitionEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);

    // Add clones of the last and first tasks to create an infinite loop effect.
    const carouselTasks =
        tasks.length > 1
        ? [tasks[tasks.length - 1], ...tasks, tasks[0]]
        : tasks;

    // Reset the carousel whenever the tasks change.
    useEffect(() => {
        setTransitionEnabled(false);
        setCurrentIndex(tasks.length > 1 ? 1 : 0);
        setIsAnimating(false);
    }, [tasks]);

    // Prevent navigation when there is only one task
    // or while the current transition is still running.
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
        // If we reached the cloned last task, jump to the real last task.
        if (currentIndex === 0) {
            setTransitionEnabled(false);
            setCurrentIndex(tasks.length);
        // If we reached the cloned first task, jump to the real first task.
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