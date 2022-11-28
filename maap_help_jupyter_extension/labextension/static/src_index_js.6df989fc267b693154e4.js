(self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] = self["webpackChunk_maap_jupyterlab_maap_help_jupyter_extension"] || []).push([["src_index_js"],{

/***/ "./node_modules/css-loader/index.js!./style/base.css":
/*!***********************************************************!*\
  !*** ./node_modules/css-loader/index.js!./style/base.css ***!
  \***********************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports


// module
exports.push([module.id, ".iframe-widget {\n    position: relative;\n    overflow: hidden;\n    padding-top: 56.25%;\n    height: 0;\n  }\n  \n  iframe {\n    position: absolute;\n    top: 0;\n    left: 0;\n    width: 100%;\n    height: 100%;\n    border: 0;\n  }\n  ", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./style/index.css":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/index.js!./style/index.css ***!
  \************************************************************/
/***/ ((module, exports, __webpack_require__) => {

exports = module.exports = __webpack_require__(/*! ../node_modules/css-loader/lib/css-base.js */ "./node_modules/css-loader/lib/css-base.js")(undefined);
// imports
exports.i(__webpack_require__(/*! -!../node_modules/css-loader/index.js!./base.css */ "./node_modules/css-loader/index.js!./style/base.css"), "");

// module
exports.push([module.id, "\n", ""]);

// exports


/***/ }),

/***/ "./style/index.css":
/*!*************************!*\
  !*** ./style/index.css ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !!../node_modules/css-loader/index.js!./index.css */ "./node_modules/css-loader/index.js!./style/index.css");
if(typeof content === 'string') content = [[module.id, content, '']];
// Prepare cssTransformation
var transform;

var options = {"hmr":true}
options.transform = transform
// add the styles to the DOM
var update = __webpack_require__(/*! !../node_modules/style-loader/lib/addStyles.js */ "./node_modules/style-loader/lib/addStyles.js")(content, options);
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {}

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/application */ "webpack/sharing/consume/default/@jupyterlab/application");
/* harmony import */ var _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @jupyterlab/mainmenu */ "webpack/sharing/consume/default/@jupyterlab/mainmenu");
/* harmony import */ var _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../style/index.css */ "./style/index.css");
/* harmony import */ var _style_index_css__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_index_css__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _popups__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./popups */ "./src/popups.js");
/** jupyterlab imports **/


//import { PageConfig } from '@jupyterlab/coreutils';

/** phosphor imports **/

/** internal imports **/


//console.log(PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
const extension = {
    id: 'maap_help',
    autoStart: true,
    requires: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_1__.ICommandPalette, _jupyterlab_application__WEBPACK_IMPORTED_MODULE_0__.ILayoutRestorer, _jupyterlab_mainmenu__WEBPACK_IMPORTED_MODULE_2__.IMainMenu],
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
            (0,_popups__WEBPACK_IMPORTED_MODULE_5__.aboutPopup)();
        }
    });
    palette.addItem({ command: about_command, category: 'Help' });
    const faq_command = 'help:faq';
    app.commands.addCommand(faq_command, {
        label: 'FAQ',
        isEnabled: () => true,
        execute: args => {
            (0,_popups__WEBPACK_IMPORTED_MODULE_5__.faqPopup)();
        }
    });
    palette.addItem({ command: faq_command, category: 'Help' });
    const tech_doc_command = 'help:techDoc';
    app.commands.addCommand(tech_doc_command, {
        label: 'Technical Documentation',
        isEnabled: () => true,
        execute: args => {
            (0,_popups__WEBPACK_IMPORTED_MODULE_5__.techDocPopup)();
        }
    });
    palette.addItem({ command: tech_doc_command, category: 'Help' });
    const tutorials_command = 'help:tutorials';
    app.commands.addCommand(tutorials_command, {
        label: 'Tutorials',
        isEnabled: () => true,
        execute: args => {
            (0,_popups__WEBPACK_IMPORTED_MODULE_5__.tutorialsPopup)();
        }
    });
    palette.addItem({ command: tutorials_command, category: 'Help' });
    const launch_tutorial_command = 'help:launchtutorial';
    app.commands.addCommand(launch_tutorial_command, {
        label: 'Launch Tutorial',
        isEnabled: () => true,
        execute: args => {
            new _popups__WEBPACK_IMPORTED_MODULE_5__.launchTutorialPopup();
        }
    });
    palette.addItem({ command: launch_tutorial_command, category: 'Help' });
    const { commands } = app;
    let helpMenu = new _lumino_widgets__WEBPACK_IMPORTED_MODULE_3__.Menu({ commands });
    helpMenu.title.label = 'Help';
    [
        about_command,
        faq_command,
        tech_doc_command,
        tutorials_command,
        launch_tutorial_command
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

/***/ "./src/popups.js":
/*!***********************!*\
  !*** ./src/popups.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "aboutPopup": () => (/* binding */ aboutPopup),
/* harmony export */   "faqPopup": () => (/* binding */ faqPopup),
/* harmony export */   "launchTutorialPopup": () => (/* binding */ launchTutorialPopup),
/* harmony export */   "techDocPopup": () => (/* binding */ techDocPopup),
/* harmony export */   "tutorialsPopup": () => (/* binding */ tutorialsPopup)
/* harmony export */ });
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @jupyterlab/apputils */ "webpack/sharing/consume/default/@jupyterlab/apputils");
/* harmony import */ var _jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _widgets__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./widgets */ "./src/widgets.js");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_1__);





