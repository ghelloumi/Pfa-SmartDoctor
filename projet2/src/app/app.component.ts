import { Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {HomePage} from "../pages/home/home";

import {ChatPage} from '../pages/doctor/doctorHome/chat/chat.ts';


export interface MenuItem {
  title: string;
  component: any;
  icon: string;
}

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any = HomePage;

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
