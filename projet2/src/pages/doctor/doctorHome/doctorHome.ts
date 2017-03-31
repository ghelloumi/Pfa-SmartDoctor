import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {DoctorHomeMenuPage} from "./doctor-home-menu/doctor-home-menu";



@Component({
  selector: 'doctorHomePage',
  templateUrl: 'doctorHome.html',
})
export class DoctorHomePage {

  rootPage: any = DoctorHomeMenuPage;

  constructor(public platform: Platform) {
  }

  ionViewDidLoad() {
  }
}
