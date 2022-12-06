/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils'
import { IMainMenu } from '@jupyterlab/mainmenu';

/** phosphor imports **/
import { Menu } from '@lumino/widgets';

/** internal imports **/
import '../style/index.css';
//import { IFrameWidget } from './widgets';
import "./globals"


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
  // requires: [ICommandPalette, IStateDB],
  activate: (app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,) => {
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
      const test2 = 'help:test2';
  app.commands.addCommand(test2, {
    label: 'Test2',
    isEnabled: () => true,
    execute: args => {
      console.log("in execute of test2");
    }
  });
  palette.addItem({command: test2, category: 'Help'});
  const test3 = 'help:test3';
  app.commands.addCommand(test3, {
    label: 'Test 3',
    isEnabled: () => true,
    execute: args => {
      console.log("in execute of test3");
    }
  });
  palette.addItem({command: test3, category: 'Help'});



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


  console.log('JupyterLab extension maap_help is activated!');
  },
};


export default extension;