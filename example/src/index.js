/** @format */

import { render } from 'inferno';
import App from './App';
import { initializeStore } from './lib';

initializeStore({
  username: '',
  todos: []
});

render(<App />, document.getElementById('app'));
