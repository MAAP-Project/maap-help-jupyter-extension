import { JupyterFrontEnd } from '@jupyterlab/application';
import { ICommandPalette } from '@jupyterlab/apputils';
import { IStateDB } from '@jupyterlab/statedb';
import { IMainMenu } from '@jupyterlab/mainmenu';
export interface IMaapProfile {
    proxyTicket: string;
    email: string;
    username: string;
}
export declare function activateLogin(app: JupyterFrontEnd, palette: ICommandPalette, state: IStateDB): IMaapProfile;
export declare function activateMenuOptions(app: JupyterFrontEnd, mainMenu: IMainMenu): void;
