import { Dialog, showDialog } from "@jupyterlab/apputils";
import { LimitPopupWidget, ParamsPopupWidget, Test1Widget } from "./widgets";
import "./globals";
export function setResultsLimit() {
    showDialog({
        title: 'Set Results Limit:',
        body: new LimitPopupWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}
export function displaySearchParams() {
    showDialog({
        title: 'Current Search Parameters:',
        body: new ParamsPopupWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}
export function test1function() {
    showDialog({
        title: 'Test1 test',
        body: new Test1Widget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}
