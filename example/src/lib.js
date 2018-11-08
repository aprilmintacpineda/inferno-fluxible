"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapStatesToProps = mapStatesToProps;

var _inferno = require("inferno");

var _fluxibleJs = require("fluxible-js");

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mapStatesToProps(WrappedComponent, callback) {
  function ConnectedComponent(props) {
    var _this = this;

    this.props = props;
    this.state = {
      count: 0
    };
    var mappedStates = callback((0, _fluxibleJs.getStore)());
    this.componentWillUnmount = (0, _fluxibleJs.addObserver)(function () {
      mappedStates = callback((0, _fluxibleJs.getStore)());

      _this.setState({
        count: _this.state.count + 1
      });
    }, Object.keys(mappedStates));

    this.render = function () {
      return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _objectSpread({}, _this.props, mappedStates)));
    };

    return this;
  }

  ConnectedComponent.prototype = _inferno.Component.prototype;
  ConnectedComponent.prototype.constructor = ConnectedComponent;
  (0, _redefineStaticsJs.default)(ConnectedComponent, WrappedComponent);
  return ConnectedComponent;
}