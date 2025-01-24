import React, { useState } from 'react';


const NumberOfEvents = ({ onNumberChange }) => {
  // state to track the value of the textbox
  const [number, setNumber] = useState(32); //Default value is 32

  // handle input changes
  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    onNumberChange(value); // Trigger the mock function with the updated value
  };

  return (
    <div id="numberOfEvents">
      <input
        type="text"
        className="textbox"
        placeholder="Number of events"
        value={number} // Controlled component, value is bound to state
        onChange={handleChange} // Calls handleChange on user input
      />
    </div>
  );
};

export default NumberOfEvents;