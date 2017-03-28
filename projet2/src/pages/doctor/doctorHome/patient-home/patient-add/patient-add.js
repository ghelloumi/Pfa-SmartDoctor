"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
var PatientAddPage = (function () {
    function PatientAddPage(viewCtrl) {
        this.viewCtrl = viewCtrl;
    }
    PatientAddPage.prototype.save = function () {
        var patient = {
            nom: this.nom,
            prenom: this.prenom,
            age: this.age,
            maladie: this.maladie
        };
        this.viewCtrl.dismiss(patient);
    };
    PatientAddPage.prototype.close = function () {
        this.viewCtrl.dismiss();
    };
    PatientAddPage = __decorate([
        core_1.Component({
            selector: 'page-patient-add',
            templateUrl: 'patient-add.html'
        })
    ], PatientAddPage);
    return PatientAddPage;
}());
exports.PatientAddPage = PatientAddPage;
