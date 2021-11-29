module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = require('../../../ssr-module-cache.js');
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "../next-server/lib/utils":
/*!*****************************************************!*\
  !*** external "next/dist/next-server/lib/utils.js" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/dist/next-server/lib/utils.js");

/***/ }),

/***/ "./api/core/error.js":
/*!***************************!*\
  !*** ./api/core/error.js ***!
  \***************************/
/*! exports provided: AuthError, PermissionDeniedError, RouterNotFoundError, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthError", function() { return AuthError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PermissionDeniedError", function() { return PermissionDeniedError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RouterNotFoundError", function() { return RouterNotFoundError; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return BizError; });
class AuthError extends Error {}
class PermissionDeniedError extends Error {}
class RouterNotFoundError extends Error {}
class BizError extends Error {}

/***/ }),

/***/ "./components/main.less":
/*!******************************!*\
  !*** ./components/main.less ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./lib/etherUnits.js":
/*!***************************!*\
  !*** ./lib/etherUnits.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const BigNumber = __webpack_require__(/*! bignumber.js */ "bignumber.js");

const etherUnits = function () {};

etherUnits.unitMap = {
  wei: '1',
  kwei: '1000',
  ada: '1000',
  femtoether: '1000',
  mwei: '1000000',
  babbage: '1000000',
  picoether: '1000000',
  gwei: '1000000000',
  shannon: '1000000000',
  nanoether: '1000000000',
  nano: '1000000000',
  szabo: '1000000000000',
  microether: '1000000000000',
  micro: '1000000000000',
  finney: '1000000000000000',
  milliether: '1000000000000000',
  milli: '1000000000000000',
  ether: '1000000000000000000',
  kether: '1000000000000000000000',
  grand: '1000000000000000000000',
  einstein: '1000000000000000000000',
  mether: '1000000000000000000000000',
  gether: '1000000000000000000000000000',
  tether: '1000000000000000000000000000000'
};

etherUnits.getValueOfUnit = function (unit) {
  unit = unit ? unit.toLowerCase() : 'ether';
  const unitValue = this.unitMap[unit];

  if (unitValue === undefined) {
    throw new Error(globalFuncs.errorMsgs[4] + JSON.stringify(this.unitMap, null, 2));
  }

  return new BigNumber(unitValue, 10);
};

etherUnits.toEther = function (number, unit) {
  const returnValue = new BigNumber(this.toWei(number, unit)).div(this.getValueOfUnit('ether'));
  return returnValue.toString(10);
};

etherUnits.toGwei = function (number, unit) {
  const returnValue = new BigNumber(this.toWei(number, unit)).div(this.getValueOfUnit('gwei'));
  return returnValue.toString(10);
};

etherUnits.toWei = function (number, unit) {
  const returnValue = new BigNumber(String(number)).times(this.getValueOfUnit(unit));
  return returnValue.toString(10);
};

module.exports = etherUnits;

/***/ }),

/***/ "./node_modules/antd/lib/config-provider/style/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/antd/lib/config-provider/style/index.js ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./node_modules/next/app.js":
/*!**********************************!*\
  !*** ./node_modules/next/app.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! ./dist/pages/_app */ "./node_modules/next/dist/pages/_app.js")


/***/ }),

/***/ "./node_modules/next/dist/pages/_app.js":
/*!**********************************************!*\
  !*** ./node_modules/next/dist/pages/_app.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _interopRequireDefault = __webpack_require__(/*! @babel/runtime/helpers/interopRequireDefault */ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js");

exports.__esModule = true;
exports.Container = Container;
exports.createUrl = createUrl;
exports.default = void 0;

var _react = _interopRequireDefault(__webpack_require__(/*! react */ "react"));

var _utils = __webpack_require__(/*! ../next-server/lib/utils */ "../next-server/lib/utils");

exports.AppInitialProps = _utils.AppInitialProps;
/**
* `App` component is used for initialize of pages. It allows for overwriting and full control of the `page` initialization.
* This allows for keeping state between navigation, custom error handling, injecting additional data.
*/

async function appGetInitialProps(_ref) {
  var {
    Component,
    ctx
  } = _ref;
  var pageProps = await (0, _utils.loadGetInitialProps)(Component, ctx);
  return {
    pageProps
  };
}

