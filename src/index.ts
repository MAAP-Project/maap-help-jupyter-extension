/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils'
import { IMainMenu } from '@jupyterlab/mainmenu';

//import { ITourHandler } from "jupyterlab-tour";

/** phosphor imports **/
//import { Menu } from '@lumino/widgets';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
//import { IFrameWidget } from './widgets';


console.log(PageConfig.getBaseUrl());

///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////

const extension: JupyterFrontEndPlugin<void> = {
  id: 'maap-help',
  autoStart: true,
  optional: [ICommandPalette, IMainMenu],
  activate: async (app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,) => {
      let tour: any;
      app.commands.execute('jupyterlab-tour:add', {
        tour: managerTour as any
      })
      .then(result => {
        tour = result;
      });

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
        maap_py_command
    ].forEach(command => {
        mainMenu.helpMenu.addItem({ command });
    });

    app.restored.then(() => {
      // Wait 3s before launching the first tour - to be sure element are loaded
      if (tour) {
        setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
      }
    });


  console.log('JupyterLab extension maap_help is activated!');
  },
};


export default extension;