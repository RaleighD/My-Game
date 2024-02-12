import React, { useContext } from 'react';
import { ThemeContext } from '../components/layout/ThemeContext';

const SettingsPage = () => {
  const { theme, setTheme } = useContext(ThemeContext);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    // Here you would also call the API to update the user's theme preference in the database
  };

  return (
    <div>
      {/* ...other settings... */}
      <button onClick={toggleTheme}>
        Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
      </button>
    </div>
  );
};

export default SettingsPage;
