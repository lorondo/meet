# Meet App

## Overview  
**Meet App** is a serverless, progressive web application (PWA) built with React, designed to help users discover and manage events effortlessly. The app leverages the Google Calendar API to fetch upcoming events and features a visually appealing and interactive interface for users to explore event details. The app is developed using a Test-Driven Development (TDD) approach, ensuring high-quality and reliable functionality.

---

## Features  

### 1. Filter Events by City  
As a **user**,  
I should be able to **filter events by city**  
So that I can see a list of events taking place in that city.

#### Scenarios:  
1. **When the user hasn’t searched for a specific city, show upcoming events from all cities.**  
   - **Given** the user hasn’t searched for any city;  
   - **When** the user opens the app;  
   - **Then** the user should see a list of upcoming events.  

2. **User should see a list of suggestions when they search for a city.**  
   - **Given** the main page is open;  
   - **When** the user starts typing in the city textbox;  
   - **Then** the user should receive a list of cities (suggestions) that match what they’ve typed.  

3. **User can select a city from the suggested list.**  
   - **Given** the user was typing “Berlin” in the city textbox **AND** the list of suggested cities is showing;  
   - **When** the user selects a city (e.g., “Berlin, Germany”) from the list;  
   - **Then** their city should be changed to that city (i.e., “Berlin, Germany”) **AND** the user should receive a list of upcoming events in that city.  

---

### 2. Show/Hide Event Details  
As a **user**,  
I should be able to **show/hide event details**  
So that I can see or not see event details when I wish.

#### Scenarios:  
1. **When event details are hidden, the user should be able to make them show.**  
   - **Given** events haven't been shown;  
   - **When** the user selects the event;  
   - **Then** the user should see the event details.  

2. **When event details are showing, the user should be able to make them hidden.**  
   - **Given** events were revealed;  
   - **When** the user selects the event;  
   - **Then** the user should no longer see the event details.  

---

### 3. Specify Number of Events  
As a **user**,  
I should be able to **specify a number of events**  
So that I can see as many events as I would like.

#### Scenario:  
1. **When the user selects the number of events, show a specific number of events from those available.**  
   - **Given** the user sees a number of events that doesn't meet their desire;  
   - **When** the user opens the app;  
   - **Then** the user should see a number of events matching their specifications.  

---

### 4. Use the App When Offline  
As a **user**,  
I should be able to **use the app when offline**  
So that I can use the app regardless of my internet connection.

#### Scenario:  
1. **When the user doesn't have an internet connection, they should still be able to use the app.**  
   - **Given** the user doesn't have an internet connection;  
   - **When** the user opens the app;  
   - **Then** the user should still be able to use the app.  

---

### 5. Add App Shortcut to the Home Screen  
As a **user**,  
I should be able to **add an app shortcut to the home screen**  
So that I can access the app from my home screen.

#### Scenario:  
1. **When the user doesn't have an app shortcut on their home screen, they should be able to add the app shortcut to the home screen.**  
   - **Given** the user doesn't have the app shortcut on their home screen;  
   - **When** the user adds the app shortcut to their home screen;  
   - **Then** the user should be able to access the app via a home screen shortcut.  

---

### 6. Display Charts Visualizing Event Details  
As a **user**,  
I should be able to **display charts visualizing event details**  
So that I can view event details in a more digestible visual format.

#### Scenario:  
1. **When the user clicks on an event, show charts visualizing event details.**  
   - **Given** the user desires to see charts visualizing event details;  
   - **When** the user opens event details;  
   - **Then** the user should see charts visualizing event details.  

---

## Objectives  
1. Build a serverless PWA with React using TDD methodology.  
2. Enable offline access, responsive design, and cross-platform compatibility.  
3. Use Google Calendar API to fetch and display event data.  
4. Include data visualization with scatterplots and pie charts for better event analysis.  

---

## Why Serverless and PWAs?  
### Serverless  
- No backend maintenance.  
- Scalable, cost-effective, and always available.  

### PWA Benefits  
- Instant loading and offline support.  
- Push notifications and “add to home screen” functionality.  
- Responsive design with cross-platform compatibility.  

---

## Development Approach  
This app is developed using the **Test-Driven Development (TDD)** technique. Writing tests first ensures the app meets user requirements before implementing functionality, resulting in a reliable and user-friendly application.  

---

## Data Visualization  
To make event data more digestible:  
1. **Scatterplot**: Displays the number of events per location.  
2. **Pie Chart**: Visualizes the popularity of event genres.  

