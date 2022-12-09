import { Dialog, showDialog } from "@jupyterlab/apputils";
import { AboutWidget, FAQWidget, TechDocWidget, TutorialsWidget, LaunchTutorialWidget, MaapApiWidget } from "./widgets";

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

export function launchTutorialPopup() {
    showDialog({
        body: new LaunchTutorialWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export function maapApiPopup() {
    showDialog({
        body: new MaapApiWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}
