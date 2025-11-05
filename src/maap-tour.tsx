/**
 * MAAP tour extracted into a file so that changes can be made easily to the tour if the UI changes
 * 
 * Author: Grace Llewellyn, grace.llewellyn@jpl.nasa.gov
 */

import React from "react";

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
            /*{
              content: 'Launch Earthdata Search Client (EDSC) and paste search queries.',
              placement: 'bottom',
              target: '#DataSearch',
              title: 'Data Search'
            },*/
            {
              content: 
              'General help menu with additional MAAP-specific information and the option to rerun this tutorial.',
              placement: 'bottom',
              target: '#Help',
              title: 'Help'
            },
            {
              content: 'Users may submit jobs through the submit tab and view their jobs through the view tab.',
              placement: 'bottom',
              target: '#Jobs',
              title: 'Jobs'
            },
            // {
            //   content:
            //     <div>The file browser is divided into your public and private buckets. Everything in the public and private buckets is persistent and s3-backed. Other MAAP users can access data in your public bucket through shared-buckets. See more <a href="https://docs.maap-project.org/en/latest/system_reference_guide/share_data.html" target="_blank" style={{ color: 'blue' }}>here</a>.</div>,
            //   placement: 'right',
            //   target: '#filebrowser',
            //   title: 'File Browser'
            // },
            // {
            //   content: <div>Interface with Git including cloning a repository. See more <a href="https://docs.maap-project.org/en/latest/system_reference_guide/work_with_git.html" target="_blank" style={{ color: 'blue' }}>here</a>.</div>,
            //   placement: 'bottom',
            //   target: '#jpgitsessions',
            //   title: 'Git'
            // },
            /*{
              content: 'Shows logged-in users with whom the workspace is shared.',
              placement: 'bottom',
              target: '#uicomponentsusers',
              title: 'Collaborators'
            },*/
            {
              content:
                <div>The status bar at the bottom states your workspace's memory capacity which can be increased or decreased by manually configuring the workspace devfile. See more <a href="https://docs.maap-project.org/en/latest/system_reference_guide/create_workspace.html" target="_blank" style={{ color: 'blue' }}>here</a>.</div>,
              placement: 'left',
              target: '#jp-bottom-panel',
              title: 'Status Bar'
            },
            {
              content: 
              'This concludes the tour. Enjoy MAAP!',
              placement: 'center',
              target: '#jp-main-dock-panel',
              title: 'Tour finished!'
            }
          ],
};
