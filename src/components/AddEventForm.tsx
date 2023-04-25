import React, { useState } from "react";

interface Event {
  name: string;
  startTime: Date;
  endTime: Date;
  color?: string;
}

interface AddEventFormProps {
  selectedDay: Date | null;
  dayClicked: Date | null;
  onAddEvent: (event: Event) => void;
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (selectedDay && name) {
      if (fullDayEvent) {
        const fullDayStartTime = new Date(selectedDay);
        fullDayStartTime.setHours(0, 0, 0, 0);
        const fullDayEndTime = new Date(selectedDay);
        fullDayEndTime.setHours(23, 59, 59, 999);
        onAddEvent({ name, startTime: fullDayStartTime, endTime: fullDayEndTime, color });
      } else if (startTime && endTime) {
        onAddEvent({ name, startTime, endTime, color });
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

  const startTimeInput = fullDayEvent ? (
    ""
  ) : (
    <input
      type="time"
      className="border border-gray-300 p-2 rounded-lg"
      value={startTime ? startTime.toISOString().substr(11, 5) : ""}
      onChange={(e) => {
        if (selectedDay) {
          const newStartTime = new Date(selectedDay);
          const [hours, minutes] = e.target.value.split(":");
          newStartTime.setUTCHours(parseInt(hours, 10));
          newStartTime.setUTCMinutes(parseInt(minutes, 10));
          setStartTime(newStartTime);
        }
      }}
    />
  );

  const endTimeInput = fullDayEvent ? (
    ""
  ) : (
    <input
      type="time"
      className="border border-gray-300 p-2 rounded-lg"
      value={endTime ? endTime.toISOString().substr(11, 5) : ""}
      onChange={(e) => {
        if (selectedDay) {
          const newEndTime = new Date(selectedDay);
          const [hours, minutes] = e.target.value.split(":");
          newEndTime.setUTCHours(parseInt(hours, 10));
          newEndTime.setUTCMinutes(parseInt(minutes, 10));
          setEndTime(newEndTime);
        }
      }}
    />
  );

  return showForm ? (
    <form
      onSubmit={handleSubmit}
      className="fixed inset-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50"
    >
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">Add Event</h2>
        <div className="mb-4">
          <label htmlFor="eventName" className="block mb-1">
            Event Name
          </label>
          <input
            type="text"
            id="eventName"
            className="border border-gray-300 p-2 rounded-lg w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-4">
  <label htmlFor="fullDayEvent" className="block mb-1">
    Full Day Event
  </label>
  <label className="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      className="sr-only peer"
      checked={fullDayEvent}
      onChange={handleFullDayEventChange}
    />
    <div className="w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600" />
    <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
      Full Day
    </span>
  </label>
</div>
<div className="mb-4">
  <label htmlFor="startTime" className="block mb-1">
    Start Time
  </label>
  {startTimeInput}
</div>
<div className="mb-4">
  <label htmlFor="endTime" className="block mb-1">
    End Time
  </label>
  {endTimeInput}
</div>
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
          className="w-6 h-6 rounded-full border-2 border-gray-300"
          style={{ backgroundColor: paletteColor }}
        ></span>
      </label>
    ))}
  </div>
</div>
<div className="flex justify-between">
  <button
    type="submit"
    className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 mr-2"
  >
    Save
  </button>
  <button
    type="button"
    className="bg-red-600 text-white px-4 py-2 rounded-lg"
    onClick={handleCancel}
  >
    Cancel
  </button>
</div>
</div>
</form>
  ) : (
    <></>
  );
};

export default AddEventForm;