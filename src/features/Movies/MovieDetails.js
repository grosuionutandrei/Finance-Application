import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';

export function MovieDetails() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { token } = useAuthContext();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:3005/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  async function handleDelete() {
    const response = window.confirm(
      `Are you sure you want to delete the movie "${movie.title}"?`
    );
    if (response) {
      await fetch(`http://localhost:3005/movies/${movieId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      navigate('/movies');
    }
  }

  if (!movie) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      <h1>{movie.title}</h1>
      <img src={movie.poster} alt={`Poster for ${movie.title}`} />
      {token && <button onClick={handleDelete}>Delete</button>}
      {token && <Link to={`/movies/${movie.id}/edit`}>Edit this movie</Link>}
    </>
  );
}
