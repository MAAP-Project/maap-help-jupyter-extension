"use strict";
(self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] = self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] || []).push([["lib_index_js"],{

/***/ "./lib/index.js":
/*!**********************!*\
  !*** ./lib/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/coreutils */ "webpack/sharing/consume/default/@jupyterlab/coreutils");
/* harmony import */ var _jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../style/index.css */ "./style/index.css");
/* harmony import */ var _popups__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./popups */ "./lib/popups.js");
/** jupyterlab imports **/




/** phosphor imports **/

/** internal imports **/



console.log(_jupyterlab_coreutils__WEBPACK_IMPORTED_MODULE_2__.PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
const extension = {
    id: 'maap_help',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_3__.IMainMenu],
    activate: activate
};
function activate(app, palette, restorer, mainMenu) {
    const namespace = 'tracker-iframe';
    let instanceTracker = new _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.WidgetTracker({ namespace });
    //
    // Listen for messages being sent by the iframe - parse the url and set as parameters for search
    //
    window.addEventListener("message", (event) => {
        // if the message sent is the edsc url
        if (typeof event.data === "string") {
            console.log("graceal- event data" + event.data);
        }
    });
    /******** Set commands for command palette and main menu *********/
    // Add an application command to open ESDC
    const about_command = 'iframe:about';
    app.commands.addCommand(about_command, {
        label: 'About',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of about");
            (0,_popups__WEBPACK_IMPORTED_MODULE_6__.aboutPopup)();
        }
    });
    palette.addItem({ command: about_command, category: 'Help' });
    const test2 = 'help:test2';
    app.commands.addCommand(test2, {
        label: 'Test2',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of test2");
        }
    });
    palette.addItem({ command: test2, category: 'Help' });
    const test3 = 'help:test3';
    app.commands.addCommand(test3, {
        label: 'Test 3',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of test3");
        }
    });
    palette.addItem({ command: test3, category: 'Help' });
    const { commands } = app;
    let helpMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_4__.Menu({ commands });
    helpMenu.title.label = 'Help';
    [
        about_command,
        test2,
        test3
    ].forEach(command => {
        helpMenu.addItem({ command });
    });
    mainMenu.addMenu(helpMenu, { rank: 100 });
    // Track and restore the widget state
    restorer.restore(instanceTracker, {
        command: about_command,
        name: () => namespace
    });
    //graceal- to do- do I need this?
    console.log('JupyterLab extension maap_help is activated!');
    return instanceTracker;
}
;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (extension);


/***/ }),

/***/ "./lib/popups.js":
/*!***********************!*\
  !*** ./lib/popups.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aboutPopup": () => (/* binding */ aboutPopup),
/* harmony export */   "displaySearchParams": () => (/* binding */ displaySearchParams),
/* harmony export */   "setResultsLimit": () => (/* binding */ setResultsLimit)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./widgets */ "./lib/widgets.js");



function setResultsLimit() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: 'Set Results Limit:',
        body: new _widgets__WEBPACK_IMPORTED_MODULE_1__.LimitPopupWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}
function displaySearchParams() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: 'Current Search Parameters:',
        body: new _widgets__WEBPACK_IMPORTED_MODULE_1__.ParamsPopupWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}
function aboutPopup() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        title: 'About',
        body: new _widgets__WEBPACK_IMPORTED_MODULE_1__.AboutWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}


/***/ }),

/***/ "./lib/widgets.js":
/*!************************!*\
  !*** ./lib/widgets.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutWidget": () => (/* binding */ AboutWidget),
/* harmony export */   "FlexiblePopupWidget": () => (/* binding */ FlexiblePopupWidget),
/* harmony export */   "IFrameWidget": () => (/* binding */ IFrameWidget),
/* harmony export */   "LimitPopupWidget": () => (/* binding */ LimitPopupWidget),
/* harmony export */   "ParamsPopupWidget": () => (/* binding */ ParamsPopupWidget)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jupyterlab_toastify__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jupyterlab_toastify */ "webpack/sharing/consume/default/jupyterlab_toastify/jupyterlab_toastify");
/* harmony import */ var jupyterlab_toastify__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jupyterlab_toastify__WEBPACK_IMPORTED_MODULE_1__);

