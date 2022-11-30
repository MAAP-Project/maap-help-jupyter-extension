/** jupyterlab imports **/
import { ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IMainMenu } from '@jupyterlab/mainmenu';
/** phosphor imports **/
import { Menu } from '@lumino/widgets';
/** internal imports **/
import '../style/index.css';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, launchTutorialPopup } from './popups';
console.log(PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
/* //use this as an example because this works 
const extension = {
    id: 'maap_help',
    autoStart: true,
    requires: [ICommandPalette, ILayoutRestorer, IMainMenu],
    activate: activate
};
function activate(app, palette, restorer, mainMenu) {
    console.log("graceal in the activate function");
    console.log(mainMenu.fileMenu);
    const test_command = 'iframe:test';
    app.commands.addCommand(test_command, {
        label: 'Test',
        isEnabled: () => true,
        execute: args => {
            console.log("graceal executing the test command");
        }
    });
    mainMenu.fileMenu.addGroup([
        {
          command: "test",
        }
      ], 40 );
}
export default extension;*/

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
    // Add an application command to open ESDC*/
    const about_command = 'iframe:about';
    app.commands.addCommand(about_command, {
        label: 'About MAAP',
        isEnabled: () => true,
        execute: args => {
            aboutPopup();
        }
    });
    palette.addItem({ command: about_command, category: 'Help' });
    const faq_command = 'help:faq';
    app.commands.addCommand(faq_command, {
        label: 'MAAP FAQ',
        isEnabled: () => true,
        execute: args => {
            faqPopup();
        }
    });
    palette.addItem({ command: faq_command, category: 'Help' });
    const tech_doc_command = 'help:techDoc';
    app.commands.addCommand(tech_doc_command, {
        label: 'MAAP Technical Documentation',
        isEnabled: () => true,
        execute: args => {
            techDocPopup();
        }
    });
    palette.addItem({ command: tech_doc_command, category: 'Help' });
    const tutorials_command = 'help:tutorials';
    app.commands.addCommand(tutorials_command, {
        label: 'MAAP Tutorials',
        isEnabled: () => true,
        execute: args => {
            tutorialsPopup();
        }
    });
    palette.addItem({ command: tutorials_command, category: 'Help' });
    const launch_tutorial_command = 'help:launchtutorial';
    app.commands.addCommand(launch_tutorial_command, {
        label: 'MAAP Launch Tutorial',
        isEnabled: () => true,
        execute: args => {
            launchTutorialPopup();
        }
    });
    palette.addItem({ command: launch_tutorial_command, category: 'Help' });
    [
        about_command,
        faq_command,
        tech_doc_command,
        tutorials_command,
        launch_tutorial_command
    ].forEach(command => {
        mainMenu.helpMenu.addItem({ command });
    });
    console.log('JupyterLab extension maap_help is activated!');
    return instanceTracker;
}
;
export default extension;
