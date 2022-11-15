"use strict";
(self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] = self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/activate.js":
/*!*************************!*\
  !*** ./lib/activate.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "activateLogin": () => (/* binding */ activateLogin),
/* harmony export */   "activateMenuOptions": () => (/* binding */ activateMenuOptions)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _funcs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./funcs */ "./lib/funcs.js");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/coreutils */ "webpack/sharing/consume/default/@lumino/coreutils");
/* harmony import */ var _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__);



const idMaapProfile = 'maap-help-extension:IMaapProfile';
const IMaapProfile = new _lumino_coreutils__WEBPACK_IMPORTED_MODULE_1__.Token(idMaapProfile);
let maapEnvironment = {};
class MaapProfile {
}
const login_command = 'maapsec_login_command';
var loginWindow;
var _state;
function activateLogin(app, palette, state) {
    _state = state;
    const maapProfile = new MaapProfile();
    var lbl = 'Login';
    (0,_funcs__WEBPACK_IMPORTED_MODULE_2__.loadMaapEnvironment)().then((env_result) => {
        console.log("Loaded maap env");
        console.log(env_result);
        maapEnvironment = env_result;
    });
    app.commands.addCommand(login_command, {
        label: lbl,
        isEnabled: () => true,
        execute: args => {
            console.log("testing...");
            console.log(maapEnvironment);
            var url = 'https://' + maapEnvironment['auth_server'] + '/cas/login?service=' + encodeURIComponent(window.location.href.split('?')[0]);
            var title = 'MAAP Login';
            const w = 800;
            const h = 750;
            var left = (screen.width / 2) - (w / 2);
            var top = (screen.height / 2) - (h / 2);
            loginWindow = window.open(url, title, 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
            //if (window.focus) loginWindow.focus();
            if (document.hasFocus() && loginWindow != null) {
                loginWindow.focus();
            }
            window.addEventListener('message', handleMessageDispatch);
        }
    });
    palette.addItem({ command: login_command, category: 'MAAP Profile' });
    console.log('MAAP Sec is activated');
    // Load the saved plugin state and apply it once the app
    // has finished restoring its former layout.
    Promise.all([state.fetch(idMaapProfile), app.restored])
        .then(([saved]) => {
        console.log('saved profile');
        console.log(saved);
    });
    return maapProfile;
}
function handleMessageDispatch(ev) {
    window.removeEventListener('message', handleMessageDispatch);
    let sTicket = ev.data;
    loginWindow.close();
    (0,_funcs__WEBPACK_IMPORTED_MODULE_2__.maapLogin)(encodeURIComponent(window.location.href.split('?')[0]), sTicket)
        .then((login_result) => {
        console.log(login_result);
        _state.save(idMaapProfile, login_result);
    });
}
// add MAAP Profile options to Menu dropdown
function activateMenuOptions(app, mainMenu) {
    const { commands } = app;
    let maapProfileMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Menu({ commands });
    maapProfileMenu.id = 'maapsec';
    maapProfileMenu.title.label = 'MAAP Login';
    [
        login_command,
    ].forEach(command => {
        maapProfileMenu.addItem({ command });
    });
    mainMenu.addMenu(maapProfileMenu, { rank: 110 });
}


/***/ }),

/***/ "./lib/funcs.js":
/*!**********************!*\
  !*** ./lib/funcs.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "loadMaapEnvironment": () => (/* binding */ loadMaapEnvironment),
/* harmony export */   "maapLogin": () => (/* binding */ maapLogin)
/* harmony export */ });
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _request__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./request */ "./lib/request.js");


function loadMaapEnvironment() {
    return new Promise((resolve, reject) => {
        console.log("In load function");
        var valuesUrl = new URL(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getBaseUrl() + 'jupyter-server-extension/maapsec/environment');
        console.log(valuesUrl);
        (0,_request__WEBPACK_IMPORTED_MODULE_1__.request)('get', valuesUrl.href).then((res) => {
            console.log('maapsec environment response');
            console.log(res);
            if (res.ok) {
                let environment = JSON.parse(res.data);
                resolve(environment);
            }
            else {
                resolve(null);
            }
        });
    });
}
function maapLogin(service, ticket) {
    return new Promise((resolve, reject) => {
        var valuesUrl = new URL(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_0__.PageConfig.getBaseUrl() + 'jupyter-server-extension/maapsec/login');
        console.log(valuesUrl);
        valuesUrl.searchParams.append('service', service);
        valuesUrl.searchParams.append('ticket', ticket);
        (0,_request__WEBPACK_IMPORTED_MODULE_1__.request)('get', valuesUrl.href).then((res) => {
            if (res.ok) {
                let attributes = JSON.parse(JSON.parse(res.data)['attributes']);
                resolve(attributes);
            }
            else {
                console.log(res);
                resolve(null);
            }
        });
    });
}


