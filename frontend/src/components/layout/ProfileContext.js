import React, { createContext, useContext, useState } from 'react';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
  const [profileComplete, setProfileComplete] = useState(null);

  return (
    <ProfileContext.Provider value={{ profileComplete, setProfileComplete }}>
      {children}
    </ProfileContext.Provider>
  );
};
