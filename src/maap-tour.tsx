

export const managerTour = {
  id: 'jupyterlab-tour:maap-tour',
  label: 'MAAP tour',
  hasHelpEntry: true,
  steps: [  
            {
              content: 
              'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Welcome to MAAP!'
            },
            {
              content:
                'Pause the tour by clicking anywhere outside of the tooltip and resume the tour by clicking on the blue dot. Tours can be restarted in the help menu.',
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
            /*{
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
            },*/
            {
              content: 'Log into the MAAP platform with an ESA/ Earthdata account.',
              placement: 'bottom',
              target: '#MAAPLogin',
              title: 'MAAP Login'
            },
            {
              content: 
              'General help menu with additional MAAP-specific information and the option to rerun this tutorial.',
              placement: 'bottom',
              target: '#Help',
              title: 'Help'
            },
            /*{
              content: 
              'Create a new workspace here. You can create a workspace from a sample or create a custom workspace.',
              placement: 'right',
              target: '#getstarted',
              title: 'Get Started'
            },
            {
              content: 
              'See available samples for the workspaces as well as their devfiles.',
              placement: 'right',
              target: '#stacks',
              title: 'Stacks'
            },*/
            /*{
              content: 
              'See your jobs in DPS.',
              placement: 'right',
              target: '#jobcachedisplay',
              title: 'Jobs'
            },*/
            {
              content:
                'The file browser is divided into your private and public buckets. Anthing in an s3-backed folder will be persistent. For example, <username> is s3-backed.',
              placement: 'right',
              target: '#filebrowser',
              title: 'File Browser'
            },
            {
              content:
                'The status bar at the bottom states your workspace\'s memory capacity which can be increased or decreased by manually configuring the workspace.',
              placement: 'top',
              target: '#jp-main-statusbar',
              title: 'Status Bar'
            },
            {
              content: 
              'This concludes the tour. Enjoy the platform!',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Tour finished!'
            }
          ],
};
