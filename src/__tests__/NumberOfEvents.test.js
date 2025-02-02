import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ErrorAlert } from '../components/Alert';

describe('<NumberOfEvents /> component', () => {
  let onNumberChangeMock;
  let setErrorAlertMock;
  
  beforeEach(() => {
    onNumberChangeMock = jest.fn();
    setErrorAlertMock = jest.fn();
    render(<NumberOfEvents onNumberChange={onNumberChangeMock} setErrorAlert={setErrorAlertMock} />);
  });

 test('renders with a textbox input', () => {
  const eventTextBox = screen.getByRole('textbox');
  expect(eventTextBox).toBeInTheDocument();
  expect(eventTextBox).toHaveClass('textbox');
});

test('textbox input field has a default value of 32', () => {
  const eventTextBox = screen.getByRole('textbox');
  expect(eventTextBox).toHaveValue('32');
 });

 test('shows error alert for invalid number', async () => {
  const eventTextBox = screen.getByRole('textbox');
  const user = userEvent.setup();

  await user.clear(eventTextBox);
  await user.type(eventTextBox, '-1'); // Invalid value

  expect(onNumberChangeMock).toHaveBeenCalledWith('-1'); // Check mock function call
  expect(setErrorAlertMock).toHaveBeenCalledWith("You have input an invalid number of events. Please input a new number.");

  const errorAlert = screen.getByText("You have input an invalid number of events. Please input a new number.");
  expect(errorAlert).toBeInTheDocument(); // Ensure the error alert is rendered
});

test('does not show error alert for valid number', async () => {
  const eventTextBox = screen.getByRole('textbox');
  const user = userEvent.setup();

  await user.clear(eventTextBox);
  await user.type(eventTextBox, '5'); // Valid value

  expect(onNumberChangeMock).toHaveBeenCalledWith('5'); // Check mock function call
  expect(setErrorAlertMock).toHaveBeenCalledWith(''); // Error should be cleared

  const errorAlert = screen.queryByText("You have input an invalid number of events. Please input a new number.");
  expect(errorAlert).not.toBeInTheDocument(); // Ensure the error alert is not rendered
  });
});