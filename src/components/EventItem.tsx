import React from "react";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";

interface EventItemProps {
  name: string;
  startTime: Date;
  endTime: Date;
  color?: string;
  onEditEvent: () => void;
  onDeleteEvent: () => void;
}

const EventItem: React.FC<EventItemProps> = ({
  name,
  startTime,
  endTime,
  color,
  onEditEvent,
  onDeleteEvent,
}) => {
  return (
    <div
      className={`px-2 py-1 rounded-md mt-1 flex items-center justify-between relative group`}
      style={{ backgroundColor: color || "#f3e8e2" }}
    >
      <div>{name}</div>
      <div className="flex items-center absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <AiFillEdit className="text-xl cursor-pointer" onClick={onEditEvent} />
        <AiFillDelete className="text-xl cursor-pointer ml-2" onClick={onDeleteEvent} />
      </div>
    </div>
  );
};

export default EventItem;