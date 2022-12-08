export const managerTour = {
  id: 'jupyterlab-tour:maap-tour',
  label: 'MAAP tour',
  hasHelpEntry: true,
  steps: [  // Step must be of type IStep - see src/tokens.ts
            {
              content:
                'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
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
                'This is where many MAAP extensions are present. TODO: individually click each one',
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
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '.jp-mainmenu-file',
              title: 'Test'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '.jp-menu-file',
              title: 'Test'
            },
            {
              content:
                'This is where many MAAP extensions are present. TODO: individually click each one',
              placement: 'bottom',
              target: '#jp-Notebook',
              title: 'Test'
            }
          ],
};
