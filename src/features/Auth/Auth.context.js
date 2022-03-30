import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);
const userKey = 'user';
const tokenKey = 'token';
const tracked = 'trackedItems';

export function getValueFromStorage(key) {
  const fromStorage = localStorage.getItem(key);
  if (fromStorage) {
    return JSON.parse(fromStorage);
  }
  return null;
}

export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(() => getValueFromStorage(userKey));
  const [token, setToken] = useState(() => getValueFromStorage(tokenKey));
  const [trackedItems, setTrackedItems] = useState(() =>
    getValueFromStorage(tracked)
  );
  function login({ user, accessToken }) {
    setUser(user);
    setToken(accessToken);
    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.setItem(tokenKey, JSON.stringify(accessToken));
  }

  function trackList(trackList) {
    setTrackedItems(trackList);
    localStorage.setItem(tracked, JSON.stringify(trackList));
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
  }

  return (
    <AuthContext.Provider
      value={{ user, token, login, logout, trackList, trackedItems }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