class App extends _react.default.Component {
  // Kept here for backwards compatibility.
  // When someone ended App they could call `super.componentDidCatch`.
  // @deprecated This method is no longer needed. Errors are caught at the top level
  componentDidCatch(error, _errorInfo) {
    throw error;
  }

  render() {
    var {
      router,
      Component,
      pageProps,
      __N_SSG,
      __N_SSP
    } = this.props;
    return _react.default.createElement(Component, Object.assign({}, pageProps, // we don't add the legacy URL prop if it's using non-legacy
    // methods like getStaticProps and getServerSideProps
    !(__N_SSG || __N_SSP) ? {
      url: createUrl(router)
    } : {}));
  }

}

exports.default = App;
App.origGetInitialProps = appGetInitialProps;
App.getInitialProps = appGetInitialProps;
var warnContainer;
var warnUrl;

if (true) {
  warnContainer = (0, _utils.execOnce)(() => {
    console.warn("Warning: the `Container` in `_app` has been deprecated and should be removed. https://err.sh/zeit/next.js/app-container-deprecated");
  });
  warnUrl = (0, _utils.execOnce)(() => {
    console.error("Warning: the 'url' property is deprecated. https://err.sh/zeit/next.js/url-deprecated");
  });
} // @deprecated noop for now until removal


function Container(p) {
  if (true) warnContainer();
  return p.children;
}

function createUrl(router) {
  // This is to make sure we don't references the router object at call time
  var {
    pathname,
    asPath,
    query
  } = router;
  return {
    get query() {
      if (true) warnUrl();
      return query;
    },

    get pathname() {
      if (true) warnUrl();
      return pathname;
    },

    get asPath() {
      if (true) warnUrl();
      return asPath;
    },

    back: () => {
      if (true) warnUrl();
      router.back();
    },
    push: (url, as) => {
      if (true) warnUrl();
      return router.push(url, as);
    },
    pushTo: (href, as) => {
      if (true) warnUrl();
      var pushRoute = as ? href : '';
      var pushUrl = as || href;
      return router.push(pushRoute, pushUrl);
    },
    replace: (url, as) => {
      if (true) warnUrl();
      return router.replace(url, as);
    },
    replaceTo: (href, as) => {
      if (true) warnUrl();
      var replaceRoute = as ? href : '';
      var replaceUrl = as || href;
      return router.replace(replaceRoute, replaceUrl);
    }
  };
}

/***/ }),

/***/ "./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js":
/*!****************************************************************************************!*\
  !*** ./node_modules/next/node_modules/@babel/runtime/helpers/interopRequireDefault.js ***!
  \****************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
}

module.exports = _interopRequireDefault;

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/app */ "./node_modules/next/app.js");
/* harmony import */ var next_app__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_app__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _utils_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/auth */ "./utils/auth.js");
/* harmony import */ var _components_main_less__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/main.less */ "./components/main.less");
/* harmony import */ var _components_main_less__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_components_main_less__WEBPACK_IMPORTED_MODULE_2__);




class MyApp extends next_app__WEBPACK_IMPORTED_MODULE_0___default.a {}

/* harmony default export */ __webpack_exports__["default"] = (Object(_utils_auth__WEBPACK_IMPORTED_MODULE_1__["withAuthSync"])(MyApp));

/***/ }),

/***/ "./reducer/index.js":
/*!**************************!*\
  !*** ./reducer/index.js ***!
  \**************************/
/*! exports provided: MyContext, reducer, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MyContext", function() { return MyContext; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "reducer", function() { return reducer; });
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
var __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }



const renderInitalState = mobile => {
  return {
    window: mobile ? 400 : 1200
  };
};

const MyContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();
function reducer(state, action) {
  const data = action.data;

  switch (action.type) {
    case 'SET_WINDOW':
      return _objectSpread({}, state, {
        window: data
      });

    default:
      return state;
  }
}

const ContextProvider = props => {
  const {
    mobile
  } = props;
  const {
    0: state,
    1: dispatch
  } = Object(react__WEBPACK_IMPORTED_MODULE_0__["useReducer"])(reducer, renderInitalState(mobile));
  return __jsx(MyContext.Provider, {
    value: {
      state,
      dispatch
    }
  }, props.children);
};

/* harmony default export */ __webpack_exports__["default"] = (ContextProvider);

/***/ }),

/***/ "./utils/auth.js":
/*!***********************!*\
  !*** ./utils/auth.js ***!
  \***********************/