//import { PageConfig } from '@jupyterlab/coreutils'

/*import {
  request, RequestResult
} from './request';*/

let unique = 0;
//
// Widget to display Earth Data Search Client inside an iframe
//
class IFrameWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(path) {
        super();
        this.id = path + '-' + unique;
        unique += 1;
        this.title.label = "Earthdata Search";
        this.title.closable = true;
        let div = document.createElement('div');
        div.classList.add('iframe-widget');
        let iframe = document.createElement('iframe');
        iframe.id = "iframeid";
        // set proxy to EDSC
        /*request('get', path).then((res: RequestResult) => {
          if (res.ok){
            console.log('site accesible: proceeding');
            iframe.src = path;
          } else {
            iframe.setAttribute('baseURI', PageConfig.getBaseUrl());
    
            console.log('site failed with code ' + res.status.toString());
            if(res.status == 404){
    
            } else if(res.status == 401){
    
            } else {
              console.log('setting proxy');
              path = "edsc/proxy/" + path;
              iframe.src = path;
            }
          }
        });*/
        div.appendChild(iframe);
        this.node.appendChild(div);
    }
}
;
//
// Widget to display selected search parameter
//
class ParamsPopupWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.innerHTML = "<pre>Test: </pre><br>";
        super({ node: body });
    }
}
//
// Popup widget to display any string message
//
class FlexiblePopupWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor(text) {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.innerHTML = text;
        super({ node: body });
    }
}
//
// Widget with popup to set search results limit
//
class LimitPopupWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        super({ node: body });
        this.getValue = this.getValue.bind(this);
        let inputLimit = document.createElement('input');
        inputLimit.id = 'inputLimit';
        this.node.appendChild(inputLimit);
    }
    /* sets limit */
    getValue() {
        jupyterlab_toastify__WEBPACK_IMPORTED_MODULE_1__.INotification.success("made it to get value function");
    }
}
class AboutWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('html');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.innerHTML = "<title>Page Title</title>";
        super({ node: body });
    }
}


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/base.css":
/*!**************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/base.css ***!
  \**************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".iframe-widget {\n    position: relative;\n    overflow: hidden;\n    padding-top: 56.25%;\n    height: 0;\n  }\n  \n  iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n  ", "",{"version":3,"sources":["webpack://./style/base.css"],"names":[],"mappings":"AAAA;IACI,kBAAkB;IAClB,gBAAgB;IAChB,mBAAmB;IACnB,SAAS;EACX;;EAEA;IACE,kBAAkB;IAClB,MAAM;IACN,OAAO;IACP,WAAW;IACX,YAAY;IACZ,SAAS;EACX","sourcesContent":[".iframe-widget {\n    position: relative;\n    overflow: hidden;\n    padding-top: 56.25%;\n    height: 0;\n  }\n  \n  iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n  "],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./style/index.css":
/*!***************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./style/index.css ***!
  \***************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/cssWithMappingToString.js */ "./node_modules/css-loader/dist/runtime/cssWithMappingToString.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! -!../node_modules/css-loader/dist/cjs.js!./base.css */ "./node_modules/css-loader/dist/cjs.js!./style/base.css");
// Imports



var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.i(_node_modules_css_loader_dist_cjs_js_base_css__WEBPACK_IMPORTED_MODULE_2__["default"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n", "",{"version":3,"sources":[],"names":[],"mappings":"","sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./style/index.css":
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./index.css */ "./node_modules/css-loader/dist/cjs.js!./style/index.css");

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"], options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_index_css__WEBPACK_IMPORTED_MODULE_1__["default"].locals || {});

/***/ })

}]);
//# sourceMappingURL=lib_index_js.fbecb7f290a79f8d691d.js.map