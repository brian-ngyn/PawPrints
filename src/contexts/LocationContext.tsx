import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LocationContextType {
  location: string;
  setLocation: React.Dispatch<React.SetStateAction<string>>;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export const LocationProvider = ({ children }: { children: ReactNode }) => {
  const [location, setLocation] = useState<string>('No Location Set'); 

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

export const useLocation = () => {
  const context = useContext(LocationContext);
  if (!context) {
    throw new Error('Error with useLocation in LocationContext');
  }
  return context;
};
