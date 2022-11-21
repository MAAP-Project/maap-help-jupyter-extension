import { Dialog, showDialog } from "@jupyterlab/apputils";
import { AboutWidget, FAQWidget, TechDocWidget, TutorialsWidget } from "./widgets";
import "./globals";

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
