import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';
import { MovieItem } from './MovieItem';

export function MovieList() {
  const [movies, setMovies] = useState(null);

  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/movies?_limit=10&_offset=0')
      .then((res) => res.json())
      .then((data) => setMovies(data));
  }, []);

  if (!movies) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      {user && <Link to="/movies/add">Add a movie</Link>}
      {movies.map((movie) => (
        <MovieItem key={movie.id} movie={movie} />
      ))}
    </>
  );
}
