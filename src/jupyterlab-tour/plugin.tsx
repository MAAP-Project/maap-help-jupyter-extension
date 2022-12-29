import {
  JupyterFrontEnd,
  JupyterFrontEndPlugin
} from '@jupyterlab/application';
import { ISettingRegistry } from '@jupyterlab/settingregistry';
import { ITranslator, nullTranslator } from '@jupyterlab/translation';

import {
  ITourManager,
  IUserTourManager,
  USER_PLUGIN_ID
} from './tokens';
import { UserTourManager } from './userTourManager';

console.log("graceal in plugin tsx");



/**
 * Optional plugin for user-defined tours stored in the settings registry
 */
const userPlugin: JupyterFrontEndPlugin<IUserTourManager> = {
  id: USER_PLUGIN_ID,
  autoStart: true,
  activate: activateUser,
  requires: [ISettingRegistry, ITourManager],
  optional: [ITranslator],
  provides: IUserTourManager
};

function activateUser(
  app: JupyterFrontEnd,
  settings: ISettingRegistry,
  tourManager: ITourManager,
  translator?: ITranslator
): IUserTourManager {
  translator = translator || nullTranslator;

  const manager = new UserTourManager({
    tourManager,
    translator,
    getSettings: (): Promise<ISettingRegistry.ISettings> =>
      settings.load(USER_PLUGIN_ID)
  });
  return manager;
}

export default [userPlugin];
