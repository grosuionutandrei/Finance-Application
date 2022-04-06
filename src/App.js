import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { Crypto } from './stockFeatures/Crypto/Crypto';
import { AuthContextProvider } from './features/Auth/Auth.context';
import './App.css';
import { LoginPage } from './mfeatures/LoginPage';
import { HomePage } from './stockFeatures/HomePage/HomePage';
import { TrackedItems } from './stockFeatures/TrackedItems/TrackedItems';
import { Profile } from './stockFeatures/Profile/Profile';
import { Details } from './stockFeatures/CryptoDetails/Details';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<HomePage />} />
            <Route path="crypto" element={<Crypto />} />
            <Route path="trackedItems" element={<TrackedItems />}></Route>
            <Route
              path="trackedItems/:symbolCrypto"
              element={<Details />}
            ></Route>
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage />} />
            <Route path="profile" element={<Profile />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