/*! exports provided: withAuthSync */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "withAuthSync", function() { return withAuthSync; });
/* harmony import */ var antd_lib_config_provider_style__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! antd/lib/config-provider/style */ "./node_modules/antd/lib/config-provider/style/index.js");
/* harmony import */ var antd_lib_config_provider_style__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(antd_lib_config_provider_style__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var antd_lib_config_provider__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! antd/lib/config-provider */ "antd/lib/config-provider");
/* harmony import */ var antd_lib_config_provider__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(antd_lib_config_provider__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _cookie__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cookie */ "./utils/cookie.js");
/* harmony import */ var antd_lib_locale_zh_CN__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! antd/lib/locale/zh_CN */ "antd/lib/locale/zh_CN");
/* harmony import */ var antd_lib_locale_zh_CN__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(antd_lib_locale_zh_CN__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var antd_lib_locale_en_US__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! antd/lib/locale/en_US */ "antd/lib/locale/en_US");
/* harmony import */ var antd_lib_locale_en_US__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(antd_lib_locale_en_US__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_intl_locale_data_en__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-intl/locale-data/en */ "react-intl/locale-data/en");
/* harmony import */ var react_intl_locale_data_en__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_intl_locale_data_en__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var react_intl_locale_data_zh__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react-intl/locale-data/zh */ "react-intl/locale-data/zh");
/* harmony import */ var react_intl_locale_data_zh__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_intl_locale_data_zh__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! react-intl */ "react-intl");
/* harmony import */ var react_intl__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(react_intl__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _utils_lang_zh__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../utils/lang/zh */ "./utils/lang/zh.js");
/* harmony import */ var _utils_lang_en__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/lang/en */ "./utils/lang/en.js");
/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../reducer */ "./reducer/index.js");
/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./common */ "./utils/common.js");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! next/router */ "next/router");
/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_13__);



var __jsx = react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }













Object(react_intl__WEBPACK_IMPORTED_MODULE_8__["addLocaleData"])([...react_intl_locale_data_en__WEBPACK_IMPORTED_MODULE_6___default.a, ...react_intl_locale_data_zh__WEBPACK_IMPORTED_MODULE_7___default.a]);
const withAuthSync = WrappedComponent => {
  const Wrapper = props => {
    const handleGetLang = () => {
      if (props.language === 'en') {
        return 'en';
      } else {
        return 'zh';
      }
    };

    const {
      0: lang,
      1: setLang
    } = Object(react__WEBPACK_IMPORTED_MODULE_2__["useState"])(handleGetLang());

    const handleLang = (la, isAnt) => {
      switch (la) {
        case 'en':
          if (isAnt) {
            return antd_lib_locale_en_US__WEBPACK_IMPORTED_MODULE_5___default.a;
          } else {
            return _utils_lang_en__WEBPACK_IMPORTED_MODULE_10__["default"];
          }

        default:
          if (isAnt) {
            return antd_lib_locale_zh_CN__WEBPACK_IMPORTED_MODULE_4___default.a;
          } else {
            return _utils_lang_zh__WEBPACK_IMPORTED_MODULE_9__["default"];
          }

      }
    };

    Object(react__WEBPACK_IMPORTED_MODULE_2__["useEffect"])(() => {
      // 兼容之前的hash 地址
      handlePath();

      if (props.lang) {
        Object(_cookie__WEBPACK_IMPORTED_MODULE_3__["setCookie"])('lang', props.lang, 365);
      }

      window.handleChangeLang = type => {
        Object(_cookie__WEBPACK_IMPORTED_MODULE_3__["setCookie"])('lang', type, 365);
        setLang(type);
      };

      var lastTouchEnd = 0;
      document.addEventListener('touchstart', function (event) {
        if (event.touches.length > 1) {
          event.preventDefault();
        }
      });
      document.addEventListener('touchend', event => {
        var now = new Date().getTime();

        if (now - lastTouchEnd <= 300) {
          event.preventDefault();
        }

        lastTouchEnd = now;
      }, false); // 阻止双指放大

      document.addEventListener('gesturestart', function (event) {
        event.preventDefault();
      }); // dispatch({ type: 'SET_WINDOW', data: window.innerWidth })

      return () => {
        window.handleChangeLang = null;
      };
    }, []);

    const handlePath = () => {
      const {
        href,
        hash
      } = window.location;

      if (hash.startsWith('#/hashsearch?id=')) {
        const id = Object(_common__WEBPACK_IMPORTED_MODULE_12__["parseQueryString"])(href).id;
        location.href = `/hash/${id}`;
      } else if (hash.startsWith('#/addresssearch?id=')) {
        const id = Object(_common__WEBPACK_IMPORTED_MODULE_12__["parseQueryString"])(href).id;
        location.href = `/addr/${id}`;
      }
    };

    return __jsx(antd_lib_config_provider__WEBPACK_IMPORTED_MODULE_1___default.a, {
      locale: handleLang(lang, true)
    }, __jsx(react_intl__WEBPACK_IMPORTED_MODULE_8__["IntlProvider"], {
      locale: lang,
      messages: handleLang(lang, false)
    }, __jsx(_reducer__WEBPACK_IMPORTED_MODULE_11__["default"], {
      mobile: props.mobile
    }, __jsx(WrappedComponent, _extends({}, props, {
      language: props.language
    })))));
  };

  Wrapper.getInitialProps = async ctx => {
    var _ctx$router$asPath, _ctx$ctx$res;

    if (!((_ctx$router$asPath = ctx.router.asPath) === null || _ctx$router$asPath === void 0 ? void 0 : _ctx$router$asPath.startsWith('/_next/static')) && ((_ctx$ctx$res = ctx.ctx.res) === null || _ctx$ctx$res === void 0 ? void 0 : _ctx$ctx$res.statusCode) === 404) {
      ctx.ctx.res.writeHead(302, {
        Location: '/'
      });
      ctx.ctx.res.end();
    }

    const componentProps = WrappedComponent.getInitialProps && (await WrappedComponent.getInitialProps(ctx));
    let language;
    let lang = '';
    const mobile = true ? Object(_common__WEBPACK_IMPORTED_MODULE_12__["isMobile"])(ctx.ctx.req.headers['user-agent']) : undefined;

    if (ctx.ctx.query.lang) {
      language = ctx.ctx.query.lang === 'en' ? 'en' : 'zh';
      lang = language;
    } else {
      language = Object(_cookie__WEBPACK_IMPORTED_MODULE_3__["getCookies"])(ctx.ctx.req)['lang'] || 'zh';
    }

    ctx.ctx.language = language;
    return _objectSpread({}, componentProps, {
      language,
      lang,
      mobile
    });
  };

  return Wrapper;
};

