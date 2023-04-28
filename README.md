# NFCtron-calendar-project
This repository contains a calendar application for the NFCtron interview project. The application includes a customizable monthly and weekly view, and allows for adding and removing events.


# React Calendar App
This is a simple calendar app built with React, TypeScript, and Tailwind CSS. It allows users to add and delete events for a given day.

# Features
Users can add events to a specific day on the calendar by clicking on the corresponding cell and filling out a form.
Events are displayed as draggable items in a list, which can be repositioned by dragging and dropping.
Users can delete events by clicking the delete button on the event item.

# Components

Calendar
The main component of the app, responsible for rendering the calendar grid and event list. It also handles the state of the app, including the selected date and the list of events.

CalendarHeader
Renders the month and year of the selected date and provides buttons for navigating to the previous and next months.

CalendarCell
Renders a single cell of the calendar grid, representing a day. It displays the day of the month, as well as any events scheduled for that day.

AddEventForm
Provides a form for adding a new event to the calendar. The form includes fields for the event name, start time, end time, and color.

EventItem
Renders a single event item in the list of events. It displays the event name, start and end times, and color, and provides a button for deleting the event.

# Installation
To run the app locally, follow these steps:

Clone the repository to your local machine.
Install the dependencies by running npm install.
Start the development server by running npm start.
Navigate to http://localhost:3000 in your web browser to view the app.
Contributing
If you find a bug or would like to suggest an improvement, please open an issue or submit a pull request.