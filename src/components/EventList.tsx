import React from 'react';
import { Clock, Edit, Trash2, AlertCircle } from 'lucide-react';
import { Event } from '../types';
import { formatTime } from '../utils/dateUtils';

interface EventListProps {
  events: Event[];
  selectedDate: Date;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (eventId: string) => void;
}

const EventList: React.FC<EventListProps> = ({ 
  events, 
  selectedDate, 
  onEditEvent, 
  onDeleteEvent 
}) => {
  const getPriorityIcon = (priority: Event['priority']) => {
    switch (priority) {
      case 'high':
        return <AlertCircle className="w-4 h-4 text-red-500" />;
      case 'medium':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'low':
        return <Clock className="w-4 h-4 text-green-500" />;
    }
  };

  const getCategoryColor = (category: Event['category']) => {
    switch (category) {
      case 'work':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'personal':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'health':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'other':
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const sortedEvents = [...events].sort((a, b) => {
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">
          Events for {selectedDate.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric' 
          })}
        </h3>
        <p className="text-sm text-gray-500 mt-1">
          {events.length} {events.length === 1 ? 'event' : 'events'}
        </p>
      </div>

      <div className="flex-1 overflow-y-auto">
        {sortedEvents.length === 0 ? (
          <div className="p-4 text-center text-gray-500">
            <Clock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p>No events scheduled</p>
            <p className="text-sm">Click "Add Event" to create one!</p>
          </div>
        ) : (
          <div className="p-4 space-y-3">
            {sortedEvents.map(event => (
              <div
                key={event.id}
                className={`
                  p-4 rounded-lg border-2 transition-all duration-200 hover:shadow-md animate-slideUp
                  ${getCategoryColor(event.category)}
                `}
              >
                <div className="flex items-start justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-semibold text-gray-900">{event.title}</h4>
                    {getPriorityIcon(event.priority)}
                  </div>
                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => onEditEvent(event)}
                      className="p-1 text-gray-500 hover:text-blue-600 transition-colors"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteEvent(event.id)}
                      className="p-1 text-gray-500 hover:text-red-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                  <Clock className="w-4 h-4" />
                  <span>
                    {formatTime(event.startTime)} - {formatTime(event.endTime)}
                  </span>
                </div>

                {event.description && (
                  <p className="text-sm text-gray-700 mt-2">{event.description}</p>
                )}

                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs font-medium px-2 py-1 rounded-full bg-white bg-opacity-50">
                    {event.category.charAt(0).toUpperCase() + event.category.slice(1)}
                  </span>
                  <span className="text-xs text-gray-600 capitalize">
                    {event.priority} priority
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EventList;