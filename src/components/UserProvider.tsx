import { useState } from "react";
import type { ReactNode } from "react";
import { UserContext } from "./UserContext";
import type { User, UserContextType } from "./UserContext";

interface UserProviderProps {
  children: ReactNode;
}

export function UserProvider({ children }: UserProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const login = (name: string) => setUser({ name, loggedIn: true });
  const logout = () => setUser(null);

  const value: UserContextType = { user, login, logout };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}
