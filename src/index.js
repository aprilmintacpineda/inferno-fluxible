/** @format */

import { updateStore, addObserver, getStore } from 'fluxible-js';
import redefineStatics from 'redefine-statics-js';
import { Component } from 'inferno';

/**
 *
 * @param {Function} callback function that would be called sa the mutation handler.
 * @param  {...any} payload to the callback function
 */
export function dispatch (mutation, ...payload) {
  return mutation(
    {
      getStore,
      updateStore: (updatedState, callback) => {
        updateStore(updatedState);
        if (callback) {
          callback();
        }
      }
    },
    ...payload
  );
}

/**
 * @param {Function} Would receive the current store's state as the only argument. Should return an object of the states that you want to be accessible in the connected component.
 * @param {Object} You should define your action handlers here. Each methods would be called with an object (that has `updateStore` and `getStore` methods) as the first argument. The rest would be the arguments you passed to the call.
 * @return {Object} the inferno component.
 */
export function connect (mapStatesToProps, definedMutations) {
  return WrappedComponent => {
    // we only want to compute mutations once
    const mutations = {};
    if (definedMutations) {
      const mutationKeys = Object.keys(definedMutations);

      for (let a = 0; a < mutationKeys.length; a++) {
        mutations[mutationKeys[a]] = (...payload) =>
          dispatch(definedMutations[mutationKeys[a]], ...payload);
      }
    }

    function ConnectedComponent (props) {
      this.props = props;

      if (mapStatesToProps) {
        this.mappedStates = mapStatesToProps(getStore());

        this.removeListener = addObserver(() => {
          this.mappedStates = mapStatesToProps(getStore());

          this.setState({
            count: this.state.count + 1
          });
        }, Object.keys(this.mappedStates));

        this.state = {
          count: 0
        };
      }

      this.componentWillUnmount = () => {
        if (this.removeListener) {
          this.removeListener();
        }
      };

      this.render = () => {
        if (mapStatesToProps && definedMutations) {
          return <WrappedComponent {...this.props} {...mutations} {...this.mappedStates} />;
        } else if (mapStatesToProps) {
          return <WrappedComponent {...this.props} {...this.mappedStates} />;
        }

        return <WrappedComponent {...this.props} {...mutations} />;
      };

      return this;
    }

    ConnectedComponent.prototype = Component.prototype;
    ConnectedComponent.prototype.constructor = ConnectedComponent;

    redefineStatics(ConnectedComponent, WrappedComponent);

    return ConnectedComponent;
  };
}
