/** @format */

import { updateStore, addUpdateListener, getStore } from 'fluxible-js';
import { Component } from 'inferno';

/**
 *
 * @param {Function} Would receive the current store's state as the only argument. Should return an object of the states that you want to be accessible in the connected component.
 * @param {Object} You should define your action handlers here. Each methods would be called with an object (that has `updateStore` and `getStore` methods) as the first argument. The rest would be the arguments you passed to the call.
 * @return {Object} the inferno component.
 */
export function connect (mapStatesToProps, definedMutations) {
  return WrappedComponent =>
    class Wrapper extends Component {
      constructor (props) {
        super(props);

        this.state = {
          count: 1
        };

        this.removeListener = addUpdateListener(() => {
          this.setState({
            count: this.state.count + 1
          });
        });
      }

      componentWillUnmount () {
        // clean update listener before we unmount.
        this.removeListener();
      }

      render () {
        return (
          <WrappedComponent
            {...this.props}
            {...(mapStatesToProps ? mapStatesToProps(getStore()) : {})}
            {...(definedMutations
              ? Object.keys(definedMutations).reduce((mutationCollection, mutation) => {
                  return {
                    ...mutationCollection,
                    [mutation]: (...payload) => {
                      return definedMutations[mutation](
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
