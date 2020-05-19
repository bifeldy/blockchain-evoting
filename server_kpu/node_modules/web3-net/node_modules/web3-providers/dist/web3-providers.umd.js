(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@babel/runtime/helpers/classCallCheck'), require('@babel/runtime/helpers/createClass'), require('websocket'), require('xhr2-cookies'), require('url-parse'), require('@babel/runtime/helpers/typeof'), require('lodash/isFunction'), require('lodash/isObject'), require('@babel/runtime/regenerator'), require('@babel/runtime/helpers/asyncToGenerator'), require('@babel/runtime/helpers/possibleConstructorReturn'), require('@babel/runtime/helpers/getPrototypeOf'), require('@babel/runtime/helpers/get'), require('@babel/runtime/helpers/inherits'), require('eventemitter3'), require('lodash/isArray'), require('http'), require('https')) :
    typeof define === 'function' && define.amd ? define(['exports', '@babel/runtime/helpers/classCallCheck', '@babel/runtime/helpers/createClass', 'websocket', 'xhr2-cookies', 'url-parse', '@babel/runtime/helpers/typeof', 'lodash/isFunction', 'lodash/isObject', '@babel/runtime/regenerator', '@babel/runtime/helpers/asyncToGenerator', '@babel/runtime/helpers/possibleConstructorReturn', '@babel/runtime/helpers/getPrototypeOf', '@babel/runtime/helpers/get', '@babel/runtime/helpers/inherits', 'eventemitter3', 'lodash/isArray', 'http', 'https'], factory) :
    (global = global || self, factory(global.Web3Providers = {}, global._classCallCheck, global._createClass, global.websocket, global.xhr2Cookies, global.URL, global._typeof, global.isFunction, global.isObject, global._regeneratorRuntime, global._asyncToGenerator, global._possibleConstructorReturn, global._getPrototypeOf, global._get, global._inherits, global.EventEmitter, global.isArray, global.http, global.https));
}(this, function (exports, _classCallCheck, _createClass, websocket, xhr2Cookies, URL, _typeof, isFunction, isObject, _regeneratorRuntime, _asyncToGenerator, _possibleConstructorReturn, _getPrototypeOf, _get, _inherits, EventEmitter, isArray, http, https) { 'use strict';

    _classCallCheck = _classCallCheck && _classCallCheck.hasOwnProperty('default') ? _classCallCheck['default'] : _classCallCheck;
    _createClass = _createClass && _createClass.hasOwnProperty('default') ? _createClass['default'] : _createClass;
    URL = URL && URL.hasOwnProperty('default') ? URL['default'] : URL;
    _typeof = _typeof && _typeof.hasOwnProperty('default') ? _typeof['default'] : _typeof;
    isFunction = isFunction && isFunction.hasOwnProperty('default') ? isFunction['default'] : isFunction;
    isObject = isObject && isObject.hasOwnProperty('default') ? isObject['default'] : isObject;
    _regeneratorRuntime = _regeneratorRuntime && _regeneratorRuntime.hasOwnProperty('default') ? _regeneratorRuntime['default'] : _regeneratorRuntime;
    _asyncToGenerator = _asyncToGenerator && _asyncToGenerator.hasOwnProperty('default') ? _asyncToGenerator['default'] : _asyncToGenerator;
    _possibleConstructorReturn = _possibleConstructorReturn && _possibleConstructorReturn.hasOwnProperty('default') ? _possibleConstructorReturn['default'] : _possibleConstructorReturn;
    _getPrototypeOf = _getPrototypeOf && _getPrototypeOf.hasOwnProperty('default') ? _getPrototypeOf['default'] : _getPrototypeOf;
    _get = _get && _get.hasOwnProperty('default') ? _get['default'] : _get;
    _inherits = _inherits && _inherits.hasOwnProperty('default') ? _inherits['default'] : _inherits;
    EventEmitter = EventEmitter && EventEmitter.hasOwnProperty('default') ? EventEmitter['default'] : EventEmitter;
    isArray = isArray && isArray.hasOwnProperty('default') ? isArray['default'] : isArray;
    http = http && http.hasOwnProperty('default') ? http['default'] : http;
    https = https && https.hasOwnProperty('default') ? https['default'] : https;

    var global = function () {
      return this || (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self;
    }() || new Function('return this')();
    var ProviderResolver =
    function () {
      function ProviderResolver(providersModuleFactory) {
        _classCallCheck(this, ProviderResolver);
        this.providersModuleFactory = providersModuleFactory;
      }
      _createClass(ProviderResolver, [{
        key: "resolve",
        value: function resolve(provider, net) {
          if (!provider) {
            return provider;
          }
          if (typeof provider === 'string') {
            if (/^http(s)?:\/\//i.test(provider)) {
              return this.providersModuleFactory.createHttpProvider(provider);
            }
            if (/^ws(s)?:\/\//i.test(provider)) {
              return this.providersModuleFactory.createWebsocketProvider(provider);
            }
            if (provider && isObject(net) && isFunction(net.connect)) {
              return this.providersModuleFactory.createIpcProvider(provider, net);
            }
          }
          if (provider.sendPayload && provider.subscribe) {
            return provider;
          }
          if (provider.host === 'Web3EthereumProvider') {
            return provider;
          }
          if (typeof global.mist !== 'undefined' && provider.constructor.name === 'EthereumProvider') {
            return this.providersModuleFactory.createMistEthereumProvider(provider);
          }
          if (provider.isEIP1193) {
            return this.providersModuleFactory.createWeb3EthereumProvider(provider);
          }
          if (this.isMetamaskInpageProvider(provider)) {
            return this.providersModuleFactory.createMetamaskProvider(provider);
          }
          return this.providersModuleFactory.createCustomProvider(provider);
        }
      }, {
        key: "isMetamaskInpageProvider",
        value: function isMetamaskInpageProvider(provider) {
          return provider.constructor.name === 'MetamaskInpageProvider';
        }
      }]);
      return ProviderResolver;
    }();

    var messageId = 0;
    var JsonRpcMapper =
    function () {
      function JsonRpcMapper() {
        _classCallCheck(this, JsonRpcMapper);
      }
      _createClass(JsonRpcMapper, null, [{
        key: "toPayload",
        value: function toPayload(method, params) {
          if (!method) {
            throw new Error("JSONRPC method should be specified for params: \"".concat(JSON.stringify(params), "\"!"));
          }
          var id = messageId;
          messageId++;
          return {
            jsonrpc: '2.0',
            id: id,
            method: method,
            params: params || []
          };
        }
      }]);
      return JsonRpcMapper;
    }();

    var JsonRpcResponseValidator =
    function () {
      function JsonRpcResponseValidator() {
        _classCallCheck(this, JsonRpcResponseValidator);
      }
      _createClass(JsonRpcResponseValidator, null, [{
        key: "validate",
        value: function validate(response) {
          var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
          if (isObject(response)) {
            if (response.error) {
              if (response.error instanceof Error) {
                return new Error("Node error: ".concat(response.error.message));
              }
              return new Error("Node error: ".concat(JSON.stringify(response.error)));
            }
            if (payload && response.id !== payload.id) {
              return new Error("Validation error: Invalid JSON-RPC response ID (request: ".concat(payload.id, " / response: ").concat(response.id, ")"));
            }
            if (response.result === undefined) {
              return new Error('Validation error: Undefined JSON-RPC result');
            }
            return true;
          }
          return new Error('Validation error: Response should be of type Object');
        }
      }]);
      return JsonRpcResponseValidator;
    }();

    var AbstractSocketProvider =
    function (_EventEmitter) {
      _inherits(AbstractSocketProvider, _EventEmitter);
      function AbstractSocketProvider(connection, timeout) {
        var _this;
        _classCallCheck(this, AbstractSocketProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(AbstractSocketProvider).call(this));
        _this.connection = connection;
        _this.timeout = timeout;
        _this.subscriptions = new Map();
        _this.registerEventListeners();
        _this.READY = 'ready';
        _this.CONNECT = 'connect';
        _this.ERROR = 'error';
        _this.CLOSE = 'close';
        _this.SOCKET_MESSAGE = 'socket_message';
        _this.SOCKET_READY = 'socket_ready';
        _this.SOCKET_CLOSE = 'socket_close';
        _this.SOCKET_ERROR = 'socket_error';
        _this.SOCKET_CONNECT = 'socket_connect';
        _this.SOCKET_NETWORK_CHANGED = 'socket_networkChanged';
        _this.SOCKET_ACCOUNTS_CHANGED = 'socket_accountsChanged';
        return _this;
      }
      _createClass(AbstractSocketProvider, [{
        key: "supportsSubscriptions",
        value: function supportsSubscriptions() {
          return true;
        }
      }, {
        key: "registerEventListeners",
        value: function registerEventListeners() {}
      }, {
        key: "removeAllSocketListeners",
        value: function removeAllSocketListeners() {
          this.removeAllListeners(this.SOCKET_MESSAGE);
          this.removeAllListeners(this.SOCKET_READY);
          this.removeAllListeners(this.SOCKET_CLOSE);
          this.removeAllListeners(this.SOCKET_ERROR);
          this.removeAllListeners(this.SOCKET_CONNECT);
        }
      }, {
        key: "disconnect",
        value: function disconnect(code, reason) {}
      }, {
        key: "send",
        value: function () {
          var _send = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee(method, parameters) {
            var response, validationResult;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
                  case 2:
                    response = _context.sent;
                    validationResult = JsonRpcResponseValidator.validate(response);
                    if (!(validationResult instanceof Error)) {
                      _context.next = 6;
                      break;
                    }
                    throw validationResult;
                  case 6:
                    return _context.abrupt("return", response.result);
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function send(_x, _x2) {
            return _send.apply(this, arguments);
          }
          return send;
        }()
      }, {
        key: "sendBatch",
        value: function sendBatch(methods, moduleInstance) {
          var payload = [];
          methods.forEach(function (method) {
            method.beforeExecution(moduleInstance);
            payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
          });
          return this.sendPayload(payload);
        }
      }, {
        key: "onReady",
        value: function onReady(event) {
          this.emit(this.READY, event);
          this.emit(this.SOCKET_READY, event);
        }
      }, {
        key: "onError",
        value: function onError(error) {
          this.emit(this.ERROR, error);
          this.emit(this.SOCKET_ERROR, error);
          this.removeAllSocketListeners();
        }
      }, {
        key: "onClose",
        value: function onClose() {
          var error = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          this.emit(this.CLOSE, error);
          this.emit(this.SOCKET_CLOSE, error);
          this.removeAllSocketListeners();
          this.removeAllListeners();
        }
      }, {
        key: "onConnect",
        value: function () {
          var _onConnect = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee2() {
            var subscriptionId, value, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    if (!(this.subscriptions.size > 0)) {
                      _context2.next = 31;
                      break;
                    }
                    _iteratorNormalCompletion = true;
                    _didIteratorError = false;
                    _iteratorError = undefined;
                    _context2.prev = 4;
                    _iterator = this.subscriptions[Symbol.iterator]();
                  case 6:
                    if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                      _context2.next = 17;
                      break;
                    }
                    item = _step.value;
                    value = item[1];
                    _context2.next = 11;
                    return this.subscribe(value.subscribeMethod, value.parameters[0], value.parameters.slice(1));
                  case 11:
                    subscriptionId = _context2.sent;
                    if (item[0] !== subscriptionId) {
                      this.subscriptions.delete(subscriptionId);
                    }
                    value.id = subscriptionId;
                  case 14:
                    _iteratorNormalCompletion = true;
                    _context2.next = 6;
                    break;
                  case 17:
                    _context2.next = 23;
                    break;
                  case 19:
                    _context2.prev = 19;
                    _context2.t0 = _context2["catch"](4);
                    _didIteratorError = true;
                    _iteratorError = _context2.t0;
                  case 23:
                    _context2.prev = 23;
                    _context2.prev = 24;
                    if (!_iteratorNormalCompletion && _iterator.return != null) {
                      _iterator.return();
                    }
                  case 26:
                    _context2.prev = 26;
                    if (!_didIteratorError) {
                      _context2.next = 29;
                      break;
                    }
                    throw _iteratorError;
                  case 29:
                    return _context2.finish(26);
                  case 30:
                    return _context2.finish(23);
                  case 31:
                    this.emit(this.SOCKET_CONNECT);
                    this.emit(this.CONNECT);
                  case 33:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this, [[4, 19, 23, 31], [24,, 26, 30]]);
          }));
          function onConnect() {
            return _onConnect.apply(this, arguments);
          }
          return onConnect;
        }()
      }, {
        key: "onMessage",
        value: function onMessage(response) {
          var event;
          if (!isObject(response)) {
            response = JSON.parse(response);
          }
          if (isArray(response)) {
            event = response[0].id;
          } else if (typeof response.id === 'undefined') {
            event = this.getSubscriptionEvent(response.params.subscription);
            response = response.params;
          } else {
            event = response.id;
          }
          this.emit(this.SOCKET_MESSAGE, response);
          this.emit(event, response);
        }
      }, {
        key: "reset",
        value: function reset() {
          this.removeAllListeners();
          this.registerEventListeners();
        }
      }, {
        key: "subscribe",
        value: function subscribe(subscribeMethod, subscriptionMethod, parameters) {
          var _this2 = this;
          parameters.unshift(subscriptionMethod);
          return this.send(subscribeMethod, parameters).then(function (subscriptionId) {
            _this2.subscriptions.set(subscriptionId, {
              id: subscriptionId,
              subscribeMethod: subscribeMethod,
              parameters: parameters
            });
            return subscriptionId;
          }).catch(function (error) {
            throw new Error("Provider error: ".concat(error));
          });
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe(subscriptionId, unsubscribeMethod) {
          var _this3 = this;
          if (this.hasSubscription(subscriptionId)) {
            return this.send(unsubscribeMethod, [subscriptionId]).then(function (response) {
              if (response) {
                _this3.removeAllListeners(_this3.getSubscriptionEvent(subscriptionId));
                _this3.subscriptions.delete(subscriptionId);
              }
              return response;
            });
          }
          return Promise.reject(new Error("Provider error: Subscription with ID ".concat(subscriptionId, " does not exist.")));
        }
      }, {
        key: "clearSubscriptions",
        value: function clearSubscriptions() {
          var _this4 = this;
          var unsubscribeMethod = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '';
          if (this.subscriptions.size > 0) {
            var unsubscribePromises = [];
            var type = unsubscribeMethod.slice(0, 3);
            this.subscriptions.forEach(function (value) {
              if (type === '') {
                unsubscribePromises.push(_this4.unsubscribe(value.id, "".concat(value.subscribeMethod.slice(0, 3), "_unsubscribe")));
              } else if (type === value.subscribeMethod.slice(0, 3)) {
                unsubscribePromises.push(_this4.unsubscribe(value.id, unsubscribeMethod));
              }
            });
            return Promise.all(unsubscribePromises).then(function (results) {
              if (results.includes(false)) {
                throw new Error("Could not unsubscribe all subscriptions: ".concat(JSON.stringify(results)));
              }
              return true;
            });
          }
          return Promise.resolve(true);
        }
      }, {
        key: "hasSubscription",
        value: function hasSubscription(subscriptionId) {
          return typeof this.getSubscriptionEvent(subscriptionId) !== 'undefined';
        }
      }, {
        key: "getSubscriptionEvent",
        value: function getSubscriptionEvent(subscriptionId) {
          if (this.subscriptions.get(subscriptionId)) {
            return subscriptionId;
          }
          var event;
          this.subscriptions.forEach(function (value, key) {
            if (value.id === subscriptionId) {
              event = key;
            }
          });
          return event;
        }
      }, {
        key: "connected",
        get: function get() {}
      }]);
      return AbstractSocketProvider;
    }(EventEmitter);

    var WebsocketProvider =
    function (_AbstractSocketProvid) {
      _inherits(WebsocketProvider, _AbstractSocketProvid);
      function WebsocketProvider(connection, timeout) {
        var _this;
        var reconnectDelay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 5000;
        _classCallCheck(this, WebsocketProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(WebsocketProvider).call(this, connection, timeout));
        _this.host = _this.connection.url;
        _this.reconnectDelay = reconnectDelay;
        _this.reconnecting = false;
        return _this;
      }
      _createClass(WebsocketProvider, [{
        key: "onConnect",
        value: function () {
          var _onConnect = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee() {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    if (this.reconnecting) {
                      this.emit('reconnected');
                    }
                    _context.next = 3;
                    return _get(_getPrototypeOf(WebsocketProvider.prototype), "onConnect", this).call(this);
                  case 3:
                    this.reconnecting = false;
                  case 4:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function onConnect() {
            return _onConnect.apply(this, arguments);
          }
          return onConnect;
        }()
      }, {
        key: "onMessage",
        value: function onMessage(messageEvent) {
          _get(_getPrototypeOf(WebsocketProvider.prototype), "onMessage", this).call(this, messageEvent.data);
        }
      }, {
        key: "onError",
        value: function onError(event) {
          if (event.code === 'ECONNREFUSED') {
            this.reconnect();
            return;
          }
          _get(_getPrototypeOf(WebsocketProvider.prototype), "onError", this).call(this, event);
        }
      }, {
        key: "onClose",
        value: function onClose(closeEvent) {
          if (closeEvent.code !== 1000 || closeEvent.wasClean === false) {
            this.reconnect();
            return;
          }
          _get(_getPrototypeOf(WebsocketProvider.prototype), "onClose", this).call(this);
        }
      }, {
        key: "reconnect",
        value: function reconnect() {
          var _this2 = this;
          this.reconnecting = true;
          setTimeout(function () {
            _this2.removeAllSocketListeners();
            var connection = [];
            if (_this2.connection.constructor.name === 'W3CWebSocket') {
              connection = new _this2.connection.constructor(_this2.host, _this2.connection._client.protocol, null, _this2.connection._client.headers, _this2.connection._client.requestOptions, _this2.connection._client.config);
            } else {
              connection = new _this2.connection.constructor(_this2.host, _this2.connection.protocol || undefined);
            }
            _this2.connection = connection;
            _this2.registerEventListeners();
          }, this.reconnectDelay);
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          var code = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
          var reason = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
          this.connection.close(code, reason);
        }
      }, {
        key: "registerEventListeners",
        value: function registerEventListeners() {
          this.connection.addEventListener('message', this.onMessage.bind(this));
          this.connection.addEventListener('open', this.onReady.bind(this));
          this.connection.addEventListener('open', this.onConnect.bind(this));
          this.connection.addEventListener('close', this.onClose.bind(this));
          this.connection.addEventListener('error', this.onError.bind(this));
        }
      }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
          switch (event) {
            case this.SOCKET_MESSAGE:
              this.connection.removeEventListener('message', this.onMessage);
              break;
            case this.SOCKET_READY:
              this.connection.removeEventListener('open', this.onReady);
              break;
            case this.SOCKET_CLOSE:
              this.connection.removeEventListener('close', this.onClose);
              break;
            case this.SOCKET_ERROR:
              this.connection.removeEventListener('error', this.onError);
              break;
            case this.SOCKET_CONNECT:
              this.connection.removeEventListener('connect', this.onConnect);
              break;
          }
          _get(_getPrototypeOf(WebsocketProvider.prototype), "removeAllListeners", this).call(this, event);
        }
      }, {
        key: "isConnecting",
        value: function isConnecting() {
          return this.connection.readyState === this.connection.CONNECTING;
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this3 = this;
          return new Promise(function (resolve, reject) {
            _this3.once('error', reject);
            if (!_this3.isConnecting()) {
              var timeout, id;
              if (_this3.connection.readyState !== _this3.connection.OPEN) {
                _this3.removeListener('error', reject);
                return reject(new Error('Connection error: Connection is not open on send()'));
              }
              try {
                _this3.connection.send(JSON.stringify(payload));
              } catch (error) {
                _this3.removeListener('error', reject);
                return reject(error);
              }
              if (isArray(payload)) {
                id = payload[0].id;
              } else {
                id = payload.id;
              }
              if (_this3.timeout) {
                timeout = setTimeout(function () {
                  _this3.removeListener('error', reject);
                  _this3.removeAllListeners(id);
                  reject(new Error('Connection error: Timeout exceeded'));
                }, _this3.timeout);
              }
              _this3.once(id, function (response) {
                if (timeout) {
                  clearTimeout(timeout);
                }
                _this3.removeListener('error', reject);
                return resolve(response);
              });
              return;
            }
            _this3.once('connect', function () {
              _this3.sendPayload(payload).then(function (response) {
                _this3.removeListener('error', reject);
                return resolve(response);
              }).catch(function (error) {
                _this3.removeListener('error', reject);
                return reject(error);
              });
            });
          });
        }
      }, {
        key: "connected",
        get: function get() {
          return this.connection.readyState === this.connection.OPEN;
        }
      }]);
      return WebsocketProvider;
    }(AbstractSocketProvider);

    var IpcProvider =
    function (_AbstractSocketProvid) {
      _inherits(IpcProvider, _AbstractSocketProvid);
      function IpcProvider(connection, path) {
        var _this;
        _classCallCheck(this, IpcProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(IpcProvider).call(this, connection, null));
        _this.host = path;
        _this.lastChunk = '';
        return _this;
      }
      _createClass(IpcProvider, [{
        key: "disconnect",
        value: function disconnect() {
          this.connection.destroy();
        }
      }, {
        key: "reconnect",
        value: function reconnect() {
          this.connection.connect({
            path: this.path
          });
        }
      }, {
        key: "onMessage",
        value: function onMessage(message) {
          var _this2 = this;
          var result = null;
          var returnValues = [];
          var dechunkedData = message.toString().replace(/\}[\n\r]?\{/g, '}|--|{')
          .replace(/\}\][\n\r]?\[\{/g, '}]|--|[{')
          .replace(/\}[\n\r]?\[\{/g, '}|--|[{')
          .replace(/\}\][\n\r]?\{/g, '}]|--|{')
          .split('|--|');
          dechunkedData.forEach(function (data) {
            result = null;
            if (_this2.lastChunk) {
              data = _this2.lastChunk + data;
            }
            try {
              result = JSON.parse(data);
            } catch (error) {
              _this2.lastChunk = data;
              return;
            }
            _this2.lastChunk = null;
            returnValues.push(result);
          });
          returnValues.forEach(function (chunk) {
            _get(_getPrototypeOf(IpcProvider.prototype), "onMessage", _this2).call(_this2, chunk);
          });
        }
      }, {
        key: "registerEventListeners",
        value: function registerEventListeners() {
          this.connection.on('data', this.onMessage.bind(this));
          this.connection.on('connect', this.onConnect.bind(this));
          this.connection.on('error', this.onError.bind(this));
          this.connection.on('close', this.onClose.bind(this));
          this.connection.on('timeout', this.onClose.bind(this));
          this.connection.on('ready', this.onReady.bind(this));
        }
      }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
          switch (event) {
            case this.SOCKET_MESSAGE:
              this.connection.removeListener('data', this.onMessage);
              break;
            case this.SOCKET_READY:
              this.connection.removeListener('ready', this.onReady);
              break;
            case this.SOCKET_CLOSE:
              this.connection.removeListener('close', this.onClose);
              break;
            case this.SOCKET_ERROR:
              this.connection.removeListener('error', this.onError);
              break;
            case this.SOCKET_CONNECT:
              this.connection.removeListener('connect', this.onConnect);
              break;
          }
          _get(_getPrototypeOf(IpcProvider.prototype), "removeAllListeners", this).call(this, event);
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this3 = this;
          return new Promise(function (resolve, reject) {
            _this3.once('error', reject);
            if (!_this3.connection.writable) {
              _this3.connection.connect({
                path: _this3.path
              });
            }
            if (_this3.connection.write(JSON.stringify(payload))) {
              var id;
              if (isArray(payload)) {
                id = payload[0].id;
              } else {
                id = payload.id;
              }
              _this3.once(id, function (response) {
                resolve(response);
                _this3.removeListener('error', reject);
              });
              return;
            }
            _this3.removeListener('error', reject);
            return reject(new Error("Connection error: Couldn't write on the socket with Socket.write(payload)"));
          });
        }
      }, {
        key: "connected",
        get: function get() {
          return !this.connection.pending;
        }
      }]);
      return IpcProvider;
    }(AbstractSocketProvider);

    var HttpProvider =
    function () {
      function HttpProvider() {
        var host = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'http://localhost:8545';
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var providersModuleFactory = arguments.length > 2 ? arguments[2] : undefined;
        _classCallCheck(this, HttpProvider);
        this.host = host;
        this.timeout = options.timeout || 0;
        this.headers = options.headers;
        this.withCredentials = options.withCredentials || false;
        this.connected = true;
        this.providersModuleFactory = providersModuleFactory;
        this.agent = {};
        var keepAlive = false;
        if (options.keepAlive === true || options.keepAlive !== false) {
          keepAlive = true;
        }
        if (host.substring(0, 5) === 'https') {
          this.agent['httpsAgent'] = new https.Agent({
            keepAlive: keepAlive
          });
        } else {
          this.agent['httpAgent'] = new http.Agent({
            keepAlive: keepAlive
          });
        }
      }
      _createClass(HttpProvider, [{
        key: "supportsSubscriptions",
        value: function supportsSubscriptions() {
          return false;
        }
      }, {
        key: "subscribe",
        value: function subscribe() {
          throw new Error('Subscriptions are not supported with the HttpProvider.');
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          throw new Error('Subscriptions are not supported with the HttpProvider.');
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          return true;
        }
      }, {
        key: "send",
        value: function () {
          var _send = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee(method, parameters) {
            var response, validationResult;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
                  case 2:
                    response = _context.sent;
                    validationResult = JsonRpcResponseValidator.validate(response);
                    if (!(validationResult instanceof Error)) {
                      _context.next = 6;
                      break;
                    }
                    throw validationResult;
                  case 6:
                    return _context.abrupt("return", response.result);
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function send(_x, _x2) {
            return _send.apply(this, arguments);
          }
          return send;
        }()
      }, {
        key: "sendBatch",
        value: function sendBatch(methods, moduleInstance) {
          var payload = [];
          methods.forEach(function (method) {
            method.beforeExecution(moduleInstance);
            payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
          });
          return this.sendPayload(payload);
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            var request = _this.providersModuleFactory.createXMLHttpRequest(_this.host, _this.timeout, _this.headers, _this.agent, _this.withCredentials);
            request.onreadystatechange = function () {
              if (request.readyState !== 0 && request.readyState !== 1) {
                _this.connected = true;
              }
              if (request.readyState === 4) {
                if (request.status === 200) {
                  try {
                    return resolve(JSON.parse(request.responseText));
                  } catch (error) {
                    reject(new Error("Invalid JSON as response: ".concat(request.responseText)));
                  }
                }
                if (_this.isInvalidHttpEndpoint(request)) {
                  reject(new Error("Connection refused or URL couldn't be resolved: ".concat(_this.host)));
                }
                if (request.status >= 400 && request.status <= 499) {
                  reject(new Error("HttpProvider ERROR: ".concat(request.responseText, " (code: ").concat(request.status, ")")));
                }
              }
            };
            request.ontimeout = function () {
              _this.connected = false;
              reject(new Error("Connection error: Timeout exceeded after ".concat(_this.timeout, "ms")));
            };
            try {
              request.send(JSON.stringify(payload));
            } catch (error) {
              _this.connected = false;
              reject(error);
            }
          });
        }
      }, {
        key: "isInvalidHttpEndpoint",
        value: function isInvalidHttpEndpoint(request) {
          return request.response === null && request.status === 0;
        }
      }]);
      return HttpProvider;
    }();

    var BatchRequest =
    function () {
      function BatchRequest(moduleInstance) {
        _classCallCheck(this, BatchRequest);
        this.moduleInstance = moduleInstance;
        this.methods = [];
        this.accounts = [];
      }
      _createClass(BatchRequest, [{
        key: "add",
        value: function add(method) {
          if (!isObject(method) && method) {
            throw new Error('Please provide a object of type AbstractMethod.');
          }
          this.methods.push(method);
        }
      }, {
        key: "execute",
        value: function () {
          var _execute = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee() {
            var _this = this;
            var payload, response, hasCallbacks, errors;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.toPayload();
                  case 2:
                    payload = _context.sent;
                    _context.next = 5;
                    return this.moduleInstance.currentProvider.sendPayload(payload);
                  case 5:
                    response = _context.sent;
                    hasCallbacks = false;
                    errors = [];
                    this.methods.forEach(function (method, index) {
                      if (!hasCallbacks && method.callback) {
                        hasCallbacks = true;
                      }
                      if (!isArray(response)) {
                        if (method.callback) {
                          method.callback(new Error("BatchRequest error: Response should be of type Array but is: ".concat(_typeof(response))), null);
                          return;
                        }
                        throw new Error("BatchRequest error: Response should be of type Array but is: ".concat(_typeof(response)));
                      }
                      var responseItem = response[index] || null;
                      var validationResult = JsonRpcResponseValidator.validate(responseItem);
                      if (validationResult === true) {
                        try {
                          var mappedResult;
                          if (method.Type === 'eth-send-transaction-method' || method.Type === 'observed-transaction-method') {
                            mappedResult = responseItem.result;
                          } else {
                            mappedResult = method.afterExecution(responseItem.result);
                          }
                          response[index] = mappedResult;
                          if (method.callback) {
                            method.callback(false, mappedResult);
                          }
                        } catch (error) {
                          errors[index] = {
                            method: method,
                            error: error
                          };
                          if (method.callback) {
                            method.callback(error, null);
                          }
                        }
                        return;
                      }
                      errors[index] = {
                        method: method,
                        error: validationResult
                      };
                      if (_this.accounts[index] && _this.accounts[index].nonce) {
                        _this.accounts[index].nonce--;
                      }
                      if (method.callback) {
                        method.callback(validationResult, null);
                      }
                    });
                    if (!(errors.length > 0 && !hasCallbacks)) {
                      _context.next = 11;
                      break;
                    }
                    throw {
                      errors: errors,
                      response: response
                    };
                  case 11:
                    return _context.abrupt("return", {
                      methods: this.methods,
                      response: response
                    });
                  case 12:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function execute() {
            return _execute.apply(this, arguments);
          }
          return execute;
        }()
      }, {
        key: "toPayload",
        value: function () {
          var _toPayload = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee2() {
            var payload, i, method, account, response;
            return _regeneratorRuntime.wrap(function _callee2$(_context2) {
              while (1) {
                switch (_context2.prev = _context2.next) {
                  case 0:
                    payload = [];
                    i = 0;
                  case 2:
                    if (!(i < this.methods.length)) {
                      _context2.next = 18;
                      break;
                    }
                    method = this.methods[i];
                    method.beforeExecution(this.moduleInstance);
                    if (!(this.moduleInstance.accounts && method.Type === 'eth-send-transaction-method' && method.hasAccounts())) {
                      _context2.next = 14;
                      break;
                    }
                    account = this.moduleInstance.accounts.wallet[method.parameters[0].from];
                    if (!account) {
                      _context2.next = 14;
                      break;
                    }
                    _context2.next = 10;
                    return method.signTransaction(account);
                  case 10:
                    response = _context2.sent;
                    method.parameters = [response.rawTransaction];
                    method.rpcMethod = 'eth_sendRawTransaction';
                    this.accounts[i] = account;
                  case 14:
                    payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
                  case 15:
                    i++;
                    _context2.next = 2;
                    break;
                  case 18:
                    return _context2.abrupt("return", payload);
                  case 19:
                  case "end":
                    return _context2.stop();
                }
              }
            }, _callee2, this);
          }));
          function toPayload() {
            return _toPayload.apply(this, arguments);
          }
          return toPayload;
        }()
      }]);
      return BatchRequest;
    }();

    var Web3EthereumProvider =
    function (_AbstractSocketProvid) {
      _inherits(Web3EthereumProvider, _AbstractSocketProvid);
      function Web3EthereumProvider(connection) {
        var _this;
        _classCallCheck(this, Web3EthereumProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(Web3EthereumProvider).call(this, connection, null));
        _this.host = 'Web3EthereumProvider';
        return _this;
      }
      _createClass(Web3EthereumProvider, [{
        key: "registerEventListeners",
        value: function registerEventListeners() {
          this.connection.on('notification', this.onMessage.bind(this));
          this.connection.on('connect', this.onConnect.bind(this));
          this.connection.on('connect', this.onReady.bind(this));
          this.connection.on('close', this.onClose.bind(this));
          this.connection.on('networkChanged', this.onNetworkChanged.bind(this));
          this.connection.on('accountsChanged', this.onAccountsChanged.bind(this));
        }
      }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
          switch (event) {
            case this.SOCKET_NETWORK_CHANGED:
              this.connection.removeListener('networkChanged', this.onNetworkChanged);
              break;
            case this.SOCKET_ACCOUNTS_CHANGED:
              this.connection.removeListener('accountsChanged', this.onAccountsChanged);
              break;
            case this.SOCKET_MESSAGE:
              this.connection.removeListener('notification', this.onMessage);
              break;
            case this.SOCKET_READY:
              this.connection.removeListener('connect', this.onReady);
              break;
            case this.SOCKET_CLOSE:
              this.connection.removeListener('close', this.onClose);
              break;
            case this.SOCKET_ERROR:
              this.connection.removeListener('close', this.onError);
              break;
            case this.SOCKET_CONNECT:
              this.connection.removeListener('connect', this.onConnect);
              break;
          }
          _get(_getPrototypeOf(Web3EthereumProvider.prototype), "removeAllListeners", this).call(this, event);
        }
      }, {
        key: "removeAllSocketListeners",
        value: function removeAllSocketListeners() {
          this.removeAllListeners(this.SOCKET_ACCOUNTS_CHANGED);
          this.removeAllListeners(this.SOCKET_NETWORK_CHANGED);
          _get(_getPrototypeOf(Web3EthereumProvider.prototype), "removeAllSocketListeners", this).call(this);
        }
      }, {
        key: "onNetworkChanged",
        value: function onNetworkChanged(networkId) {
          this.emit('networkChanged', networkId);
        }
      }, {
        key: "onAccountsChanged",
        value: function onAccountsChanged(accounts) {
          this.emit('accountsChanged', accounts);
        }
      }, {
        key: "onMessage",
        value: function onMessage(response) {
          this.emit(this.getSubscriptionEvent(response.subscription), response);
        }
      }, {
        key: "send",
        value: function () {
          var _send = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee(method, parameters) {
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.prev = 0;
                    _context.next = 3;
                    return this.connection.send(method, parameters);
                  case 3:
                    return _context.abrupt("return", _context.sent);
                  case 6:
                    _context.prev = 6;
                    _context.t0 = _context["catch"](0);
                    throw new Error("Node error: ".concat(_context.t0.message));
                  case 9:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this, [[0, 6]]);
          }));
          function send(_x, _x2) {
            return _send.apply(this, arguments);
          }
          return send;
        }()
      }, {
        key: "sendBatch",
        value: function sendBatch(methods, moduleInstance) {
          var _this2 = this;
          var methodCalls = [];
          methods.forEach(function (method) {
            method.beforeExecution(moduleInstance);
            methodCalls.push(_this2.connection.send(method.rpcMethod, method.parameters));
          });
          return Promise.all(methodCalls);
        }
      }]);
      return Web3EthereumProvider;
    }(AbstractSocketProvider);

    var MetamaskProvider =
    function (_AbstractSocketProvid) {
      _inherits(MetamaskProvider, _AbstractSocketProvid);
      function MetamaskProvider(inpageProvider) {
        var _this;
        _classCallCheck(this, MetamaskProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(MetamaskProvider).call(this, inpageProvider, null));
        _this.host = 'metamask';
        return _this;
      }
      _createClass(MetamaskProvider, [{
        key: "registerEventListeners",
        value: function registerEventListeners() {
          this.connection.on('accountsChanged', this.onAccountsChanged.bind(this));
          this.connection.on('networkChanged', this.onReady.bind(this));
          this.connection.on('networkChanged', this.onNetworkChanged.bind(this));
          this.connection.on('data', this.onMessage.bind(this));
          this.connection.on('error', this.onError.bind(this));
        }
      }, {
        key: "onMessage",
        value: function onMessage(metamaskParam, payload) {
          _get(_getPrototypeOf(MetamaskProvider.prototype), "onMessage", this).call(this, payload);
        }
      }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
          switch (event) {
            case this.SOCKET_NETWORK_CHANGED:
              this.connection.removeListener('networkChanged', this.onNetworkChanged);
              break;
            case this.SOCKET_ACCOUNTS_CHANGED:
              this.connection.removeListener('accountsChanged', this.onAccountsChanged);
              break;
            case this.SOCKET_MESSAGE:
              this.connection.removeListener('data', this.onMessage);
              break;
            case this.SOCKET_ERROR:
              this.connection.removeListener('error', this.onError);
              break;
          }
          _get(_getPrototypeOf(MetamaskProvider.prototype), "removeAllListeners", this).call(this, event);
        }
      }, {
        key: "removeAllSocketListeners",
        value: function removeAllSocketListeners() {
          this.removeAllListeners(this.SOCKET_ACCOUNTS_CHANGED);
          this.removeAllListeners(this.SOCKET_NETWORK_CHANGED);
          _get(_getPrototypeOf(MetamaskProvider.prototype), "removeAllSocketListeners", this).call(this);
        }
      }, {
        key: "onNetworkChanged",
        value: function onNetworkChanged(networkId) {
          this.emit('networkChanged', networkId);
        }
      }, {
        key: "onAccountsChanged",
        value: function onAccountsChanged(accounts) {
          this.emit('accountsChanged', accounts);
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          return true;
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.connection.send(payload, function (error, response) {
              if (!error) {
                return resolve(response);
              }
              reject(error);
            });
          });
        }
      }, {
        key: "connected",
        get: function get() {
          return this.connection.isConnected();
        }
      }]);
      return MetamaskProvider;
    }(AbstractSocketProvider);

    var MistEthereumProvider =
    function (_AbstractSocketProvid) {
      _inherits(MistEthereumProvider, _AbstractSocketProvid);
      function MistEthereumProvider(connection) {
        var _this;
        _classCallCheck(this, MistEthereumProvider);
        _this = _possibleConstructorReturn(this, _getPrototypeOf(MistEthereumProvider).call(this, connection, null));
        _this.host = 'mist';
        return _this;
      }
      _createClass(MistEthereumProvider, [{
        key: "registerEventListeners",
        value: function registerEventListeners() {
          this.connection.on('data', this.onMessage.bind(this));
          this.connection.on('error', this.onError.bind(this));
          this.connection.on('connect', this.onConnect.bind(this));
          this.connection.on('connect', this.onReady.bind(this));
          this.connection.on('end', this.onClose.bind(this));
        }
      }, {
        key: "removeAllListeners",
        value: function removeAllListeners(event) {
          switch (event) {
            case this.SOCKET_MESSAGE:
              this.connection.removeListener('data', this.onMessage);
              break;
            case this.SOCKET_ERROR:
              this.connection.removeListener('error', this.onError);
              break;
            case this.SOCKET_CONNECT:
              this.connection.removeListener('connect', this.onConnect);
              break;
            case this.SOCKET_READY:
              this.connection.removeListener('connect', this.onConnect);
              break;
            case this.SOCKET_CLOSE:
              this.connection.removeListener('end', this.onClose);
              break;
          }
          _get(_getPrototypeOf(MistEthereumProvider.prototype), "removeAllListeners", this).call(this, event);
        }
      }, {
        key: "disconnect",
        value: function disconnect() {
          return true;
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this2 = this;
          return new Promise(function (resolve, reject) {
            _this2.connection.send(payload, function (error, response) {
              if (!error) {
                return resolve(response);
              }
              reject(error);
            });
          });
        }
      }, {
        key: "connected",
        get: function get() {
          return this.connection.isConnected();
        }
      }]);
      return MistEthereumProvider;
    }(AbstractSocketProvider);

    var CustomProvider =
    function () {
      function CustomProvider(connection) {
        _classCallCheck(this, CustomProvider);
        this.host = 'CustomProvider';
        this.connection = connection;
        this.checkConnectionMethods();
      }
      _createClass(CustomProvider, [{
        key: "supportsSubscriptions",
        value: function supportsSubscriptions() {
          return false;
        }
      }, {
        key: "checkConnectionMethods",
        value: function checkConnectionMethods() {
          if (this.connection.send || this.connection.sendAsync) {
            return true;
          }
          throw new Error('Invalid provider injected!');
        }
      }, {
        key: "subscribe",
        value: function subscribe() {
          throw new Error('Subscriptions are not supported with the CustomProvider.');
        }
      }, {
        key: "unsubscribe",
        value: function unsubscribe() {
          throw new Error('Subscriptions are not supported with the CustomProvider.');
        }
      }, {
        key: "send",
        value: function () {
          var _send = _asyncToGenerator(
          _regeneratorRuntime.mark(function _callee(method, parameters) {
            var response, validationResult;
            return _regeneratorRuntime.wrap(function _callee$(_context) {
              while (1) {
                switch (_context.prev = _context.next) {
                  case 0:
                    _context.next = 2;
                    return this.sendPayload(JsonRpcMapper.toPayload(method, parameters));
                  case 2:
                    response = _context.sent;
                    validationResult = JsonRpcResponseValidator.validate(response);
                    if (!(validationResult instanceof Error)) {
                      _context.next = 6;
                      break;
                    }
                    throw validationResult;
                  case 6:
                    return _context.abrupt("return", response.result);
                  case 7:
                  case "end":
                    return _context.stop();
                }
              }
            }, _callee, this);
          }));
          function send(_x, _x2) {
            return _send.apply(this, arguments);
          }
          return send;
        }()
      }, {
        key: "sendBatch",
        value: function sendBatch(methods, moduleInstance) {
          var payload = [];
          methods.forEach(function (method) {
            method.beforeExecution(moduleInstance);
            payload.push(JsonRpcMapper.toPayload(method.rpcMethod, method.parameters));
          });
          return this.sendPayload(payload);
        }
      }, {
        key: "sendPayload",
        value: function sendPayload(payload) {
          var _this = this;
          return new Promise(function (resolve, reject) {
            if (_this.connection.sendAsync) {
              _this.connection.sendAsync(payload, function (error, response) {
                if (!error) {
                  resolve(response);
                }
                reject(error);
              });
              return;
            }
            _this.connection.send(payload, function (error, response) {
              if (!error) {
                resolve(response);
              }
              reject(error);
            });
          });
        }
      }]);
      return CustomProvider;
    }();

    var ProvidersModuleFactory =
    function () {
      function ProvidersModuleFactory() {
        _classCallCheck(this, ProvidersModuleFactory);
      }
      _createClass(ProvidersModuleFactory, [{
        key: "createBatchRequest",
        value: function createBatchRequest(moduleInstance) {
          return new BatchRequest(moduleInstance);
        }
      }, {
        key: "createProviderResolver",
        value: function createProviderResolver() {
          return new ProviderResolver(this);
        }
      }, {
        key: "createHttpProvider",
        value: function createHttpProvider(url) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          return new HttpProvider(url, options, this);
        }
      }, {
        key: "createXMLHttpRequest",
        value: function createXMLHttpRequest(host, timeout, headers, agent, withCredentials) {
          var request;
          if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
            request = new xhr2Cookies.XMLHttpRequest();
            request.nodejsSet(agent);
          } else {
            request = new XMLHttpRequest();
          }
          request.open('POST', host, true);
          request.setRequestHeader('Content-Type', 'application/json');
          request.timeout = timeout;
          request.withCredentials = withCredentials;
          if (headers) {
            headers.forEach(function (header) {
              request.setRequestHeader(header.name, header.value);
            });
          }
          return request;
        }
      }, {
        key: "createWebsocketProvider",
        value: function createWebsocketProvider(url) {
          var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
          var headers = options.headers || {};
          if (typeof process !== 'undefined' && process.versions != null && process.versions.node != null) {
            var urlObject = new URL(url);
            if (!headers.authorization && urlObject.username && urlObject.password) {
              var authToken = Buffer.from("".concat(urlObject.username, ":").concat(urlObject.password)).toString('base64');
              headers.authorization = "Basic ".concat(authToken);
            }
          }
          return new WebsocketProvider(new websocket.w3cwebsocket(url, options.protocol, options.origin, headers, options.requestOptions, options.clientConfig), options.timeout, options.reconnectDelay);
        }
      }, {
        key: "createIpcProvider",
        value: function createIpcProvider(path, net) {
          return new IpcProvider(net.connect({
            path: path
          }), path);
        }
      }, {
        key: "createWeb3EthereumProvider",
        value: function createWeb3EthereumProvider(connection) {
          return new Web3EthereumProvider(connection);
        }
      }, {
        key: "createMetamaskProvider",
        value: function createMetamaskProvider(inpageProvider) {
          return new MetamaskProvider(inpageProvider);
        }
      }, {
        key: "createMistEthereumProvider",
        value: function createMistEthereumProvider(mistEthereumProvider) {
          return new MistEthereumProvider(mistEthereumProvider);
        }
      }, {
        key: "createCustomProvider",
        value: function createCustomProvider(connection) {
          return new CustomProvider(connection);
        }
      }]);
      return ProvidersModuleFactory;
    }();

    var global$1 = function () {
      return this || (typeof self === "undefined" ? "undefined" : _typeof(self)) === 'object' && self;
    }() || new Function('return this')();
    var ProviderDetector =
    function () {
      function ProviderDetector() {
        _classCallCheck(this, ProviderDetector);
      }
      _createClass(ProviderDetector, null, [{
        key: "detect",
        value: function detect() {
          if (typeof global$1.ethereumProvider !== 'undefined' && global$1.ethereumProvider.constructor.name === 'EthereumProvider') {
            return global$1.ethereumProvider;
          }
          if (typeof global$1.web3 !== 'undefined' && global$1.web3.currentProvider) {
            return global$1.web3.currentProvider;
          }
          return null;
        }
      }]);
      return ProviderDetector;
    }();

    function HttpProvider$1(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new ProvidersModuleFactory().createHttpProvider(url, options);
    }
    function WebsocketProvider$1(url) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      return new ProvidersModuleFactory().createWebsocketProvider(url, options);
    }
    function IpcProvider$1(path, net) {
      return new ProvidersModuleFactory().createIpcProvider(path, net);
    }
    function BatchRequest$1(moduleInstance) {
      return new ProvidersModuleFactory().createBatchRequest(moduleInstance);
    }
    function ProviderResolver$1() {
      return new ProvidersModuleFactory().createProviderResolver();
    }

    exports.BatchRequest = BatchRequest$1;
    exports.HttpProvider = HttpProvider$1;
    exports.IpcProvider = IpcProvider$1;
    exports.ProviderDetector = ProviderDetector;
    exports.ProviderResolver = ProviderResolver$1;
    exports.ProvidersModuleFactory = ProvidersModuleFactory;
    exports.Web3EthereumProvider = Web3EthereumProvider;
    exports.WebsocketProvider = WebsocketProvider$1;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
