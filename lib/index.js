import { ICommandPalette } from '@jupyterlab/apputils';
import { IMainMenu } from '@jupyterlab/mainmenu';
/** internal imports **/
import '../style/index.css';
//import { managerTour } from './maap-tour';
import { aboutPopup, faqPopup, techDocPopup, tutorialsPopup, maapApiPopup } from './popups';
const sideBarTitles = ["Jobs sent to DPS", "Open Tabs"];
const topMenuOptions = ["Git", "Data Search", "DPS/MAS Operations", "DPS UI Menu", "MAAP Login", "Help"];
const eclipseCheSideBarNames = ["getstarted", "stacks"];
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
        const tour = (await app.commands.execute('jupyterlab-tour:add', {
            tour: {
                id: 'jupyterlab-tour:maap-tour',
                label: 'MAAP Tour',
                hasHelpEntry: true,
                steps: [
                    {
                        content: 'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
                        placement: 'center',
                        target: '#jp-main-dock-panel',
                        title: 'Welcome to MAAP!'
                    },
                    {
                        content: 'Pause the tour by clicking anywhere outside of the tooltip and resume the tour by clicking on the blue dot. Tours can be restarted in the help menu.',
                        placement: 'center',
                        target: '#jp-main-dock-panel',
                        title: 'Some information on the tour, first'
                    },
                    {
                        content: 'Interface with Git including cloning a repository.',
                        placement: 'bottom',
                        target: '#Git',
                        title: 'Git'
                    },
                    {
                        content: 'Launch Earthdata Search Client (EDSC) and paste search queries.',
                        placement: 'bottom',
                        target: '#DataSearch',
                        title: 'Data Search'
                    },
                    {
                        content: 'Register algorithms into DPS to be able to run as jobs.',
                        placement: 'bottom',
                        target: '#DPSMASOperations',
                        title: 'Welcome to MAAP!'
                    },
                    {
                        content: 'Manage your jobs in DPS.',
                        placement: 'bottom',
                        target: '#DPSUIMenu',
                        title: 'DPS UI Menu'
                    },
                    {
                        content: 'Log into the MAAP platform with an ESA/ Earthdata account.',
                        placement: 'bottom',
                        target: '#MAAPLogin',
                        title: 'MAAP Login'
                    },
                    {
                        content: 'General help menu with additional MAAP-specific information and the option to rerun this tutorial.',
                        placement: 'bottom',
                        target: '#Help',
                        title: 'Help'
                    },
                    {
                        content: 'Create a new workspace here. You can create a workspace from a sample or create a custom workspace.',
                        placement: 'right',
                        target: '#getstarted',
                        title: 'Get Started'
                    },
                    {
                        content: 'See available samples for the workspaces as well as their devfiles.',
                        placement: 'right',
                        target: '#stacks',
                        title: 'Stacks'
                    },
                    {
                        content: 'See your jobs in DPS.',
                        placement: 'right',
                        target: '#JobssenttoDPS',
                        title: 'Jobs'
                    },
                    {
                        content: 'See open tabs.',
                        placement: 'right',
                        target: '#OpenTabs',
                        title: 'Open Tabs'
                    },
                    {
                        content: 'The file browser is divided into your private and public buckets. Anthing in an s3-backed folder will be persistent. For example, <username> is s3-backed.',
                        placement: 'right',
                        target: '#filebrowser',
                        title: 'File Browser'
                    },
                    {
                        content: 'The status bar at the bottom states your workspace\'s memory capacity which can be increased or decreased by manually configuring the workspace.',
                        placement: 'top',
                        target: '#jp-main-statusbar',
                        title: 'Status Bar'
                    }
                ],
            }
        }));
        /*let tour: ITourHandler;
        app.commands.execute('jupyterlab-tour:add', {
          tour: managerTour as any
        })
        .then(result => {
          tour = result;
        });*/
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
        app.restored.then(() => {
            // Wait 3s before launching the first tour - to be sure element are loaded
            if (tour) {
                setTimeout(() => app.commands.execute('jupyterlab-tour:launch', { id: 'jupyterlab-tour:maap-tour', force: false }), 3000);
                // add an id to all the top menu bar items
                var divElements = Array.from(document.getElementsByTagName('div'));
                divElements = divElements.filter(divElement => divElement.textContent && topMenuOptions.includes(divElement.textContent));
                divElements.forEach(divElement => divElement.setAttribute('id', divElement.textContent ? divElement.textContent.replace(/-|\s|\/|\&/g, '') : ""));
                // add an id to all the side menu bar items 
                var sideBarElements = Array.from(document.getElementsByClassName('lm-TabBar-tab p-TabBar-tab'));
                sideBarElements = sideBarElements.filter(sideBarElement => determineIncludeSideBarElement(sideBarElement));
                sideBarElements.forEach(sideBarElement => sideBarElement.setAttribute('id', getSideBarId(sideBarElement)));
                // add an id to all of the eclipse che side bar items 
                var eclipseCheSideBarElements = Array.from(document.getElementsByTagName('a'));
                eclipseCheSideBarElements = eclipseCheSideBarElements.filter(eclipseCheSideBarElement => determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement));
                eclipseCheSideBarElements.forEach(eclipseCheSideBarElement => eclipseCheSideBarElement.setAttribute('id', getEclipseCheSideBarId(eclipseCheSideBarElement)));
            }
        });
        console.log('JupyterLab extension maap_help is activated!');
    },
};
function determineIncludeSideBarElement(sideBarElement) {
    const title = sideBarElement.getAttribute('title');
    return title && sideBarTitles.includes(title);
}
function getSideBarId(sideBarElement) {
    return sideBarElement.getAttribute('title').replace(/-|\s|\/|\&/g, '');
}
function determineIncludeEclipseCheSideBarElement(eclipseCheSideBarElement) {
    const href = eclipseCheSideBarElement.getAttribute('href');
    return href && eclipseCheSideBarNames.includes(href.replace("#/", ""));
}
function getEclipseCheSideBarId(eclipseCheSideBarElement) {
    return eclipseCheSideBarElement.getAttribute('href').replace("#/", "");
}
export default extension;
