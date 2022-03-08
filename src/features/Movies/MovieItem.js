import { Link } from 'react-router-dom';

export function MovieItem({ movie }) {
  return (
    <article>
      <Link to={`/movies/${movie.id}`}>
        <img src={movie.poster} alt={`Poster of ${movie.title}`} />
        <h1>{movie.title}</h1>
      </Link>
    </article>
  );
}
