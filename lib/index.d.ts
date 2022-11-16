/** jupyterlab imports **/
import { JupyterFrontEndPlugin } from '@jupyterlab/application';
import { WidgetTracker } from '@jupyterlab/apputils';
/** internal imports **/
import '../style/index.css';
import { IFrameWidget } from './widgets';
import "./globals";
declare const extension: JupyterFrontEndPlugin<WidgetTracker<IFrameWidget>>;
export default extension;
