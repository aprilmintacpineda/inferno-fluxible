/** @format */

import { render } from 'inferno';
import App from './App';
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    username: '',
    todos: []
  },
  persist: {
    syncStorage: window.localStorage,
    restore: savedStore => {
      return {
        todos: savedStore.todos
      };
    }
  }
});

render(<App />, document.getElementById('app'));
