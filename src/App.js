import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { Counter } from './features/Counter/Counter';
import { Weather } from './features/Weather/Weather';
import { Auth } from './features/Auth/Auth';

import './App.css';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path="" element={<h1 className="text-2xl">Homepage</h1>} />
          <Route
            path="counter"
            element={<Counter delta={1} initialValue={0} />}
          />
          <Route path="weather" element={<Weather />} />
          <Route path="login" element={<Auth />} />
          <Route path="*" element={<h1>404 Not Found</h1>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
