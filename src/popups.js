import { Dialog, showDialog } from "@jupyterlab/apputils";
import { AboutWidget, FAQWidget, TechDocWidget, TutorialsWidget, LaunchTutorialWidget } from "./widgets";
import "./globals";
import { Widget } from '@lumino/widgets';

//import React, { Component } from "react";

export function aboutPopup() {
    showDialog({
        body: new AboutWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export function faqPopup() {
    showDialog({
        body: new FAQWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export function techDocPopup() {
    showDialog({
        body: new TechDocWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export function tutorialsPopup() {
    showDialog({
        body: new TutorialsWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export class launchTutorialPopup extends Widget {
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
