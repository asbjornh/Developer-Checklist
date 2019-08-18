require('./scss/app.scss');
require('highlight.js/styles/tomorrow-night-blue.css');

import React from 'react';
import { render } from 'react-dom';

import content from './data/content.json';
import Main from './components/main';

window.onload = function() {
  render(<Main {...content} />, document.getElementById('app'));
};
