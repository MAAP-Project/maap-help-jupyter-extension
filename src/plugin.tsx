/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette, InputDialog } from '@jupyterlab/apputils';
import { IMainMenu, MainMenu } from '@jupyterlab/mainmenu';
import { IStateDB } from '@jupyterlab/statedb';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';
import { StateDB } from '@jupyterlab/statedb';

//import { RankedMenu } from '@jupyterlab/ui-components';
import { HelpMenu } from '@jupyterlab/mainmenu';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
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

const sideBarTitles = ["job-cache-display", "filebrowser"];
const topMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
const eclipseCheSideBarNames = ["getstarted", "stacks"];

///////////////////////////////////////////////////////////////
//
// Maap Help extension
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
            console.log("graceal in the execure of maap tour");
            if (tour) {
              console.log("graceal in if tour statement");
                app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: true });
              }
          }
      });
      palette.addItem({ command: tour_command, category: 'Help' });
      /*const commands = 
      [
          about_command,
          faq_command,
          tech_doc_command,
          tutorials_command,
          maap_py_command,
          tour_command
      ];*//*.forEach(command => {
          //mainMenu.helpMenu.addItem({ command, rank:0 });
          mainMenu.helpMenu.addGroup([{ command: tour_command}], 0);
      });*/
      mainMenu.helpMenu.addGroup([{ command: about_command, type:"command"}], -.01);
      
      console.log("graceal trying to print helpful stuff for the help menu");
      console.log(mainMenu.helpMenu);
      console.log(mainMenu.helpMenu.items);
      console.log(mainMenu.helpMenu.items.length);
      //let commandsFromExistingMenu: never[] = [];
      for (let i=0; i<mainMenu.helpMenu.items.length; i++){
        console.log(mainMenu.helpMenu.items[i]);
        console.log(mainMenu.helpMenu.items[i].command);
        //commandsFromExistingMenu.add(mainMenu.helpMenu.items[i]);
       }
      console.log(mainMenu.helpMenu.rank);
      console.log("graceal printing .menu");
      console.log(mainMenu.helpMenu.menu);
      console.log(typeof mainMenu.helpMenu);
      
      /*let temp = new RankedMenu({commands: app.commands});
      temp.addGroup([{ command: "help:about", type:"command"}], 0);
      console.log(temp.getRankAt(0));
      mainMenu.addMenu(temp, {rank: -1});
      console.log(temp);*/

      let temp2 = new HelpMenu({commands: app.commands});
      temp2.addGroup([{ command: "help:open", type:"command"}], 0);
      mainMenu.addMenu(temp2, {rank: -1});
      if (mainMenu.helpMenu instanceof HelpMenu) {
        console.log("graceal in the if statement");
        console.log(mainMenu.helpMenu.items);
        mainMenu.helpMenu.removeItemAt(3);
        console.log(mainMenu.helpMenu.items);
        
      }
      // potential functions: getRankAt, insertItem, removeItem, removeItemAt, 
      
      
      console.log(temp2);
      //mainMenu.helpMenu.addGroup([{ command: about_command, rank: 0}], 0);
      /*const myMenu = new MenuFactory({ commands }).createMenu({ commands }, [
        { command: 'my-extension:command', rank: 100 },
      ], 'My Menu');
      
      // Add the menu to the main menu
      mainMenu.addMenu(myMenu, { rank: 100 });*/
      //const helpMenu = menuFactory.menuItems.find((item: { id: string; }) => item.id === 'jp-help-menu');
      //helpMenu.submenu.addItem({ about_command }, { rank: 0 });
      //const items = mainMenu.helpMenu.items.map(item => item.type === 'submenu' ? item.submenu.items : item).flat();
      //console.log(mainMenu.helpMenu.items.filter(item => item!=undefined).map(item => (item as any).options));
      //const ranks = mainMenu.helpMenu.items.filter(item => item!=undefined).map(item => (item as any).options.rank);
      //console.log(app.commands.listCommands().filter(command => command.category === 'Help').sort((a, b) => a.rank - b.rank));
  //console.log(mainMenu.helpMenu.dispose());
    

      app.restored.then(() => {
          // Wait 3s before launching the first tour - to be sure elements are loaded
          if (tour) {
            addIDsTourElements(app);
          }
      });

    console.log('JupyterLab extension maap_help v0.0.45 is activated!');
  },
};

/*
* Need to add an id to all of the elements that the MAAP tour wants to highlight so that the tour can find these elements
* Here we find the elements based on their names in the different types of HTML elements and this has to be somewhat hard coded 
* because not all are in the div of the html elements. We keep these names as constants at the top of this file
*/
function addIDsTourElements(app: JupyterFrontEnd) {
  setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
  // add an id to all the top menu bar items so that the tour can find it 
  var divElements = Array.from(document.getElementsByTagName('div')); 
  divElements = divElements.filter(divElement => divElement.textContent && topMenuOptions.includes(divElement.textContent));
  divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));

  // add an id to all the side menu bar items so that the tour can find it 
  var sideBarElements = Array.from(document.getElementsByClassName('lm-TabBar-tab p-TabBar-tab')); 
  sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
  sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));
  
  // add an id to all of the eclipse che side bar items so that the tour can find it 
  var eclipseCheSideBarElements = Array.from(document.getElementsByTagName('a')); 
  eclipseCheSideBarElements = eclipseCheSideBarElements.filter(eclipseCheSideBarElement => determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement));
  eclipseCheSideBarElements.forEach(eclipseCheSideBarElement => eclipseCheSideBarElement.setAttribute('id', getEclipseCheSideBarId(eclipseCheSideBarElement)));
}

function determineIncludeSideBarElement(sideBarElement: any) {
  const title = sideBarElement.getAttribute('data-id');
  return title && sideBarTitles.includes(title);
}

function getSideBarId(sideBarElement:any) {
  return sideBarElement.getAttribute('data-id').replace(/-|\s|\/|\&/g, '');
}

/**
 * Note that the tour cannot work for the eclipse che sidebar right now, but I am keeping
 * the code in here in case we want to make changes in the future 
 */
function determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement: any) {
  const href = eclipseCheSideBarElement.getAttribute('href');
  return href && eclipseCheSideBarNames.includes(href.replace("#/",""));
}

function getEclipseCheSideBarId(eclipseCheSideBarElement: any) {
  return eclipseCheSideBarElement.getAttribute('href').replace("#/", "");
}

/**
 * Adds the commands to add and launch a tour. This is something that is taken out of the 
 * jupyterlab-tour code because when I try to just install their package, it says command
 * not found when I try to add the MAAP tour
 */
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