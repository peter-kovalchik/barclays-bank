"use client";
import { createContext, useContext, useState } from "react";

export interface UserType {
  name: string;
  email: string;
  password: string;
  avatar: string;
  total_income: number;
  total_spending: number;
  spending_goal: number;
  total_transactions: number;
  status: string;
  bank_account: string;
  expiry_date: string;
}

interface UserContextType {
  user: UserType | undefined;
  setUser: (value: UserType) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | undefined>(undefined);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useLayout must be used within a LayoutProvider");
  }
  return context;
};
