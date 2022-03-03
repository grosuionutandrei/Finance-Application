import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthContext } from '../Auth/Auth.context';

export function Todos() {
  const [todos, setTodos] = useState(null);
  const { user } = useAuthContext();

  useEffect(() => {
    fetch('http://localhost:3005/todos?userId=' + user.id)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, [user.id]);

  if (!todos) {
    return <strong>Loading ...</strong>;
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
