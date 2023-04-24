import React from 'react';

interface CalendarProps {
  events: {
    name: string;
    startTime: Date;
    endTime: Date;
  }[];
}

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

  const renderCalendarCells = () => {
    const cells = [];
    for (let i = 0; i < 42; i++) {
      const currentCellDate = new Date(startDate);
      currentCellDate.setDate(currentCellDate.getDate() + i);

      const dayEvents = events.filter((event) => {
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
          className="border border-gray-200 p-2"
        >
          <div className="font-semibold">{currentCellDate.getDate()}</div>
          {dayEvents.map((event) => (
            <div key={event.name} className="text-sm">
              {event.name} ({event.startTime.toISOString()} - {event.endTime.toISOString()})
            </div>
          ))}
        </div>
      );
    }
    return cells;
  };

  return (
    <div className="h-screen flex flex-col">
      <div className="flex-grow-0 mt-1/8">
        {/* This space is reserved for future bar and names of days and month */}
      </div>
      <div className="grid grid-cols-7 gap-2 flex-grow">
        {renderCalendarCells()}
      </div>
    </div>
  );
};

export default Calendar;