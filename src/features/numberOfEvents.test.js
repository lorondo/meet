import React from 'react';
import { loadFeature, defineFeature } from 'jest-cucumber';
import { render, within, waitFor, screen } from '@testing-library/react';
import App from '../App';
import userEvent from '@testing-library/user-event';
import { act } from 'react';

const feature = loadFeature('./src/features/numberOfEvents.feature');

defineFeature(feature, (test) => {
  test('User does not type in the number-of-events field', ({ given, when, then }) => {
    let AppComponent;

    given('the user opens the app', async () => {
      // Ensure the app renders inside act()
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('user hasn’t typed in the number-of-events field', () => {
      // No action required here, as the user does not type anything
    });

    then('textbox input field has a default value of 32', async () => {
      const eventTextBox = await screen.findByPlaceholderText('Number of events');
      expect(eventTextBox).toHaveValue('32'); // Ensure the default value is correct
    });
  });

  test('User types a number in the number-of-events field', ({ given, when, then, and }) => {
    let AppComponent;

    given('the user opens the app', async () => {
      // Render the app inside act()
      await act(async () => {
        AppComponent = render(<App />);
      });
    });

    when('user types in the textbox', async () => {
      const user = userEvent.setup();
      const eventTextBox = await screen.findByPlaceholderText('Number of events');

      // Simulate user interaction to update the number of events
      await act(async () => {
        await user.clear(eventTextBox);
        await user.type(eventTextBox, '10');
      });
    });

    then('the textbox value updates', async () => {
      const eventTextBox = await screen.findByPlaceholderText('Number of events');
      expect(eventTextBox).toHaveValue('10'); // Ensure the value updates to 10
    });

    and('I should be able to see a list of events with the number I typed as the length', async () => {
      // Wait for the event list to update and check its length
      await waitFor(() => {
        const eventListItems = screen.getAllByRole('listitem');
        expect(eventListItems.length).toBeGreaterThan(0); // Check if the list has at least 1 item
      });
    });
  });
});
