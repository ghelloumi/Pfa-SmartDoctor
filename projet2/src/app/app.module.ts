//system imports
import {NgModule, ErrorHandler} from '@angular/core';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';

//pages
import {HomePage} from '../pages/home/home';
import {LoginPage} from "../pages/login/login";
import {PatientSignUpPage} from "../pages/patient/patient-sign-up/patient-sign-up";
import {DoctorSignUp2Page} from "../pages/doctor/signUp/doctor-sign-up2/doctor-sign-up2";
import {PhotoTiltComponent} from '../components/photo-tilt/photo-tilt';
import {RendezVousPage} from '../pages/doctor/doctorHome/rendezVous/rendezVous';
import {SearchPage} from '../pages/doctor/doctorHome/search/search';
import {ChatPage} from '../pages/doctor/doctorHome/chat/chat.ts';
import {DoctorHomePage} from "../pages/doctor/doctorHome/doctorHome";
import {PatientHomePage} from "../pages/doctor/doctorHome/patient-home/patient-home";
import {PatientAddPage} from "../pages/doctor/doctorHome/patient-home/patient-add/patient-add";
import {PatientService} from "../providers/patient-service";
import {WelcomePage} from "../pages/welcome/welcome";
import {TakePicturePage} from "../pages/doctor/signUp/doctor-sign-up2/take-picture/take-picture";
import {DoctorSignUpPage} from "../pages/doctor/signUp/doctor-sign-up/doctor-sign-up";
import {DoctorHomeMenuPage} from "../pages/doctor/doctorHome/doctor-home-menu/doctor-home-menu";

//providers
import {DoctorService} from "../providers/doctor-service";
import {AppSettings} from "../providers/app-settings";
import {ProfilePage} from "../pages/doctor/doctorHome/profile/profile";
import {CalendarPage} from "../pages/doctor/doctorHome/calendar/calendar";
import {SessionService} from "../providers/sessions-service";
import {ShowSessionsPage} from "../pages/show-sessions/show-sessions";


@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    PatientSignUpPage,
    DoctorSignUpPage,
    DoctorSignUp2Page,
    PhotoTiltComponent,
    SearchPage,
    RendezVousPage,
    ChatPage,
    DoctorHomePage,
    PatientHomePage,
    PatientAddPage,
    WelcomePage,
    TakePicturePage,
    DoctorHomeMenuPage,
    ProfilePage,
    CalendarPage,
    ShowSessionsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    PatientSignUpPage,
    DoctorSignUpPage,
    DoctorSignUp2Page,
    SearchPage,
    RendezVousPage,
    ChatPage,
    DoctorHomePage,
    PatientHomePage,
    PatientAddPage,
    WelcomePage,
    TakePicturePage,
    DoctorHomeMenuPage,
    ProfilePage,
    CalendarPage,
    ShowSessionsPage
  ],
  providers: [DoctorService, AppSettings,PatientService,SessionService,{provide: ErrorHandler, useClass: IonicErrorHandler}]

})
export class AppModule {
}
