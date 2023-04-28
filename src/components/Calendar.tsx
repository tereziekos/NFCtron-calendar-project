import React, { useState } from "react";
import AddEventForm from "./AddEventForm";
import EventItem from "./EventItem";
import { nanoid } from "nanoid";
import { CalendarEvent } from "./types";
import WeekView from "./WeekView";

const Calendar = () => {
  const [view, setView] = useState<"month" | "week">("month");
  const [weekStartDate, setWeekStartDate] = useState(new Date());
  const [calendarEvents, setCalendarEvents] = useState<CalendarEvent[]>([]);
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  const handlePreviousMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 0 ? 11 : prevMonth - 1));
    setCurrentYear((prevYear) =>
      currentMonth === 0 ? prevYear - 1 : prevYear
    );
  };

  const handleNextMonth = () => {
    setCurrentMonth((prevMonth) => (prevMonth === 11 ? 0 : prevMonth + 1));
    setCurrentYear((prevYear) =>
      currentMonth === 11 ? prevYear + 1 : prevYear
    );
  };

  const handleAddEvent = (event: CalendarEvent) => {
    setCalendarEvents([...calendarEvents, { ...event, id: nanoid() }]);
    setSelectedDay(null);
    setShowForm(false);
  };

  const handleWeekViewClick = () => {
    setView("week");
    const today = new Date();
    const startOfWeek = new Date(today);
    startOfWeek.setDate(today.getDate() - today.getDay());
    setWeekStartDate(startOfWeek);
  };

  const handleMonthViewClick = () => {
    setView("month");
  };

  const handleDeleteEvent = (eventToDelete: CalendarEvent) => {
    setCalendarEvents((prevEvents) =>
      prevEvents.filter((event) => !(event.id === eventToDelete.id))
    );
  };

  const handleDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    event: CalendarEvent
  ) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(event));
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
    const startDay = startDate.getDay();
    if (startDay !== 1) {
      startDate.setDate(startDate.getDate() - (startDay - 1));
    }
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const currentCellDate = new Date(startDate);
      currentCellDate.setDate(currentCellDate.getDate() + i);

      const isToday =
        currentCellDate.toDateString() === new Date().toDateString(); // Check if this cell represents today's date

      const dayEvents = calendarEvents.filter((event) => {
        const eventStartTime = new Date(event.startTime);
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
          onDrop={(e) => handleDrop(e)}
          onDragOver={(e) => {
            e.preventDefault();
          }}
          data-date={currentCellDate.toISOString()}
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
            <div
              key={event.id}
              draggable={true}
              onDragStart={(e) => handleDragStart(e, event)}
            >
              <EventItem
                event={event}
                onDeleteEvent={() => handleDeleteEvent(event)}
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
      <div
        key={index}
        className="text-lg font-semibold text-center bg-[#ffc233] text-white p-2 rounded-md"
      >
        {day}
      </div>
    ));
  };
  return (
    <div className="h-screen flex flex-col bg-fffff5 text-brown-600">
      <button onClick={handleMonthViewClick}>Month View</button>
      <button onClick={handleWeekViewClick}>Week View</button>
      <AddEventForm
        selectedDay={selectedDay}
        dayClicked={selectedDay}
        onAddEvent={handleAddEvent}
        showForm={showForm}
        setShowForm={setShowForm}
      />
      {view === "week" ? (
        <>
          <div className="grid grid-cols-7 gap-2 my-2">
            {renderDaysOfWeek()}
          </div>
          <WeekView
            calendarEvents={calendarEvents}
            weekStartDate={weekStartDate}
            handleAddEvent={handleAddEvent}
            setSelectedDay={setSelectedDay}
            handleDayDoubleClick={handleDayDoubleClick}
            handleDeleteEvent={handleDeleteEvent}
            handleDragStart={handleDragStart}
            handleDrop={handleDrop}
          />
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-0">
            <button
              onClick={handlePreviousMonth}
              className="bg-[#7F5539] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#A47551]"
            >
              &lt;
            </button>
            <h2 className="text-2xl font-semibold text-brown-600 font-poppins bg-brown-100 px-4 py-2 rounded-md">
              {monthNames[currentMonth]} {currentYear}
            </h2>
            <button
              onClick={handleNextMonth}
              className="bg-[#7F5539] text-white px-3 py-1 rounded-md shadow-md hover:bg-[#A47551]"
            >
              &gt;
            </button>
          </div>
          <div className="grid grid-cols-7 gap-2 my-2">
            {renderDaysOfWeek()}
          </div>
          <div className="grid grid-cols-7 gap-2 flex-grow">
            {renderCalendarCells().map((cell, index) => (
              <div key={index}>{cell}</div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Calendar;
