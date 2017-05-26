import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {HomePage} from "../pages/home/home";

import {SessionService} from "../providers/sessions-service";
import {ShowSessionsPage} from "../pages/show-sessions/show-sessions";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any =HomePage;

  constructor(public platform: Platform,public sessionsService: SessionService) {
    this.initializeApp();
  }

  //
  // getActivePage(): string {
  //   return this.navCtrl.getActive().name;
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
      Splashscreen.hide();
      // this.sessionsService.openDatabase()
      //   .then(() => this.sessionsService.createTable())
      //   .then(()=>{
      //     this.rootPage = HomePage;
      //   })
    });
  }
}
