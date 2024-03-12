/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette, InputDialog } from '@jupyterlab/apputils';
import { IHelpMenu, IMainMenu, MainMenu } from '@jupyterlab/mainmenu';
import { IStateDB } from '@jupyterlab/statedb';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';
import { StateDB } from '@jupyterlab/statedb';
import { HelpMenu } from '@jupyterlab/mainmenu';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, maapDocumentationPopup, maapApiPopup, maapBugSubmissionPopup } from './popups';
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

const SIDE_BAR_TITLES = ["filebrowser", "jp-git-sessions"];
const TOP_MENU_OPTIONS = ["Data Search", "Jobs", "Help"];
//const ECLIPSE_CHE_SIDEBAR_NAMES = ["getstarted", "stacks"];
//const COLLABORATORS_IDENTIFIER = "ui-components:users";

// constants for command IDs of the default jupyterlab help menu
const DEFAULT_HELP_MENU_COMMAND = "help:about";
const DEFAULT_CONTEXTUAL_HELP_COMMAND = "inspector:open";
const DEFAULT_LAUNCH_CLASSIC_COMMAND = "help:launch-classic-notebook";
const DEFAULT_JUPYTER_FORUM_COMMAND = "help:jupyter-forum";

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

      const about_command = 'help:maap-about';
      app.commands.addCommand(about_command, {
          label: 'About MAAP',
          isEnabled: () => true,
          execute: args => {
              aboutPopup();
          }
      });
      palette.addItem({ command: about_command, category: 'Help' });

      const maap_documentation_command = 'help:maap-documentation';
      app.commands.addCommand(maap_documentation_command, {
          label: 'MAAP Documentation',
          isEnabled: () => true,
          execute: args => {
            maapDocumentationPopup();
          }
      });
      palette.addItem({ command: maap_documentation_command, category: 'Help' });

      const maap_api_command = 'help:maap-api';
      app.commands.addCommand(maap_api_command, {
          label: 'MAAP API',
          isEnabled: () => true,
          execute: args => {
              maapApiPopup();
          }
      });
      palette.addItem({ command: maap_api_command, category: 'Help' });

      const maap_bug_submission_command = 'help:maap-bug-submission';
      app.commands.addCommand(maap_bug_submission_command, {
          label: 'MAAP Bug Submission',
          isEnabled: () => true,
          execute: args => {
            maapBugSubmissionPopup();
          }
      });
      palette.addItem({ command: maap_bug_submission_command, category: 'Help' });

      const tour_command = 'help:maap-tour';
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

      addCommandsHelpMenu(mainMenu.helpMenu, about_command, tour_command, maap_api_command, maap_documentation_command, maap_bug_submission_command);

      app.restored.then(() => {
          // Wait 3s before launching the first tour - to be sure elements are loaded
          if (tour) {
            addIDsTourElements(app);
          }
      });

    console.log('JupyterLab extension maap_help is activated!');
  },
};

/**
 * Inputs are the help menu and the commands that need to be added to the help menu. If the help menu
 * is an instance of the HelpMenu class, then we are able to customize it by deleting the help options we
 * don't want and adding our own commands in certain indexes. If the help menu isn't an instance of the 
 * Help Menu class, then we do the best we can, but we cannot delete existing elements or add own help
 * commands to an existing grouping 
 * In the case that the command IDs for the default help menu change and we have not changed the
 * constants yet, the about and tour commands are just added to the default spot
 */
