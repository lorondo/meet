import React from "react";
import Event from "./Event";

const EventList = ({ events = [] }) => {
  console.log("EventList received events:", events); // Debugging line
  return (
    <ul id="event-list" role="list">
      {events.map((event) => (
        <li key={event.id} role="listitem">
          <Event event={event} />
        </li>
      ))}
    </ul>
  );
};

export default EventList;
