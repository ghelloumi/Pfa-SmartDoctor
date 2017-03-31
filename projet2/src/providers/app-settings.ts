import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://192.168.1.105:3001/',

  //lezimna methode tlwaj l inet adr mtal wifi automatiquement
};

@Injectable()
export class AppSettings {

  constructor() {
  }

  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