function addCommandsHelpMenu(menu: IHelpMenu, about_command: string, tour_command: string, maap_api_command: string, maap_documentation_command: string, maap_bug_submission_command: string) {
  let aboutMAAPAdded = false;
  let MAAPTourAdded = false;
  if (menu instanceof HelpMenu) {
    for (let i=0; i<menu.items.length; i++) {
      let item = menu.items[i];
      if (item.command === DEFAULT_HELP_MENU_COMMAND) {
        menu.insertItem(i+1, {command: about_command, rank: 1});
        aboutMAAPAdded = true;
      } else if (item.command === DEFAULT_CONTEXTUAL_HELP_COMMAND) {
        menu.insertItem(i+1, {command: tour_command, rank: 1});
        MAAPTourAdded = true;
      } else if (item.command === DEFAULT_LAUNCH_CLASSIC_COMMAND) {
        menu.removeItem(item);
        i--;
      } else if (item.command === DEFAULT_JUPYTER_FORUM_COMMAND) {
        menu.removeItem(item);
        i--;
      }
    }
  } 
  if (!aboutMAAPAdded) {
    menu.addGroup([{ command: about_command }], -1);
  } 
  if (!MAAPTourAdded) {
    menu.addGroup([{ command: tour_command }], .1);
  }

  menu.addGroup([{ command: maap_api_command}, { command: maap_documentation_command }, { command: maap_bug_submission_command }], 1000);
}

/*
* Need to add an id to all of the elements that the MAAP tour wants to highlight so that the tour can find these elements
* Here we find the elements based on their names in the different types of HTML elements and this has to be somewhat hard coded 
* because not all are in the div of the html elements. We keep these names as constants at the top of this file
*/
function addIDsTourElements(app: JupyterFrontEnd) {
  setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
  // add an id to all the top menu bar items so that the tour can find it 
  var divElements = Array.from(document.getElementsByTagName('div')); 
  divElements = divElements.filter(divElement => divElement.textContent && TOP_MENU_OPTIONS.includes(divElement.textContent));
  divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));

  // add an id to all the side menu bar items so that the tour can find it 
  var sideBarElements = Array.from(document.getElementsByClassName('lm-TabBar-tab p-TabBar-tab')); 
  sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
  sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));

  //NOTE: collaborators disabled for now because Jupyterlab bug
  // add an id to the collaborators side bar so that the tour can find it
  /*var collaboratorsPotentialElements = Array.from(document.querySelectorAll('.lm-TabBar-tabIcon.p-TabBar-tabIcon.f1dvozo svg'));
  var collaboratorElement = collaboratorsPotentialElements.filter(element => { return element.getAttribute("data-icon") === COLLABORATORS_IDENTIFIER});
  // should just be one element
  if (collaboratorElement.length != 1) {
    console.warn("More than one element identifed for the collaborator element (maap help tour)");
  } else {
    collaboratorElement[0].setAttribute('id', getCollaboratorElementId(collaboratorElement[0]));
  }*/

  // add an id to all of the eclipse che side bar items so that the tour can find it 
  /*var eclipseCheSideBarElements = Array.from(document.getElementsByTagName('a')); 
  eclipseCheSideBarElements = eclipseCheSideBarElements.filter(eclipseCheSideBarElement => determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement));
  eclipseCheSideBarElements.forEach(eclipseCheSideBarElement => eclipseCheSideBarElement.setAttribute('id', getEclipseCheSideBarId(eclipseCheSideBarElement)));*/
}

function determineIncludeSideBarElement(sideBarElement: any) {
  const title = sideBarElement.getAttribute('data-id');
  return title && SIDE_BAR_TITLES.includes(title);
}

function getSideBarId(sideBarElement:any) {
  return sideBarElement.getAttribute('data-id').replace(/-|\s|\/|\&|:/g, '');
}

/*function getCollaboratorElementId(collaboratorElement: any) {
  return collaboratorElement.getAttribute('data-icon').replace(/-|\s|\/|\&|:/g, '');
}*/

/**
 * Note that the tour cannot work for the eclipse che sidebar right now, but I am keeping
 * the code in here in case we want to make changes in the future 
 */
/*function determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement: any) {
  const href = eclipseCheSideBarElement.getAttribute('href');
  return href && ECLIPSE_CHE_SIDEBAR_NAMES.includes(href.replace("#/",""));
}*/

/*function getEclipseCheSideBarId(eclipseCheSideBarElement: any) {
  return eclipseCheSideBarElement.getAttribute('href').replace("#/", "");
}*/

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