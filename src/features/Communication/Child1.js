export function Child1({ parent, onMessage }) {
  return (
    <>
      <h2>Child1</h2>

      <p>
        <strong>From Parent: {parent}</strong>
      </p>
      <p>
        <button
          onClick={() => onMessage('Un mesaj de la copil ' + Math.random())}
        >
          Send message to parent
        </button>
      </p>
      <p>
        <button>Send message to child 2</button>
      </p>
    </>
  );
}
