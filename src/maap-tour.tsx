export const managerTour = {
  id: 'jupyterlab-conda:maap-tour',
  label: 'MAAP tour',
  hasHelpEntry: true,
  steps: [  // Step must be of type IStep - see src/tokens.ts
            {
              content:
                'The following tutorial will point out some of the main UI components within JupyterLab.',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Welcome to Jupyter Lab!'
            },
            {
              content:
                'This is the main content area where notebooks and other content can be viewed and edited.',
              placement: 'left-end',
              target: '#jp-main-dock-panel',
              title: 'Main Content'
            }
          ],
};
