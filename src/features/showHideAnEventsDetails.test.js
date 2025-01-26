import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, screen, within, waitFor } from '@testing-library/react';
import App from '../App';
import mockData from "../mock-data";
import userEvent from '@testing-library/user-event';
import { act } from 'react';

const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');
const event = mockData[0];

let AppComponent;

defineFeature(feature, test => {
  test('An event element is collapsed by default', ({ given, when, then }) => {                              
    given('the user opens the app', () => {                                                                                         
      act(() => {
        AppComponent = render(<App />);
      });                                                                                                                                     
    });                                                                                                                                       
                                                                                                                                              

    when('the event list is displayed', async () => {                                                                                                    
      const EventListDOM = AppComponent.container.querySelector('#event-list');
      
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });                                                                                                                                       
                                                                                                                                              

    then('each event element should be collapsed by default', () => {
      const details = screen.queryByText(event.description);
      expect(details).not.toBeInTheDocument();
    });
  });

  test('User can expand an event to see details', ({ given, when, then }) => {
    given('the event list is displayed', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });

      const EventListDOM = AppComponent.container.querySelector('#event-list');
      await waitFor(() => {
        const EventListItems = within(EventListDOM).queryAllByRole('listitem');
        expect(EventListItems.length).toBeGreaterThan(0);
      });
    });

    when('the user clicks on an event', async () => {
      const user = userEvent.setup();
      // Use querySelectorAll instead of getAllByClassName
      const button = AppComponent.container.querySelectorAll('.details-btn')[0];
      await act(async () => {
        await user.click(button);
      });
    });

    then('the event details should be shown', async () => {
      await waitFor(() => {
        expect(screen.getByText((content) => content.replace(/\s+/g, ' ').trim() === event.description.replace(/\s+/g, ' ').trim())
            ).toBeInTheDocument();
      });
    });
  });

  test('User can collapse an event to hide details', ({ given, when, then }) => {
    given('the event details are visible', async () => {
      await act(async () => {
        AppComponent = render(<App />);
      });

      const user = userEvent.setup();
      // Use querySelectorAll here as well
      const button = AppComponent.container.querySelectorAll('.details-btn')[0];

      await act(async () => {
        await user.click(button);
      });
    });

    when('the user clicks on the event again', async () => {
      const user = userEvent.setup();
      // Select the collapse button again
      const hideButton = AppComponent.container.querySelectorAll('.details-btn')[0];
      await act(async () => {
        await user.click(hideButton);
      });

      await waitFor(() => {
        const details = screen.queryByText(event.description);
        expect(details).not.toBeInTheDocument();
      });
    });

    then('the event details should be hidden', () => {
      const details = screen.queryByText(event.description);
      expect(details).not.toBeInTheDocument();
    });
  });
});
