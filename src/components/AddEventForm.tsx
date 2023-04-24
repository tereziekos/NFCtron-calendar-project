import React, { useState } from 'react';

interface Event {
  name: string;
  startTime: Date;
  endTime: Date;
  color?: string;
}

interface AddEventFormProps {
  selectedDay: Date | null;
  onAddEvent: (event: Event) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({ selectedDay, onAddEvent }) => {
  const [name, setName] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [color, setColor] = useState('');

  if (!selectedDay) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (name && startTime && endTime) {
      onAddEvent({
        name,
        startTime: new Date(startTime),
        endTime: new Date(endTime),
        color,
      });

      // Reset form fields
      setName('');
      setStartTime('');
      setEndTime('');
      setColor('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="ml-2"
        />
      </label>
      <label>
        Start Time:
        <input
          type="datetime-local"
          value={startTime}
          onChange={(e) => setStartTime(e.target.value)}
          required
          className="ml-2"
        />
      </label>
      <label>
        End Time:
        <input
          type="datetime-local"
          value={endTime}
          onChange={(e) => setEndTime(e.target.value)}
          required
          className="ml-2"
        />
      </label>
      <label>
        Color:
        <input
          type="color"
          value={color}
          onChange={(e) => setColor(e.target.value)}
          className="ml-2"
        />
      </label>
      <button type="submit" className="mt-4">
        Add Event
      </button>
    </form>
  );
};

export default AddEventForm;