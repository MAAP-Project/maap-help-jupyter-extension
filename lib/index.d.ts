import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { MainAreaWidget } from '@jupyterlab/apputils';
/**
 * Initialization data for the jupyterlab_kernel_companions extension.
 */
declare const extensions: JupyterFrontEndPlugin<MainAreaWidget<import("@lumino/widgets").Widget>, JupyterFrontEnd.IShell, "desktop" | "mobile">[];
export default extensions;
