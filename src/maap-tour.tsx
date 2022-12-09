import React from "react";

export const managerTour = {
  id: 'jupyterlab-tour:maap-tour',
  label: 'MAAP tour',
  hasHelpEntry: true,
  steps: [  // Step must be of type IStep - see src/tokens.ts
            {
              content:'The following tutorial will point out some of the MAAP jupyter extension features within JupyterLab.',
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
              content: (
                <details>
                    <summary>
                      {('This is the top menu bar where you can select from numerous MAAP extensions.')}
                    </summary>
                    <ul>
                      <li>
                        <strong>{('Git')}</strong>
                        {(': interface with Git including cloning a repository')}
                      </li>
                      <li>
                        <strong>{('Data Search')}</strong>
                        {(': launch Earthdata Search Client (EDSC) and paste search queries')}
                      </li>
                      <li>
                        <strong>{('DPS/MAS Operations')}</strong>
                        {(': register algorithms into DPS to be able to run as jobs')}
                      </li>
                      <li>
                        <strong>{('DPS UI Menu')}</strong>
                        {(': manage your jobs in DPS')}
                      </li>
                      <li>
                        <strong>{('MAAP Login')}</strong>
                        {(
                          ': log into the MAAP platform with an ESA/ Earthdata account'
                        )}
                      </li>
                      <li>
                        <strong>{('Help')}</strong>
                        {(
                          ': General help menu with additional MAAP-specific information and the option to rerun this tutorial'
                        )}
                      </li>
                    </ul>
                  </details>
              ),
              placement: 'bottom',
              target: '#jp-MainMenu',
              title: 'Top menu options'
            },
            {
              content: (
                <details>
                    <summary>
                      {('This is the side menu bar where you can select from numerous MAAP extensions.')}
                    </summary>
                    <ul>
                      <li>
                        <strong>{('Git')}</strong>
                        {(': interface with Git including cloning a repository')}
                      </li>
                      <li>
                        <strong>{('Commands')}</strong>
                        {(': palette of commands to run')}
                      </li>
                      <li>
                        <strong>{('Jobs')}</strong>
                        {(': your jobs in DPS')}
                      </li>
                      <li>
                        <strong>{('Property inspector')}</strong>
                        {(': property inspector')}
                      </li>
                      <li>
                        <strong>{('Open tabs')}</strong>
                        {(
                          ': see all open tabs'
                        )}
                      </li>
                    </ul>
                  </details>
              ),
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
                'The status bar at the bottom states your workspace\'s memory capacity which can be increased or decreased by manually configuring the workspace',
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