/***/ }),

/***/ "./utils/common.js":
/*!*************************!*\
  !*** ./utils/common.js ***!
  \*************************/
/*! exports provided: formatDate, getDayName, parseQueryString, colorRgb, authenticationAdmin, compare, filterBlocks, filterTrace, formatDataNumber, handleGetFee, analysisInput, handleAllTrade, isMobile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDate", function() { return formatDate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getDayName", function() { return getDayName; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "parseQueryString", function() { return parseQueryString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "colorRgb", function() { return colorRgb; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "authenticationAdmin", function() { return authenticationAdmin; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "compare", function() { return compare; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterBlocks", function() { return filterBlocks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "filterTrace", function() { return filterTrace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "formatDataNumber", function() { return formatDataNumber; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleGetFee", function() { return handleGetFee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "analysisInput", function() { return analysisInput; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "handleAllTrade", function() { return handleAllTrade; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isMobile", function() { return isMobile; });
/* harmony import */ var _api_core_error__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../api/core/error */ "./api/core/error.js");
/* harmony import */ var rlp__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rlp */ "rlp");
/* harmony import */ var rlp__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(rlp__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bignumber.js */ "bignumber.js");
/* harmony import */ var bignumber_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bignumber_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lib_etherUnits__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../lib/etherUnits */ "./lib/etherUnits.js");
/* harmony import */ var _lib_etherUnits__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lib_etherUnits__WEBPACK_IMPORTED_MODULE_3__);





const hex2ascii = hexIn => {
  const hex = hexIn.toString();
  let str = '';

  try {
    const ba = rlp__WEBPACK_IMPORTED_MODULE_1___default.a.decode(hex);
    const test = ba[1].toString('ascii');

    if (test == 'geth' || test == 'Parity') {
      // FIXME
      ba[0] = ba[0].toString('hex');
    }

    str = baToString(ba);
  } catch (e) {
    for (let i = 0; i < hex.length; i += 2) str += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }

  return str;
}; // 日期转换


