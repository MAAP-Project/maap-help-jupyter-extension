/** jupyterlab imports **/
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IMainMenu } from '@jupyterlab/mainmenu';
import "jupyterlab-tour";
/** internal imports **/
import '../style/index.css';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, launchTutorialPopup, maapApiPopup } from './popups';
console.log(PageConfig.getBaseUrl());



///////////////////////////////////////////////////////////////
//
// Maap Help extension
//
///////////////////////////////////////////////////////////////

const extension = {
    id: 'maap_help',
    autoStart: true,
    requires: [ICommandPalette, IMainMenu],
    activate: activate
};
async function activate(app, palette, mainMenu) {
    const add_tour_command = 'jupyterlab-tour:add';
    app.commands.addCommand(add_tour_command, {
        label: 'Add Tour',
        isEnabled: () => true,
        execute: args => {
            console.log("graceal in the execute of the jupyter lab tour add");
        }
    });
    palette.addItem({ command: add_tour_command, category: 'Tour' });
    const tour = (await app.commands.execute('jupyterlab-tour:add', {
        tour: { // Tour must be of type ITour - see src/tokens.ts
          id: 'test-jupyterlab-tour:welcome',
          label: 'Welcome Tour',
          hasHelpEntry: true,
          steps: [  // Step must be of type IStep - see src/tokens.ts
            {
              content:
                'The following tutorial will point out some of the main UI components within JupyterLab.1',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Welcome to Jupyter Lab!'
            },
            {
              content:
                'This is the main content area where notebooks and other content can be viewed and edited.',
              placement: 'left-end',
              target: '#jp-main-dock-panel',
              title: 'Main Content'
            }
          ],
          // can also define `options`
        }
      }));
      console.log("tour is ");
      console.log(tour);
      if ( tour ) {
        app.commands.execute('jupyterlab-tour:launch', {
          id: 'test-jupyterlab-tour:welcome',
          force: true  // Optional, if false the tour will start only if the user have not seen or skipped it
        })
      }

      
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
    const maap_py_command = 'help:maapApi';
    app.commands.addCommand(maap_py_command, {
        label: 'MAAP API',
        isEnabled: () => true,
        execute: args => {
            maapApiPopup();
        }
    });
    palette.addItem({ command: maap_py_command, category: 'Help' });
    [
        about_command,
        faq_command,
        tech_doc_command,
        tutorials_command,
        launch_tutorial_command,
        maap_py_command
    ].forEach(command => {
        mainMenu.helpMenu.addItem({ command });
    });
    console.log('JupyterLab extension maap_help is activated!');
    return instanceTracker;
}
;
export default extension;
