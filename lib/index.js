import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IMainMenu } from '@jupyterlab/mainmenu';
/** phosphor imports **/
import { Menu } from '@lumino/widgets';
/** internal imports **/
import '../style/index.css';
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
const extension = {
    id: 'maap-help',
    autoStart: true,
    optional: [ICommandPalette, IMainMenu],
    // requires: [ICommandPalette, IStateDB],
    activate: async (app, palette, mainMenu) => {
        const tour = (await app.commands.execute('jupyterlab-tour:add', {
            tour: {
                id: 'test-jupyterlab-tour:welcome',
                label: 'Welcome Tour',
                hasHelpEntry: true,
                steps: [
                    {
                        content: 'The following tutorial will point out some of the main UI components within JupyterLab.',
                        placement: 'center',
                        target: '#jp-main-dock-panel',
                        title: 'Welcome to Jupyter Lab!'
                    },
                    {
                        content: 'This is the main content area where notebooks and other content can be viewed and edited.',
                        placement: 'left-end',
                        target: '#jp-main-dock-panel',
                        title: 'Main Content'
                    }
                ],
            }
        }));
        if (tour) {
            app.commands.execute('jupyterlab-tour:launch', {
                id: 'test-jupyterlab-tour:welcome',
                force: false // Optional, if false the tour will start only if the user have not seen or skipped it
            });
        }
        const about_command = 'iframe:about';
        app.commands.addCommand(about_command, {
            label: 'About',
            isEnabled: () => true,
            execute: args => {
                console.log("in execute of about");
                //aboutPopup();
            }
        });
        palette.addItem({ command: about_command, category: 'Help' });
        const { commands } = app;
        let helpMenu = new Menu({ commands });
        helpMenu.title.label = 'Help';
        [
            about_command
        ].forEach(command => {
            helpMenu.addItem({ command });
        });
        mainMenu.addMenu(helpMenu, { rank: 100 });
        console.log('JupyterLab extension maap_help is activated!');
    },
};
export default extension;