const formatDate = date => {
  date = new Date(date);
  const y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();
  const h = date.getHours();
  let m1 = date.getMinutes();
  m1 < 10 && (m1 = '0' + m1);
  m = m < 10 ? '0' + m : m;
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d + ' ' + h + ':' + m1;
};
const getDayName = serTime => {
  let td = new Date();
  td = new Date(td.getFullYear(), td.getMonth(), td.getDate());
  let od = new Date(serTime.replace(/-/g, '/'));
  od = new Date(od.getFullYear(), od.getMonth(), od.getDate());
  const xc = (od - td) / 1000 / 60 / 60 / 24;

  if (xc < -2) {
    return `${-xc}天前`;
  } else if (xc < -1) {
    return '前天';
  } else if (xc < 0) {
    return '昨天';
  } else if (xc === 0) {
    return '今天';
  } else if (xc < 2) {
    return '明天';
  } else if (xc < 3) {
    return '后天';
  } else {
    return `${xc}天后`;
  }
};
const parseQueryString = url => {
  const obj = {};
  const str = url.substr(url.indexOf('?') + 1);
  const arr = str.split('&');

  for (let i = 0; i < arr.length; i++) {
    const arr2 = arr[i].split('=');
    obj[arr2[0]] = arr2[1];
  }

  return obj;
};
const colorRgb = sColor => {
  //十六进制颜色值的正则表达式
  const reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/; // 如果是16进制颜色

  if (sColor && reg.test(sColor)) {
    if (sColor.length === 4) {
      let sColorNew = '#';

      for (let i = 1; i < 4; i += 1) {
        sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
      }

      sColor = sColorNew;
    } //处理六位的颜色值


    let sColorChange = [];

    for (let i = 1; i < 7; i += 2) {
      sColorChange.push(parseInt('0x' + sColor.slice(i, i + 2)));
    }

    return sColorChange.join(',');
  }

  return '255,255,255';
};
const authenticationAdmin = user => {
  if (!user.admin) {
    throw new _api_core_error__WEBPACK_IMPORTED_MODULE_0__["default"]('抱歉，请使用管理员账号登陆');
  }

  return true;
};
const compare = property => {
  return (a, b) => {
    return b[property] - a[property];
  };
};
/* make blocks human readable */

const filterBlocks = blocks => {
  if (blocks.constructor !== Array) {
    const b = blocks;
    const ascii = hex2ascii(blocks.extraData);
    b.extraDataHex = blocks.extraData;
    b.extraData = ascii;
    return b;
  }

  return blocks.map(block => {
    const b = block;
    const ascii = hex2ascii(block.extraData);
    b.extraDataHex = block.extraData;
    b.extraData = ascii;
    return b;
  });
};
const filterTrace = (txs, value) => {
  return txs.map(tx => {
    const t = tx;

    if (t.type == 'suicide') {
      if (t.action.address) t.from = t.action.address;
      if (t.action.balance) t.value = _lib_etherUnits__WEBPACK_IMPORTED_MODULE_3___default.a.toEther(new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(t.action.balance), 'wei');
      if (t.action.refundAddress) t.to = t.action.refundAddress;
    } else {
      if (t.action.to) t.to = t.action.to;
      t.from = t.action.from;
      if (t.action.gas) t.gas = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(t.action.gas).toNumber();
      if (t.result && t.result.gasUsed) t.gasUsed = new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(t.result.gasUsed).toNumber();
      if (t.result && t.result.address) t.to = t.result.address;
      t.value = _lib_etherUnits__WEBPACK_IMPORTED_MODULE_3___default.a.toEther(new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(t.action.value), 'wei');
    }

    return t;
  });
}; // 千分位

