import React from 'react';
import ReactDOM from 'react-dom';

import './style.css';
import BashPromptGenerator from './BashPromptGenerator';

ReactDOM.render(
  <React.StrictMode>
    <BashPromptGenerator />
  </React.StrictMode>,
  document.getElementById('react-mount')
);
