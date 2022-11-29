import { Dialog, showDialog } from "@jupyterlab/apputils";
import { AboutWidget, FAQWidget, TechDocWidget, TutorialsWidget, LaunchTutorialWidget } from "./widgets";
import "./globals";
import React, { Component } from "react";

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

export class launchTutorialPopup extends Component {
    render() {
        console.log("graceal in the render class for launch tutorial");

        return (
            <div class="popup">
                <span class="popuptext" id="myPopup">Popup text...</span>
            </div>      
        );
    }
}
