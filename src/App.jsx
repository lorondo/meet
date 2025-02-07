import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';
import { InfoAlert, ErrorAlert, WarningAlert } from './components/Alert';
import CityEventsChart from './components/CityEventsChart';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");
  const [infoAlert, setInfoAlert] = useState("");
  const [errorAlert, setErrorAlert] = useState("");
  const [warningAlert, setWarningAlert] = useState("");

  // Fetch events whenever city or number of events changes
  useEffect(() => {
    if (navigator.onLine) {
      setWarningAlert(""); // Clear warning if online
    } else {
      setWarningAlert("You are currently offline"); // Show warning if offline
    }
    fetchData();
  }, [currentCity, currentNOE]);

  // Fetch and filter events
  const fetchData = async (noe = currentNOE, city = currentCity) => {
    const allEvents = await getEvents();
    const filteredEvents = city === "See all cities" ? 
      allEvents :
      allEvents.filter(event => event.location === city);
    setEvents(filteredEvents.slice(0, noe)); // Adjusts events based on number
    setAllLocations(extractLocations(allEvents));
  }

  // Handles changes in the number of events
  const handleNumberChange = (number) => {
    const newNumber = parseInt(number, 10) || 0; // Convert input to a number
    console.log("New number of events:", newNumber); // Debugging

  if (newNumber < 1) {
    console.error("Error: Number of events must be at least 1.");
    setErrorAlert("Please enter a number greater than 0.");
  } else {
    setErrorAlert(""); // Clear error if valid input
  }

  setCurrentNOE(newNumber); // Update state
};

  return (
    <div className="App">
      <h1>Meet App</h1>
      <div className="alerts-container">
        {infoAlert && <InfoAlert text={infoAlert} />}
        {warningAlert && <WarningAlert text={warningAlert} />}
        {errorAlert && <ErrorAlert text={errorAlert} />}
      </div>
      <CitySearch
        allLocations={allLocations}
        setCurrentCity={setCurrentCity}
        setInfoAlert={setInfoAlert} />
      <NumberOfEvents setCurrentNOE={setCurrentNOE} setErrorAlert={setErrorAlert} />
      <CityEventsChart allLocations={allLocations} events={events} />
      <EventList events={events} />
    </div>
 );
};

export default App;