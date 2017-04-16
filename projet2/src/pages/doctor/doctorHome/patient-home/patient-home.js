"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var patient_add_1 = require("./patient-add/patient-add");
/*
  Generated class for the PatientHome page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
var PatientHomePage = (function () {
    function PatientHomePage(navCtrl, navParams, patientService, modalCtrl) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.patientService = patientService;
        this.modalCtrl = modalCtrl;
    }
    PatientHomePage.prototype.ionViewDidLoad = function () {
        var _this = this;
        this.patientService.getReviews().then(function (data) {
            _this.addpatient = data;
        });
    };
    PatientHomePage.prototype.addReview = function () {
        var _this = this;
        var modal = this.modalCtrl.create(patient_add_1.PatientAddPage);
        modal.onDidDismiss(function (patient) {
            if (patient) {
                _this.addpatient.push(patient);
                _this.patientService.createReview(patient);
            }
        });
        modal.present();
    };
    PatientHomePage = __decorate([
        core_1.Component({
            selector: 'page-patient-home',
            templateUrl: 'patient-home.html'
        })
    ], PatientHomePage);
    return PatientHomePage;
}());
exports.PatientHomePage = PatientHomePage;
