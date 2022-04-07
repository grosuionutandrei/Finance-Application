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
  const [trackedList, setTrackedList] = useState(() =>
    getValueFromStorage(tracked)
  );
  const [jwtExpired, setJwtExpired] = useState(null);

  function login({ user, accessToken }) {
    setUser(user);
    setToken(accessToken);
    localStorage.setItem(userKey, JSON.stringify(user));
    localStorage.setItem(tokenKey, JSON.stringify(accessToken));
  }

  function setTrackedListLocal(data) {
    window.localStorage.setItem(tracked, JSON.stringify(data));
  }

  function setUserAfterEdit(user) {
    setUser(user);
  }

  function logout() {
    setUser(null);
    setToken(null);
    localStorage.removeItem(userKey);
    localStorage.removeItem(tokenKey);
    localStorage.removeItem('searchedCrypto');
    localStorage.removeItem('searchedParameter');
    localStorage.removeItem(tracked);
  }

  function setJwtError(value) {
    setJwtExpired(value);
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        logout,
        setUserAfterEdit,
        trackedList,
        setTrackedListLocal,
        jwtExpired,
        setJwtError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  return useContext(AuthContext);
}
