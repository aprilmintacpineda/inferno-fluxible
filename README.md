<!-- @format -->

# inferno-fluxible

Smaller, faster, better. A small state management system that supports the idea of asynchronous actions and state persistence out of the box. Built on top of [fluxible-js](https://github.com/aprilmintacpineda/fluxible-js). [See demo](https://aprilmintacpineda.github.io/inferno-fluxible/).

# Guide

`inferno-fluxible` is related to [inferno-context-api-store](https://github.com/aprilmintacpineda/inferno-context-api-store) and [redux](https://github.com/reduxjs/redux). Except in `inferno-fluxible`, there's no need for a provider.

### Install

`npm i -s inferno-fluxible fluxible-js redefine-statics-js`

### Initialize store

```jsx
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: {
      name: 'Test User'
    },
    state: 'value',
    anotherState: {
      count: 1
    },
    oneMoreState: false
  }
});

// rest of the app.
```

instead of rendering a Provider on top of your app. What you do is before you render your app, you have to call `initializeStore` function.

`initializeStore` function expects an object as the only parameter, the object have a required property called `initialStore` which will be used as the initial value of the store.

There's also the optional property called `persist` which should also be an object containing two required properties:

- `storage` which should be a reference to the storage that will be used to save the store. It must have `getItem` and `setItem` methods. Both methods should be synchronous. Example will be `window.localStorage`. The call to `setItem` is deferred by 200ms, this is to minimize and to improve performance.
- `restore` which should be a function that is synchronous. Restore will be called upon initialization and will receive the `savedStore` as the its only argument. The `savedStore` will be an object containing the states that were previously saved to the storage. It should return an object which will be the states that you want to restore.

Persist feature will only save keys that were returned by `config.persist.restore`. That means, other states that you did not return in that method will not be saved.

##### Example

```js
import { initializeStore } from 'fluxible-js';

initializeStore({
  initialStore: {
    user: null,
    someOtherState: 'value',
    anotherState: {
      value: 'value'
    }
  },
  persist: {
    storage: window.localStorage,
    restore: savedStore => ({
      user: savedStore.user || null
    })
  }
});
```

In the case above, only `user` will be saved and the rest will not be saved.

### Connect your components to the store

```jsx
import { connect } from 'inferno-fluxible';

class MyComponent extends Component {
  handleClick = () => {
    this.props.updateAnotherState({
      count: this.props.anotherState.count + 1
    });
  };

  render() {
    return (
      <div>
        <p>{this.props.user.name}</p>
        <button onClick={this.handleClick}>Click me</button>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
}

const mutations = {
  updateAnotherState(store, anotherState) {
    function callback() {
      console.log('called back');
    }

    // callback is optional
    store.updateStore({ anotherState }, callback);
  }
};

export default connect(
  mapStateToProps,
  mutations
)(MyComponent);
```

`mapStateToProps` _MUST_ be a function that _MUST_ return an object containing the states that you want to be accessible in the connected component as props.

`mutations` _MUST_ be an object that has methods in it. The methods will be the ones you can call to update a specific part of the store. Mutation object is expected to be constant.

Both `mapStateToProps`, `mutations` are optional. That mean you can specify `mutations` but not `mapStateToProps` like so:

```jsx
export default connect(
  undefined,
  mutations
)(MyComponent);
```

Vice versa with `mapStateToProps` like so:

```jsx
export default connect(mapStateToProps)(MyComponent);
```

Although you both are not required, I don't recommend connecting a component but not having both `mapStateToProps` and `mutations`.

##### Warnings about `mapStateToProps`

**The returned object keys of `mapStateToProps` should not change**.

i.e., make sure that the keys are always there and have been there from the start. Doing something like this will cause your component to fail in future updates:

```js
function mapStateToProps(storeState) {
  const states = {};

  if (somecondition) {
    states.key = storeState.key;
  }

  return states;
}
```

**Returned object keys of `mapStateToProps` should be the same keys as the state's**

Example:

_do_

```jsx
function mapStateToProps(state) {
  return {
    user: state.user,
    anotherState: state.anotherState
  };
}
```

_Don't do_: Doing so will cause the connected component to fail to update when `state.user` gets updated.

```jsx
function mapStateToProps(state) {
  return {
    aDifferentKey: state.user,
    anotherState: state.anotherState
  };
}
```

**Connected components that does not have `mapStateToProps` will not update**.

Update listeners will only be called when a particular state that they are observing have been updated, if not, then they will not be update. Thus, having no `mapStateToProps` means that your connected component will not be updated due to store update since it is not and will not observe any states at all.

### Mutations

When you call a mutation, you can provide arguments. Except you have to keep in mind that the first parameter that your function will receive is the object called `store`. The `store` has `getStore` and `updateStore` methods.

##### `store.getStore`

Method which you can call anytime to get the latest `store` at that point of call.

##### `store.updateStore`

Method which you can call anytime to update a specific part of the `store`. It expects an object as the first parameter, the object should contain the states that you want to update.

```jsx
const mutations = {
  updateAnotherState(store, anotherState) {
    store.updateStore({ anotherState });
  }
};
```

In the example code above, when you call `this.props.updateAnotherState`, it will only update `anotherState` key of the store, the rest will remains as they were before the update. The method also expects a function as an optional second parameter that will be called **after** the update but **before** persist (if you use persist).

### getStore module

The `getStore` module is a function that you can call anytime to get the latest store at that point of call.

```jsx
import { getStore } from 'fluxible-js';

function notConnectedToStoreFunc() {
  const store = getStore();
  console.log(store);
  // rest of the code
}
```

### dispatch module

The `dispatch` module is a function that you can use to dispatch actions outside a connected component. It expects a callback function as the first parameter, and other parameters will be passed to the callback function as succeeding arguments.

```jsx
import { dispatch } from 'inferno-fluxible';

function notConnectedToStoreFunc() {
  dispatch(
    (store, param1, param2) => {
      store.updateStore({
        state: 'value'
      });
    },
    'value1',
    'value2'
  );
}
```

# Migrating from inferno-context-api-store

The difference here is the that `inferno-context-api-store` is completely coupled to Context API. This one uses `fluxible-js` to manage state. The job of `inferno-fluxible` is only to serve as a bridge between `inferno` and `fluxible-js`.

The only thing you will need to change in your existing set up is the Provider.

1. `npm un -s inferno-context-api-store`
2. Remove `Provider`.
3. [Initialize store](#initialize-store).
4. Replace all `import { connect } from 'inferno-context-api-store';` with `import { connect } from 'inferno-fluxible'`.
5. Test your app.

###### Notes

Deferred updates is not supported by inferno-fluxible.

---

If you experienced any difficulty migrating, feel free to open an issue.

# Contributing

Discussions, questions, suggestions, bug reports, feature request, etc are all welcome. Just create an issue. Just ensure that you are responsive enough.

---

Created with :heart: by April Mintac Pineda.
