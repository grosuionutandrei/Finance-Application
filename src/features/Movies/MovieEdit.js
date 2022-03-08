import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../Auth/Auth.context';

export function MovieEdit() {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const { token } = useAuthContext();
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3005/movies/${movieId}`)
      .then((res) => res.json())
      .then((data) => setMovie(data));
  }, [movieId]);

  function handleInputChange(e) {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3005/movies/${movieId}`, {
      method: 'PUT',
      body: JSON.stringify(movie),
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    setMessage('Your movie was saved');
  }

  if (!movie) {
    return <p>Loading ...</p>;
  }

  return (
    <>
      {message && <strong>{message}</strong>}
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={movie.title}
          onChange={handleInputChange}
        />
        <button type="submit">Save</button>
      </form>
    </>
  );
}
