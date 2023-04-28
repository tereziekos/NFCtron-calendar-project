import React, { useState } from "react";
import AddEventForm from "./AddEventForm";
import EventItem from "./EventItem";
import { nanoid } from "nanoid";
import { CalendarEvent } from "./types";

interface WeekViewProps {
  calendarEvents: CalendarEvent[];
  weekStartDate: Date;
  handleAddEvent: (event: CalendarEvent) => void;
  setSelectedDay: (date: Date | null) => void;
  handleDayDoubleClick: (date: Date) => void;
}

const WeekView: React.FC<WeekViewProps> = ({
  calendarEvents,
  weekStartDate,
  handleAddEvent,
  setSelectedDay,
  handleDayDoubleClick,
}) => {
  const [showForm, setShowForm] = useState(false);

  const renderWeekCells = () => {
    const cells = [];
    for (let i = 0; i < 7; i++) {
      const currentCellDate = new Date(weekStartDate);
      currentCellDate.setDate(currentCellDate.getDate() + i);

      const isToday =
        currentCellDate.toDateString() === new Date().toDateString();

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
          className={`h-full border border-brown-300 p-2.5 rounded-lg shadow-md ${
            isToday ? "bg-[#ffe4cb95]" : ""
          }`}
          onDoubleClick={() => handleDayDoubleClick(currentCellDate)}
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
              onDeleteEvent={() =>
                setCalendarEvents((prevEvents) =>
                  prevEvents.filter((e) => e.id !== event.id)
                )
              }
              onDragEnd={() => {}}
            />
          ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="h-screen flex flex-col bg-fffff5 text-brown-600">
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {renderWeekCells().map((cell, index) => (
          <div key={index}>{cell}</div>
        ))}
      </div>
    </div>
  );
};

export default WeekView;
