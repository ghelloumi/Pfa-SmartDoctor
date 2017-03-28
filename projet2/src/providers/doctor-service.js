"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require('@angular/core');
require('rxjs/add/operator/map');
/*
 Generated class for the DoctorService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
var DoctorService = (function () {
    function DoctorService(http, appSettings) {
        this.http = http;
        this.appSettings = appSettings;
        this.apiUrl = this.appSettings.getApiUrl();
    }
    DoctorService.prototype.addDoctor = function (fullName, userName, email, cin, doctorNumber, password, telNum, specialty, components, typeC) {
        return this.http.post(this.apiUrl + 'doctors', {
            'fullName': fullName,
            'userName': userName,
            'email': email,
            'cin': cin,
            'doctorNumber': doctorNumber,
            'password': password,
            'telNum': telNum,
            'specialty': specialty,
            'components': components,
            'typeC': typeC
        })
            .map(function (response) { return response.json(); });
    };
    DoctorService = __decorate([
        core_1.Injectable()
    ], DoctorService);
    return DoctorService;
}());
exports.DoctorService = DoctorService;
