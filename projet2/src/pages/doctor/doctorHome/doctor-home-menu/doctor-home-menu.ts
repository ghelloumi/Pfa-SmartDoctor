import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {ChatPage} from "../chat/chat";
import {PatientHomePage} from "../patient-home/patient-home";
import {SearchPage} from "../search/search";
import {ProfilePage} from "../profile/profile";
import {CalendarPage} from "../calendar/calendar";

/*
  Generated class for the DoctorHomeMenu page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-doctor-home-menu',
  templateUrl: 'doctor-home-menu.html'
})
export class DoctorHomeMenuPage {

  tab0Root: any = ProfilePage;
  tab1Root: any = ChatPage;
  tab2Root: any = SearchPage;
  tab3Root: any = CalendarPage;

  title: String = "Doctor home";

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad DoctorHomeMenuPage');
  }

  public changeTitle(num){
    switch (num)
    {
      case 0 :
        this.title="Doctor Profile";
        break;
      case 1 :
        this.title="Chat";
        break;
      case 2 :
        this.title="Patients";
        break;
      case 3 :
        this.title="Patient";
        break;
      default : this.title="Calendar";
    }
  }

}
