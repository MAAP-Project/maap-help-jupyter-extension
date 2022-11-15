import { ICommandPalette } from '@jupyterlab/apputils';
import { JupyterFrontEndPlugin, JupyterFrontEnd } from '@jupyterlab/application';
import { ILauncher } from '@jupyterlab/launcher';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { IStateDB } from '@jupyterlab/statedb';
import { activateMenuOptions, activateLogin, IMaapProfile }  from './activate'

const extensionList: JupyterFrontEndPlugin<IMaapProfile> = {
  id: 'maapsec-login',
  autoStart: true,
  requires: [ICommandPalette, IStateDB],
  optional: [ILauncher],
  activate: activateLogin
};

const extensionMaapProfileMenu: JupyterFrontEndPlugin<void> = {
  id: 'maapsec-menu',
  autoStart: true,
  requires: [IMainMenu],
  activate: activateMenuOptions
};

const extensionMaapLoginReceiver: JupyterFrontEndPlugin<void> = {
  id: 'maapsec-login-receiver',
  autoStart: true,
  activate: (app: JupyterFrontEnd): void => {

    
    
    if(window.location.href.includes('ticket=')) {
         let name = 'ticket';
         let url = window.location.href;
         var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
             results = regex.exec(url);
      if (results != null) {
        let ticketValue = decodeURIComponent(results[2].replace(/\+/g, ' '));
        window.opener.postMessage(ticketValue, url);
      }
    }
    console.log('MAAPSec extension activated!');
  }
};

export default [extensionMaapProfileMenu, extensionList, extensionMaapLoginReceiver];