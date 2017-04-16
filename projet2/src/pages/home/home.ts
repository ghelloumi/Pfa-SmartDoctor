import {Component, ViewChild} from '@angular/core';
import {WelcomePage} from "../welcome/welcome";
import {StatusBar} from "ionic-native";
import {Platform, Nav, NavController} from "ionic-angular";
import {LoginPage} from "../login/login";
import {AboutPage} from "../about/about";
import {ContactPage} from "../contact/contact";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  @ViewChild(Nav) nav: Nav;

  rootPage: any = WelcomePage;
  activePage: any;

  homeMenuItems: Array<{title: string, component: any,icon: string}>;
  helpMenuItems: Array<{title: string, component: any,icon: string}>;


  constructor(public navCtrl: NavController, public platform: Platform) {
    this.initializeApp();

    this.homeMenuItems = [
      {title: 'Home', component: WelcomePage, icon: 'home'},
      {title: 'Login', component: LoginPage, icon: 'key'}
    ];


    this.helpMenuItems = [
      {title: 'Contact Us', component: ContactPage, icon: 'contact'},
      {title: 'About', component: AboutPage, icon: 'information-circle'}
    ];

    this.activePage = this.homeMenuItems[0];
  }


  // getActivePageName(): String {
  //   return this.navCtrl.getActive().name;
  // }

// // [hidden]="isActive('LoginPage')"
// // public navCtrl: NavController


  initializeApp() {
    this.platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }

}
