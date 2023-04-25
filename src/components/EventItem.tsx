import React from "react";

interface EventItemProps {
    name: string;
    startTime: Date;
    endTime: Date;
    color?: string;
  }
  
  const EventItem: React.FC<EventItemProps> = ({ name, startTime, endTime, color }) => {
    return (
      <div
        className="p-1 text-sm rounded-md mt-1 cursor-pointer border border-gray-400"
        style={{ backgroundColor: color || "inherit" }}
      >
        {name}
      </div>
    );
  };
  
  export default EventItem;
  
  
  
  