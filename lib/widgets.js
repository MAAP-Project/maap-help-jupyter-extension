import { Widget } from '@lumino/widgets';
//import { PageConfig } from '@jupyterlab/coreutils'
import { INotification } from "jupyterlab_toastify";
import "./globals";
let unique = 0;
//
// Widget to display Earth Data Search Client inside an iframe
//
export class IFrameWidget extends Widget {
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
;
//
// Widget to display selected search parameter
//
export class ParamsPopupWidget extends Widget {
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
export class FlexiblePopupWidget extends Widget {
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
export class LimitPopupWidget extends Widget {
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
        INotification.success("made it to get value function");
    }
}
export class AboutWidget extends Widget {
    constructor() {
        console.log("in the about widget contructor");
        let body = document.createElement('html');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const box = `
        <div>
            <p> Hello </p> 
        </div>`;

        body.innerHTML = box;
        //body.innerHTML = "<title>Page Title</title>";
        super({ node: body });
    }
}
