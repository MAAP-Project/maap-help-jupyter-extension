import { JupyterFrontEndPlugin, JupyterFrontEnd } from '@jupyterlab/application';
import { IMaapProfile } from './activate';
declare const _default: (JupyterFrontEndPlugin<void, JupyterFrontEnd.IShell, "desktop" | "mobile"> | JupyterFrontEndPlugin<IMaapProfile, JupyterFrontEnd.IShell, "desktop" | "mobile">)[];
export default _default;
