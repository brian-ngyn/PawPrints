import React, { createContext, useState, useContext, ReactNode } from 'react';

interface ProfileContextType {
  profilePic: string | null;
  setProfilePic: (url: string | null) => void;
}

interface ProfilePicProviderProps {
  children: ReactNode;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined);

export const useProfilePic = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error('Error with useProfilePic in ProfilePicContext');
  }
  return context;
};

export const ProfilePicProvider: React.FC<ProfilePicProviderProps> = ({ children }) => {
  const [profilePic, setProfilePic] = useState<string | null>(null);

  return (
    <ProfileContext.Provider value={{ profilePic, setProfilePic }}>
      {children}
    </ProfileContext.Provider>
  );
};

