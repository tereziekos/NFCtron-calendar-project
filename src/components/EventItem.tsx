import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface EventItemProps {
  event: Event;
  onEditEvent: (event: Event) => void;
  onDeleteEvent: (event: Event) => void;
  onDragEnd: (e: React.DragEvent<HTMLDivElement>) => void;
}

const EventItem: React.FC<EventItemProps> = ({
  event,
  onEditEvent,
  onDeleteEvent,
  onDragEnd,
}) => {
  const { name, startTime, endTime, color } = event;

  const handleDragStart = (e: React.DragEvent<HTMLDivElement>, event: Event) => {
    e.dataTransfer.setData("text/plain", JSON.stringify(event));
  };

  return (
    <div
      className={`px-2 py-1 rounded-md mt-1 flex items-center justify-between relative group`}
      style={{ backgroundColor: color || "#f3e8e2" }}
      draggable={true}
      onDragStart={(e) => handleDragStart(e, event)}
      onDragEnd={onDragEnd}
    >
      <div>{name}</div>
      <div className="flex items-center absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <AiFillEdit
          className="text-xl cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            onEditEvent(event);
          }}
        />
        <AiFillDelete
          className="text-xl cursor-pointer ml-2"
          onClick={(e) => {
            e.stopPropagation();
            onDeleteEvent(event);
          }}
        />
      </div>
    </div>
  );
};

export default EventItem;