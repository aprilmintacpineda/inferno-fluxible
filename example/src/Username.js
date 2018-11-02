/** @format */

import { Component } from 'inferno';
import { mapStatesToProps } from './lib';

class Username extends Component {
  render () {
    return (
      <div>
        <h3>Username component: Your usename (managed by inferno-fluxible)</h3>
        <p>{this.props.username.length ? this.props.username : 'You have no username.'}</p>
      </div>
    );
  }
}

export default mapStatesToProps(Username, state => ({
  username: state.username
}));
