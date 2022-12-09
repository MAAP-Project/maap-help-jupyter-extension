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
                        {(': publish and manage algorithms and execute and manage DPS jobs (UPDATE with info from Sumant)')}
                      </li>
                      <li>
                        <strong>{('DPS UI Menu')}</strong>
                        {(': see DPS past and current jobs as well as run jobs (UPDATE)')}
                      </li>
                      <li>
                        <strong>{('MAAP Login')}</strong>
                        {(
                          ': log into MAAP with ESA or EarthData Account (UPDATE)'
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
                        {(': command palette where you can select from commands to run')}
                      </li>
                      <li>
                        <strong>{('Jobs')}</strong>
                        {(': see all jobs sent to DPS')}
                      </li>
                      <li>
                        <strong>{('Property inspector')}</strong>
                        {(': actions that alter the appearance of JupyterLab')}
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
