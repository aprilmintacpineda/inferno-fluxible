/** @format */

import { render } from 'inferno';
import { initializeStore } from 'fluxible-js';
import localforage from 'localforage';

import App from './App';

localforage.config({
  driver: [
    localforage.WEBSQL,
    localforage.INDEXEDDB,
    localforage.LOCALSTORAGE
  ],
  name: 'myApp',
  version: '1.0',
  storeName: 'asyncStorage',
  description: 'inferno-fluxible example using asyncStorage'
});

initializeStore(
  {
    initialStore: {
      username: '',
      todos: []
    },
    persist: {
      useJson: false,
      asyncStorage: localforage,
      restore: savedStore => {
        return {
          todos: savedStore.todos
        };
      }
    }
  },
  () => {
    // eslint-disable-next-line
    console.log('async init done.');
    render(<App />, document.getElementById('app'));
  }
);
