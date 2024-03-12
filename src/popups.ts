/**
 * Pop ups that appear when the user selects any MAAP specific items from the help menu
 * 
 * Author: Grace Llewellyn, grace.llewellyn@jpl.nasa.gov
 */

import { Dialog, showDialog } from "@jupyterlab/apputils";
import { AboutWidget, MAAPDocumentationWidget, MaapApiWidget, MaapBugSubmissionWidget } from "./widgets";

export function aboutPopup() {
    showDialog({
        body: new AboutWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}

export function maapDocumentationPopup() {
    showDialog({
        body: new MAAPDocumentationWidget(),
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

export function maapBugSubmissionPopup() {
    showDialog({
        body: new MaapBugSubmissionWidget(),
        focusNodeSelector: 'input',
        buttons: [Dialog.okButton({ label: 'Ok' })]
    });
}