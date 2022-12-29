/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
//import { ICommandPalette } from '@jupyterlab/apputils';
//import { IMainMenu } from '@jupyterlab/mainmenu';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
//import { IFrameWidget } from './widgets';

//import { ITourHandler } from 'jupyterlab-tour';

import { ICommandPalette, InputDialog } from '@jupyterlab/apputils';
import { IMainMenu, MainMenu } from '@jupyterlab/mainmenu';
import { IStateDB } from '@jupyterlab/statedb';
//import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';
import { StateDB } from '@jupyterlab/statedb';

import React from 'react';
import ReactDOM from 'react-dom';
import { TourContainer } from './jupyterlab-tour/components';
import { CommandIDs } from './jupyterlab-tour/constants';
//import { addTours } from './defaults';
import {
  //DEFAULTS_PLUGIN_ID,
  ITourHandler,
  ITourManager
  /*IUserTourManager,
  PLUGIN_ID,
  USER_PLUGIN_ID*/
} from './jupyterlab-tour/tokens';
import { TourHandler } from './jupyterlab-tour/tour';
import { TourManager } from './jupyterlab-tour/tourManager';
//import { UserTourManager } from './userTourManager';


const sideBarTitles = ["Jobs sent to DPS", "Open Tabs"];
const topMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
const eclipseCheSideBarNames = ["getstarted", "stacks"];

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
    mainMenu: IMainMenu,
    stateDB: IStateDB,
    menu?: MainMenu,
    translator?: ITranslator) => {
      stateDB = new StateDB();
      console.log("graceal at the beginning of activate");
      console.log(app);
      console.log(palette);
      console.log(mainMenu);
      console.log(stateDB);
      console.log(menu);
      console.log(translator);
      activate1(app, stateDB, palette, menu, translator);
      /*const tour = (await app.commands.execute('jupyterlab-tour:add', {
        tour: { // Tour must be of type ITour - see src/tokens.ts
          id: 'jupyterlab-tour:maap-tour',
          label: 'MAAP Tour',
          hasHelpEntry: true,
          steps: [  
            {
              content: 
              'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Welcome to MAAP!'
            },
            {
              content:
                'Pause the tour by clicking anywhere outside of the tooltip and resume the tour by clicking on the blue dot. Tours can be restarted in the help menu.',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Some information on the tour, first'
            },
            {
              content: 'Interface with Git including cloning a repository.',
              placement: 'bottom',
              target: '#Git',
              title: 'Git'
            },
            {
              content: 'Launch Earthdata Search Client (EDSC) and paste search queries.',
              placement: 'bottom',
              target: '#DataSearch',
              title: 'Data Search'
            },
            {
              content: 'Register algorithms into DPS to be able to run as jobs.',
              placement: 'bottom',
              target: '#DPSMASOperations',
              title: 'Welcome to MAAP!'
            },
            {
              content: 'Manage your jobs in DPS.',
              placement: 'bottom',
              target: '#DPSUIMenu',
              title: 'DPS UI Menu'
            },
            {
              content: 'Log into the MAAP platform with an ESA/ Earthdata account.',
              placement: 'bottom',
              target: '#MAAPLogin',
              title: 'MAAP Login'
            },
            {
              content: 
              'General help menu with additional MAAP-specific information and the option to rerun this tutorial.',
              placement: 'bottom',
              target: '#Help',
              title: 'Help'
            },
            {
              content: 
              'Create a new workspace here. You can create a workspace from a sample or create a custom workspace.',
              placement: 'right',
              target: '#getstarted',
              title: 'Get Started'
            },
            {
              content: 
              'See available samples for the workspaces as well as their devfiles.',
              placement: 'right',
              target: '#stacks',
              title: 'Stacks'
            },
            {
              content: 
              'See your jobs in DPS.',
              placement: 'right',
              target: '#JobssenttoDPS',
              title: 'Jobs'
            },
            {
              content: 
              'See open tabs.',
              placement: 'right',
              target: '#OpenTabs',
              title: 'Open Tabs'
            },
            {
              content:
                'The file browser is divided into your private and public buckets. Anthing in an s3-backed folder will be persistent. For example, <username> is s3-backed.',
              placement: 'right',
              target: '#filebrowser',
              title: 'File Browser'
            },
            {
              content:
                'The status bar at the bottom states your workspace\'s memory capacity which can be increased or decreased by manually configuring the workspace.',
              placement: 'top',
              target: '#jp-main-statusbar',
              title: 'Status Bar'
            }
          ],
          // can also define `options`
        }
      })) as ITourHandler;*/
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
      console.log("graceal in the app restored if statement");
      if (tour) {
        setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
        // add an id to all the top menu bar items
        var divElements = Array.from(document.getElementsByTagName('div')); 
        divElements = divElements.filter(divElement => divElement.textContent && topMenuOptions.includes(divElement.textContent));
        divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));

        // add an id to all the side menu bar items 
        var sideBarElements = Array.from(document.getElementsByClassName('lm-TabBar-tab p-TabBar-tab')); 
        sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
        sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));
        
        // add an id to all of the eclipse che side bar items 
        var eclipseCheSideBarElements = Array.from(document.getElementsByTagName('a')); 
        eclipseCheSideBarElements = eclipseCheSideBarElements.filter(eclipseCheSideBarElement => determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement));
        eclipseCheSideBarElements.forEach(eclipseCheSideBarElement => eclipseCheSideBarElement.setAttribute('id', getEclipseCheSideBarId(eclipseCheSideBarElement)));
      }
    });

    


  console.log('JupyterLab extension maap_help is activated!');
  console.log("version: 0.0.21");
  },
};

