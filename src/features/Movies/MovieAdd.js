import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuthContext } from '../Auth/Auth.context';

export function MovieAdd() {
  const [movie, setMovie] = useState({
    title: '',
  });
  const { token } = useAuthContext();
  const [message, setMessage] = useState('');

  function handleInputChange(e) {
    setMovie({ ...movie, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch(`http://localhost:3005/movies`, {
      method: 'POST',
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
