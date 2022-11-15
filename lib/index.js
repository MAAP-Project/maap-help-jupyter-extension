import { ICommandPalette } from '@jupyterlab/apputils';
import { ILauncher } from '@jupyterlab/launcher';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { IStateDB } from '@jupyterlab/statedb';
import { activateMenuOptions, activateLogin } from './activate';
const extensionList = {
    id: 'maapsec-login',
    autoStart: true,
    requires: [ICommandPalette, IStateDB],
    optional: [ILauncher],
    activate: activateLogin
};
const extensionMaapProfileMenu = {
    id: 'maapsec-menu',
    autoStart: true,
    requires: [IMainMenu],
    activate: activateMenuOptions
};
const extensionMaapLoginReceiver = {
    id: 'maapsec-login-receiver',
    autoStart: true,
    activate: (app) => {
        if (window.location.href.includes('ticket=')) {
            let name = 'ticket';
            let url = window.location.href;
            var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'), results = regex.exec(url);
            if (results != null) {
                let ticketValue = decodeURIComponent(results[2].replace(/\+/g, ' '));
                window.opener.postMessage(ticketValue, url);
            }
        }
        console.log('MAAPSec extension activated!');
    }
};
export default [extensionMaapProfileMenu, extensionList, extensionMaapLoginReceiver];
