import React, { createContext, useState, useContext, ReactNode } from 'react';

interface UserProfileContextType {
  username: string;
  setUsername: (username: string) => void;
  description: string;
  setDescription: (description: string) => void;
}

interface UserProfileProviderProps {
  children: ReactNode;
}

const UserProfileContext = createContext<UserProfileContextType | undefined>(undefined);

export const useUserProfile = () => {
  const context = useContext(UserProfileContext);
  if (!context) {
    throw new Error('Error with useUserProfile in UserProfileContext');
  }
  return context;
};

export const UserProfileProvider: React.FC<UserProfileProviderProps> = ({ children }) => {
  const [username, setUsername] = useState<string>('Olivia');
  const [description, setDescription] = useState<string>('I am a new user! I will probably write my About Me soon!');

  return (
    <UserProfileContext.Provider value={{ username, setUsername, description, setDescription }}>
      {children}
    </UserProfileContext.Provider>
  );
};
