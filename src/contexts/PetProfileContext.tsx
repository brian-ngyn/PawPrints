import React, { createContext, useState, useContext, ReactNode } from 'react';

interface PetProfileContextType {
  petUsername: string | null;
  setPetUsername: (petUsername: string | null) => void;
  petDescription: string;
  setPetDescription: (petDescription: string) => void;
}

interface PetProfileProviderProps {
  children: ReactNode;
}

const PetProfileContext = createContext<PetProfileContextType | undefined>(undefined);

export const usePetProfile = () => {
  const context = useContext(PetProfileContext);
  if (!context) {
    throw new Error('Error with usePetProfile in PetProfileContext');
  }
  return context;
};

export const PetProfileProvider: React.FC<PetProfileProviderProps> = ({ children }) => {
  const [petUsername, setPetUsername] = useState<string | null>('');
  const [petDescription, setPetDescription] = useState<string>('I am a new pet! I will probably get an About Me soon!');

  return (
    <PetProfileContext.Provider value={{ petUsername, setPetUsername, petDescription, setPetDescription }}>
      {children}
    </PetProfileContext.Provider>
  );
};
