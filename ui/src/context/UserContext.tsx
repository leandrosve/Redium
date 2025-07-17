// contexts/UserProfileContext.tsx
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { User } from "@/types/models/User";
import UserService from "@/services/UserService";

// Definimos el tipo primero
interface UserContextType {
  user: User | null;
  setUser: (profile: User | null) => void;
}

// Creamos el contexto con el tipo definido
const UserContext = createContext<UserContextType>({
  user: null,
  setUser: () => {},
});

// Definimos las props del provider
interface UserProviderProps {
  children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const loadProfile = () => {
      try {
        const savedProfile = UserService.getProfile();
        setUserState(savedProfile);
      } catch (error) {
        console.error("Error loading profile:", error);
        UserService.clearProfile();
      }
    };

    loadProfile();
  }, []);

  const setUser = useCallback(
    (newProfile: User | null): void => {
      if (newProfile) {
        UserService.saveProfile(newProfile);
        setUserState(newProfile);
      } else {
        UserService.clearProfile();
        setUserState(null);
      }
    },
    [setUserState]
  );

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = (): UserContextType => {
  return useContext(UserContext);
};
