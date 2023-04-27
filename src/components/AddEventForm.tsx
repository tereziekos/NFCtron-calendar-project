import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import { CalendarEvent } from "./types";

interface AddEventFormProps {
  selectedDay: Date | null;
  dayClicked: Date | null;
  onAddEvent: (event: CalendarEvent) => void;
  showForm: boolean;
  setShowForm: (value: boolean) => void;
}

const AddEventForm: React.FC<AddEventFormProps> = ({
  selectedDay,
  dayClicked,
  onAddEvent,
  showForm,
  setShowForm,
}) => {
  const [name, setName] = useState("");
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [endTime, setEndTime] = useState<Date | null>(null);
  const [color, setColor] = useState("");
  const [fullDayEvent, setFullDayEvent] = useState(true);

  useEffect(() => {
    setName("");
    setStartTime(null);
    setEndTime(null);
    setColor("");
    setFullDayEvent(true);
  }, [showForm]);

  useEffect(() => {
    if (dayClicked) {
      setStartTime(null);
      setEndTime(null);
      setFullDayEvent(true);
    }
  }, [dayClicked]);

  useEffect(() => {
    if (dayClicked) {
      setStartTime(new Date(dayClicked));
      setEndTime(new Date(dayClicked));
      setFullDayEvent(true);
    }
  }, [dayClicked, showForm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDay && name) {
      if (fullDayEvent) {
        const fullDayStartTime = new Date(selectedDay);
        fullDayStartTime.setHours(0, 0, 0, 0);
        const fullDayEndTime = new Date(selectedDay);
        fullDayEndTime.setHours(23, 59, 59, 999);
        onAddEvent({
          name,
          startTime: fullDayStartTime,
          endTime: fullDayEndTime,
          color,
          id: uuidv4(),
        });
      } else if (startTime && endTime) {
        onAddEvent({
          name,
          startTime,
          endTime,
          color,
          id: uuidv4(),
        });
      }
      setName("");
      setStartTime(null);
      setEndTime(null);
      setColor("");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const handleFullDayEventChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFullDayEvent(e.target.checked);
    if (selectedDay && e.target.checked) {
      const newStartTime = new Date(selectedDay);
      newStartTime.setHours(0, 0, 0, 0);
      setStartTime(newStartTime);
      const newEndTime = new Date(selectedDay);
      newEndTime.setHours(23, 59, 59, 999);
      setEndTime(newEndTime);
    } else {
      setStartTime(null);
      setEndTime(null);
    }
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const timeString = e.target.value;
    const [hours, minutes] = timeString.split(":").map(Number);
    if (e.target.name === "startTime") {
      const newStartTime = new Date(selectedDay);
      newStartTime.setHours(hours, minutes, 0, 0);
      setStartTime(newStartTime);
    } else if (e.target.name === "endTime") {
      const newEndTime = new Date(selectedDay);
      newEndTime.setHours(hours, minutes, 0, 0);
      setEndTime(newEndTime);
    }
  };
    
    if (!showForm || !selectedDay) return null;
    



    
  function handleAddEvent(event: FormEvent<HTMLFormElement>): void {
    throw new Error("Function not implemented.");
  }

    return (
      <div
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50"
      >
        <div className="bg-white p-8 w-96 rounded-lg shadow-md">
          <h2 className="text-2xl mb-4">Add Event</h2>

          <form onSubmit={handleSubmit}>
            <label htmlFor="eventName" className="block mb-2">
              Event Name
            </label>
            <input
              type="text"
              id="eventName"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded-md mb-4"
            />
               <div className="mb-4">
            <label className="block mb-1">Event Color</label>
            <div className="flex space-x-2">
              {[
                "#FFB067",
                "#FFED86",
                "#A2DCE7",
                "#F8CCDC",
                "#D3D3CB",
                "#F34C50",
                "#DAD870",
              ].map((paletteColor) => (
                <label
                  key={paletteColor}
                  className="inline-flex items-center cursor-pointer"
                >
                  <input
                    type="radio"
                    name="color"
                    className="sr-only"
                    value={paletteColor}
                    checked={color === paletteColor}
                    onChange={(e) => setColor(e.target.value)}
                  />
                  <span
                    className={`w-6 h-6 rounded-full border-2 ${
                      color === paletteColor
                        ? "border-blue-500"
                        : "border-gray-300"
                    }`}
                    style={{ backgroundColor: paletteColor }}
                  ></span>
                </label>
              ))}
            </div>
          </div>
            <div className="mb-4">
              <label htmlFor="fullDayEvent" className="block mb-1">
                Full Day Event
              </label>
              <input
                type="checkbox"
                id="fullDayEvent"
                name="fullDayEvent"
                checked={fullDayEvent}
                onChange={handleFullDayEventChange}
              />
            </div>
            {!fullDayEvent && (
              <>
                <div className="mb-4">
                  <label htmlFor="startTime" className="block mb-1">
                    Start Time
                  </label>
                  <input
                    type="time"
                    id="startTime"
                    name="startTime"
                    onChange={handleTimeChange}
                    className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-300"
                    required={!fullDayEvent}
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="endTime" className="block mb-1">
                    End Time
                  </label>
                  <input
                    type="time"
                    id="endTime"
                    name="endTime"
                    onChange={handleTimeChange}
                    className="w-full border-2 border-gray-300 p-2 rounded-lg focus:outline-none focus:border-blue-300"
                    required={!fullDayEvent}
                  />
                </div>
              </>
            )}
            <div className="flex justify-between">
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-md"
            >
              Add Event
            </button>
              <button
                onClick={() => setShowForm(false)}
                className="bg-gray-300 text-black px-4 py-2 rounded-md"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
    };
    
    export default AddEventForm;