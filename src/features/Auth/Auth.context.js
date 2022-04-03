import { createContext, useContext, useState } from 'react';
import { saveTrackedItemsAtLogout } from '../../stockComponents/Helpers';

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
  function setUserAfterEdit(user) {
    setUser(user);
  }

  function logout() {
    saveTrackedItemsAtLogout(user, token, trackedItems);
    setUser(null);
    setToken(null);
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem(tracked);
    localStorage.removeItem('searchedCrypto');
    localStorage.removeItem('searchedParameter');
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        trackList,
        trackedItems,
        setUserAfterEdit,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
