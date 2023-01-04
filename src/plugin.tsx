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
import { TourContainer } from './jupyterlab-tour/components';
import { CommandIDs } from './jupyterlab-tour/constants';
import {
  ITourHandler,
  ITourManager
} from './jupyterlab-tour/tokens';
import { TourHandler } from './jupyterlab-tour/tour';
import { TourManager } from './jupyterlab-tour/tourManager';

import React from 'react';
import ReactDOM from 'react-dom';
//import * as fs from "fs";
//import { writeFileSync } from 'fs';
var fs = require('browserify-fs');
//import * as fs from "browserify-fs";




const sideBarTitles = ["job-cache-display", "filebrowser"];
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
      createTourCommands(app, stateDB, palette, menu, translator);
      
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
    const tour_command = 'help:tour';
    app.commands.addCommand(tour_command, {
        label: 'MAAP Tour',
        isEnabled: () => true,
        execute: args => {
          if (tour) {
              app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: true });
            }
        }
    });
    palette.addItem({ command: tour_command, category: 'Help' });
    [
        about_command,
        faq_command,
        tech_doc_command,
        tutorials_command,
        maap_py_command,
        tour_command
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
        console.log("graceal printing the side bar elements selected by class name");
        console.log(sideBarElements);
        sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
        sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));
        
        // add an id to all of the eclipse che side bar items 
        var eclipseCheSideBarElements = Array.from(document.getElementsByTagName('a')); 
        console.log("graceal printing the a tags: ");
        console.log(eclipseCheSideBarElements);
        console.log("printing the md-list-item");
        console.log(Array.from(document.getElementsByTagName('md-list-item'))); 
        eclipseCheSideBarElements = eclipseCheSideBarElements.filter(eclipseCheSideBarElement => determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement));
        eclipseCheSideBarElements.forEach(eclipseCheSideBarElement => eclipseCheSideBarElement.setAttribute('id', getEclipseCheSideBarId(eclipseCheSideBarElement)));
      }
    });

    
    fs.writeFile('message.txt', 'Hello Node.js', callbackFunction);
    /*writeFileSync("testing.txt", "hello", {
      flag: 'w',
    });*/
  console.log('JupyterLab extension maap_help is activated!');
  console.log("version: 0.0.24-1");
  },
};

function callbackFunction() {

}

function determineIncludeSideBarElement(sideBarElement: any) {
  const title = sideBarElement.getAttribute('data-id');
  return title && sideBarTitles.includes(title);
}

function getSideBarId(sideBarElement:any) {
  return sideBarElement.getAttribute('data-id').replace(/-|\s|\/|\&/g, '');
}

function determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement: any) {
  const href = eclipseCheSideBarElement.getAttribute('href');
  return href && eclipseCheSideBarNames.includes(href.replace("#/",""));
}

function getEclipseCheSideBarId(eclipseCheSideBarElement: any) {
  return eclipseCheSideBarElement.getAttribute('href').replace("#/", "");
}

function createTourCommands(
  app: JupyterFrontEnd,
  stateDB: IStateDB,
  palette?: ICommandPalette,
  menu?: MainMenu,
  translator?: ITranslator
): ITourManager {
  const { commands } = app;

  translator = translator ?? nullTranslator;

  // Create tour manager
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