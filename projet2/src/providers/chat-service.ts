import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import {AppSettings} from './app-settings';

@Injectable()
export class ChatService {

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

      this.http.get(this.apiUrl+'api/reviews')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          resolve(this.data);
        });
    });
  }

  createReview(review){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    this.http.post(this.apiUrl+'api/reviews', JSON.stringify(review), {headers: headers})
      .subscribe(res => {
        console.log(res.json());
      });
  }
}