const formatDataNumber = num => {
  num += '';
  if (!num.includes('.')) num += '.';
  return num.replace(/(\d)(?=(\d{3})+\.)/g, function ($0, $1) {
    return $1 + ',';
  }).replace(/\.$/, '');
};
const handleGetFee = (price, number) => {
  if (!price) {
    return false;
  }

  const priceStr = price.toString();
  const priceLen = priceStr.length;

  if (priceLen > number) {
    if (number === 0) {
      return formatDataNumber(priceStr);
    } else {
      const pointNumber = priceLen - number;

      if (pointNumber >= 10) {
        return formatDataNumber(priceStr.substring(0, pointNumber));
      } else {
        const feeArr = priceStr.split('');
        feeArr.splice(priceLen - number, 0, '.');
        return formatDataNumber(feeArr.join('').substr(0, feeArr[9] === '.' ? 9 : 10));
      }
    }
  } else {
    const fee = `0.${new Array(number - priceLen + 1).join('0')}${priceStr}`;
    return formatDataNumber(fee.substr(0, 10));
  }
};
const analysisInput = (data, number) => {
  const value = data.toString().substring(74);
  return handleGetFee(new bignumber_js__WEBPACK_IMPORTED_MODULE_2___default.a(parseInt(value, 16)).toFixed(), number);
};
const handleAllTrade = (index, value, isReg) => {
  const minerRegex = isReg ? new RegExp(['^', value, '$'].join(''), 'i') : value;

  switch (index) {
    case 'out':
      return {
        $or: [{
          from: minerRegex
        }, {
          addr: value
        }]
      };

    case 'in':
      return {
        $or: [{
          to: minerRegex
        }, {
          addr: value
        }]
      };

    case 'all':
    default:
      return {
        $or: [{
          to: minerRegex
        }, {
          from: minerRegex
        }, {
          addr: value
        }]
      };
  }
}; // 判断是否手机

const isMobile = userAgent => {
  const mobileList = new Array('Android', 'iPhone', 'SymbianOS', 'Windows Phone', 'iPad', 'iPod');
  var mobile = false;

  for (var v = 0; v < mobileList.length; v++) {
    if (userAgent.indexOf(mobileList[v]) > 0) {
      mobile = true;
      break;
    }
  }

  return mobile;
};

/***/ }),

/***/ "./utils/cookie.js":
/*!*************************!*\
  !*** ./utils/cookie.js ***!
  \*************************/
/*! exports provided: getCookies, setCookie, removeCookie */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "getCookies", function() { return getCookies; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "setCookie", function() { return setCookie; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "removeCookie", function() { return removeCookie; });
const getCookies = req => {
  var _req$headers;

  return parseCookie(true ? req === null || req === void 0 ? void 0 : (_req$headers = req.headers) === null || _req$headers === void 0 ? void 0 : _req$headers.cookie : undefined);
};
const setCookie = (k, v, exdays) => {
  if (false) {}
};
const removeCookie = k => {
  setCookie(k, '', -1);
};

const parseCookie = cookieStr => {
  const cookies = {};

  if (cookieStr) {
    var _cookieStr$split;

    (_cookieStr$split = cookieStr.split(';')) === null || _cookieStr$split === void 0 ? void 0 : _cookieStr$split.forEach(cookie => {
      const parts = cookie.match(/(.*?)=(.*)$/);
      cookies[parts[1].trim()] = (parts[2] || '').trim();
    });
  }

  return cookies;
};

/***/ }),

/***/ "./utils/lang/en.js":
/*!**************************!*\
  !*** ./utils/lang/en.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  lang1: 'Home',
  lang2: 'View Block',
  lang3: 'View Transaction',
  lang4: 'Address/Transaction Hash/Block Coding',
  lang5: 'Search',
  lang6: 'Transactions',
  lang7: 'State',
  lang8: 'Latest Block',
  lang9: 'All Transactions',
  lang10: '24H vol',
  lang11: 'Number Of Transaction',
  lang12: 'Refresh',
  lang13: 'All',
  lang14: 'ago',
  lang15: 'From Miner',
  lang16: 'From',
  lang17: 'To',
  lang18: 'Block List',
  lang19: 'Block',
  lang20: 'Miner',
  lang21: 'Age',
  lang22: 'Block Size',
  lang23: 'Transaction Hash',
  lang24: 'Sender',
  lang25: 'Receiver',
  lang26: 'Number',
  lang27: 'Fee',
  lang28: 'Block Height',
  lang29: 'Block Details',
  lang30: 'Height',
  lang31: 'Trading Hours',
  lang32: 'Number Of Transaction',
  lang33: 'totalDifficulty',
  lang34: 'Parent Hash',
  lang35: 'Address ',
  lang36: 'Overview',
  lang37: 'Balance',
  lang38: 'TokenBalance',
  lang39: 'Please choose Token',
  lang40: 'Token Transaction',
  lang41: 'Outgoing Transaction',
  lang42: 'Recorded Transaction',
  lang43: 'Hash',
  lang44: 'Transaction Status',
  lang45: 'Success',
  lang46: 'Error',
  lang47: 'Pending',
  lang48: 'Timestamp',
  lang49: 'Contract Address',
  lang50: 'token Symbol',
  lang51: 'Total Circulation',
  lang52: 'Decimaldigit',
  lang53: 'Creator Address',
  lang54: 'Value',
  lang55: 'Token Name',
  lang56: 'Transactions',
  lang57: 'Token Information',
  lang58: 'Create Contract',
  lang59: 'Total ',
  lang60: ' current display ',
  lang61: ' piece',
  lang62: 'Blockchain Browser',
  lang63: 'Click For More',
  lang64: 'Column',
  lang65: 'Confirming'
});

/***/ }),

