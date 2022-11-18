/** jupyterlab imports **/
import { ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IMainMenu } from '@jupyterlab/mainmenu';
/** phosphor imports **/
import { Menu } from '@lumino/widgets';
/** internal imports **/
import '../style/index.css';
import { aboutPopup } from './popups';
import "./globals";
console.log(PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
const extension = {
    id: 'maap_help',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer, IMainMenu],
    activate: activate
};
function activate(app, palette, restorer, mainMenu) {
    const namespace = 'tracker-iframe';
    let instanceTracker = new WidgetTracker({ namespace });
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
            console.log("in execute of about javascript");
            aboutPopup();
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
    let helpMenu = new Menu({ commands });
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
export default extension;