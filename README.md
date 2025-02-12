# Meet App

Meet App is a React-based web application that allows users to browse and filter events by city. It provides an interactive UI to search for events, view event statistics, and control the number of displayed events.

## Features
- **City Search**: Users can search for events by city.
- **Event List**: Displays a list of upcoming events.
- **Number of Events Selector**: Allows users to customize how many events they see.
- **Alerts**: Provides information, warnings, and error messages.
- **Charts**: Visualizes event distribution by city and genre.
- **OAuth Authentication**: Uses Google OAuth for authentication.
- **Offline Support**: Retrieves cached events when offline.

## Technologies Used
- **React**: Component-based UI.
- **React Hooks**: Manages state and side effects.
- **Recharts**: Displays event statistics.
- **Vite**: Fast build tool for modern web applications.
- **Workbox**: Enables Progressive Web App (PWA) functionality.
- **OAuth**: Used for secure authentication.

## Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/lorondo/meet.git
   cd meet-app
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Application Locally
To run the app locally, follow these steps:
1. Start the development server:
   ```sh
   npm run dev
   ```
2. Open the app in your browser:
   - The app should be available at `http://localhost:5173/` (default Vite port).

## Component Overview
- **App.jsx**: Main component managing state and rendering UI.
- **CitySearch.jsx**: Handles city-based event search.
- **EventList.jsx**: Displays event details.
- **NumberOfEvents.jsx**: Allows users to set the number of displayed events.
- **Alert.jsx**: Displays information, warnings, and errors.
- **CityEventsChart.jsx & EventGenresChart.jsx**: Provide visual insights into events.
- **api.js**:
  - Retrieves event data from an API.
  - Handles OAuth authentication.
  - Caches events for offline use.

## Authentication & API
1. **OAuth Authentication**:
   - The app requests an access token from Google's OAuth service.
   - If unauthorized, users are redirected to the login page.
   - Tokens are stored locally and verified before fetching data.
2. **Fetching Events**:
   - Events are retrieved from an external API.
   - If offline, cached event data is used.
   - Data is stored in `localStorage` for faster access.

## Offline Support
- Displays a warning alert if the user goes offline.
- Fetches and updates events dynamically when online.
- Uses `localStorage` to store the last retrieved events.

## Deployment
1. Build the app:
   ```sh
   npm run build
   ```
2. Deploy using GitHub Pages:
   ```sh
   npm run deploy
   ```

## Future Enhancements
- Add user authentication.
- Implement dark mode.
- Enhance event filtering and search capabilities.

## License
This project is licensed under the MIT License.