/***/ "./utils/lang/zh.js":
/*!**************************!*\
  !*** ./utils/lang/zh.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony default export */ __webpack_exports__["default"] = ({
  lang1: '首页',
  lang2: '查看区块',
  lang3: '查看交易',
  lang4: '请输入地址/交易哈希/区块编码',
  lang5: '查询',
  lang6: '交易',
  lang7: '状态',
  lang8: '最新区块',
  lang9: '所有交易',
  lang10: '24H 成交量',
  lang11: '交易数量',
  lang12: '刷新',
  lang13: '查看所有',
  lang14: '之前',
  lang15: '由矿工',
  lang16: '从',
  lang17: '到',
  lang18: '区块列表',
  lang19: '区块',
  lang20: '矿工',
  lang21: '块龄',
  lang22: '容量',
  lang23: '交易哈希',
  lang24: '发送方',
  lang25: '接收方',
  lang26: '数量',
  lang27: '费用',
  lang28: '区块高度',
  lang29: '区块详情',
  lang30: '高度',
  lang31: '交易时间',
  lang32: '交易数量',
  lang33: '难度',
  lang34: '父区块',
  lang35: '地址',
  lang36: '总览',
  lang37: '余额',
  lang38: '代币余额',
  lang39: '请选择代币',
  lang40: '代币交易',
  lang41: '出账交易',
  lang42: '入账交易',
  lang43: '哈希',
  lang44: '交易状态',
  lang45: '成功',
  lang46: '失败',
  lang47: '交易中',
  lang48: '时间戳',
  lang49: '合约地址',
  lang50: '代币符号',
  lang51: '总发行量',
  lang52: '小数位数',
  lang53: '创建人地址',
  lang54: '价值',
  lang55: '代币名称',
  lang56: '最新交易',
  lang57: '代币信息',
  lang58: '创建合约',
  lang59: '共 ',
  lang60: ' 条 当前显示 ',
  lang61: ' 条',
  lang62: '区块链浏览器',
  lang63: '点击查看更多',
  lang64: '栏目',
  lang65: '区块确认中'
});

/***/ }),

/***/ 0:
/*!****************************************!*\
  !*** multi private-next-pages/_app.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! private-next-pages/_app.js */"./pages/_app.js");


/***/ }),

/***/ "antd/lib/config-provider":
/*!*******************************************!*\
  !*** external "antd/lib/config-provider" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/config-provider");

/***/ }),

/***/ "antd/lib/locale/en_US":
/*!****************************************!*\
  !*** external "antd/lib/locale/en_US" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale/en_US");

/***/ }),

/***/ "antd/lib/locale/zh_CN":
/*!****************************************!*\
  !*** external "antd/lib/locale/zh_CN" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("antd/lib/locale/zh_CN");

/***/ }),

/***/ "bignumber.js":
/*!*******************************!*\
  !*** external "bignumber.js" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("bignumber.js");

/***/ }),

/***/ "next/router":
/*!******************************!*\
  !*** external "next/router" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("next/router");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-intl":
/*!*****************************!*\
  !*** external "react-intl" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl");

/***/ }),

/***/ "react-intl/locale-data/en":
/*!********************************************!*\
  !*** external "react-intl/locale-data/en" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/en");

/***/ }),

/***/ "react-intl/locale-data/zh":
/*!********************************************!*\
  !*** external "react-intl/locale-data/zh" ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-intl/locale-data/zh");

/***/ }),

/***/ "rlp":
/*!**********************!*\
  !*** external "rlp" ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("rlp");

/***/ })

/******/ });
//# sourceMappingURL=_app.js.map