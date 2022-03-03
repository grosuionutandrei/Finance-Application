import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

export function TodoItem() {
  const { todoId } = useParams();
  const [todo, setTodo] = useState(null);

  useEffect(() => {
    fetch('http://localhost:3005/todos/' + todoId)
      .then((res) => res.json())
      .then((data) => setTodo(data));
  }, [todoId]);

  if (!todo) {
    return <strong>Loading ...</strong>;
  }
  return <h1>{todo.title}</h1>;
}
