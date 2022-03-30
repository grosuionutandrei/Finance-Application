import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { Crypto } from './stockFeatures/Crypto/Crypto';
import { AuthContextProvider } from './features/Auth/Auth.context';
import './App.css';
import { LoginPage } from './mfeatures/LoginPage';
import { HomePage } from './stockFeatures/HomePage/HomePage';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<HomePage />} />
            <Route path="crypto" element={<Crypto />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
