import {Component, ViewChild} from '@angular/core';
import {Platform, Nav} from 'ionic-angular';

import {SearchPage} from './search/search';
import {StatusBar} from "ionic-native";
import {RendezVousPage} from "./rendezVous/rendezVous";
import {ChatPage} from './chat/chat.ts';
import {MediaPage} from "./media/media";
import {PatientHomePage} from "./patient-home/patient-home";


@Component({
  selector: 'doctorHomePage',
  templateUrl: 'doctorHome.html',
})
export class DoctorHomePage {


  @ViewChild(Nav) nav: Nav;

  rootPage: any = RendezVousPage;
  activePage: any;

  pages: Array<{title: string, component: any,icon: string}>;

  constructor(public platform: Platform) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      {title: 'Rendez-vous', component: RendezVousPage, icon: 'add'},
      {title: 'chercher', component: SearchPage, icon: 'home'},
      {title: 'tchat', component: ChatPage, icon: 'home'},
      {title: 'Social media', component: PatientHomePage, icon: 'home'},
      {title: 'Social media', component: MediaPage, icon: 'home'}
    ];

    this.activePage = this.pages[0];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();

    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
    this.activePage = page;
  }

  checkActive(page) {
    return page == this.activePage;
  }

}
