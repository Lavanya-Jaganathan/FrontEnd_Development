import React from 'react';
import { Check, Trash2, Clock, AlertCircle } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask, onDeleteTask }) => {
  const getPriorityIcon = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Clock className="w-4 h-4 text-green-500" />;
    }
  };

  const getCategoryColor = (category: Task['category']) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800';
      case 'personal':
        return 'bg-green-100 text-green-800';
      case 'health':
        return 'bg-red-100 text-red-800';
      case 'other':
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
        <p>No tasks for today</p>
        <p className="text-sm">Add a task to get started!</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-3">
      {tasks.map(task => (
        <div
          key={task.id}
          className={`
            p-3 rounded-lg border transition-all duration-200 animate-slideUp
            ${task.completed 
              ? 'bg-gray-50 border-gray-200 opacity-75' 
              : 'bg-white border-gray-200 hover:shadow-md'
            }
          `}
        >
          <div className="flex items-start space-x-3">
            <button
              onClick={() => onToggleTask(task.id)}
              className={`
                mt-0.5 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors
                ${task.completed
                  ? 'bg-green-500 border-green-500 text-white'
                  : 'border-gray-300 hover:border-green-400'
                }
              `}
            >
              {task.completed && <Check className="w-3 h-3" />}
            </button>

            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h3 className={`
                  font-medium text-sm
                  ${task.completed ? 'line-through text-gray-500' : 'text-gray-900'}
                `}>
                  {task.title}
                </h3>
                {getPriorityIcon(task.priority)}
              </div>

              <div className="flex items-center space-x-2">
                <span className={`
                  text-xs px-2 py-1 rounded-full font-medium
                  ${getCategoryColor(task.category)}
                `}>
                  {task.category}
                </span>
                {task.dueDate && (
                  <span className="text-xs text-gray-500">
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-1 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TaskList;