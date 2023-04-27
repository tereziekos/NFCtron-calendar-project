import React, { useState } from "react";
import AddEventForm from "./AddEventForm";
import EventItem from "./EventItem";
import { CalendarEvent } from "./types";

interface WeekViewProps {
  events: CalendarEvent[];
  weekStartDate: Date;
  handleAddEvent: (event: CalendarEvent) => void;
  handleDeleteEvent: (event: CalendarEvent) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  events,
  weekStartDate,
  handleAddEvent,
  handleDeleteEvent,
}) => {
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const days: Date[] = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(weekStartDate);
    day.setDate(day.getDate() + i);
    return day;
  });
  const handleDragEnd = (e: React.DragEvent<HTMLDivElement>, droppedEvent: CalendarEvent) => {
    const updatedEvents = calendarEvents.map((event) => {
      if (event.id === droppedEvent.id) {
        const updatedEvent = { ...event, startTime: selectedDay, endTime: selectedDay };
        return updatedEvent;
      }
      return event;
    });
    setCalendarEvents(updatedEvents);
  };

  const renderWeekCells = () => {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const currentCellDate = days[i];
  
      const isToday =
        currentCellDate.toDateString() === new Date().toDateString();
  
      const dayEvents = events.filter((event) => {
        const eventStartTime = new Date(event.start);
        const eventEndTime = new Date(event.end);
        return (
          eventStartTime.getDate() === currentCellDate.getDate() &&
          eventStartTime.getMonth() === currentCellDate.getMonth() &&
          eventStartTime.getFullYear() === currentCellDate.getFullYear()
        );
      });
  
      cells.push(
        <div
          key={i}
          className={`h-full border border-brown-300 p-2.5 rounded-lg shadow-md ${
            isToday ? "bg-[#ffe4cb95]" : ""
          }`}
          onDoubleClick={() => setSelectedDay(currentCellDate)}
        >
          <div
            className={`font-semibold ${
              isToday
                ? "bg-[#FFB067] text-white rounded-full w-8 h-8 flex items-center justify-center"
                : ""
            }`}
          >
            {currentCellDate.getDate()}
          </div>
          {dayEvents.map((event) => (
            <EventItem
              key={event.id}
              event={event}
              onDeleteEvent={() => handleDeleteEvent(event)}
              onDragEnd={() => {}}
            />
          ))}
        </div>
      );
    }
    return cells;
  };

return (
    <div>
        <div className="flex justify-between items-center mb-2">
        {renderWeekCells()}
        </div>
      
      {selectedDay && (
        <div>
          <button onClick={() => setShowForm(!showForm)}>
            {showForm ? "Close" : "Add Event"}
          </button>
          {showForm && (
            <AddEventForm
                        selectedDay={selectedDay}
                        onAddEvent={(event) => {
                            handleAddEvent(event);
                            setShowForm(false);
                        } } dayClicked={null} showForm={false} setShowForm={function (value: boolean): void {
                            throw new Error("Function not implemented.");
                        } }            />
          )}
        </div>
      )}
    </div>
  );
};

export default WeekView;