//import React, { Component } from "react";

function aboutPopup() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        body: new _widgets__WEBPACK_IMPORTED_MODULE_2__.AboutWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}

function faqPopup() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        body: new _widgets__WEBPACK_IMPORTED_MODULE_2__.FAQWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}

function techDocPopup() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        body: new _widgets__WEBPACK_IMPORTED_MODULE_2__.TechDocWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}

function tutorialsPopup() {
    (0,_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.showDialog)({
        body: new _widgets__WEBPACK_IMPORTED_MODULE_2__.TutorialsWidget(),
        focusNodeSelector: 'input',
        buttons: [_jupyterlab_apputils__WEBPACK_IMPORTED_MODULE_0__.Dialog.okButton({ label: 'Ok' })]
    });
}

class launchTutorialPopup extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_1__.Widget {
    constructor() {
        console.log("in the constructor for the pop up");
        let body = document.createElement('div');
        const innerText = `
        <p>Test</p>
        `;

        body.innerHTML = innerText;
        super({ node: body });
    }
    /*
    render() {
        console.log("in the render function");
        return (
            <p>Test</p>
        );
    }*/
    /*showDialog({
        body: new LaunchTutorialWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });*/
}


/***/ }),

/***/ "./src/widgets.js":
/*!************************!*\
  !*** ./src/widgets.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AboutWidget": () => (/* binding */ AboutWidget),
/* harmony export */   "FAQWidget": () => (/* binding */ FAQWidget),
/* harmony export */   "IFrameWidget": () => (/* binding */ IFrameWidget),
/* harmony export */   "LaunchTutorialWidget": () => (/* binding */ LaunchTutorialWidget),
/* harmony export */   "LimitPopupWidget": () => (/* binding */ LimitPopupWidget),
/* harmony export */   "TechDocWidget": () => (/* binding */ TechDocWidget),
/* harmony export */   "TutorialsWidget": () => (/* binding */ TutorialsWidget)
/* harmony export */ });
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @lumino/widgets */ "webpack/sharing/consume/default/@lumino/widgets");
/* harmony import */ var _lumino_widgets__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_lumino_widgets__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! jquery */ "webpack/sharing/consume/default/jquery/jquery");
/* harmony import */ var jquery__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(jquery__WEBPACK_IMPORTED_MODULE_1__);

//import { PageConfig } from '@jupyterlab/coreutils'



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
        div.appendChild(iframe);
        this.node.appendChild(div);
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
        let img = document.createElement('img');
        img.src = 'images/photo1.png';
        img.alt = 'MAAP logo'
        this.node.appendChild(img);
    }
}
class AboutWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <head>
        <b>About</b>
        </head>
        <body>

        <h1>The MAAP Project (Multi-Mission Algorithm and Analysis Platform)</h1>
        <p><b>The MAAP platform is designed to combine data, algorithms, and computational abilities 
        for the processing and sharing of data related to NASA's GEDI, ESA's BIOMASS, and NASA/ISRO's 
        NISAR missions.</b> These missions generate vastly greater amounts of data than previous Earth 
        observation missions. There are unique challenges to processing, storing, and sharing the relevant 
        data due to the high data volume as well as with the data being collected from varied satellites, aircraft, and ground
        stations with different resolutions, coverages, and processing levels.</p>
        <p><b>MAAP aims to address unique challenges by making it easier to discover and use biomass relevant data, 
        integrating the data for comparison, analysis, evaluation, and generation.</b> An algorithm development environment (ADE) 
        is used to create repeatable and sharable science tools for the research community. The software is open source and adheres 
        to ESA's and NASA's commitment to open data.</p>
        <p><b>NASA and ESA are collaborating to further the interoperability of biomass relevant data and metadata.</b> Tools have been 
        developed to support a new approach to data stewardship and there is a data publication workflow for organizing and storing data and 
        generating metadata to be discoverable in a cloud-based centralized location. The platform and data stewardship approaches are designed to 
        ease barriers and promote collaboration between researchers, providers, curators, and experts across NASA
        and ESA.</p>

        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

class FAQWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Frequently Asked Questions</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/faqs.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

class TechDocWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Platform Technical Documentation</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/platform_tech_docs.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

class TutorialsWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Tutorials</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/tutorials.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

class LaunchTutorialWidget extends _lumino_widgets__WEBPACK_IMPORTED_MODULE_0__.Widget {
    constructor() {
        /*var script = document.createElement('script');
        script.src = 'https://code.jquery.com/jquery-3.6.0.min.js';
        document.getElementsByTagName('head')[0].appendChild(script);*/
        //$(document).foundation();
        let body = document.createElement('callout');
        //body.style.display = 'flex';
        //body.style.flexDirection = 'column';
        const innerText = `
        <embed type="text/html" src="src/index.html">
        `;

        body.innerHTML = innerText;
        super({ node: body });
    }
}



/***/ })

}]);
//# sourceMappingURL=src_index_js.6df989fc267b693154e4.js.map