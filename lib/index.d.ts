/** jupyterlab imports **/
import { JupyterFrontEnd, ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
/** internal imports **/
import '../style/index.css';
import "./globals";
declare const extension: {
    id: string;
    autoStart: boolean;
    requires: import("@lumino/coreutils").Token<ICommandPalette>[];
    activate: typeof activate;
};
declare function activate(app: JupyterFrontEnd, palette: ICommandPalette, restorer: ILayoutRestorer, mainMenu: IMainMenu): WidgetTracker<import("@lumino/widgets").Widget>;
export default extension;
