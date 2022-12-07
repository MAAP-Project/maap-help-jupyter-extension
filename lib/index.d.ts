import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application';
import { IEnvironmentManager } from '@mamba-org/gator-common';
/**
 * Initialization data for the jupyterlab_kernel_companions extension.
 */
declare const extensions: JupyterFrontEndPlugin<IEnvironmentManager, JupyterFrontEnd.IShell, "desktop" | "mobile">[];
export default extensions;
