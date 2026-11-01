import { createContext, useState, useContext, type ReactNode } from "react";
import type { AuthReturnObjType, User } from "../data/Interface";

type AuthContextType = {
  user: { email: string } | null;
  signUp: (email: string, password: string) => AuthReturnObjType;
  login: (email: string, password: string) => AuthReturnObjType;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}

export default function AuthProvider({ children }: { children: ReactNode }) {
  const storedEmail = localStorage.getItem("currentUserEmail");

  const [user, setUser] = useState<{ email: string } | null>(
    storedEmail ? { email: storedEmail } : null,
  );

  function signUp(email: string, password: string): AuthReturnObjType {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");

    if (users.find((u) => u.email === email)) {
      return { success: false, error: "User email already exists." };
    }

    const newUser: User = { email: email, password: password };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("currentUserEmail", JSON.stringify(newUser.email));
    setUser({ email });

    return { success: true };
  }

  function login(email: string, password: string): AuthReturnObjType {
    const users: User[] = JSON.parse(localStorage.getItem("users") || "[]");
    const user = users.find(
      (u) => u.email === email && u.password === password,
    );

    if (!user) {
      return { success: false, error: "Invalid email or password." };
    }

    localStorage.setItem("currentUserEmail", email);
    setUser({ email });

    return { success: true };
  }

  function logout() {
    localStorage.removeItem("currentUserEmail");
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ signUp, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
