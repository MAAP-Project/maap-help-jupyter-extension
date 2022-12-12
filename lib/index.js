import { ICommandPalette } from '@jupyterlab/apputils';
import { PageConfig } from '@jupyterlab/coreutils';
import { IMainMenu } from '@jupyterlab/mainmenu';
//import { ITourHandler } from "jupyterlab-tour";
/** phosphor imports **/
import { Menu } from '@lumino/widgets';
/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
//import { IFrameWidget } from './widgets';
console.log(PageConfig.getBaseUrl());
///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////
const extension = {
    id: 'maap-help',
    autoStart: true,
    optional: [ICommandPalette, IMainMenu],
    activate: async (app, palette, mainMenu) => {
        let tour;
        app.commands.execute('jupyterlab-tour:add', {
            tour: managerTour
        })
            .then(result => {
            tour = result;
        });
        const about_command = 'iframe:about';
        app.commands.addCommand(about_command, {
            label: 'About MAAP',
            isEnabled: () => true,
            execute: args => {
                aboutPopup();
            }
        });
        palette.addItem({ command: about_command, category: 'Help' });
        const faq_command = 'help:faq';
        app.commands.addCommand(faq_command, {
            label: 'MAAP FAQ',
            isEnabled: () => true,
            execute: args => {
                faqPopup();
            }
        });
        palette.addItem({ command: faq_command, category: 'Help' });
        const tech_doc_command = 'help:techDoc';
        app.commands.addCommand(tech_doc_command, {
            label: 'MAAP Technical Documentation',
            isEnabled: () => true,
            execute: args => {
                techDocPopup();
            }
        });
        palette.addItem({ command: tech_doc_command, category: 'Help' });
        const tutorials_command = 'help:tutorials';
        app.commands.addCommand(tutorials_command, {
            label: 'MAAP Tutorials',
            isEnabled: () => true,
            execute: args => {
                tutorialsPopup();
            }
        });
        palette.addItem({ command: tutorials_command, category: 'Help' });
        const maap_py_command = 'help:maapApi';
        app.commands.addCommand(maap_py_command, {
            label: 'MAAP API',
            isEnabled: () => true,
            execute: args => {
                maapApiPopup();
            }
        });
        palette.addItem({ command: maap_py_command, category: 'Help' });
        /*[
            about_command,
            faq_command,
            tech_doc_command,
            tutorials_command,
            maap_py_command
        ].forEach(command => {
            mainMenu.helpMenu.addItem({ command });
        });*/
        const { commands } = app;
        let searchMenu = new Menu({ commands });
        searchMenu.title.label = 'EDSC';
        [
            about_command,
            faq_command,
            tech_doc_command,
            tutorials_command,
            maap_py_command
        ].forEach(command => {
            searchMenu.addItem({ command });
        });
        mainMenu.addMenu(searchMenu, { rank: 100 });
        let searchMenu2 = new Menu({ commands });
        searchMenu2.title.label = 'DPS UI Menu';
        [
            about_command
        ].forEach(command => {
            searchMenu2.addItem({ command });
        });
        mainMenu.addMenu(searchMenu2, { rank: 100 });
        let searchMenu3 = new Menu({ commands });
        searchMenu3.title.label = 'DPS/MAS Operations';
        [
            about_command
        ].forEach(command => {
            searchMenu3.addItem({ command });
        });
        mainMenu.addMenu(searchMenu3, { rank: 100 });
        app.restored.then(() => {
            // Wait 3s before launching the first tour - to be sure element are loaded
            if (tour) {
                setTimeout(() => app.commands.execute('jupyterlab-tour:launch', { id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
                console.time('doSomething');
                const xpaths = ["//div[text()='Git']", "//div[text()='Data Search']", "//div[text()='DPS/MAS Operations']", "//div[text()='DPS UI Menu']", "//div[text()='MAAP Login']", "//div[text()='Help']"];
                xpaths.forEach(xpath => document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null));
                //var xpath = "//div[text()='EDSC']";
                //var matchingElement = document.evaluate(xpath, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
                console.timeEnd('doSomething');
                //console.log("about to print matching element");
                //console.log(matchingElement);
                //console.log(matchingElement.singleNodeValue);
                /*console.log(matchingElement.singleNodeValue?.nodeName);
                console.log(matchingElement.singleNodeValue?.nodeType);
                if (matchingElement.singleNodeValue) {
                  matchingElement.singleNodeValue.innerHTML;
        
                }*/
                //console.log(matchingElement.snapshotItem(0).i);
                //matchingElement.id = "ejkhgtr";
                /*console.log(matchingElement.nodeName);
                console.log(typeof matchingElement);
                console.log(matchingElement.ownerDocument);
                console.log(matchingElement.firstChild);
                matchingElement.setAttribute('id', 'test');*/
                console.time('doSomething2');
                const topMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
                var divElements = Array.from(document.getElementsByTagName('div'));
                divElements = divElements.filter(divElement => divElement.textContent && topMenuOptions.includes(divElement.textContent));
                console.timeEnd('doSomething2');
                //divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));
                /*for (const divElement of divElements) {
                  console.log(divElement);
                }*/
                /*var divElements = document.getElementsByTagName('div');
                console.log(divElements);
                for (const divElement of divElements) {
                  if (divElement.textContent == 'Help') {
                    divElement.setAttribute('id', 'help_menu');
                    console.log(divElement);
                  }
                }*/
                ////OR .getElementsByClassName('lm-MenuBar-itemLabel p-MenuBar-itemLabel')
            }
        });
        console.log('JupyterLab extension maap_help is activated!');
    },
};
export default extension;
