import { Injectable } from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from './app-settings';

/*
  Generated class for the PatientService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class PatientService {

  data: any;
  apiUrl = this.appSettings.getApiUrl();
  constructor(public http: Http,public appSettings: AppSettings) {
    this.data = null;
  }

  getReviews(){

    if (this.data) {
      return Promise.resolve(this.data);
    }

    return new Promise(resolve => {

      this.http.get(this.apiUrl+'api/addpatient')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  createReview(patient){

    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.apiUrl+'api/addpatient', JSON.stringify(patient), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });

  }


}