function determineIncludeSideBarElement(sideBarElement: any) {
  const title = sideBarElement.getAttribute('title');
  return title && sideBarTitles.includes(title);
}

function getSideBarId(sideBarElement:any) {
  return sideBarElement.getAttribute('title').replace(/-|\s|\/|\&/g, '');
}

function determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement: any) {
  const href = eclipseCheSideBarElement.getAttribute('href');
  return href && eclipseCheSideBarNames.includes(href.replace("#/",""));
}

function getEclipseCheSideBarId(eclipseCheSideBarElement: any) {
  return eclipseCheSideBarElement.getAttribute('href').replace("#/", "");
}

function activate1(
  app: JupyterFrontEnd,
  stateDB: IStateDB,
  palette?: ICommandPalette,
  menu?: MainMenu,
  translator?: ITranslator
): ITourManager {
  const { commands } = app;

  translator = translator ?? nullTranslator;

  // Create tour manager
  console.log("graceal and printing state db");
  console.log(stateDB);
  console.log(translator);
  console.log(menu);
  const manager = new TourManager(stateDB, translator, menu);

  commands.addCommand(CommandIDs.launch, {
    label: args => {
      if (args['id']) {
        const tour = manager.tours.get(args['id'] as string) as TourHandler;
        return manager.translator.__(tour.label);
      } else {
        return manager.translator.__('Launch a Tour');
      }
    },
    usage: manager.translator.__(
      'Launch a tour.\nIf no id provided, prompt the user.\nArguments {id: Tour ID}'
    ),
    isEnabled: () => !manager.activeTour,
    execute: async args => {
      let id = args['id'] as string;
      const force =
        args['force'] === undefined ? true : (args['force'] as boolean);

      if (!id) {
        const answer = await InputDialog.getItem({
          items: Array.from(manager.tours.keys()),
          title: manager.translator.__('Choose a tour')
        });

        if (answer.button.accept && answer.value) {
          id = answer.value;
        } else {
          return;
        }
      }

      manager.launch([id], force);
    }
  });

  commands.addCommand(CommandIDs.addTour, {
    label: manager.translator.__('Add a tour'),
    usage: manager.translator.__(
      'Add a tour and returns it.\nArguments {tour: ITour}\nReturns `null` if a failure occurs.'
    ),
    execute: (args): ITourHandler | null => {
      return manager.addTour(args.tour as any);
    }
  });

  if (palette) {
    palette.addItem({
      category: manager.translator.__('Help'),
      command: CommandIDs.launch
    });
  }

  const node = document.createElement('div');

  document.body.appendChild(node);
  ReactDOM.render(<TourContainer tourLaunched={manager.tourLaunched} />, node);

  return manager;
}

export default extension;