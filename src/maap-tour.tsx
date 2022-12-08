import React from "react";

export const managerTour = {
  id: 'jupyterlab-tour:maap-tour',
  label: 'MAAP tour',
  hasHelpEntry: true,
  steps: [  // Step must be of type IStep - see src/tokens.ts
            {
              content: (
                <>
                    <p>
                      {(
                        `All user actions in JupyterLab are processed through a centralized 
                        command system, called command palette. It provides a keyboard-driven 
                        way to search for and run JupyterLab commands.`
                      )}
                    </p>
                    <p>
                      <small>
                        {('Tip: To open it, the default shortcut is "Ctrl + Shift + C"')}
                      </small>
                    </p>
                  </>
              ),
                //'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Welcome to MAAP!'
            },
            {
              content:
                'Pause the tour by clicking anywhere outside of the tooltip and resume the tour by clicking on the blue dot. Tours can be restarted in the help menu',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Some information on the tour, first'
            },
            {
              content:
                'This is the top menu bar where you can activate numerous MAAP extensions. \n TODO: individually click each one',
              placement: 'bottom',
              target: '#jp-MainMenu',
              title: 'Top menu options'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'right',
              target: '.jp-SideBar',
              title: 'Left Side Bar'
            },
            {
              content:
                'The file browser is divided into your private and public buckets',
              placement: 'right',
              target: '#filebrowser',
              title: 'File Browser'
            },
            ,
            {
              content:
                'The status bar at the bottom tells you how much memory your workspace has (?)',
              placement: 'top',
              target: '#jp-main-statusbar',
              title: 'Status Bar'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '.lm-TabBar-tab p-TabBar-tab lm-mod-current p-mod-current',
              title: 'Test'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '#lm-TabBar-tab p-TabBar-tab lm-mod-current p-mod-current',
              title: 'Test'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '.help_menu1',
              title: 'Test'
            }
            ,
            {
              content:
                'This is what the tutorial could look like',
              placement: 'bottom',
              target: '#help_menu1',
              title: 'Test'
            }
          ],
};
