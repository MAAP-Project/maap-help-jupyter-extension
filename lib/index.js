import { ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { managerTour } from './tour';
const CONDAENVID = '@mamba-org/gator-lab:plugin';
const TOUR_DELAY = 1000;
const TOUR_TIMEOUT = 5 * TOUR_DELAY + 1;
let condaWidget;
async function activateCondaEnv(app, settingsRegistry, palette, menu, restorer) {
    let tour;
    const { commands, shell } = app;
    const pluginNamespace = 'conda-env';
    const command = 'jupyter_conda:open-ui';
    console.log("in activate function");
    // Track and restore the widget state
    const tracker = new WidgetTracker({
        namespace: pluginNamespace
    });
    commands.addCommand(command, {
        label: 'Conda Packages Manager',
        execute: () => {
            console.log("checking if has command add");
            //if (commands.hasCommand('jupyterlab-tour:add')) {
            console.log("in if statement that has add command");
            if (!tour) {
                console.log("about to execute jupyter lab tour add");
                commands
                    .execute('jupyterlab-tour:add', {
                    tour: managerTour
                })
                    .then(result => {
                    tour = result;
                });
            }
            //}
            app.restored.then(() => {
                let timeout = 0;
                console.log("in app restored then");
                const delayTour = () => {
                    console.log("in creating delay tour function");
                    setTimeout(() => {
                        timeout += TOUR_DELAY;
                        console.log("above conda widget if statement launch");
                        if ((condaWidget === null || condaWidget === void 0 ? void 0 : condaWidget.isVisible) && tour) {
                            console.log("about to execute jupyter lab tour launch");
                            commands.execute('jupyterlab-tour:launch', {
                                id: tour.id,
                                force: false
                            });
                        }
                        else if (timeout < TOUR_TIMEOUT) {
                            delayTour();
                        }
                    }, 1000);
                };
                if (commands.hasCommand('jupyterlab-tour:add')) {
                    if (!tour) {
                        console.log("about to execute jupyter lab tour add");
                        commands
                            .execute('jupyterlab-tour:add', {
                            tour: managerTour
                        })
                            .then(result => {
                            tour = result;
                        });
                    }
                    delayTour();
                }
            });
            /*if (!condaWidget || condaWidget.isDisposed) {
              condaWidget = new MainAreaWidget({
                content: new CondaEnvWidget(model)
              });
              condaWidget.addClass(CONDA_WIDGET_CLASS);
              condaWidget.id = pluginNamespace;
              condaWidget.title.label = 'Packages';
              condaWidget.title.caption = 'Conda Packages Manager';
              condaWidget.title.icon = condaIcon;
            }*/
            if (!tracker.has(condaWidget)) {
                // Track the state of the widget for later restoration
                tracker.add(condaWidget);
            }
            if (!condaWidget.isAttached) {
                // Attach the widget to the main work area if it's not there
                shell.add(condaWidget, 'main');
            }
            shell.activateById(condaWidget.id);
        }
    });
    // Add command to command palette
    if (palette) {
        palette.addItem({ command, category: 'Settings' });
    }
    // Handle state restoration.
    if (restorer) {
        restorer.restore(tracker, {
            command,
            name: () => pluginNamespace
        });
    }
    // Add command to settings menu
    if (menu) {
        menu.settingsMenu.addGroup([{ command: command }], 999);
    }
    return condaWidget;
}
/**
 * Initialization data for the @mamba-org/gator-lab extension.
 */
const condaManager = {
    id: CONDAENVID,
    autoStart: true,
    activate: activateCondaEnv,
    optional: [ISettingRegistry, ICommandPalette, IMainMenu, ILayoutRestorer]
};
/**
 * Initialization data for the jupyterlab_kernel_companions extension.
 */
const extensions = [condaManager];
export default extensions;
