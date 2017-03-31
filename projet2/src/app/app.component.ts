import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {HomePage} from "../pages/home/home";
import {DoctorHomeMenuPage} from "../pages/doctor/doctorHome/doctor-home-menu/doctor-home-menu";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DoctorHomeMenuPage;

  constructor(public platform: Platform) {

    this.initializeApp();
  }

  //
  // getActivePage(): string {
  //   return this.navCtrl.getActive().name;
  // }

  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
    });
  }
}
