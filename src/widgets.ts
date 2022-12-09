import { Widget } from '@lumino/widgets';

//
// Widget with popup to set search results limit
//
export class LimitPopupWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        super({ node: body });
        let img = document.createElement('img');
        img.src = 'images/photo1.png';
        img.alt = 'MAAP logo'
        this.node.appendChild(img);
    }
}
export class AboutWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <head>
        <b>About</b>
        </head>
        <body>

        <h1>The MAAP Project (Multi-Mission Algorithm and Analysis Platform)</h1>
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

export class FAQWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Frequently Asked Questions</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/faqs.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class TechDocWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Platform Technical Documentation</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/platform_tech_docs.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class TutorialsWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>Tutorials</h1>
        <embed type="text/html" src="https://docs.maap-project.org/en/develop/tutorials.html" width="1000" height="600">
        </body>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class LaunchTutorialWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <head>
        Test
        </head>`;

        body.innerHTML = innerText;
        super({ node: body });
    }
}

export class MaapApiWidget extends Widget {
    constructor() {
        let body = document.createElement('div');
        body.style.display = 'flex';
        body.style.flexDirection = 'column';
        const innerText = `
        <body>
        <h1>MAAP API</h1>
        <embed type="text/html" src="https://api.ops.maap-project.org/api/" width="1000" height="600">
        </body>`;


        body.innerHTML = innerText;
        super({ node: body });
    }
}

