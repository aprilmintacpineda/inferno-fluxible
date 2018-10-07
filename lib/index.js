"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dispatch = dispatch;
exports.connect = connect;

var _inferno = require("inferno");

var _fluxibleJs = require("fluxible-js");

var _infernoCreateClass = require("inferno-create-class");

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
    var mutations = {};

    if (definedMutations) {
      (function () {
        var mutationKeys = Object.keys(definedMutations);

        var _loop = function _loop(a) {
          mutations[mutationKeys[a]] = function () {
            for (var _len2 = arguments.length, payload = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
              payload[_key2] = arguments[_key2];
            }

            return dispatch.apply(void 0, [definedMutations[mutationKeys[a]]].concat(payload));
          };
        };

        for (var a = 0; a < mutationKeys.length; a++) {
          _loop(a);
        }
      })();
    }

    return (0, _redefineStaticsJs.default)((0, _infernoCreateClass.createClass)({
      getInitialState: function getInitialState() {
        return {
          count: 0
        };
      },
      componentDidMount: function componentDidMount() {
        var _this = this;

        this.removeListener = (0, _fluxibleJs.addUpdateListener)(function () {
          _this.setState({
            count: _this.state.count + 1
          });
        });
      },
      componentWillUnmount: function componentWillUnmount() {
        // clean update listener before we unmount.
        this.removeListener();
      },
      render: function render() {
        return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _objectSpread({}, this.props, mapStatesToProps ? mapStatesToProps((0, _fluxibleJs.getStore)()) : {}, mutations)));
      }
    }), WrappedComponent);
  };
}