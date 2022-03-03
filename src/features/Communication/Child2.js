export function Child2({ parent, child1 }) {
  return (
    <>
      <h2>Child2</h2>
      <p>
        <strong>From Child 1: {child1} </strong>
      </p>
      <p>
        <strong>From Parent: {parent}</strong>
      </p>
    </>
  );
}
