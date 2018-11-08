/** @format */

import { addObserver, getStore } from 'fluxible-js';
import redefineStatics from 'redefine-statics-js';
import { Component } from 'inferno';

export function mapStatesToProps (WrappedComponent, callback) {
  function ConnectedComponent (props) {
    this.props = props;

    this.state = {
      count: 0
    };

    let mappedStates = callback(getStore());

    this.componentWillUnmount = addObserver(() => {
      mappedStates = callback(getStore());
      this.setState({
        count: this.state.count + 1
      });
    }, Object.keys(mappedStates));

    this.render = () => <WrappedComponent {...this.props} {...mappedStates} />;

    return this;
  }

  ConnectedComponent.prototype = Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;

  redefineStatics(ConnectedComponent, WrappedComponent);

  return ConnectedComponent;
}
