import React, { useEffect, useState } from 'react';
import CitySearch from './components/CitySearch';
import EventList from './components/EventList';
import NumberOfEvents from './components/NumberOfEvents';
import { extractLocations, getEvents } from './api';

import './App.css';

const App = () => {
  const [allLocations, setAllLocations] = useState([]);
  const [currentNOE, setCurrentNOE] = useState(32);
  const [events, setEvents] = useState([]);
  const [currentCity, setCurrentCity] = useState("See all cities");

  // Fetch events whenever city or number of events changes
  useEffect(() => {
    fetchData();
  }, [currentCity, currentNOE]);

  // Fetch and filter events
  const fetchData = async (noe = currentNOE, city = currentCity) => {
    const allEvents = await getEvents();
    const filteredEvents = city === "See all cities" ?
      allEvents :
      allEvents.filter(event => event.location === city)
    setEvents(filteredEvents.slice(0, noe)); // Adjusts events based on number
    setAllLocations(extractLocations(allEvents));
  }

  // Handles changes in the number of events
  const handleNumberChange = (number) => {
    const newNumber = parseInt(number, 10) || 0; // Convert input to a number
    setCurrentNOE(newNumber); // Update the state for the number of events
  };

  return (
    <div className="App">
      <CitySearch allLocations={allLocations} setCurrentCity={setCurrentCity} />
      <NumberOfEvents onNumberChange={handleNumberChange} />
      <EventList events={events} />
    </div>
  );
 };
 
 export default App;