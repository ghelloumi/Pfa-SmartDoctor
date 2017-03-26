import {AppSettings} from './app-settings';
import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the DoctorService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DoctorService {

  apiUrl = this.appSettings.getApiUrl();

  constructor(public http: Http, public appSettings: AppSettings) {
  }


  public addDoctor(fullName, userName, email, cin, doctorNumber, password, telNum, specialty,components,typeC) {
    return this.http.post(this.apiUrl + 'doctors', {
      'fullName': fullName,
      'userName': userName,
      'email': email,
      'cin': cin,
      'doctorNumber': doctorNumber,
      'password': password,
      'telNum': telNum,
      'specialty': specialty,
      'components':components,
      'typeC':typeC

    })
      .map(response => response.json());
  }

}
