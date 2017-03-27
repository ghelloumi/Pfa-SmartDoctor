import {Component, ViewChild} from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import {LoginPage} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = LoginPage;


  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
    });

  }
}
