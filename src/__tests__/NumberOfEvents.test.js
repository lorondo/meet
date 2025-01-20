import React from 'react';
import NumberOfEvents from '../components/NumberOfEvents';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { extractLocations } from '../api';

describe('<NumberOfEvents /> component', () => {
  let onNumberChangeMock;
  
  beforeEach(() => {
    onNumberChangeMock = jest.fn();
    render(<NumberOfEvents onNumberChange={onNumberChangeMock} />)
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

 test('updated value when user types in the textbox', async () => {
  const eventTextBox = screen.getByRole('textbox');
  const user = userEvent.setup();

  await user.clear(eventTextBox);
  await user.type(eventTextBox, '10');
  
  expect(eventTextBox).toHaveValue('10'); // expect a string value
  expect(onNumberChangeMock).toHaveBeenCalledWith('10'); // mock function should be called with '10'
});

});