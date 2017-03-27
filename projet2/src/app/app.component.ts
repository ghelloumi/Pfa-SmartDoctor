import {Component, ViewChild} from '@angular/core';
import { Nav,Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import {WelcomePage} from "../pages/welcome/welcome";



@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage = WelcomePage;


  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleLightContent();
      Splashscreen.hide();
    });

  }
}
