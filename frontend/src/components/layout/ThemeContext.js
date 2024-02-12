import React, { createContext, useState, useEffect } from 'react';

export const ThemeContext = createContext();

// Function to get a cookie by name
const getCookie = (name) => {
  const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
  if (match) return match[2];
  return null;
};

// Function to set a cookie
const setCookie = (name, value, days = 365) => {
  const expires = new Date(Date.now() + days * 864e5).toUTCString();
  document.cookie = name + '=' + encodeURIComponent(value) + '; expires=' + expires + '; path=/';
};

export const ThemeProvider = ({ children }) => {
  // Initialize theme from cookie or fallback to 'light'
  const [theme, setTheme] = useState(getCookie('theme') || 'light');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    // Update the cookie whenever the theme changes
    setCookie('theme', theme);
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
