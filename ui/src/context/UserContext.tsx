import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { User } from "@/types/models/User";
import LocalUserService from "@/services/LocalUserService";

interface UserContextType {
  user: User | null;
  setUser: (profile: User | null) => void;
}

const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = LocalUserService.getProfile();
        setUserState(savedProfile);
      } catch (error) {
        LocalUserService.clearProfile();
      }
    };

    loadProfile();
  }, []);

  const setUser = useCallback(
    (newProfile: User | null): void => {
      if (newProfile) {
        LocalUserService.saveProfile(newProfile);
        setUserState(newProfile);
      } else {
        LocalUserService.clearProfile();
        setUserState(null);
      }
    },
    [setUserState]
  );

  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

export const useUserContext = (): UserContextType => {
  return useContext(UserContext);
};
