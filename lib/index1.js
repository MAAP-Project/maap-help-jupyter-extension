import { ICommandPalette } from '@jupyterlab/apputils';
import { IStateDB } from '@jupyterlab/statedb';
/**
 * Initialization data for the react-widget extension.
 */
const extension = {
    id: 'maap-help',
    autoStart: true,
    optional: [ICommandPalette, IStateDB],
    // requires: [ICommandPalette, IStateDB],
    activate: (app, palette, state) => {
        const { commands } = app;
        const command = 'test';
        commands.addCommand(command, {
            caption: 'View and submit user jobs',
            label: 'maap-help',
            execute: () => {
                console.log("in statement");
            },
        });
    },
};
export default extension;
