"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var doctor_sign_up2_1 = require("../doctor-sign-up2/doctor-sign-up2");
var DoctorSignUpPage = (function () {
    function DoctorSignUpPage(nav) {
        this.nav = nav;
        this.registerCredentials = {
            fullName: '',
            userName: '',
            email: '',
            cin: '',
            doctorNumber: '',
            password: '',
            passwordConfirm: ''
        };
    }
    DoctorSignUpPage.prototype.next = function () {
        this.nav.push(doctor_sign_up2_1.DoctorSignUp2Page, {
            fullName: this.registerCredentials.fullName,
            userName: this.registerCredentials.userName,
            email: this.registerCredentials.email,
            cin: this.registerCredentials.cin,
            doctorNumber: this.registerCredentials.doctorNumber,
            password: this.registerCredentials.password
        });
    };
    DoctorSignUpPage = __decorate([
        core_1.Component({
            selector: 'page-doctor-sign-up',
            templateUrl: 'doctor-sign-up.html'
        })
    ], DoctorSignUpPage);
    return DoctorSignUpPage;
}());
exports.DoctorSignUpPage = DoctorSignUpPage;
