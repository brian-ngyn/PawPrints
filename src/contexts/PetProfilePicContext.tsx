import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProfileContextType {
  PetProfilePic: string | null;
  setPetProfilePic: (url: string | null) => void;
}

interface ProfilePicProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const usePetProfilePic = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('Error with UsePetProfilePic in PetProfilePicContext');
  }
  return context;
};

export const PetProfilePicProvider: React.FC<ProfilePicProviderProps> = ({ children }) => {
  const [PetProfilePic, setPetProfilePic] = useState<string | null>(null);

  return (
    <ProfileContext.Provider value={{ PetProfilePic, setPetProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};

