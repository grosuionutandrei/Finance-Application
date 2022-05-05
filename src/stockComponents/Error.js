import React from 'react';

export const Error = ({ error, className, style }) => {
  return (
    <p
      className={` bg-red-200 text-red-600 bold p-2 ${className}`}
      style={style}
    >
      {error}
    </p>
  );
};
