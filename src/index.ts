/** jupyterlab imports **/
import { JupyterFrontEnd, JupyterFrontEndPlugin } from '@jupyterlab/application'; 
import { ICommandPalette } from '@jupyterlab/apputils';
//import { PageConfig } from '@jupyterlab/coreutils'
import { IMainMenu } from '@jupyterlab/mainmenu';

//import { ITourHandler } from "jupyterlab-tour";

/** phosphor imports **/
import { Menu } from '@lumino/widgets';

/** internal imports **/
import '../style/index.css';
import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
//import { IFrameWidget } from './widgets';


const sideBarTitles = ["Jobs sent to DPS", "Open Tabs"];
const topMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
        
        

///////////////////////////////////////////////////////////////
//
// Earthdata Search Client extension
//
///////////////////////////////////////////////////////////////

const extension: JupyterFrontEndPlugin<void> = {
  id: 'maap-help',
  autoStart: true,
  optional: [ICommandPalette, IMainMenu],
  activate: async (app: JupyterFrontEnd,
    palette: ICommandPalette,
    mainMenu: IMainMenu,) => {
      let tour: any;
      app.commands.execute('jupyterlab-tour:add', {
        tour: managerTour as any
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
    [
        about_command,
        faq_command,
        tech_doc_command,
        tutorials_command,
        maap_py_command
    ].forEach(command => {
        mainMenu.helpMenu.addItem({ command });
    });
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
        setTimeout(() => app.commands.execute('jupyterlab-tour:launch', {id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
        var divElements = Array.from(document.getElementsByTagName('div')); 
        divElements = divElements.filter(divElement => divElement.textContent && topMenuOptions.includes(divElement.textContent));
        divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));

        //const sideMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
        var sideBarElements = Array.from(document.getElementsByClassName('lm-TabBar-tab p-TabBar-tab')); 
        console.log(sideBarElements);
        sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
        console.log("side bar elements after filtering");
        console.log(sideBarElements);
        sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));
        console.log("printing side bar ids");
        sideBarElements.forEach(sideBarElement => console.log(sideBarElement.id));
        //divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, ''):""));

      }
    });


  console.log('JupyterLab extension maap_help is activated!');
  },
};

function getSideBarId(sideBarElement:any) {
  return sideBarElement.getAttribute('title').replace(/-|\s|\/|\&/g, '');
}

function determineIncludeSideBarElement(sideBarElement: any) {
  const title = sideBarElement.getAttribute('title');
  console.log(title);
  return title && sideBarTitles.includes(title);
}


export default extension;