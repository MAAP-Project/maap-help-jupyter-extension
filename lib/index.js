/** jupyterlab imports **/
import { ILayoutRestorer } from '@jupyterlab/application';
import { ICommandPalette, WidgetTracker } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IDocumentManager } from '@jupyterlab/docmanager';
import { IMainMenu } from '@jupyterlab/mainmenu';
import { INotebookTracker } from '@jupyterlab/notebook';
/** phosphor imports **/
import { Menu } from '@lumino/widgets';
/** internal imports **/
import '../style/index.css';
//import { setResultsLimit, displaySearchParams } from './popups'
import "./globals";
console.log(PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
const extension = {
    id: 'edsc_extension',
    autoStart: true,
    requires: [IDocumentManager, ICommandPalette, ILayoutRestorer, IMainMenu, INotebookTracker],
    activate: activate
};
function activate(app, docManager, palette, restorer, mainMenu, tracker, panel) {
    //let widget: IFrameWidget;
    const namespace = 'tracker-iframe';
    let instanceTracker = new WidgetTracker({ namespace });
    //
    // Listen for messages being sent by the iframe - parse the url and set as parameters for search
    //
    window.addEventListener("message", (event) => {
        // if the message sent is the edsc url
        if (typeof event.data === "string") {
            //globals.edscUrl = event.data;
            console.log("graceal- event data" + event.data);
            //const queryString = '?' + event.data.split('?')[1];
            // console.log("Granule", globals.granuleQuery);
            // console.log("Collection", globals.collectionQuery);
        }
    });
    /******** Set commands for command palette and main menu *********/
    // Add an application command to open ESDC
    const test1 = 'iframe:open';
    app.commands.addCommand(test1, {
        label: 'Test1',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of test1");
            // Only allow user to have one EDSC window
            /*if (widget == undefined) {
                widget = new IFrameWidget(edsc_server);
                app.shell.add(widget, 'main');
                app.shell.activateById(widget.id);
            } else {
                // if user already has EDSC, just switch to tab
                app.shell.add(widget, 'main');
                app.shell.activateById(widget.id);
            }
      
            if (!instanceTracker.has(widget)) {
              // Track the state of the widget for later restoration
              instanceTracker.add(widget);
            }*/
        }
    });
    palette.addItem({ command: test1, category: 'Search' });
    //graceal- try to change search category
    const test2 = 'search:displayParams';
    app.commands.addCommand(test2, {
        label: 'Test2',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of test2");
        }
    });
    palette.addItem({ command: test2, category: 'Search' });
    const test3 = 'search:pasteCollectionQuery';
    app.commands.addCommand(test3, {
        label: 'Test 3',
        isEnabled: () => true,
        execute: args => {
            console.log("in execute of test3");
        }
    });
    palette.addItem({ command: test3, category: 'Search' });
    const { commands } = app;
    let searchMenu = new Menu({ commands });
    searchMenu.title.label = 'Help';
    [
        test1,
        test2,
        test3
    ].forEach(command => {
        searchMenu.addItem({ command });
    });
    mainMenu.addMenu(searchMenu, { rank: 100 });
    // Track and restore the widget state
    restorer.restore(instanceTracker, {
        command: test1,
        name: () => namespace
    });
    //graceal- to do- do I need this?
    console.log('JupyterLab extension maap_help is activated!');
    return instanceTracker;
}
;
export default extension;
