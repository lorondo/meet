import React, { useState } from 'react';
import { ErrorAlert } from './Alert';

const NumberOfEvents = ({ setCurrentNOE, setErrorAlert }) => {
  // state to track the value of the textbox
  const [number, setNumber] = useState(32); //Default value is 32
  const [errorAlert, setError] = useState('');

  // handle input changes
  const handleChange = (e) => {
    const value = e.target.value;
    setNumber(value);
    setCurrentNOE(value); // Trigger the mock function with the updated value
 
    let infoText;
    if (isNaN(value) || value <= 0) { // Check if value is not a number or zero or less
      infoText = "You have input an invalid number of events. Please input a new number."
    } else {
      infoText = ""
    }
    setError(infoText);
    setErrorAlert(infoText);
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
      {errorAlert && <ErrorAlert text={errorAlert} />} {/* Conditionally render ErrorAlert */}
    </div>
  );
};

export default NumberOfEvents;