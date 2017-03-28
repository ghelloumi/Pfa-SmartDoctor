import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {HomePage} from "../pages/home/home";
import {DoctorSignUp2Page} from "../pages/doctor/signUp/doctor-sign-up2/doctor-sign-up2";
import {DoctorSignUpPage} from "../pages/doctor/signUp/doctor-sign-up/doctor-sign-up";

export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = DoctorSignUp2Page;

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
