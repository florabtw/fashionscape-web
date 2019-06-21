import React from 'react';
import ReactDOM from 'react-dom';
import ReactGA from 'react-ga';

import App from './App';

import './index.css';

ReactGA.initialize('UA-101624095-5');

ReactDOM.render(<App />, document.getElementById('root'));
