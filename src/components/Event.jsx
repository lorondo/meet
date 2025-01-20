import React, { useState } from "react";
import PropTypes from "prop-types";

const Event = ({ event }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <div className="event">
      <h2>{event.summary}</h2>
      <p>{event.start.dateTime}</p>
      <p>{event.location}</p>
      <button onClick={toggleDetails}>
        {showDetails ? 'hide details' : 'show details'}
      </button>
      {showDetails && (
        <div className="details">
          <p>{event.description}</p>
        </div>
      )}
    </div>
  );
};

// Define the prop types
Event.propTypes = {
  event: PropTypes.shape({
    summary: PropTypes.string.isRequired,
    start: PropTypes.shape({
      dateTime: PropTypes.string.isRequired,
    }).isRequired,
    location: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

export default Event;
