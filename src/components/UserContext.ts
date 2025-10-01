import { createContext, useContext } from "react";

export interface User {
  name: string;
  loggedIn: boolean;
}

export interface UserContextType {
  user: User | null;
  login: (name: string) => void;
  logout: () => void;
}


export const UserContext = createContext<UserContextType | undefined>(undefined);


export function useUserContext(): UserContextType {
  const ctx = useContext(UserContext);
  if (!ctx) {
    throw new Error("useUserContext deve essere usato dentro <UserProvider />");
  }
  return ctx;
}
