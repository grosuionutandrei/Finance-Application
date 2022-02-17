import React from 'react';
import ReactDom from 'react-dom';
import { App } from './App';

ReactDom.render(
  <React.StrictMode>
    <App title="My awesome title" />
  </React.StrictMode>,
  document.getElementById('root')
);
