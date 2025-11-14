"use client";
import { createContext, useState, useEffect, ReactNode } from "react";

export const UserContext = createContext({
  user: null,
  setUser: (user: any) => {},
  removeUser: () => {},
});

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUserState] = useState<any>(null);

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (stored) setUserState(JSON.parse(stored));
  }, []);

  const setUser = (user: any) => {
    localStorage.setItem("user", JSON.stringify(user));
    setUserState(user);
  };

  const removeUser = () => {
    localStorage.removeItem("user");
    setUserState(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser, removeUser }}>
      {children}
    </UserContext.Provider>
  );
};
