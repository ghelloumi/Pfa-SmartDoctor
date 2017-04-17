import {AppSettings} from './app-settings';
import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import 'rxjs/add/operator/map';

/*
 Generated class for the DoctorService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DoctorService {

  apiUrl = this.appSettings.getApiUrl();
  data: any;

  constructor(public http: Http, public appSettings: AppSettings) {
    this.data = null;
  }


  public addDoctor(fullName, userName, email, cin, doctorNumber, password, telNum, specialty,age,components,pic,typeC) {
    return this.http.post(this.apiUrl + 'doctors', {
      'fullName': fullName,
      'userName': userName,
      'email': email,
      'cin': cin,
      'doctorNumber': doctorNumber,
      'password': password,
      'telNum': telNum,
      'specialty': specialty,
      'age':age,
      'components':components,
      'picture':pic,
      'typeC':typeC

    })
      .map(response => response.json());
  }



  //chat

  getMsg(){
    if (this.data) {
      return Promise.resolve(this.data);
    }
    return new Promise(resolve => {

      this.http.get(this.apiUrl+'doctors/chat')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  createMsg(review){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.apiUrl+'doctors/chat', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }


}
