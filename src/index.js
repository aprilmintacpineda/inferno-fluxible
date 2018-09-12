/** @format */

import { initializeStore, updateStore, addListener, getStore } from 'fluxible-js';
import { Component } from 'inferno';

export { initializeStore };

export function connect (wantedState, wantedMutations) {
  return WrappedComponent =>
    class Wrapper extends Component {
      componentWillMount () {
        this.removeListener = addListener(() => {
          this.forceUpdate();
        });
      }

      componentWillUnmount () {
        // clean update listener before we unmount.
        this.removeListener();
      }

      render () {
        return (
          <WrappedComponent
            {...(wantedState ? wantedState(getStore()) : {})}
            {...(wantedMutations
              ? Object.keys(wantedMutations).reduce((mutationCollection, mutation) => {
                  return {
                    ...mutationCollection,
                    [mutation]: (...payload) => {
                      return wantedMutations[mutation](
                        {
                          getStore,
                          updateStore: (updatedState, callback) => {
                            updateStore(updatedState);
                            if (callback) callback();
                          }
                        },
                        ...payload
                      );
                    }
                  };
                }, {})
              : {})}
          />
        );
      }
    };
}
