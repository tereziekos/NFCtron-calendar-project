import React, { useState } from "react";
import AddEventForm from "./AddEventForm";
import EventItem from "./EventItem";

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
  const currentDate = new Date(); // You can use a state to manage the current date
  const startDate = getStartDate(currentDate);
  const [calendarEvents, setCalendarEvents] = useState(events);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  const handleAddEvent = (event: Event) => {
    setCalendarEvents([...calendarEvents, event]);
    setSelectedDay(null);
    setShowForm(false);
  };

  const handleEditEvent = (updatedEvent: Event) => {
    setCalendarEvents((prevEvents) =>
      prevEvents.map((event) =>
        event.name === updatedEvent.name &&
        event.startTime.getTime() === updatedEvent.startTime.getTime() &&
        event.endTime.getTime() === updatedEvent.endTime.getTime()
          ? updatedEvent
          : event
      )
    );
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


  const handleDayDoubleClick = (date: Date) => {
    const localDate = new Date(date);
    setSelectedDay(localDate);
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
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const currentCellDate = new Date(startDate);
      currentCellDate.setDate(currentCellDate.getDate() + i);

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
        className="bg-f7e7ce h-full border border-brown-300 text-brown-600 p-2.5 rounded-lg shadow-md"
        onDoubleClick={() => handleDayDoubleClick(currentCellDate)}
      >
        <div className="font-semibold">{currentCellDate.getDate()}</div>
        {dayEvents.map((event) => (
          <EventItem
          key={event.name}
          name={event.name}
          startTime={event.startTime}
          endTime={event.endTime}
          color={event.color}
          onEditEvent={() => {
            setEditingEvent(event);
            setShowForm(true);
          }}
          onDeleteEvent={() => handleDeleteEvent(event)}
        />
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
      <div className="flex-grow-0 mt-1/8 text-left font-bold text-2xl pl-4">
        {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
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
