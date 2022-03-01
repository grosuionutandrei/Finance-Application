import { useState } from 'react';

export function Auth() {
  const [values, setValues] = useState({
    email: '',
    password: '',
  });
  const [serverError, setServerError] = useState();

  function handleInputChange(e) {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    const data = await fetch('http://localhost:3005/login', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(values),
    }).then((res) => res.json());

    if (!data.accessToken) {
      setServerError(data);
    }

    //if the user actually logged in
    // ... show the user first name in the nav bar
    // ... show a logout button in the nav bar
    // ... redirect away from the login page and don't allow the user to return to login if already logged in
  }

  return (
    <form onSubmit={handleSubmit}>
      {serverError && (
        <p className="bg-red-200 text-red-900 bold p-2">{serverError}</p>
      )}
      <p className="my-2">
        <label htmlFor="email">Email: </label>
        <input
          type="email"
          name="email"
          value={values.email}
          onChange={handleInputChange}
          id="email"
          className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
        />
      </p>
      <p className="my-2">
        <label htmlFor="password">Password: </label>
        <input
          type="password"
          name="password"
          value={values.password}
          onChange={handleInputChange}
          id="password"
          className="border-2 border-slate-900 p-1 text-slate-900 rounded-md"
        />
      </p>
      <p className="my-2">
        <button
          type="submit"
          className="rounded-md bg-slate-900 text-slate-100 py-1 px-3"
        >
          Login
        </button>
      </p>
    </form>
  );
}