/***/ }),

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/launcher */ "webpack/sharing/consume/default/@jupyterlab/launcher");
/* harmony import */ var _jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/statedb */ "webpack/sharing/consume/default/@jupyterlab/statedb");
/* harmony import */ var _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _activate__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./activate */ "./lib/activate.js");





const extensionList = {
    id: 'maapsec-login',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.ICommandPalette, _jupyterlab_statedb__WEBPACK_IMPORTED_MODULE_3__.IStateDB],
    optional: [_jupyterlab_launcher__WEBPACK_IMPORTED_MODULE_1__.ILauncher],
    activate: _activate__WEBPACK_IMPORTED_MODULE_4__.activateLogin
};
const extensionMaapProfileMenu = {
    id: 'maapsec-menu',
    autoStart: true,
    requires: [_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__.IMainMenu],
    activate: _activate__WEBPACK_IMPORTED_MODULE_4__.activateMenuOptions
};
const extensionMaapLoginReceiver = {
    id: 'maapsec-login-receiver',
    autoStart: true,
    activate: (app) => {
        if (window.location.href.includes('ticket=')) {
            let name = 'ticket';
            let url = window.location.href;
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
            if (results != null) {
                let ticketValue = decodeURIComponent(results[2].replace(/\+/g, ' '));
                window.opener.postMessage(ticketValue, url);
            }
        }
        console.log('MAAPSec extension activated!');
    }
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ([extensionMaapProfileMenu, extensionList, extensionMaapLoginReceiver]);


/***/ }),

/***/ "./lib/request.js":
/*!************************!*\
  !*** ./lib/request.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "DEFAULT_REQUEST_OPTIONS": () => (/* binding */ DEFAULT_REQUEST_OPTIONS),
/* harmony export */   "request": () => (/* binding */ request)
/* harmony export */ });
const DEFAULT_REQUEST_OPTIONS = {
    ignoreCache: false,
    headers: {
        Accept: 'application/json, text/javascript, text/plain',
    },
    // default max duration for a request in ms
    // currently set to 120s = 2min
    timeout: 60000,
};
function queryParams(params = {}) {
    return Object.keys(params)
        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
        .join('&');
}
function withQuery(url, params = {}) {
    const queryString = queryParams(params);
    return queryString ? url + (url.indexOf('?') === -1 ? '?' : '&') + queryString : url;
}
function parseXHRResult(xhr) {
    return {
        ok: xhr.status >= 200 && xhr.status < 300,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: xhr.responseText,
        json: () => JSON.parse(xhr.responseText),
        url: xhr.responseURL
    };
}
function errorResponse(xhr, message = null) {
    return {
        ok: false,
        status: xhr.status,
        statusText: xhr.statusText,
        headers: xhr.getAllResponseHeaders(),
        data: message || xhr.statusText,
        json: () => JSON.parse(message || xhr.statusText),
        url: xhr.responseURL
    };
}
function request(method, url, queryParams = {}, body = null, options = DEFAULT_REQUEST_OPTIONS) {
    const ignoreCache = options.ignoreCache || DEFAULT_REQUEST_OPTIONS.ignoreCache;
    const headers = options.headers || DEFAULT_REQUEST_OPTIONS.headers;
    const timeout = options.timeout || DEFAULT_REQUEST_OPTIONS.timeout;
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.open(method, withQuery(url, queryParams));
        if (headers) {
            Object.keys(headers).forEach(key => xhr.setRequestHeader(key, headers[key]));
        }
        if (ignoreCache) {
            xhr.setRequestHeader('Cache-Control', 'no-cache');
        }
        xhr.timeout = timeout;
        xhr.onload = evt => {
            resolve(parseXHRResult(xhr));
        };
        xhr.onerror = evt => {
            resolve(errorResponse(xhr, 'Failed to make request.'));
        };
        xhr.ontimeout = evt => {
            resolve(errorResponse(xhr, 'Request took longer than expected.'));
        };
        if (method === 'post' && body) {
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.send(JSON.stringify(body));
        }
        else {
            xhr.send();
        }
    });
}


/***/ })

}]);
//# sourceMappingURL=lib_index_js.d431236e9f4546aece30.js.map