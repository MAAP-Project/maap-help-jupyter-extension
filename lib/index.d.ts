/** jupyterlab imports **/
import { JupyterFrontEndPlugin } from '@jupyterlab/application';
/** internal imports **/
import '../style/index.css';
import "./globals";
declare const extension: JupyterFrontEndPlugin<void>;
export default extension;
