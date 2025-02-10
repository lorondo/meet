// src/api.js

import mockData from './mock-data';
import NProgress from 'nprogress';

// 1️⃣ Helper Function: Remove Query Parameters from URL
const removeQuery = () => {
  let newurl;
  if (window.history.pushState && window.location.pathname) {
    newurl = window.location.protocol + "//" + window.location.host + window.location.pathname;
    window.history.pushState("", "", newurl);
  } else {
    newurl = window.location.protocol + "//" + window.location.host;
    window.history.pushState("", "", newurl);
  }
};

// 2️⃣ Helper Function: Validate Access Token
const checkToken = async (accessToken) => {
  const response = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  );
  return await response.json();
};

// 3️⃣ Authentication Function: Get New Access Token
const getToken = async (code) => {
  const encodeCode = encodeURIComponent(code);
  const response = await fetch(
    "https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/token" + "/" + encodeCode
  );
  const { access_token } = await response.json();
  
  if (access_token) {
    localStorage.setItem("access_token", access_token);
  }

  return access_token;
};

// 4️⃣ Authentication Function: Retrieve Access Token (Main)
export const getAccessToken = async () => {
  const accessToken = localStorage.getItem('access_token');
  const tokenCheck = accessToken && (await checkToken(accessToken));

  if (!accessToken || tokenCheck.error) {
    localStorage.removeItem("access_token");
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (!code) {
      const response = await fetch(
        "https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/get-auth-url"
      );
      const result = await response.json();
      return (window.location.href = result.authUrl);
    }
    
    return getToken(code);
  }
  
  return accessToken;
};

// 5️⃣ Data Processing Function: Extract Unique Locations from Events
export const extractLocations = (events) => {
  const extractedLocations = events.map((event) => event.location);
  return [...new Set(extractedLocations)];
};

// 6️⃣ Event Fetching Function (Main)
export const getEvents = async () => {
  if (window.location.href.startsWith("http://localhost")) {
    return mockData;
  }

  if (!navigator.onLine) {
    const events = localStorage.getItem("lastEvents");
    NProgress.done();
    return events ? JSON.parse(events) : [];
  }

  const token = await getAccessToken();

  if (token) {
    removeQuery();
    const url = 
      'https://un1axvwmqg.execute-api.us-east-2.amazonaws.com/dev/api/get-events' + 
      '/' + 
      token;

    const response = await fetch(url);
    const result = await response.json();

    if (result) {
      NProgress.done();
      localStorage.setItem("lastEvents", JSON.stringify(result.events));
      return result.events;
    }
  }
  
  return null;
};