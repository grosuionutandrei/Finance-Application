import { useState } from 'react';
import { Child1 } from './Child1';
import { Child2 } from './Child2';

export function Parent() {
  const [messageParent, setMessageParent] = useState('');
  const [fromChild, setFromChild] = useState('');

  return (
    <>
      <h1>Parent</h1>
      <p>
        From child: <strong>{fromChild}</strong>{' '}
      </p>
      <p>
        <button
          onClick={() =>
            setMessageParent(
              'Mesaj de la parinte ' + (Math.random() * 1000).toFixed(2)
            )
          }
        >
          Send message to children
        </button>
      </p>
      <Child1
        parent={messageParent}
        onMessage={(value) => setFromChild(value)}
      />
      <Child2 parent={messageParent} child1={fromChild} />
    </>
  );
}
