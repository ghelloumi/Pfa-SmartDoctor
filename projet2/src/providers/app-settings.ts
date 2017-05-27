import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://192.168.0.117:3001/'
};

@Injectable()
export class AppSettings {

  constructor() {
  }

  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
