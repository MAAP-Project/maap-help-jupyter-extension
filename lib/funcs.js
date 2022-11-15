import { PageConfig } from '@jupyterlab/coreutils';
import { request } from './request';
export function loadMaapEnvironment() {
    return new Promise((resolve, reject) => {
        console.log("In load function");
        var valuesUrl = new URL(PageConfig.getBaseUrl() + 'jupyter-server-extension/maapsec/environment');
        console.log(valuesUrl);
        request('get', valuesUrl.href).then((res) => {
            console.log('maapsec environment response');
            console.log(res);
            if (res.ok) {
                let environment = JSON.parse(res.data);
                resolve(environment);
            }
            else {
                resolve(null);
            }
        });
    });
}
export function maapLogin(service, ticket) {
    return new Promise((resolve, reject) => {
        var valuesUrl = new URL(PageConfig.getBaseUrl() + 'jupyter-server-extension/maapsec/login');
        console.log(valuesUrl);
        valuesUrl.searchParams.append('service', service);
        valuesUrl.searchParams.append('ticket', ticket);
        request('get', valuesUrl.href).then((res) => {
            if (res.ok) {
                let attributes = JSON.parse(JSON.parse(res.data)['attributes']);
                resolve(attributes);
            }
            else {
                console.log(res);
                resolve(null);
            }
        });
    });
}
