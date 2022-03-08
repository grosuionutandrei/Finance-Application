import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';

export function Todos() {
  const [todos, setTodos] = useState(null);
  const { user, token } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/todos?userId=' + user.id, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [user.id, token]);

  if (!todos) {
    return <strong>Loading ...</strong>;
  }

  if (typeof todos === 'string') {
    console.warn(todos);
    return null; //should actually have a add todo form or something
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <label>
            <input
              type="checkbox"
              name={'completed' + todo.id}
              id={'completed' + todo.id}
              defaultChecked={todo.completed}
            />
            <Link to={'/todos/' + todo.id}>{todo.title}</Link>
          </label>
        </li>
      ))}
    </ul>
  );
}
