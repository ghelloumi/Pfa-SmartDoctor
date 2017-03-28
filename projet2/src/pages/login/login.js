"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var home_1 = require("../home/home");
var doctor_sign_up_1 = require("../doctor/signUp/doctor-sign-up/doctor-sign-up");
var patient_sign_up_1 = require("../patient/patient-sign-up/patient-sign-up");
var LoginPage = (function () {
    function LoginPage(auth, nav, actionSheetCtrl, alertCtrl, loadingCtrl) {
        this.auth = auth;
        this.nav = nav;
        this.actionSheetCtrl = actionSheetCtrl;
        this.alertCtrl = alertCtrl;
        this.loadingCtrl = loadingCtrl;
        this.logoState = "in";
        this.cloudState = "in";
        this.loginState = "in";
        this.formState = "in";
        this.registerCredentials = { email: '', password: '' };
    }
    LoginPage.prototype.showChose = function () {
        var _this = this;
        var actionSheet = this.actionSheetCtrl.create({
            title: 'Who are you ?',
            buttons: [
                {
                    text: 'Patient',
                    handler: function () {
                        _this.nav.push(patient_sign_up_1.PatientSignUpPage);
                    }
                }, {
                    text: 'Doctor',
                    handler: function () {
                        _this.nav.push(doctor_sign_up_1.DoctorSignUpPage);
                    }
                }
            ]
        });
        actionSheet.present();
    };
    LoginPage.prototype.showLoading = function () {
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
    };
    LoginPage.prototype.showError = function (text) {
        var _this = this;
        setTimeout(function () {
            _this.loading.dismiss();
        });
        var alert = this.alertCtrl.create({
            title: 'Fail',
            subTitle: text,
            buttons: ['OK']
        });
        alert.present(prompt);
    };
    // public login() {
    //   this.showLoading()
    //   this.auth.login(this.registerCredentials).subscribe(allowed => {
    //       if (allowed) {
    //         setTimeout(() => {
    //           this.loading.dismiss();
    //           this.nav.setRoot(DoctorSignUpPage)
    //         });
    //       } else {
    //         this.showError("Access Denied");
    //       }
    //     },
    //     error => {
    //       this.showError(error);
    //     });
    // }
    LoginPage.prototype.loginSplash = function () {
        this.nav.push(home_1.HomePage);
    };
    LoginPage = __decorate([
        core_1.Component({
            selector: 'page-login',
            templateUrl: 'login.html',
            animations: [
                //For the login form
                core_1.trigger('bounceInBottom', [
                    core_1.state('in', core_1.style({
                        transform: 'translate3d(0,0,0)'
                    })),
                    core_1.transition('void => *', [
                        core_1.animate('500ms 200ms ease-in', core_1.keyframes([
                            core_1.style({ transform: 'translate3d(0,2000px,0)', offset: 0 }),
                            core_1.style({ transform: 'translate3d(0,-20px,0)', offset: 0.9 }),
                            core_1.style({ transform: 'translate3d(0,0,0)', offset: 1 })
                        ]))
                    ])
                ]),
                //For login button
                core_1.trigger('fadeIn', [
                    core_1.state('in', core_1.style({
                        opacity: 1
                    })),
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0 }),
                        core_1.animate('500ms 1000ms ease-in')
                    ])
                ])
            ]
        })
    ], LoginPage);
    return LoginPage;
}());
exports.LoginPage = LoginPage;
