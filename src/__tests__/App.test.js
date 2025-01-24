import React from 'react';
import { render, within, waitFor, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { getEvents } from '../api';
import App from '../App';
import NumberOfEvents from '../components/NumberOfEvents';


describe('<App /> component', () => {
  let AppDOM;
  beforeEach(() => {
    AppDOM = render(<App />).container.firstChild;
  })
  
  test('renders list of events', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#event-list')).toBeInTheDocument();
  });

  test('render CitySearch', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#city-search')).toBeInTheDocument();
  });

  test('render NumberOfEvents', () => {
    const AppDOM = render(<App />).container.firstChild;
    expect(AppDOM.querySelector('#numberOfEvents')).toBeInTheDocument();
  });

});

describe('<App /> integration', () => {
  test('renders a list of events matching the city selected by the user', async () => {
    const user = userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;
 
    const CitySearchDOM = AppDOM.querySelector('#city-search');
    const CitySearchInput = within(CitySearchDOM).queryByRole('textbox');
 
    await user.type(CitySearchInput, "Berlin");
    const berlinSuggestionItem = within(CitySearchDOM).queryByText('Berlin, Germany');
    await user.click(berlinSuggestionItem);
 
    const EventListDOM = AppDOM.querySelector('#event-list');
    const allRenderedEventItems = within(EventListDOM).queryAllByRole('listitem');  
 
    const allEvents = await getEvents();
    const berlinEvents = allEvents.filter(
      event => event.location === 'Berlin, Germany'
    );
 
    expect(allRenderedEventItems.length).toBe(berlinEvents.length);

    allRenderedEventItems.forEach(event => {
      expect(event.textContent).toContain("Berlin, Germany");
    });
  });

  test('number of events rendered matches the number of events inputted by the user', async () => {
    const user=userEvent.setup();
    const AppComponent = render(<App />);
    const AppDOM = AppComponent.container.firstChild;

    const NumberOfEventsDOM = AppDOM.querySelector('#numberOfEvents');
    const NumberOfEventsInput = within(NumberOfEventsDOM).queryByRole('textbox');

    await act(async () => {
      await user.type(NumberOfEventsInput, "{backspace}{backspace}10");
    });

    await waitFor(() => {
      expect(NumberOfEventsInput).toHaveValue('10');
    });
  });

});