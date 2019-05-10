"use strict";

exports.__esModule = true;
exports.mapStatesToProps = mapStatesToProps;

var _inferno = require("inferno");

var _fluxibleJs = require("fluxible-js");

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function mapStatesToProps(WrappedComponent, callback) {
  function ConnectedComponent(props) {
    var _this = this;

    this.props = props;
    this.state = {
      mappedStates: callback(_fluxibleJs.store)
    };
    this.componentWillUnmount = (0, _fluxibleJs.addObserver)(function () {
      _this.setState({
        mappedStates: callback(_fluxibleJs.store)
      });
    }, Object.keys(this.state.mappedStates));

    this.render = function () {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _extends({}, _this.props, _this.state.mappedStates)));
    };

    return this;
  }

  ConnectedComponent.prototype = _inferno.Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;
  (0, _redefineStaticsJs["default"])(ConnectedComponent, WrappedComponent);
  return ConnectedComponent;
}