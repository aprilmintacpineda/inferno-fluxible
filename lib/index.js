"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.connect = connect;

var _inferno = require("inferno");

var _fluxibleJs = require("fluxible-js");

var _redefineStaticsJs = _interopRequireDefault(require("redefine-statics-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 *
 * @param {Function} callback function that would be called sa the mutation handler.
 * @param  {...any} payload to the callback function
 */
function dispatch(mutation) {
  for (var _len = arguments.length, payload = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    payload[_key - 1] = arguments[_key];
  }

  return mutation.apply(void 0, [{
    getStore: _fluxibleJs.getStore,
    updateStore: function updateStore(updatedState, callback) {
      (0, _fluxibleJs.updateStore)(updatedState);
      if (callback) callback();
    }
  }].concat(payload));
}
/**
 * @param {Function} Would receive the current store's state as the only argument. Should return an object of the states that you want to be accessible in the connected component.
 * @param {Object} You should define your action handlers here. Each methods would be called with an object (that has `updateStore` and `getStore` methods) as the first argument. The rest would be the arguments you passed to the call.
 * @return {Object} the inferno component.
 */


function connect(mapStatesToProps, definedMutations) {
  return function (WrappedComponent) {
    // we only want to compute mutations once
    var mutations;

    if (definedMutations) {
      mutations = {};
      Object.keys(definedMutations).forEach(function (key) {
        mutations[key] = function () {
          for (var _len2 = arguments.length, payload = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            payload[_key2] = arguments[_key2];
          }

          return dispatch.apply(void 0, [definedMutations[key]].concat(payload));
        };
      });
    }

    function ConnectedComponent(props) {
      var _this = this;

      this.props = props;

      if (mapStatesToProps) {
        this.removeListener = (0, _fluxibleJs.addObserver)(function () {
          _this.setState({
            count: _this.state.count + 1
          });
        }, Object.keys(mapStatesToProps((0, _fluxibleJs.getStore)())));
        this.state = {
          count: 0
        };
      }

      this.componentWillUnmount = function () {
        if (_this.removeListener) _this.removeListener();
      };

      this.render = function () {
        if (mapStatesToProps && mutations) {
          return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _objectSpread({}, _this.props, mutations, mapStatesToProps((0, _fluxibleJs.getStore)()))));
        } else if (mapStatesToProps) {
          return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _objectSpread({}, _this.props, mapStatesToProps((0, _fluxibleJs.getStore)()))));
        }

        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _objectSpread({}, _this.props, mutations)));
      };

      return this;
    }

    ConnectedComponent.prototype = _inferno.Component.prototype;
    ConnectedComponent.prototype.constructor = ConnectedComponent;
    (0, _redefineStaticsJs.default)(ConnectedComponent, WrappedComponent);
    return ConnectedComponent;
  };
}