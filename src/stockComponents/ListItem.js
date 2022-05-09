import { useState } from 'react';
function ItemComponent({ style, children }) {
  const [changeStyle, setChangeStyle] = useState(false);
  return (
    <li
      onClick={() => {
        setChangeStyle(true);
      }}
      style={changeStyle ? style : null}
    >
      {children}
    </li>
  );
}
