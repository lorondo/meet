import React from "react";
import Event from "../components/Event";
import mockData from "../mock-data";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const event = mockData[0];

describe('<Event /> component', () => {
  beforeEach(() => {
    render(<Event event={event}/>);
  });

  test('renders event title', () => {
    expect(screen.getByText(event.summary)).toBeInTheDocument();
  });

  test('renders event start time', () => {
    expect(screen.getByText(event.start.dateTime)).toBeInTheDocument();
  });
  
  test('renders event location', () => {
    expect(screen.getByText(event.location)).toBeInTheDocument();
  });

  test('renders event details button with the title (show details)', () => {
    expect(screen.getByText('show details')).toBeInTheDocument();
  });

  test("by default, event's details section should be hidden", () => {
    const details = screen.queryByText(event.description);
    expect(details).not.toBeInTheDocument();
  });

  test("shows the details section when the user clicks on the 'show details' button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show details');
    await user.click(button); // expand
    expect(
      screen.getByText((content) => content.replace(/\s+/g, ' ').trim() === event.description.replace(/\s+/g, ' ').trim())
    ).toBeInTheDocument();
  });

  test("hides the details section when the user clicks on the 'hide details' button", async () => {
    const user = userEvent.setup();
    const button = screen.getByText('show details');
    await user.click(button); // expand 
    await user.click(screen.getByText('hide details')); // collapse
    const details = screen.queryByText(event.description);
    expect(details).not.toBeInTheDocument();
  });
});