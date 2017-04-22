import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen,SQLite } from 'ionic-native';
import {HomePage} from "../pages/home/home";

import {SessionsService} from "../providers/sessions-service";
import {ShowSessionsPage} from "../pages/show-sessions/show-sessions";


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = null;

  constructor(public platform: Platform,public sessionsService: SessionsService) {
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
      this.sessionsService.openDatabase()
        .then(() => this.sessionsService.createTable())
        .then(()=>{
          this.rootPage = ShowSessionsPage;
        })
    });
  }
}
