import React, { useState } from "react";
import AddEventForm from "./AddEventForm";
import EventItem from "./EventItem";
import { nanoid } from 'nanoid';

interface Event {
  name: string;
  startTime: Date;
  endTime: Date;
  color?: string;
}

interface CalendarProps {
  events: Event[];
}

const getLocalTimezoneDate = (dateString: string) => {
  const date = new Date(dateString);
  const timezoneOffset = date.getTimezoneOffset() * 60000; // Convert minutes to milliseconds
  const localDate = new Date(date.getTime() - timezoneOffset);
  return localDate;
};

const getStartDate = (date: Date) => {
  const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
  const dayOfWeek = firstDayOfMonth.getDay() || 7; // Monday is 1, Sunday is 7
  const startDate = new Date(firstDayOfMonth);
  startDate.setDate(startDate.getDate() - dayOfWeek + 1);
  return startDate;
};

const Calendar: React.FC<CalendarProps> = ({ events }) => {
  const [calendarEvents, setCalendarEvents] = useState<Event[]>(events);
  const currentDate = new Date(); // You can use a state to manage the current date
  const startDate = getStartDate(currentDate);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) => (currentMonth === 0 ? prevYear - 1 : prevYear));
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) => (currentMonth === 11 ? prevYear + 1 : prevYear));
  };


  const handleAddEvent = (event: Event) => {
    setCalendarEvents([...calendarEvents, { ...event, id: nanoid() }]);
    setSelectedDay(null);
    setShowForm(false);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return date.getDate() === today.getDate() &&
           date.getMonth() === today.getMonth() &&
           date.getFullYear() === today.getFullYear();
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setCalendarEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.id === updatedEvent.id
          ? { ...event, ...updatedEvent }
          : event
      )
    );
    setShowForm(false); // Hide the form after editing
    setEditingEvent(null); // Reset the editingEvent state
  };

  const handleDeleteEvent = (eventToDelete: Event) => {
    setCalendarEvents((prevEvents) =>
      prevEvents.filter((event) =>
        !(event.name === eventToDelete.name &&
          event.startTime.getTime() === eventToDelete.startTime.getTime() &&
          event.endTime.getTime() === eventToDelete.endTime.getTime())
      )
    );
  };

  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>) => {
    console.log('drag ended');
  };

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, event: Event) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(event));
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const eventJson = e.dataTransfer.getData("text/plain");
    const event = JSON.parse(eventJson);
    const currentCellDate = e.currentTarget.dataset.date; // get the date as a string
    if (currentCellDate) {
      const newEvents = calendarEvents.map((ev) => {
        if (ev.id === event.id) {
          ev.startTime = new Date(currentCellDate);
          ev.endTime = new Date(currentCellDate);
        }
        return ev;
      });
      setCalendarEvents(newEvents);
    }
  };

  const handleDayDoubleClick = (date: Date) => {
    setSelectedDay(date);
    setShowForm(true);
  };
  

  const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const renderCalendarCells = () => {
    const startDate = new Date(currentYear, currentMonth, 1);
    const endDate = new Date(currentYear, currentMonth + 1, 0);
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const currentCellDate = new Date(startDate);
      currentCellDate.setDate(currentCellDate.getDate() + i);
  
      const isToday = currentCellDate.toDateString() === new Date().toDateString(); // Check if this cell represents today's date
  
      const dayEvents = calendarEvents.filter((event) => {
        const eventStartTime = new Date(event.startTime);
        const eventEndTime = new Date(event.endTime);
        return (
          eventStartTime.getDate() === currentCellDate.getDate() &&
          eventStartTime.getMonth() === currentCellDate.getMonth() &&
          eventStartTime.getFullYear() === currentCellDate.getFullYear()
        );
      });
  
      cells.push(
        <div
          key={i}
          className={`h-full border border-brown-300 p-2.5 rounded-lg shadow-md ${isToday ? 'bg-[#ffe4cb95]' : ''}`}
          onDoubleClick={() => handleDayDoubleClick(currentCellDate)}
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          data-date={currentCellDate.toISOString()}
        >
          <div className={`font-semibold ${isToday ? 'bg-[#FFB067] text-white rounded-full w-8 h-8 flex items-center justify-center' : ''}`}>{currentCellDate.getDate()}</div>
          {dayEvents.map((event) => (
            <div
              key={event.name}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, event)}
              onDragEnd={handleDragEnd}
            >
              <EventItem
                event={event}
                onEditEvent={() => {
                  setEditingEvent(event);
                  setShowForm(true);
                }}
                onDeleteEvent={() => handleDeleteEvent(event)}
                onDragEnd={handleDragEnd}
              />
            </div>
          ))}
        </div>
      );
      }
      return cells;
  };

  const renderDaysOfWeek = () => {
    const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    return days.map((day, index) => (
      <div key={index} className="text-lg font-semibold text-center">
        {day}
      </div>
    ));
  };

  return (
    <div className="h-screen flex flex-col bg-fffff5 text-brown-600">
    <AddEventForm
      selectedDay={selectedDay}
      dayClicked={selectedDay}
      onAddEvent={handleAddEvent}
      showForm={showForm}
      setShowForm={setShowForm}
      editingEvent={editingEvent}
      onEditEvent={handleEditEvent}
      setEditingEvent={setEditingEvent} 
    />
    <div className="flex items-center justify-between mb-4">
    <button
        onClick={handlePreviousMonth}
        className="bg-[#7F5539] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#A47551]"
      >
        &lt;
      </button>
      <h2 className="text-xl font-bold">
        {monthNames[currentMonth]} {currentYear}
      </h2>
      <button
        onClick={handleNextMonth}
        className="bg-[#7F5539] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#A47551]"
      >
        &gt;
      </button>
    </div>
      <div className="grid grid-cols-7 gap-2 my-4">{renderDaysOfWeek()}</div>
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {renderCalendarCells().map((cell, index) => (
          <div key={index}>
            {cell}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
