import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import Calendar from './components/Calendar';
import { Event, Task } from './types';
import { useLocalStorage } from './hooks/useLocalStorage';
import { generateId } from './utils/dateUtils';

function App() {
  const [events, setEvents] = useLocalStorage<Event[]>('calendar-events', []);
  const [tasks, setTasks] = useLocalStorage<Task[]>('calendar-tasks', []);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleAddEvent = (eventData: Omit<Event, 'id'>) => {
    const newEvent: Event = {
      ...eventData,
      id: generateId(),
    };
    setEvents(prev => [...prev, newEvent]);
  };

  const handleUpdateEvent = (eventId: string, eventData: Omit<Event, 'id'>) => {
    setEvents(prev => prev.map(event => 
      event.id === eventId ? { ...eventData, id: eventId } : event
    ));
  };

  const handleDeleteEvent = (eventId: string) => {
    setEvents(prev => prev.filter(event => event.id !== eventId));
  };

  const handleAddTask = (taskData: Omit<Task, 'id'>) => {
    const newTask: Task = {
      ...taskData,
      id: generateId(),
    };
    setTasks(prev => [...prev, newTask]);
  };

  const handleToggleTask = (taskId: string) => {
    setTasks(prev => prev.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  };

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar 
        tasks={tasks}
        onAddTask={handleAddTask}
        onToggleTask={handleToggleTask}
        onDeleteTask={handleDeleteTask}
      />
      <div className="flex-1 overflow-hidden">
        <Calendar 
          events={events}
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          onAddEvent={handleAddEvent}
          onUpdateEvent={handleUpdateEvent}
          onDeleteEvent={handleDeleteEvent}
        />
      </div>
    </div>
  );
}

export default App;