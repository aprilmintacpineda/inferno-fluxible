'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initializeStore = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.connect = connect;

var _inferno = require('inferno');

var _fluxibleJs = require('fluxible-js');

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /** @format */

exports.initializeStore = _fluxibleJs.initializeStore;
function connect(wantedState, wantedMutations) {
  return function (WrappedComponent) {
    return function (_Component) {
      _inherits(Wrapper, _Component);

      function Wrapper() {
        _classCallCheck(this, Wrapper);

        return _possibleConstructorReturn(this, (Wrapper.__proto__ || Object.getPrototypeOf(Wrapper)).apply(this, arguments));
      }

      _createClass(Wrapper, [{
        key: 'componentWillMount',
        value: function componentWillMount() {
          var _this2 = this;

          this.removeListener = (0, _fluxibleJs.addListener)(function () {
            _this2.forceUpdate();
          });
        }
      }, {
        key: 'componentWillUnmount',
        value: function componentWillUnmount() {
          // clean update listener before we unmount.
          this.removeListener();
        }
      }, {
        key: 'render',
        value: function render() {
          return (0, _inferno.normalizeProps)((0, _inferno.createComponentVNode)(2, WrappedComponent, _extends({}, this.props, wantedState ? wantedState((0, _fluxibleJs.getStore)()) : {}, wantedMutations ? Object.keys(wantedMutations).reduce(function (mutationCollection, mutation) {
            return _extends({}, mutationCollection, _defineProperty({}, mutation, function () {
              for (var _len = arguments.length, payload = Array(_len), _key = 0; _key < _len; _key++) {
                payload[_key] = arguments[_key];
              }

              return wantedMutations[mutation].apply(wantedMutations, [{
                getStore: _fluxibleJs.getStore,
                updateStore: function updateStore(updatedState, callback) {
                  (0, _fluxibleJs.updateStore)(updatedState);
                  if (callback) callback();
                }
              }].concat(payload));
            }));
          }, {}) : {})));
        }
      }]);

      return Wrapper;
    }(_inferno.Component);
  };
}