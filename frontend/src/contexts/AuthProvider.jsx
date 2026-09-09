import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { logout as logoutRequest } from "../api/staffApi";

const STORAGE_KEY = "staffmaster.loggedInStaff";

function getStoredStaff() {
  const storedStaff = sessionStorage.getItem(STORAGE_KEY);

  if (!storedStaff) {
    return null;
  }

  try {
    return JSON.parse(storedStaff);
  } catch {
    sessionStorage.removeItem(STORAGE_KEY);
    return null;
  }
}

export function AuthProvider({ children }) {
  const [currentStaff, setCurrentStaff] = useState(getStoredStaff);

  function login(staff) {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(staff));
    setCurrentStaff(staff);
  }

  async function logout() {
    await logoutRequest();

    sessionStorage.removeItem(STORAGE_KEY);
    setCurrentStaff(null);
  }

  const value = {
    currentStaff,
    isLoggedIn: currentStaff !== null,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
