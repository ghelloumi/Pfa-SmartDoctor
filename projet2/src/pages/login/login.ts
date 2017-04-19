import {Component, trigger, state, style, transition, animate, keyframes} from '@angular/core';
import {NavController, AlertController, LoadingController, Loading, ActionSheetController} from 'ionic-angular';
import {DoctorSignUpPage} from "../doctor/signUp/doctor-sign-up/doctor-sign-up";
import {PatientSignUpPage} from "../patient/patient-sign-up/patient-sign-up";
import {DoctorService} from "../../providers/doctor-service";
import {DoctorHomePage} from "../doctor/doctorHome/doctorHome";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  animations: [


    //For the login form
    trigger('bounceInBottom', [
      state('in', style({
        transform: 'translate3d(0,0,0)'
      })),
      transition('void => *', [
        animate('500ms 200ms ease-in', keyframes([
          style({transform: 'translate3d(0,2000px,0)', offset: 0}),
          style({transform: 'translate3d(0,-20px,0)', offset: 0.9}),
          style({transform: 'translate3d(0,0,0)', offset: 1})
        ]))
      ])
    ]),

    //For login button
    trigger('fadeIn', [
      state('in', style({
        opacity: 1
      })),
      transition('void => *', [
        style({opacity: 0}),
        animate('500ms 1000ms ease-in')
      ])
    ])
  ]
})

export class LoginPage {

  logoState: any = "in";
  cloudState: any = "in";
  loginState: any = "in";
  formState: any = "in";

  loading: Loading;
  registerCredentials = {login: '', password: ''};

  static loggedin: any;

  constructor(public navCtrl: NavController, public auth: DoctorService, private nav: NavController, public actionSheetCtrl: ActionSheetController, private alertCtrl: AlertController, private loadingCtrl: LoadingController) {

  }

  showChose() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Who are you ?',
      buttons: [
        {
          text: 'Patient',
          handler: () => {
            this.nav.push(PatientSignUpPage);
          }
        }, {
          text: 'Doctor',
          handler: () => {
            this.nav.push(DoctorSignUpPage);
          }
        }
      ]
    });
    actionSheet.present();
  }

  showLoading() {
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();
  }

  showError(text) {
    setTimeout(() => {
      this.loading.dismiss();
    });

    let alert = this.alertCtrl.create({
      title: 'Fail',
      subTitle: text,
      buttons: ['OK']
    });
    alert.present(prompt);
  }


  public login() {
    this.showLoading()
    this.auth.getDoctors().subscribe(data => {
        var test = 0;
        var i = 0;
        while (i < data.length && test == 0) {
          if (this.registerCredentials.login == data[i].userName && this.registerCredentials.password == data[i].password) {
            test = 1;
            LoginPage.loggedin=data[i];
            console.log( LoginPage.loggedin);
            console.log("success logged in");

          }
          i++;
        }

        if (test == 1) {
          setTimeout(() => {
            this.loading.dismiss();
            this.nav.push(DoctorHomePage);
          });
        } else {
          this.showError("Access Denied");
        }
      },
      error => {
        this.showError(error);
      });
  }

  ionViewDidLoad() {
  }
}
