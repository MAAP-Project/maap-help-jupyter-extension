/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils'
import { IMainMenu } from '@jupyterlab/mainmenu';

//import { ITourHandler } from "jupyterlab-tour";

/** phosphor imports **/
import { Menu } from '@lumino/widgets';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
//import { IFrameWidget } from './widgets';


console.log(PageConfig.getBaseUrl());

///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////

/*const extension: JupyterFrontEndPlugin<void> = {
  id: 'jupyterlab-apod',
  autoStart: true,
  requires: [ICommandPalette],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette) => {
    console.log('JupyterLab extension jupyterlab_apod is activated!');
    console.log('ICommandPalette:', palette);
  }
};

export default extension;*/

const extension: JupyterFrontEndPlugin<void> = {
  id: 'maap-help',
  autoStart: true,
  optional: [ICommandPalette, IMainMenu],
  // requires: [ICommandPalette, IStateDB],
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
      console.log(tour);
      // graceal- maybe remove tour variable later

      const about_command = 'iframe:about';
      app.commands.addCommand(about_command, {
        label: 'About',
        isEnabled: () => true,
        execute: args => {
          console.log("in execute of about");
          //aboutPopup();
        }
      });
      palette.addItem({command: about_command, category: 'Help'});
  const { commands } = app;
  let helpMenu = new Menu({ commands });
  helpMenu.title.label = 'Help';
  [
    about_command
  ].forEach(command => {
    helpMenu.addItem({ command });
  });
  mainMenu.addMenu(helpMenu, { rank: 100 });

  app.restored.then(() => {
      // Wait 3s before launching the first tour - to be sure element are loaded
      setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
    });


  console.log('JupyterLab extension maap_help is activated!');
  },
};


export default extension;