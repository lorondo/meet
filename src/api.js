import NProgress from "nprogress";
import "nprogress/nprogress.css"; // Import styles
import mockData from './mock-data';

/**
 * Extracts unique locations from event data.
 */
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

/**
 * Fetches the list of all events.
 */
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  try {
    const token = await getAccessToken();
    if (!token) throw new Error("No valid access token available.");

    removeQuery();
    const url = `https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/get-events?access_token=${token}`;

    const response = await fetch(url);
    if (!response.ok) throw new Error(`API responded with status: ${response.status}`);

    const result = await response.json();
    if (result && result.events) {
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      NProgress.done();
      return result.events;
    }

    return [];
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
};

/**
 * Retrieves the access token, refreshing if necessary.
 */
export const getAccessToken = async () => {
  try {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      const tokenCheck = await checkToken(accessToken);
      if (!tokenCheck.error) return accessToken;
    }

    console.warn("Invalid or expired access token. Re-authenticating...");
    localStorage.removeItem("access_token");

    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      return await getAuthUrl(); // Redirect to Google OAuth
    }

    return await getToken(code);
  } catch (error) {
    console.error("Error retrieving access token:", error);
    return null;
  }
};

/**
 * Checks if an access token is valid.
 */
const checkToken = async (accessToken) => {
  try {
    const response = await fetch(
      `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
    );
    if (!response.ok) {
      throw new Error(`Token verification failed with status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error checking token:", error);
    return { error: true };
  }
};

/**
 * Redirects the user to authenticate and obtain a new access token.
 */
const getAuthUrl = async () => {
  try {
    const response = await fetch(
      "https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
    );
    if (!response.ok) throw new Error(`Auth URL request failed: ${response.status}`);

    const result = await response.json();
    if (result.authUrl) {
      window.location.href = result.authUrl;
    } else {
      throw new Error("Authentication URL not received.");
    }
  } catch (error) {
    console.error("Error retrieving auth URL:", error);
  }
};

/**
 * Removes authentication query parameters from the URL.
 */
const removeQuery = () => {
  const newurl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
  window.history.pushState("", "", newurl);
};

/**
 * Fetches an access token using the authorization code.
 */
const getToken = async (code) => {
  try {
    const encodeCode = encodeURIComponent(code);
    const response = await fetch(
      `https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/token/${encodeCode}`
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch token. Status: ${response.status}`);
    }

    const { access_token } = await response.json();
    
    if (!access_token) {
      throw new Error("No access token received.");
    }

    localStorage.setItem("access_token", access_token);
    return access_token;
  } catch (error) {
    console.error("Error fetching token:", error);
    return null;
  }
};