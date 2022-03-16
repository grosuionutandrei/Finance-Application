import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home } from './features/Home/Home';
import { Counter } from './features/Counter/Counter';
import { Weather } from './features/Weather/Weather';
import { Auth } from './features/Auth/Auth';
import { Parent } from './features/Communication/Parent';
import { AuthContextProvider } from './features/Auth/Auth.context';

import './App.css';
import { Todos } from './features/Todos/Todos';
import { AuthGuard } from './components/AuthGuard';
import { MovieList } from './features/Movies/MovieList';
import { MovieDetails } from './features/Movies/MovieDetails';
import { MovieEdit } from './features/Movies/MovieEdit';
import { MovieAdd } from './features/Movies/MovieAdd';
import { LoginPage } from './mfeatures/LoginPage';

export function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="" element={<h1 className="text-2xl">Homepage</h1>} />
            <Route
              path="counter"
              element={<Counter delta={1} initialValue={0} />}
            />
            <Route path="weather" element={<Weather />} />
            <Route path="login" element={<LoginPage />} />
            <Route path="register" element={<LoginPage />} />
            <Route path="movies" element={<MovieList />} />
            <Route path="movies/:movieId" element={<MovieDetails />} />
            <Route
              path="movies/:movieId/edit"
              element={
                <AuthGuard>
                  <MovieEdit />
                </AuthGuard>
              }
            />
            <Route
              path="movies/add"
              element={
                <AuthGuard>
                  <MovieAdd />
                </AuthGuard>
              }
            />
            <Route
              path="todos"
              element={
                <AuthGuard>
                  <Todos />
                </AuthGuard>
              }
            />
            <Route
              path="todos/:todoId"
              element={
                <AuthGuard>
                  <Todos />
                </AuthGuard>
              }
            />
            <Route path="comm" element={<Parent />} />
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Route>
        </Routes>
      </AuthContextProvider>
    </BrowserRouter>
  );
}
