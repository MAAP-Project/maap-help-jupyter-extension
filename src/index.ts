import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';

import { ISettingRegistry } from '@jupyterlab/settingregistry';

import { ICommandPalette, MainAreaWidget } from '@jupyterlab/apputils';

import { Widget } from '@lumino/widgets';


import { LOCAL_KIBANA_URL } from './constants';

/**
 * Initialization data for the maap-help extension.
 */
const plugin: JupyterFrontEndPlugin<void> = {
  id: 'maap-help:plugin',
  autoStart: true,
  requires: [ICommandPalette],
  optional: [ISettingRegistry],
  activate: (app: JupyterFrontEnd, palette: ICommandPalette, settingRegistry: ISettingRegistry | null) => {
    const { commands } = app;
    const command: string = 'ades:open';
    commands.addCommand(command, {
      label: 'Maap help',
      execute: () => {
        const content = new Widget();
        const widget = new MainAreaWidget({ content });

        let div = document.createElement('div');
        div.classList.add('iframe-widget');
        let iframe = document.createElement('iframe');
        iframe.id = 'iframeid';
        iframe.src = LOCAL_KIBANA_URL;
        div.appendChild(iframe);
        content.node.appendChild(div);

        widget.id = 'jupyter-ades';
        widget.title.label = 'ADES Metrics';
        widget.title.closable = true;

        app.shell.add(widget, 'main');
        app.shell.activateById(widget.id);
      },
    });

    if (settingRegistry) {
      settingRegistry
        .load(plugin.id)
        .then(settings => {
          console.log('maap help settings loaded:', settings.composite);
        })
        .catch(reason => {
          console.error('Failed to load settings for maap help.', reason);
        });
    }

    palette.addItem({ command, category: 'Tutorial' });

    console.log('JupyterLab extension maap help is activated!');
  }
};

export default plugin;
