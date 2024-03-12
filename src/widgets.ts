/**
 * Widgets that appear when the user selects anything MAAP specific from the help menu
 * The titles are links to the embedded webpages, and clicking them opens a link in a new
 * tab
 * 
 * Author: Grace Llewellyn, grace.llewellyn@jpl.nasa.gov
 */

import { Widget } from '@lumino/widgets';
import '../style/index.css';

export class AboutWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.height = '450px';
        body.style.width = '600px';
        const innerText = `
        <h1>
        <img width='575' height='150' src = 'https://maap-project.org/wp-content/uploads/2021/10/nasamaaplogo3.png'></img>
        <br>
        About 
        </h1>
        <body>
        <h2>The MAAP Project (Multi-Mission Algorithm and Analysis Platform)</h2>
        <p><b>The MAAP platform is designed to combine data, algorithms, and computational abilities 
        for the processing and sharing of data related to NASA's GEDI, ESA's BIOMASS, and NASA/ISRO's 
        NISAR missions.</b> These missions generate vastly greater amounts of data than previous Earth 
        observation missions. There are unique challenges to processing, storing, and sharing the relevant 
        data due to the high data volume as well as with the data being collected from varied satellites, aircraft, and ground
        stations with different resolutions, coverages, and processing levels.</p>
        <p><b>MAAP aims to address unique challenges by making it easier to discover and use biomass relevant data, 
        integrating the data for comparison, analysis, evaluation, and generation.</b> An algorithm development environment (ADE) 
        is used to create repeatable and sharable science tools for the research community. The software is open source and adheres 
        to ESA's and NASA's commitment to open data.</p>
        <p><b>NASA and ESA are collaborating to further the interoperability of biomass relevant data and metadata.</b> Tools have been 
        developed to support a new approach to data stewardship and there is a data publication workflow for organizing and storing data and 
        generating metadata to be discoverable in a cloud-based centralized location. The platform and data stewardship approaches are designed to 
        ease barriers and promote collaboration between researchers, providers, curators, and experts across NASA
        and ESA.</p>

        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class MAAPDocumentationWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.height = '450px';
        body.style.width = '600px';
        const innerText = `
        <body>
        <a href="https://docs.maap-project.org" target="_blank"><h1 style="color:blue;"><u>MAAP Documentation</u></h1></a>
        <embed type="text/html" src="https://docs.maap-project.org" width='600' height='450'>
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class MaapApiWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.height = '450px';
        body.style.width = '600px';
        const innerText = `
        <body>
        <a href="https://api.maap-project.org/api/" target="_blank"><h1 style="color:blue;"><u>MAAP API</u></h1></a>
        <embed type="text/html" src="https://api.maap-project.org/api/" width='600' height='450'>
        </body>`;


        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class MaapBugSubmissionWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        body.style.height = '100px';
        body.style.width = '250px';
        const innerText = `
        <body>
        <h1>Submit bugs to MAAP <a href="https://github.com/MAAP-Project/Community/issues" target="_blank"><u style="color:blue;">here</u></a>
        </h1>
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}