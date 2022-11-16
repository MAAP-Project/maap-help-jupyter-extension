import { PageConfig } from '@jupyterlab/coreutils'
import { request, RequestResult } from './request';

export function loadMaapEnvironment() {
    return new Promise<RequestResult>((resolve, reject) => {
      console.log("In load function")
      var valuesUrl = new URL(PageConfig.getBaseUrl() + 'jupyter-server-extension/maapsec/environment');
      console.log(valuesUrl)
      request('get', valuesUrl.href).then((res: RequestResult) => {
        console.log('maapsec environment response');
        console.log(res);
        if (res.ok) {
          let environment = JSON.parse(res.data);
          resolve(environment);
        } else {
          resolve(null as any);
        }
      });
    });
  }

  export function maapLogin() {
      console.log("gracecal- in the maap log in function");
    }