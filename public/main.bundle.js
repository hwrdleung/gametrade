webpackJsonp(["main"],{

/***/ "./src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app.component.css":
/***/ (function(module, exports) {

module.exports = ".nav-bar {\r\n    height: auto;\r\n    width: 100%;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    margin: 0;\r\n}\r\n\r\n.nav-bar ul a {\r\n    text-decoration: none;\r\n}\r\n\r\n.nav-bar ul a:hover {\r\n    color: #FFF;\r\n}\r\n\r\n.nav-bar ul {\r\n    list-style-type: none;\r\n    margin: 0;\r\n    padding: 0;\r\n}\r\n\r\n.nav-bar ul li {\r\n    display: inline-block;\r\n}\r\n\r\n.nav-bar ul li a {\r\n    display: block;\r\n    padding: 15px 20px;\r\n}\r\n\r\n.nav-bar ul li a:hover {\r\n    background: green;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "\r\n<!-- NAV BAR -->\r\n<nav *ngIf=\"this.dataService.currentUser\" class=\"nav-bar theme\">\r\n        <a id=\"logo\" routerLink=\"/\">GameTrader</a>\r\n    <ul>\r\n        <li>\r\n            <a routerLink=\"/myGames\">My Games</a>\r\n        </li>\r\n        <li>\r\n            <a routerLink=\"/myTrades\">My Trades</a>\r\n        </li>\r\n        <li>\r\n            <a routerLink=\"/dashboard\">{{this.dataService.userData.username}}</a>\r\n        </li>\r\n        <li>\r\n            <a (click)=\"this.dataService.logout()\">Sign Out</a>\r\n        </li>\r\n    </ul>\r\n</nav>\r\n\r\n<router-outlet></router-outlet>"

/***/ }),

/***/ "./src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__games_data_service__ = __webpack_require__("./src/app/games-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__trade_service__ = __webpack_require__("./src/app/trade.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode__ = __webpack_require__("./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_jwt_decode__);
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var AppComponent = /** @class */ (function () {
    function AppComponent(tradeService, dataService, gamesDataService) {
        this.tradeService = tradeService;
        this.dataService = dataService;
        this.gamesDataService = gamesDataService;
        this.title = 'app';
    }
    AppComponent.prototype.ngOnInit = function () {
        this.dataService.userData = __WEBPACK_IMPORTED_MODULE_4_jwt_decode__(sessionStorage.getItem('currentUser')).user;
    };
    AppComponent.prototype.ngOnDestroy = function () {
        this.gamesDataService.searchResults = [];
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__("./src/app/app.component.html"),
            styles: [__webpack_require__("./src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__trade_service__["a" /* TradeService */], __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__games_data_service__["a" /* GamesDataService */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("./node_modules/@angular/platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__app_component__ = __webpack_require__("./src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_login_component__ = __webpack_require__("./src/app/login/login.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__register_register_component__ = __webpack_require__("./src/app/register/register.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__home_home_component__ = __webpack_require__("./src/app/home/home.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__ = __webpack_require__("./src/app/dashboard/dashboard.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__my_games_my_games_component__ = __webpack_require__("./src/app/my-games/my-games.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__my_trades_my_trades_component__ = __webpack_require__("./src/app/my-trades/my-trades.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__profile_profile_component__ = __webpack_require__("./src/app/profile/profile.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__games_data_service__ = __webpack_require__("./src/app/games-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__trade_service__ = __webpack_require__("./src/app/trade.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
















var appRoutes = [
    { path: '', component: __WEBPACK_IMPORTED_MODULE_8__home_home_component__["a" /* HomeComponent */] },
    { path: 'login', component: __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */] },
    { path: 'register', component: __WEBPACK_IMPORTED_MODULE_7__register_register_component__["a" /* RegisterComponent */] },
    { path: 'dashboard', component: __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */] },
    { path: 'myGames', component: __WEBPACK_IMPORTED_MODULE_10__my_games_my_games_component__["a" /* MyGamesComponent */] },
    { path: 'myTrades', component: __WEBPACK_IMPORTED_MODULE_11__my_trades_my_trades_component__["a" /* MyTradesComponent */] },
    { path: 'profile/:username', component: __WEBPACK_IMPORTED_MODULE_12__profile_profile_component__["a" /* ProfileComponent */] }
];
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["I" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_6__login_login_component__["a" /* LoginComponent */],
                __WEBPACK_IMPORTED_MODULE_7__register_register_component__["a" /* RegisterComponent */],
                __WEBPACK_IMPORTED_MODULE_8__home_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_9__dashboard_dashboard_component__["a" /* DashboardComponent */],
                __WEBPACK_IMPORTED_MODULE_10__my_games_my_games_component__["a" /* MyGamesComponent */],
                __WEBPACK_IMPORTED_MODULE_11__my_trades_my_trades_component__["a" /* MyTradesComponent */],
                __WEBPACK_IMPORTED_MODULE_12__profile_profile_component__["a" /* ProfileComponent */],
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["b" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["c" /* ReactiveFormsModule */],
                __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["b" /* HttpClientModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_router__["c" /* RouterModule */].forRoot(appRoutes, { enableTracing: false } // <-- debugging purposes only
                )
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_13__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_14__games_data_service__["a" /* GamesDataService */], __WEBPACK_IMPORTED_MODULE_15__trade_service__["a" /* TradeService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_5__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/dashboard/dashboard.component.css":
/***/ (function(module, exports) {

module.exports = ".settings-box {\r\n    list-style-type: none;\r\n    color: #FFF;\r\n    padding: 40px;\r\n    margin: 20px auto;\r\n    max-width: 700px;\r\n}\r\n\r\n.settings-box ul{\r\n    width: 100%;\r\n}\r\n\r\n.settings-box li{\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -webkit-box-pack: justify;\r\n        -ms-flex-pack: justify;\r\n            justify-content: space-between;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    padding: 10px 0;\r\n}\r\n\r\n.settings-box h2{\r\n    margin: 0;\r\n}\r\n\r\n.settings-box textarea {\r\n    width: 600px;\r\n    height: 150px;\r\n}\r\n\r\n.picture-selector {\r\n    width: 100%;\r\n    height: auto;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n}\r\n\r\n.picture-selector img {\r\n    height: 100px;\r\n    width: 100px;\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n\r\n\r\n  <div class=\"container\">\r\n\r\n    <ul class=\"tab-menu\">\r\n      <li>\r\n        <a id=\"profile-tab\" (click)=\"displayContent('Edit Profile')\">Edit Profile</a>\r\n      </li>\r\n      <li>\r\n        <a id=\"account-tab\" (click)=\"displayContent('Account Settings')\">Account Settings</a>\r\n      </li>\r\n    </ul>\r\n\r\n\r\n    <div *ngIf=\"displayEditProfileTab\" class=\"tab-content\">\r\n      <h3>Edit Profile</h3>\r\n\r\n      <form class=\"theme settings-box\" [formGroup]=\"editProfileForm\" (ngSubmit)=\"this.dataService.editProfile(editProfileForm.value); resetView()\">\r\n        <ul>\r\n          <li>\r\n            <img class=\"profile-img\" [src]=\"selectedImg\">\r\n            <div *ngIf=\"displayPictureSelector\" class=\"picture-selector\">\r\n              <div *ngFor=\"let picture of this.dataService.profilePics; let i = index\">\r\n                <a (click)=\"setPicture(i)\"><img src=\"{{picture}}\"></a>\r\n              </div>\r\n            </div>\r\n          </li>\r\n          <li>\r\n            <div>\r\n              <a (click)=\"togglePictureSelector()\">Change Profile Picture</a>\r\n            </div>\r\n            <a routerLink=\"/profile/{{this.dataService.userData.username}}\">View Public Profile</a>\r\n\r\n          </li>\r\n          <li>\r\n            <p>Display name publicly:</p>\r\n            <select formControlName=\"displayName\" name=\"displayName\">\r\n              <option value=\"Enable\">Enable</option>\r\n              <option value=\"Disable\">Disable</option>\r\n            </select>\r\n          </li>\r\n          <li>\r\n            <p>Display email address publicly:</p>\r\n            <select formControlName=\"displayEmail\" name=\"displayEmail\">\r\n              <option value=\"Enable\">Enable</option>\r\n              <option value=\"Disable\">Disable</option>\r\n            </select>\r\n          </li>\r\n          <li>\r\n          </li>\r\n          <li *ngIf=\"!editBioMode; else edit\">\r\n            <div>\r\n              <p>Bio:</p>\r\n              <p>{{this.dataService.userData.profile.bio}}</p>\r\n              </div>\r\n            <a (click)=\"toggleEditBioMode()\">Edit Bio</a>\r\n          </li>\r\n          <ng-template #edit>\r\n            <li>\r\n                <div>\r\n                    <p>Bio:</p>\r\n              <textarea formControlName=\"bio\" name=\"bio\">\r\n              {{this.dataService.userData.profile.bio}}\r\n            </textarea>\r\n            </div>\r\n            <a (click)=\"toggleEditBioMode()\">Cancel</a>\r\n\r\n            </li>\r\n          </ng-template>\r\n\r\n\r\n          <li>\r\n            <input type=\"submit\" value=\"Save Changes\">\r\n          </li>\r\n        </ul>\r\n      </form>\r\n    </div>\r\n\r\n    <div *ngIf=\"displayAccountSettingsTab\" class=\"tab-content\">\r\n        <h3>Account Settings</h3>\r\n\r\n      <ul class=\"theme settings-box\">\r\n\r\n        <li>\r\n          <h2>{{ this.dataService.userData.first }} {{ this.dataService.userData.last }}</h2>\r\n        </li>\r\n\r\n        <li>\r\n          <p>Location: {{ this.dataService.userData.city }}, {{ this.dataService.userData.state }}, {{ this.dataService.userData.country\r\n            }}\r\n          </p>\r\n          <a (click)=\"displayForm('location')\">Change Location</a>\r\n        </li>\r\n\r\n        <li>\r\n          <p>Email Address: {{ this.dataService.userData.email }}</p>\r\n          <a (click)=\"displayForm('email')\">Change Email Address</a>\r\n        </li>\r\n\r\n        <li>\r\n          <p>Password: ********</p>\r\n          <a (click)=\"displayForm('password')\">Change Password</a>\r\n        </li>\r\n\r\n        <li>\r\n          <p>Delete Account</p>\r\n          <a (click)=\"displayForm('delete account')\">Delete Account</a>\r\n        </li>\r\n      </ul>\r\n      <div>\r\n        <form class=\"theme settings-box\" *ngIf=\"displayChangeLocationForm\" [formGroup]=\"changeLocationForm\" (ngSubmit)=\"this.dataService.changeLocation(changeLocationForm.value); hideAllForms()\">\r\n          <h3>Update Your Location</h3>\r\n\r\n          <label>City:\r\n            <input type=\"text\" formControlName=\"newCity\" name=\"newCity\">\r\n          </label>\r\n\r\n          <label>State:\r\n            <input type=\"text\" formControlName=\"newState\" name=\"newState\">\r\n          </label>\r\n\r\n          <label>Country:\r\n            <input type=\"text\" formControlName=\"newCountry\" name=\"newCountry\">\r\n          </label>\r\n\r\n          <input type=\"submit\" [disabled]=\"!changeLocationForm.valid\">\r\n        </form>\r\n\r\n        <form class=\"theme settings-box\" *ngIf=\"displayChangeEmailForm\" [formGroup]=\"changeEmailForm\" (ngSubmit)=\"this.dataService.changeEmail(changeEmailForm.value)\">\r\n          <h3>Update your email address</h3>\r\n\r\n          <label>\r\n            Enter your new email address:\r\n            <input type=\"email\" formControlName=\"email\" name=\"email\">\r\n            <div class=\"form-alert\" *ngIf=\"!changeEmailForm.controls['email'].valid && changeEmailForm.controls['email'].touched\">You must enter a valid email address.</div>\r\n          </label>\r\n\r\n          <label>\r\n            Re-type your new email address:\r\n            <input type=\"email\" formControlName=\"email2\" name=\"email2\">\r\n            <div class=\"form-alert\" *ngIf=\"changeEmailForm.get('email2').hasError('required') && changeEmailForm.controls['email2'].touched\">You must re-type your email address.</div>\r\n      <div class=\"form-alert\" *ngIf=\"changeEmailForm.controls.email2.errors?.emailMismatch\">The email addresses you entered do not match.</div>\r\n          </label>\r\n\r\n          <input type=\"submit\" [disabled]=\"!changeEmailForm.valid\">\r\n\r\n        </form>\r\n\r\n        <form class=\"theme settings-box\" *ngIf=\"displayChangePasswordForm\" [formGroup]=\"changePasswordForm\" (ngSubmit)=\"this.dataService.changePassword(changePasswordForm.value)\">\r\n          <h3>Change your password</h3>\r\n\r\n          <label>\r\n            Enter your current password:\r\n            <input type=\"password\" formControlName=\"oldPassword\" name=\"oldPassword\">\r\n            <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.required && changePasswordForm.controls['password'].touched\">You must enter your current password.</div>\r\n          </label>\r\n\r\n          <label>\r\n            Enter your new password:\r\n            <input type=\"password\" formControlName=\"password\" name=\"password\">\r\n            <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.required && changePasswordForm.controls['password'].touched\">Password is required.</div>\r\n      <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.noSpecialChar\">Your password must have at least one of the following special characters: !@#$%^&*</div>\r\n      <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.allUpperCase\">Your password must have at least one lowercase letter.</div>\r\n      <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.allLowercase\">Your password must have at least one uppercase letter.</div>\r\n      <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.noNumber\">Your password must have at least one number.</div>\r\n      <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password.errors?.minlength\">Your password must be at least 8 characters.</div>\r\n          </label>\r\n\r\n          <label>\r\n            Re-type your new password:\r\n            <input type=\"password\" formControlName=\"password2\" name=\"password2\">\r\n            <div class=\"form-alert\" *ngIf=\"changePasswordForm.get('password2').hasError('required') && changePasswordForm.controls['password2'].touched\">You must re-type your password.</div>\r\n            <div class=\"form-alert\" *ngIf=\"changePasswordForm.controls.password2.errors?.passwordMismatch\">The passwords you entered do not match.</div>\r\n      \r\n          </label>\r\n\r\n          <input type=\"submit\" [disabled]=\"!changePasswordForm.valid\">\r\n        </form>\r\n      </div>\r\n\r\n      <form class=\"theme settings-box\" *ngIf=\"displayDeleteAccountForm\" [formGroup]=\"deleteAccountForm\" (ngSubmit)=\"this.dataService.deleteAccount(deleteAccountForm.value)\">\r\n        <h3>Delete your account</h3>\r\n        <br>\r\n        <p>Warning:</p>\r\n        <p>You are about to delete your account. This is irreversible and all of your data will be lost. To proceed,\r\n          please enter your password.</p>\r\n        <input type=\"password\" formControlName=\"password\" name=\"password\">\r\n        <input type=\"submit\" [disabled]=\"!deleteAccountForm.valid\">\r\n      </form>\r\n\r\n    </div>\r\n\r\n    <div *ngIf=\"displayTradeRequests\" class=\"tab-content\">\r\n      <h3>Trade Requests</h3>\r\n    </div>\r\n\r\n    <div *ngIf=\"displayTradeHistory\" class=\"tab-content\">\r\n      <h3>Trade History</h3>\r\n    </div>\r\n\r\n    <div *ngIf=\"displayActiveTrades\" class=\"tab-content\">\r\n      <h3>Active Trades</h3>\r\n    </div>\r\n  </div>"

/***/ }),

/***/ "./src/app/dashboard/dashboard.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DashboardComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_passwordMatch_validator__ = __webpack_require__("./src/app/validators/passwordMatch.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_emailMatch_validator__ = __webpack_require__("./src/app/validators/emailMatch.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_passwordRequirements_validator__ = __webpack_require__("./src/app/validators/passwordRequirements.validator.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DashboardComponent = /** @class */ (function () {
    function DashboardComponent(dataService, formBuilder) {
        this.dataService = dataService;
        this.formBuilder = formBuilder;
        // UI logic variables
        this.displayEditProfileTab = true;
        this.displayAccountSettingsTab = false;
        this.displayChangeLocationForm = false;
        this.displayChangeEmailForm = false;
        this.displayChangePasswordForm = false;
        this.displayDeleteAccountForm = false;
        this.displayPictureSelector = false;
        this.editBioMode = false;
        this.selectedImgIndex = this.dataService.userData.profile.picture;
        this.selectedImg = this.dataService.profilePics[this.selectedImgIndex];
        this.editProfileForm = formBuilder.group({
            'displayName': [this.dataService.userData.profile['display name'] ? 'Enable' : 'Disable'],
            'displayEmail': [this.dataService.userData.profile['display email'] ? 'Enable' : 'Disable'],
            'bio': [this.dataService.userData.profile.bio],
            'picture': [this.selectedImgIndex]
        });
        this.changeLocationForm = formBuilder.group({
            'newCity': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            'newState': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            'newCountry': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]
        });
        this.changeEmailForm = formBuilder.group({
            'email': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].email
                ])],
            'email2': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].email
                ])],
        }, { validator: __WEBPACK_IMPORTED_MODULE_4__validators_emailMatch_validator__["a" /* emailMatchValidator */] });
        this.changePasswordForm = formBuilder.group({
            'oldPassword': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            'password': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
            'password2': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required]
        }, { validator: [__WEBPACK_IMPORTED_MODULE_3__validators_passwordMatch_validator__["a" /* passwordMatchValidator */], __WEBPACK_IMPORTED_MODULE_5__validators_passwordRequirements_validator__["a" /* passwordRequirementsValidator */]] });
        this.deleteAccountForm = formBuilder.group({
            'password': [null, __WEBPACK_IMPORTED_MODULE_2__angular_forms__["d" /* Validators */].required],
        });
    }
    DashboardComponent.prototype.ngOnInit = function () {
    };
    DashboardComponent.prototype.resetView = function () {
        this.displayPictureSelector = false;
        this.editBioMode = false;
    };
    DashboardComponent.prototype.togglePictureSelector = function () {
        this.displayPictureSelector = !this.displayPictureSelector;
    };
    DashboardComponent.prototype.setPicture = function (index) {
        this.selectedImgIndex = index;
        this.selectedImg = this.dataService.profilePics[index];
        this.editProfileForm.value.picture = index;
    };
    DashboardComponent.prototype.toggleEditBioMode = function () {
        this.editBioMode = !this.editBioMode;
    };
    DashboardComponent.prototype.displayContent = function (tab) {
        this.displayEditProfileTab = false;
        this.displayAccountSettingsTab = false;
        switch (tab) {
            case 'Edit Profile':
                this.displayEditProfileTab = true;
                break;
            case 'Account Settings':
                this.displayAccountSettingsTab = true;
                break;
        }
    };
    DashboardComponent.prototype.displayForm = function (form) {
        switch (form) {
            case 'location':
                this.displayChangeLocationForm = !this.displayChangeLocationForm;
                this.displayChangeEmailForm = false;
                this.displayChangePasswordForm = false;
                this.displayDeleteAccountForm = false;
                break;
            case 'email':
                this.displayChangeEmailForm = !this.displayChangeEmailForm;
                this.displayChangeLocationForm = false;
                this.displayChangePasswordForm = false;
                this.displayDeleteAccountForm = false;
                break;
            case 'password':
                this.displayChangePasswordForm = !this.displayChangePasswordForm;
                this.displayChangeLocationForm = false;
                this.displayChangeEmailForm = false;
                this.displayDeleteAccountForm = false;
                break;
            case 'delete account':
                this.displayChangePasswordForm = false;
                this.displayChangeLocationForm = false;
                this.displayChangeEmailForm = false;
                this.displayDeleteAccountForm = !this.displayDeleteAccountForm;
                break;
        }
    };
    DashboardComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-dashboard',
            template: __webpack_require__("./src/app/dashboard/dashboard.component.html"),
            styles: [__webpack_require__("./src/app/dashboard/dashboard.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormBuilder */]])
    ], DashboardComponent);
    return DashboardComponent;
}());



/***/ }),

/***/ "./src/app/data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jwt_decode__ = __webpack_require__("./node_modules/jwt-decode/lib/index.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_jwt_decode___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_jwt_decode__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var DataService = /** @class */ (function () {
    function DataService(router, http) {
        this.router = router;
        this.http = http;
        // Data storage for user that is currently signed in
        // This data is Used throughout the app.
        this.currentUser = sessionStorage.getItem('currentUser');
        // URL endpoints for requests to server
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        this.registerEndpoint = this.serverEndpoint + '/user/register';
        this.loginEndpoint = this.serverEndpoint + '/user/login';
        this.changeEmailEndpoint = this.serverEndpoint + '/user/email';
        this.changeLocationEndpoint = this.serverEndpoint + '/user/location';
        this.changePasswordEndpoint = this.serverEndpoint + '/user/password';
        this.addGameEndpoint = this.serverEndpoint + '/user/add_game';
        this.deleteGameEndpoint = this.serverEndpoint + '/user/delete_game';
        this.deleteAllEndpoint = this.serverEndpoint + '/user/delete_all';
        // Data storage for error messages returned from the server.
        // This is binded to the registration and login forms.
        this.errorMsg = "";
        this.errorMsgDuration = 5000; // Error messages disappear after this time has elapsed
        // Stores the paths to all profile pictures that users can choose from for their user profiles
        // This must be in a service because it is used in the profile and dashboard components
        this.profilePics = [
            "./assets/profile-pics/kitty.jpg",
            "./assets/profile-pics/puppy.jpg",
            "./assets/profile-pics/halo.jpg",
            "./assets/profile-pics/fallout.jpg",
            "./assets/profile-pics/battlefield.jpg",
            "./assets/profile-pics/masseffect.jpg",
        ];
    }
    // Post request to register new user
    DataService.prototype.register = function (formData) {
        var _this = this;
        this.http.post(this.registerEndpoint, formData).subscribe(function (res) {
            if (!res['success']) {
                console.log(res);
                _this.flashErrorMsg(res['msg']);
            }
            else if (res['success']) {
                _this.router.navigate(['login']);
            }
        });
    };
    // Post request for user login
    DataService.prototype.login = function (formData) {
        var _this = this;
        console.log('login()');
        this.http.post(this.loginEndpoint, formData).subscribe(function (res) {
            if (!res['success']) {
                console.log(res);
                _this.flashErrorMsg(res['msg']);
            }
            else if (res['success']) {
                _this.currentUser = res['token'];
                sessionStorage.setItem('currentUser', res['token']);
                _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(_this.currentUser).user;
                _this.router.navigate(['/']);
            }
        });
    };
    // End user session
    DataService.prototype.logout = function () {
        this.currentUser = '';
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/']);
    };
    // Display error messages on form
    DataService.prototype.flashErrorMsg = function (error) {
        this.errorMsg = error;
        var context = this;
        setTimeout(function () {
            context.errorMsg = "";
            console.log('3 seconds elapsed');
        }, this.errorMsgDuration);
    };
    // -------------------------------------
    //    DASHBOARD ACCOUNT SETTINGS 
    // -------------------------------------
    DataService.prototype.changeEmail = function (formData) {
        var _this = this;
        // Prep data for post request to server
        var token = sessionStorage.getItem('currentUser');
        var data = {
            token: token,
            formData: formData
        };
        // Post request
        this.http.post(this.changeEmailEndpoint, data).subscribe(function (res) {
            var token = res['token'];
            sessionStorage.setItem('currentUser', token);
            _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
        });
    };
    DataService.prototype.changeLocation = function (formData) {
        var _this = this;
        // Prep data for post request
        var token = sessionStorage.getItem('currentUser');
        var data = {
            token: token,
            formData: formData
        };
        // Post request
        this.http.post(this.changeLocationEndpoint, data).subscribe(function (res) {
            var token = res['token'];
            sessionStorage.setItem('currentUser', token);
            _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
        });
    };
    DataService.prototype.changePassword = function (formData) {
        var _this = this;
        // Prep data for post request
        var token = sessionStorage.getItem('currentUser');
        var data = {
            token: token,
            formData: formData
        };
        // Post request
        this.http.post(this.changePasswordEndpoint, data).subscribe(function (res) {
            var token = res['token'];
            console.log('test token', token);
            sessionStorage.setItem('currentUser', token);
            _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
        });
    };
    DataService.prototype.deleteAccount = function (formData) {
        var _this = this;
        // Prep data for post request
        var token = sessionStorage.getItem('currentUser');
        var data = {
            password: formData.password,
            token: token
        };
        // Post request
        this.http.post(this.serverEndpoint + '/user/delete_account', data).subscribe(function (res) {
            if (res['success']) {
                _this.currentUser = '';
                sessionStorage.removeItem('currentUser');
                _this.router.navigate(['/']);
            }
        });
    };
    // -------------------------------------
    //    DASHBOARD EDIT PROFILE 
    // -------------------------------------
    DataService.prototype.editProfile = function (formData) {
        var _this = this;
        // Prep data for post request
        var token = sessionStorage.getItem('currentUser');
        var data = {
            token: token,
            formData: formData
        };
        // Post request
        this.http.post(this.serverEndpoint + '/user/edit_profile', data).subscribe(function (res) {
            if (res['success']) {
                var token_1 = res['token'];
                sessionStorage.setItem('currentUser', token_1);
                _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
            }
        });
    };
    // -------------------------------------
    //    MY GAMES FUNCTIONS 
    // -------------------------------------
    DataService.prototype.addGame = function (game, platform) {
        var _this = this;
        // Prep data for post request
        game.platform = platform;
        var token = this.currentUser;
        var secureData = {
            token: token,
            game: game,
        };
        // Post request
        this.http.post(this.addGameEndpoint, secureData).subscribe(function (res) {
            // TODO: HANDLE ERRORS
            var token = res['token'];
            sessionStorage.setItem('currentUser', token);
            _this.currentUser = res['token'];
            _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
        });
    };
    DataService.prototype.deleteGame = function (game) {
        var _this = this;
        // Prep data for post request
        var token = this.currentUser;
        var secureData = {
            token: token,
            game: game
        };
        // Post request
        this.http.post(this.deleteGameEndpoint, secureData).subscribe(function (res) {
            // TODO: HANDLE ERRORS
            var token = res['token'];
            sessionStorage.setItem('currentUser', token);
            _this.currentUser = res['token'];
            _this.userData = __WEBPACK_IMPORTED_MODULE_1_jwt_decode__(sessionStorage.getItem('currentUser')).user;
        });
    };
    DataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__angular_router__["b" /* Router */], __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], DataService);
    return DataService;
}());



/***/ }),

/***/ "./src/app/games-data.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GamesDataService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var GamesDataService = /** @class */ (function () {
    function GamesDataService(http) {
        this.http = http;
        // Client gets search results form IGDB via proxy through the server to avoid cors issue.
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        this.IGDB_API_KEYWORD_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_keyword_search/';
        this.IDGB_API_GAME_ID_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_game_id_search/';
        this.getCoverEndpoint = this.serverEndpoint + '/user/get_cover_url';
        // Data storage.  This array is binded to my-games component.
        this.searchResults = [];
    }
    // Make get request to server to perform game title search
    GamesDataService.prototype.searchGame = function (searchFormValue) {
        var _this = this;
        this.searchResults = [];
        var query = searchFormValue.query;
        this.http.get(this.IGDB_API_KEYWORD_SEARCH_ENDPOINT + query).subscribe(function (res) {
            //This end point returns a list of game ID's from IGDB pertaining to search query
            var context = _this;
            var searchResults = res;
            // Iterate through each game ID and make get request for each game to get game data
            for (var game in searchResults) {
                var gameId = searchResults[game].id;
                _this.http.get(_this.IDGB_API_GAME_ID_SEARCH_ENDPOINT + gameId).subscribe(function (res) {
                    var title = res[0].name;
                    var cover;
                    if (res[0].cover) {
                        cover = '//images.igdb.com/igdb/image/upload/t_cover_big/' + res[0]['cover']['cloudinary_id'];
                    }
                    else {
                        cover = '/assets/square-placeholder.jpg';
                    }
                    // Prep data to populate searchResults array
                    var game = {
                        title: title,
                        cover: cover
                    };
                    _this.searchResults.push(game);
                });
            }
        });
    };
    // Helper function:  Returns the cover-url for the game that is passed in.
    GamesDataService.prototype.getCoverUrl = function (gameOwner, gameName) {
        this.http.get(this.getCoverEndpoint, {
            params: {
                gameOwner: gameOwner,
                gameName: gameName
            }
        }).subscribe(function (res) {
            console.log(res['cover']);
            return res['cover'];
        });
    };
    GamesDataService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], GamesDataService);
    return GamesDataService;
}());



/***/ }),

/***/ "./src/app/home/home.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.splash-bg {\r\n    height: 100vh;\r\n    width: 100%;\r\n    background: url('/assets/game-controller.jpeg');\r\n    background-attachment: fixed;\r\n    background-size: cover;\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 0;\r\n    -webkit-filter: grayscale(.75);\r\n            filter: grayscale(.75);\r\n}\r\n\r\n.splash-text h1 {\r\n    font-family: 'Orbitron';\r\n    font-size: 3rem;\r\n}\r\n\r\n.splash-text {\r\n    height:100vh;\r\n    width: 100%;\r\n    color: #FFF;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    text-align: center;\r\n    position: fixed;\r\n    top: 0;\r\n    left: 0;\r\n    z-index: 1;\r\n    padding-left: 50px;\r\n}\r\n\r\n#sign-in-link {\r\n    position: absolute;\r\n    top: 20px;\r\n    right: 50px;\r\n    z-index: 2;\r\n}\r\n\r\n#splash {\r\n    height: 400px;\r\n    margin: 100px auto 0 auto;\r\n    width: 100%;\r\n    background: url('/assets/heroes.png');\r\n    background-size: cover;\r\n    background-position: center;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: end;\r\n        -ms-flex-pack: end;\r\n            justify-content: flex-end;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n}\r\n\r\n.splash-blocks-container {\r\n    width: 100%;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n}\r\n\r\n.splash-block1 {\r\n    background: rgba(0, 0, 255, 0.4);\r\n    width: 100%;\r\n    padding: 20px 0;\r\n}\r\n\r\n.splash-block2 {\r\n    width: 50%;\r\n    padding: 5px 0;\r\n    color: #FFF;\r\n    list-style-type: none;\r\n    text-align: center;\r\n}\r\n\r\n.splash-block3 {\r\n    width: 50%;\r\n    padding: 5px 0;\r\n    color: #FFF;\r\n    list-style-type: none;\r\n    text-align: center;\r\n}\r\n\r\n.splash-block2 li,\r\n.splash-block3 li {\r\n    display: inline-block;\r\n    padding: 20px;\r\n    text-transform: uppercase;\r\n    font-size: 1rem;\r\n    font-weight: bold;\r\n}\r\n\r\n.splash-block1 a,\r\n.splash-block1 h1,\r\n.splash-block1 h4 {\r\n    color: yellow;\r\n    margin: 0 auto;\r\n}\r\n\r\n#splash h1 {\r\n    font-family: 'Orbitron';\r\n}\r\n\r\n\r\n"

/***/ }),

/***/ "./src/app/home/home.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\" *ngIf=\"this.dataService.currentUser; else loggedOut\">\r\n\r\n        <div id=\"splash\" *ngIf=\"this.dataService.currentUser\">\r\n                <div class=\"splash-blocks-container\">\r\n                        <div class=\"splash-block1\">\r\n                                <h1>GameTrader</h1>\r\n                                <h4>A freecodecamp project</h4>\r\n                                <h4>Powered by\r\n                                        <a href=\"https://www.igdb.com/\" target=\"_blank\">IGDB API</a>\r\n                                </h4>\r\n                        </div>\r\n                        <ul class=\"splash-block2\">\r\n                                <li>HTML</li>\r\n                                <li>CSS</li>\r\n                                <li>JavaScript</li>\r\n                                <li>TypeScript</li>\r\n                        </ul>\r\n                        <ul class=\"splash-block3\">\r\n                                <li>MongoDB</li>\r\n                                <li>ExpressJS</li>\r\n                                <li>Angular</li>\r\n                                <li>NodeJS</li>\r\n                        </ul>\r\n                </div>\r\n        </div>\r\n        <div *ngIf=\"this.homeGames.length > 0; else noHomeGames\" class=\"game-grid\">\r\n                <div *ngFor=\"let game of this.homeGames\">\r\n                        <div class=\"game-card\" *ngIf=\"game.available\">\r\n                                <div class=\"game-card-img-container\">\r\n                                        <img src=\"{{game.cover}}\">\r\n                                </div>\r\n                                <div class=\"game-card-p-container\">\r\n                                        <p>{{game.title}}</p>\r\n                                        <p>{{game.platform}}</p>\r\n                                        <a [routerLink]=\"['/profile', game.owner]\">{{game.owner}}</a>\r\n                                </div>\r\n                                <p class=\"game-card-status\" *ngIf=\"this.tradeService.alreadyRequested(game)\">Request pending</p>\r\n                                <button *ngIf=\"dataService.currentUser && !this.tradeService.alreadyRequested(game)\" (click)=\" this.tradeService.getTradeData(); this.tradeService.requestTrade(this.dataService.userData.username, game)\">Request Trade</button>\r\n                        </div>\r\n                </div>\r\n        </div>\r\n\r\n        <ng-template #noHomeGames>\r\n                <p class=\"content-description\">There are no games to display.</p>\r\n        </ng-template>\r\n</div>\r\n\r\n\r\n<ng-template #loggedOut>\r\n        <div class=\"splash-bg\">\r\n        </div>\r\n        <div class=\"splash-text\">\r\n                <h1>GameTrader</h1>\r\n                <h2>A club for gamers.</h2>\r\n                <h2>Trade console games with other gamers in your city.</h2>\r\n                <button id=\"sign-up-link\" routerLink=\"register\">Sign up for free!</button>\r\n        </div>\r\n\r\n        <!-- TOP RIGHT CORNER OF SCREEN -->\r\n        <button id=\"sign-in-link\" routerLink=\"login\">Sign in</button>\r\n</ng-template>"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__trade_service__ = __webpack_require__("./src/app/trade.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var HomeComponent = /** @class */ (function () {
    function HomeComponent(formBuilder, http, dataService, tradeService) {
        this.formBuilder = formBuilder;
        this.http = http;
        this.dataService = dataService;
        this.tradeService = tradeService;
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        this.getAllEndPoint = this.serverEndpoint + '/games/get_all';
        this.searchForm = formBuilder.group({
            query: [null, __WEBPACK_IMPORTED_MODULE_4__angular_forms__["d" /* Validators */].required]
        });
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.refreshGames();
    };
    HomeComponent.prototype.refreshGames = function () {
        var _this = this;
        this.http.get(this.getAllEndPoint).subscribe(function (res) {
            _this.homeGames = res;
        });
    };
    HomeComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-home',
            template: __webpack_require__("./src/app/home/home.component.html"),
            styles: [__webpack_require__("./src/app/home/home.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_4__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_3__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__trade_service__["a" /* TradeService */]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.css":
/***/ (function(module, exports) {

module.exports = ".login-form {\r\n    max-width: 400px;\r\n}"

/***/ }),

/***/ "./src/app/login/login.component.html":
/***/ (function(module, exports) {

module.exports = "<a id=\"logo-black\" routerLink=\"/\">GameTrader</a>\r\n\r\n  <div class=\"container\">\r\n  <h1 class=\"component-title\">Sign In</h1>\r\n  <form class=\"login-form theme\" [formGroup]=\"loginForm\" (ngSubmit)=\"this.dataService.login(loginForm.value)\">\r\n      <label>Name\r\n        <input type=\"text\" formControlName=\"username\" name=\"username\">\r\n      </label>\r\n      <div class=\"form-alert\" *ngIf=\"!loginForm.controls['username'].valid && loginForm.controls['username'].touched\">Username is required.</div>\r\n\r\n      <label>Password\r\n        <input type=\"password\" formControlName=\"password\" name=\"password\">\r\n      </label>\r\n      <div class=\"form-alert\" *ngIf=\"!loginForm.controls['password'].valid && loginForm.controls['password'].touched\">Password is required.</div>\r\n\r\n\r\n      <input type=\"submit\" class=\"button expanded\" value=\"Submit\" [disabled]=\"!loginForm.valid\">\r\n      <div class=\"form-alert\" *ngIf=\"this.dataService.errorMsg\">{{this.dataService.errorMsg}}</div>\r\n</form>\r\n</div>\r\n\r\n"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, dataService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.loginForm = formBuilder.group({
            'username': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'password': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required]
        });
    }
    LoginComponent.prototype.ngOnInit = function () {
    };
    LoginComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-login',
            template: __webpack_require__("./src/app/login/login.component.html"),
            styles: [__webpack_require__("./src/app/login/login.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/my-games/my-games.component.css":
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ "./src/app/my-games/my-games.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n    <ul class=\"tab-menu\">\r\n        <li>\r\n            <a (click)=\"displayContent('My Games')\">My Games</a>\r\n        </li>\r\n        <li>\r\n            <a (click)=\"displayContent('Add Games')\">Add Games</a>\r\n        </li>\r\n    </ul>\r\n\r\n    <div *ngIf=\"displayMyGames\" class=\"tab-content\">\r\n        <h3 class=\"component-title\">My Games</h3>\r\n        <p class=\"content-description\">*Games that you add here will be displayed publicly as available for trade.</p>\r\n        <div class=\"game-grid\">\r\n            <div class=\"game-card\" *ngFor=\"let game of this.dataService.userData.games\">\r\n                <div class=\"game-card-img-container\">\r\n                    <img src=\"{{game.cover}}\"> </div>\r\n                <div class=\"game-card-p-container\">\r\n                    <p>{{game.title}}</p>\r\n                    <p>{{game.platform}}</p>\r\n                </div>\r\n\r\n                <button (click)=\"this.dataService.deleteGame(game)\">Delete</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n    <div *ngIf=\"displayAddGames\" class=\"tab-content\">\r\n        <h3 class=\"component-title\">Add Games</h3>\r\n        <form [formGroup]=\"searchForm\" (ngSubmit)=\"this.gamesDataService.searchGame(searchForm.value)\">\r\n            <div class=\"search-bar\">\r\n                <input type=\"text\" formControlName=\"query\" name=\"query\" placeholder=\"Search for a game title...\">\r\n                <input type=\"submit\" value=\"Search\" [disabled]=\"!searchForm.valid\">\r\n            </div>\r\n        </form>\r\n\r\n        <div class=\"game-grid\">\r\n            <div class=\"game-card\" *ngFor=\"let game of this.gamesDataService.searchResults\">\r\n                <div class=\"game-card-img-container\">\r\n                    <img src={{game.cover}}>\r\n                </div>\r\n                <div class=\"game-card-p-container\">\r\n                    <p>{{game.title}}</p>\r\n                    <select [(ngModel)]=\"selectedOption\">\r\n                        <option>Select a platform</option>\r\n                        <option value=\"PlayStation 2\">PlayStation 2</option>\r\n                        <option value=\"PlayStation 3\">PlayStation 3</option>\r\n                        <option value=\"PlayStation 4\">PlayStation 4</option>\r\n                        <option value=\"PC\">PC</option>\r\n                        <option value=\"Wii\">Wii</option>\r\n                        <option value=\"Wii U\">Wii U</option>\r\n                        <option value=\"X Box One\">X Box One</option>\r\n                        <option value=\"X Box 360\">X Box 360</option>\r\n                        <option value=\"X Box\">X Box</option>\r\n                    </select>\r\n                </div>\r\n\r\n                <button (click)=\"this.dataService.addGame(game, selectedOption)\" [disabled]=\"!selectedOption\">Add Game</button>\r\n            </div>\r\n        </div>\r\n    </div>\r\n\r\n\r\n</div>"

/***/ }),

/***/ "./src/app/my-games/my-games.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyGamesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__games_data_service__ = __webpack_require__("./src/app/games-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var MyGamesComponent = /** @class */ (function () {
    function MyGamesComponent(dataService, gamesDataService, formBuilder) {
        this.dataService = dataService;
        this.gamesDataService = gamesDataService;
        this.formBuilder = formBuilder;
        this.displayMyGames = true; //Default view on load
        this.displayAddGames = false;
        this.searchForm = formBuilder.group({
            'query': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required]
        });
    }
    MyGamesComponent.prototype.ngOnInit = function () {
    };
    MyGamesComponent.prototype.ngOnDestroy = function () {
        this.gamesDataService.searchResults = [];
    };
    MyGamesComponent.prototype.displayContent = function (tabName) {
        switch (tabName) {
            case 'My Games':
                this.displayMyGames = true;
                this.displayAddGames = false;
                break;
            case 'Add Games':
                this.displayMyGames = false;
                this.displayAddGames = true;
                break;
        }
    };
    MyGamesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-my-games',
            template: __webpack_require__("./src/app/my-games/my-games.component.html"),
            styles: [__webpack_require__("./src/app/my-games/my-games.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_2__games_data_service__["a" /* GamesDataService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */]])
    ], MyGamesComponent);
    return MyGamesComponent;
}());



/***/ }),

/***/ "./src/app/my-trades/my-trades.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.trade-request-placeholder {\r\n    -webkit-box-sizing: border-box;\r\n            box-sizing: border-box;\r\n    border: 5px gray dashed;\r\n    height: 100%;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: center;\r\n        -ms-flex-align: center;\r\n            align-items: center;\r\n    font-size: 0.8rem;\r\n    text-align: center;\r\n    padding: 25px;\r\n    line-height: 1.2rem;\r\n}\r\n\r\ntable {\r\n    padding: 0;\r\n    margin: 20px auto;\r\n    color: #FFF;\r\n    border-spacing: 0;\r\n}\r\n\r\ntable td,\r\ntable th {\r\n    padding: 15px;\r\n}\r\n\r\ntable tr td:nth-child(1){\r\n    width: 250px;\r\n    text-align: center;\r\n}\r\n\r\ntable tr td:nth-child(2){\r\n    text-align: left;\r\n    line-height: 1.5;\r\n}\r\n\r\ntable tr:nth-child(odd) {\r\n    background: rgb(35, 35, 35);\r\n}\r\n\r\ntable tr:nth-child(even) {\r\n    background: rgb(25, 25, 25);\r\n}\r\n\r\n"

/***/ }),

/***/ "./src/app/my-trades/my-trades.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"container\">\r\n  <ul class=\"tab-menu\">\r\n    <li>\r\n      <a id=\"incoming-tab\" (click)=\"this.tradeService.getTradeData(); displayContent('Incoming Trade Requests')\">Incoming Trade Requests ({{this.tradeService.incoming.length}})</a>\r\n    </li>\r\n    <li>\r\n      <a id=\"outgoing-tab\" (click)=\"this.tradeService.getTradeData(); displayContent('Outgoing Trade Requests')\">Outgoing Trade Requests ({{this.tradeService.outgoing.length}})</a>\r\n    </li>\r\n    <li>\r\n      <a id=\"active-tab\" (click)=\"this.tradeService.getTradeData(); displayContent('Active Trades')\">Active Trades ({{this.tradeService.active.length}})</a>\r\n    </li>\r\n    <li>\r\n      <a id=\"history-tab\" (click)=\"this.tradeService.getTradeData(); displayContent('Trade History')\">Trade History</a>\r\n    </li>\r\n  </ul>\r\n\r\n  <div *ngIf=\"displayIncomingTradeRequests\" class=\"tab-content\">\r\n    <h3>Incoming Trade Requests</h3>\r\n\r\n    <div *ngIf=\"this.tradeService.incoming.length > 0; else noIncoming\" class=\"trades-container\">\r\n      <div class=\"trade-card theme\" *ngFor=\"let tradeRequest of this.tradeService.incoming\">\r\n        <h4 class=\"game-card-date\">{{tradeRequest.date | date:'fullDate'}}</h4>\r\n        <p>\r\n          <a [routerLink]=\"['/profile', tradeRequest.initiator]\">{{tradeRequest.initiator}}</a> has requested to trade with you.</p>\r\n\r\n        <div class=\"trade-match\">\r\n          <div class=\"game-card\">\r\n            <div class=\"game-card-img-container\">\r\n              <img src=\"{{tradeRequest.game.cover}}\">\r\n            </div>\r\n            <div class=\"game-card-p-container\">\r\n              <p>{{tradeRequest.game.title}}</p>\r\n              <p>{{tradeRequest.game.platform}}</p>\r\n              <a [routerLink]=\"['/profile', tradeRequest.game.owner]\">{{tradeRequest.game.owner}}</a>\r\n            </div>\r\n            <p class=\"game-card-status\" *ngIf=\"this.tradeService.alreadyRequested(tradeRequest.game)\">Request pending</p>\r\n          </div>\r\n\r\n          <div *ngIf=\"tradeRequest.game2; else noGame2\" class=\"game-card\">\r\n            <div class=\"game-card-img-container\">\r\n              <img src=\"{{tradeRequest.game2.cover}}\">\r\n            </div>\r\n            <div class=\"game-card-p-container\">\r\n              <p>{{tradeRequest.game2.title}}</p>\r\n              <p>{{tradeRequest.game2.platform}}</p>\r\n              <p>{{tradeRequest.game2.owner}}</p>\r\n            </div>\r\n            <button (click)=\"displayContent('Game Selector'); openSelectGameWindow(tradeRequest)\">Change Selection</button>\r\n          </div>\r\n\r\n          <ng-template #noGame2>\r\n            <div class=\"game-card\">\r\n              <div class=\"trade-request-placeholder\">\r\n                <a (click)=\"displayContent('Game Selector'); openSelectGameWindow(tradeRequest)\">\r\n                  Select a game from {{tradeRequest.initiator}} to complete this trade.\r\n                </a>\r\n              </div>\r\n              <button (click)=\"displayContent('Game Selector'); openSelectGameWindow(tradeRequest)\">Select Game</button>\r\n            </div>\r\n          </ng-template>\r\n        </div>\r\n\r\n        <div>\r\n          <button (click)=\"this.tradeService.acceptTradeRequest(tradeRequest)\" [disabled]=\"!tradeRequest.game2\">Accept</button>\r\n          <button (click)=\"this.tradeService.denyTradeRequest(tradeRequest)\">Deny</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-template #noIncoming>\r\n      <p class=\"content-description\">You have no incoming trade requests at this time.</p>\r\n    </ng-template>\r\n  </div>\r\n\r\n  <div *ngIf=\"displayOutgoingTradeRequests\" class=\"tab-content\">\r\n    <h3>Outgoing Trade Requests</h3>\r\n\r\n    <div *ngIf=\"this.tradeService.outgoing.length > 0; else noOutgoing\" class=\"trades-container\">\r\n      <div class=\"trade-card theme\" *ngFor=\"let tradeRequest of this.tradeService.outgoing\">\r\n        <h4 class=\"game-card-date\">{{tradeRequest.date | date:'fullDate'}}</h4>\r\n        <div class=\"game-card\">\r\n          <div class=\"game-card-img-container\">\r\n            <img src=\"{{tradeRequest.game.cover}}\">\r\n          </div>\r\n          <div class=\"game-card-p-container\">\r\n            <p>{{tradeRequest.game.title}}</p>\r\n            <p>{{tradeRequest.game.platform}}</p>\r\n            <a [routerLink]=\"['/profile', tradeRequest.game.owner]\">{{tradeRequest.game.owner}}</a>\r\n          </div>\r\n          <button (click)=\"this.tradeService.cancelTradeRequest(tradeRequest)\">Cancel</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-template #noOutgoing>\r\n      <p class=\"content-description\">You have no outgoing trade requests at this time.</p>\r\n    </ng-template>\r\n  </div>\r\n\r\n  <div *ngIf=\"displayActiveTrades\" class=\"tab-content\">\r\n    <h3>Active Trades</h3>\r\n\r\n\r\n    <div *ngIf=\"this.tradeService.active.length > 0; else noActive\" class=\"trades-container\">\r\n      <div class=\"trade-card theme\" *ngFor=\"let trade of this.tradeService.active;\">\r\n        <h4 class=\"game-card-date\">{{trade.date | date:'fullDate'}}</h4>\r\n        <div class=\"trade-match\">\r\n          <div class=\"game-card\">\r\n            <div class=\"game-card-img-container\">\r\n              <img src=\"{{trade.game.cover}}\">\r\n            </div>\r\n            <div class=\"game-card-p-container\">\r\n              <p>{{trade.game.title}}</p>\r\n              <p>{{trade.game.platform}}</p>\r\n              <a [routerLink]=\"['/profile', trade.game.owner]\">{{trade.game.owner}}</a>\r\n            </div>\r\n\r\n            <button *ngIf=\"trade.game.owner === this.dataService.userData.username && !trade.gameReturned\" (click)=\"this.tradeService.markReturned(trade.date, 'game')\">\r\n              Mark as returned\r\n            </button>\r\n            <p class=\"game-card-status\" *ngIf=\"trade.gameReturned\">RETURNED</p>\r\n          </div>\r\n\r\n          <div class=\"game-card\">\r\n            <div class=\"game-card-img-container\">\r\n              <img src=\"{{trade.game2.cover}}\">\r\n            </div>\r\n            <div class=\"game-card-p-container\">\r\n\r\n              <p>{{trade.game2.title}}</p>\r\n              <p>{{trade.game2.platform}}</p>\r\n              <a [routerLink]=\"['/profile', trade.game2.owner]\">{{trade.game2.owner}}</a>\r\n            </div>\r\n            <button *ngIf=\"trade.game2.owner === this.dataService.userData.username && !trade.game2Returned\" (click)=\"this.tradeService.markReturned(trade.date, 'game2')\">\r\n              Mark as returned\r\n            </button>\r\n            <p class=\"game-card-status\" *ngIf=\"trade.game2Returned\">RETURNED</p>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-template #noActive>\r\n      <p class=\"content-description\">You have no active trades at this time.</p>\r\n    </ng-template>\r\n  </div>\r\n\r\n\r\n  <div *ngIf=\"displayTradeHistory\" class=\"tab-content\">\r\n\r\n\r\n    <h3>Trade History</h3>\r\n\r\n\r\n    <div *ngIf=\"this.tradeService.history.length > 0; else noHistory\">\r\n      <table class=\"theme\">\r\n        <tr>\r\n          <th>\r\n            <p>Date</p>\r\n          </th>\r\n          <th>\r\n            <p>Activity</p>\r\n          </th>\r\n        </tr>\r\n        <tr *ngFor=\"let record of this.tradeService.history?.reverse()\">\r\n\r\n          <td>\r\n            <p>\r\n              {{record.date | date:'fullDate'}}\r\n            </p>\r\n          </td>\r\n          <td>\r\n            <p>\r\n              {{record.msg}}\r\n            </p>\r\n          </td>\r\n        </tr>\r\n      </table>\r\n      <p>\r\n        {{record.date | date:'fullDate'}} {{record.msg}}\r\n      </p>\r\n    </div>\r\n\r\n    <ng-template #noHistory>\r\n      <p class=\"content-description\">There is no trade history to display.</p>\r\n    </ng-template>\r\n\r\n  </div>\r\n\r\n  <div *ngIf=\"this.displayGameSelector\" class=\"tab-content\">\r\n    <h4>Choose a game from {{selectGameWindowInitiator}} to complete this trade:</h4>\r\n    <button (click)=\"closeSelectGameWindow()\">Cancel</button>\r\n    <div *ngIf=\"selectGameWindowGames.length > 0; else noAvailableGames\">\r\n\r\n      <div class=\"game-grid\">\r\n        <div class=\"game-card\" *ngFor=\"let game of selectGameWindowGames\">\r\n          <div class=\"game-card-img-container\">\r\n            <img src=\"{{game.cover}}\">\r\n          </div>\r\n          <div class=\"game-card-p-container\">\r\n            <p>{{game.title}}</p>\r\n            <p>{{game.platform}}</p>\r\n            <a [routerLink]=\"['/profile', game.owner]\">{{game.owner}}</a>\r\n          </div>\r\n          <button (click)=\"selectGame(game)\">Select Game</button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <ng-template #noAvailableGames>\r\n      <p class=\"content-description\">{{selectGameWindowInitiator}} currently does not have any games available for trade. Please try again at a later date.</p>\r\n    </ng-template>\r\n  </div>"

/***/ }),

/***/ "./src/app/my-trades/my-trades.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return MyTradesComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__trade_service__ = __webpack_require__("./src/app/trade.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__games_data_service__ = __webpack_require__("./src/app/games-data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var MyTradesComponent = /** @class */ (function () {
    function MyTradesComponent(gamesDataService, dataService, http, tradeService) {
        this.gamesDataService = gamesDataService;
        this.dataService = dataService;
        this.http = http;
        this.tradeService = tradeService;
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        // UI logic variables
        this.displayIncomingTradeRequests = true; // set to true to display on load
        this.displayOutgoingTradeRequests = false;
        this.displayTradeHistory = false;
        this.displayActiveTrades = false;
        this.displaySelectGameWindow = false;
        this.displayGameSelector = false;
        // Data storage for select-game window
        this.selectGameWindowGames = [];
        this.selectGameWindowInitiator = '';
        this.initiator = '';
        this.initiatorGames = [];
    }
    MyTradesComponent.prototype.ngOnInit = function () {
        this.tradeService.getTradeData();
    };
    // Get data to populate select-game window
    MyTradesComponent.prototype.selectGameWindow = function (tradeRequest) {
        var _this = this;
        this.displaySelectGameWindow = true;
        this.initiator = tradeRequest.initiator;
        this.tradeRequest = tradeRequest;
        var getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + tradeRequest.initiator;
        this.http.get(getProfileDataEndpoint).subscribe(function (res) {
            _this.initiatorGames = res['games'];
        });
    };
    MyTradesComponent.prototype.selectGame = function (game) {
        var _this = this;
        var secureData = {
            token: this.dataService.currentUser,
            game: game,
            tradeRequest: this.selectGameWindowTradeRequest
        };
        //Add game as game2 to this traderequest in gameOwner's incoming array
        var selectGameForTradeEndpoint = this.serverEndpoint + '/user/select_game_for_trade';
        this.http.post(selectGameForTradeEndpoint, secureData).subscribe(function (res) {
            _this.tradeService.getTradeData();
            _this.closeSelectGameWindow();
        });
    };
    MyTradesComponent.prototype.openSelectGameWindow = function (tradeRequest) {
        var _this = this;
        this.selectGameWindowGames = [];
        this.selectGameWindowInitiator = '';
        this.selectGameWindowTradeRequest = tradeRequest;
        this.displaySelectGameWindow = true;
        var initiator = tradeRequest.initiator;
        var getAllGamesEndpoint = this.serverEndpoint + '/games/get_all/';
        this.http.get(getAllGamesEndpoint).subscribe(function (res) {
            for (var game in res) {
                if (res[game]['owner'] === initiator && !_this.tradeService.alreadyRequested(res[game]) && res[game].available) {
                    _this.selectGameWindowGames.push(res[game]);
                }
            }
            _this.selectGameWindowInitiator = initiator;
        });
    };
    MyTradesComponent.prototype.closeSelectGameWindow = function () {
        this.displayGameSelector = false;
        this.displayIncomingTradeRequests = true;
    };
    MyTradesComponent.prototype.displayContent = function (tab) {
        this.displayIncomingTradeRequests = false;
        this.displayOutgoingTradeRequests = false;
        this.displayTradeHistory = false;
        this.displayActiveTrades = false;
        this.displayGameSelector = false;
        switch (tab) {
            case 'Incoming Trade Requests':
                this.displayIncomingTradeRequests = true;
                break;
            case 'Outgoing Trade Requests':
                this.displayOutgoingTradeRequests = true;
                break;
            case 'Trade History':
                this.displayTradeHistory = true;
                break;
            case 'Active Trades':
                this.displayActiveTrades = true;
                break;
            case 'Game Selector':
                this.displayGameSelector = true;
                break;
        }
    };
    MyTradesComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-my-trades',
            template: __webpack_require__("./src/app/my-trades/my-trades.component.html"),
            styles: [__webpack_require__("./src/app/my-trades/my-trades.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__games_data_service__["a" /* GamesDataService */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_4__angular_common_http__["a" /* HttpClient */], __WEBPACK_IMPORTED_MODULE_1__trade_service__["a" /* TradeService */]])
    ], MyTradesComponent);
    return MyTradesComponent;
}());



/***/ }),

/***/ "./src/app/profile/profile.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n\r\n\r\n.profile-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    max-width: 1200px;\r\n    min-height: 100vh;\r\n    margin: 0 auto;\r\n    padding: 100px 0;\r\n    -webkit-box-pack: center;\r\n        -ms-flex-pack: center;\r\n            justify-content: center;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    /* box-shadow: 2px 2px 5px rgb(75, 75, 75);\r\n    background: rgb(255, 255, 255); */\r\n}\r\n\r\n.profile-column {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: vertical;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: column;\r\n            flex-direction: column;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n}\r\n\r\n.profile-column:nth-child(2){\r\n    min-width: 700px;\r\n}\r\n\r\n.gamer-card{\r\n    width: 200px;\r\n    height: auto;\r\n    padding: 25px;\r\n    margin: 0 50px 25px 50px;\r\n}\r\n\r\n.review-container {\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -webkit-box-orient: horizontal;\r\n    -webkit-box-direction: normal;\r\n        -ms-flex-direction: row;\r\n            flex-direction: row;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\r\n    -webkit-box-pack: start;\r\n        -ms-flex-pack: start;\r\n            justify-content: flex-start;\r\n    -webkit-box-align: start;\r\n        -ms-flex-align: start;\r\n            align-items: flex-start;\r\n    overflow: auto;\r\n    width: 100%;\r\n    max-height: 350px;\r\n\r\n}\r\n\r\n.review-card {\r\n    background: rgb(83, 83, 83);\r\n    color: #FFF;\r\n    -webkit-box-shadow: 2px 2px 5px rgb(75, 75, 75);\r\n            box-shadow: 2px 2px 5px rgb(75, 75, 75);\r\n    margin: 10px auto;\r\n    padding: 10px;\r\n    width: 200px;\r\n    font-size: 0.8rem;\r\n}\r\n\r\n.review-card a {\r\n    color:#FFF;\r\n}\r\n\r\n.review-card a:hover {\r\n    color: silver;\r\n}\r\n\r\n.review-form {\r\n    width: 90%;\r\n    height: 200px;\r\n    margin: auto;\r\n    padding: 0;\r\n}\r\n\r\n.review-form textarea {\r\n    width: 100%;\r\n    height: 100%;\r\n    padding: 10px;\r\n}\r\n"

/***/ }),

/***/ "./src/app/profile/profile.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"profile-container flex-row\">\r\n  <div class=\"profile-column\">\r\n    <div class=\"gamer-card theme\">\r\n      <img class=\"profile-img\" src=\"{{this.dataService.profilePics[profileData.profile.picture]}}\">\r\n      <h3>{{username}}</h3>\r\n      <h4 *ngIf=\"profileData.profile['display name']\">{{profileData.first}} {{profileData.last}}</h4>\r\n      <h4 *ngIf=\"profileData.profile['display email']\">{{profileData.email}}</h4>\r\n      <h4>{{profileData.city}}, {{profileData.state}}</h4>\r\n\r\n      <h4>{{profileData.country}}</h4>\r\n      <br>\r\n      <p>{{profileData.profile.bio}}</p>\r\n    </div>\r\n    <div class=\"gamer-card theme\">\r\n\r\n      <p>Leave a review:</p>\r\n      <form class=\"review-form\" *ngIf=\"this.dataService.currentUser\" [formGroup]=\"reviewForm\" (ngSubmit)=\"postReview(username, reviewForm.value)\">\r\n        <textarea name=\"reviewBody\" formControlName=\"reviewBody\" name=\"reviewBody\">\r\n    </textarea>\r\n        <input type=\"submit\" value=\"Submit\" [disabled]=\"!reviewForm.valid\">\r\n      </form>\r\n    </div>\r\n  </div>\r\n  <div class=\"profile-column\">\r\n    <h3>My Reviews:</h3>\r\n\r\n    <div *ngIf=\"profileData.profile.reviews.length > 0; else noReviews\" class=\"review-container\">\r\n      <div class=\"review-card\" *ngFor=\"let review of profileData.profile.reviews?.reverse()\">\r\n        <p>{{review.body}}</p>\r\n        <br>\r\n        <p>{{review.date | date:'fullDate'}}</p>\r\n        <p>Posted by:\r\n          <a [routerLink]=\"['/profile', review.reviewer]\">{{review.reviewer}}</a>\r\n        </p>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-template #noReviews>\r\n      <p class=\"content-description\">There are no reviews for this user.</p>\r\n    </ng-template>\r\n\r\n    <br>\r\n\r\n    <h3>My Games:</h3>\r\n\r\n    <div *ngIf=\"profileData.games.length > 0; else noGames\" class=\"game-grid\">\r\n      <div *ngFor=\"let game of profileData.games\" class=\"game-card\">\r\n        <div class=\"game-card-img-container\">\r\n          <img src=\"{{game.cover}}\">\r\n        </div>\r\n        <div class=\"game-card-p-container\">\r\n          <p>{{game.title}}</p>\r\n          <p>{{game.platform}}</p>\r\n        </div>\r\n\r\n        <div *ngIf=\"this.isAvailable(game); else gameUnavailable\">\r\n          <button *ngIf=\"!this.tradeService.alreadyRequested(game); else alreadyRequested\" (click)=\"this.tradeService.requestTrade(this.dataService.userData.username, game)\">Request Trade</button>\r\n          <ng-template #alreadyRequested>\r\n            <p class=\"game-card-status\">Request Pending</p>\r\n          </ng-template>\r\n        </div>\r\n        <ng-template #gameUnavailable>\r\n          <p class=\"game-card-status\">Unavailable</p>\r\n        </ng-template>\r\n      </div>\r\n    </div>\r\n\r\n    <ng-template #noGames>\r\n      <p class=\"content-description\">There are no games for this user.</p>\r\n    </ng-template>\r\n\r\n  </div>\r\n</div>"

/***/ }),

/***/ "./src/app/profile/profile.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ProfileComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__("./node_modules/@angular/router/esm5/router.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__trade_service__ = __webpack_require__("./src/app/trade.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var ProfileComponent = /** @class */ (function () {
    function ProfileComponent(formBuilder, tradeService, dataService, route, http) {
        this.formBuilder = formBuilder;
        this.tradeService = tradeService;
        this.dataService = dataService;
        this.route = route;
        this.http = http;
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        this.reviewForm = formBuilder.group({
            'reviewBody': ['Leave a review', __WEBPACK_IMPORTED_MODULE_5__angular_forms__["d" /* Validators */].required]
        });
    }
    ProfileComponent.prototype.ngOnInit = function () {
        var _this = this;
        // Get profile data for username in params
        this.sub = this.route.params.subscribe(function (params) {
            _this.username = params.username;
            var getProfileDataEndpoint = _this.serverEndpoint + '/user/profile/' + _this.username;
            _this.http.get(getProfileDataEndpoint).subscribe(function (res) {
                _this.profileData = res;
            });
        });
    };
    // Returns true if the game that is passed in is not present in profileData active trades
    ProfileComponent.prototype.isAvailable = function (game) {
        var checkId = game._id;
        for (var i = 0; i < this.profileData['active'].length; i++) {
            var gameId = this.profileData['active'][i].game._id;
            var game2Id = this.profileData['active'][i].game2._id;
            if (checkId === gameId || checkId === game2Id) {
                return false;
            }
        }
        return true;
    };
    ProfileComponent.prototype.postReview = function (profile, formData) {
        var _this = this;
        // Prep data for post request
        var token = sessionStorage.getItem('currentUser');
        var data = {
            token: token,
            formData: formData
        };
        data.formData.profile = profile;
        // Post request
        this.http.post(this.serverEndpoint + '/user/post_review', data).subscribe(function (res) {
            // Refresh
            _this.ngOnInit();
        });
    };
    ProfileComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-profile',
            template: __webpack_require__("./src/app/profile/profile.component.html"),
            styles: [__webpack_require__("./src/app/profile/profile.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_5__angular_forms__["a" /* FormBuilder */],
            __WEBPACK_IMPORTED_MODULE_4__trade_service__["a" /* TradeService */],
            __WEBPACK_IMPORTED_MODULE_3__data_service__["a" /* DataService */],
            __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* ActivatedRoute */],
            __WEBPACK_IMPORTED_MODULE_2__angular_common_http__["a" /* HttpClient */]])
    ], ProfileComponent);
    return ProfileComponent;
}());



/***/ }),

/***/ "./src/app/register/register.component.css":
/***/ (function(module, exports) {

module.exports = "\r\n.registration-form-contents{\r\n    width: 100%;\r\n    display: -webkit-box;\r\n    display: -ms-flexbox;\r\n    display: flex;\r\n    -ms-flex-wrap: wrap;\r\n        flex-wrap: wrap;\r\n    margin: 20px auto;\r\n}\r\n\r\n.registration-form-contents label {\r\n    width: 300px;\r\n}"

/***/ }),

/***/ "./src/app/register/register.component.html":
/***/ (function(module, exports) {

module.exports = "<a id=\"logo-black\" routerLink=\"/\">GameTrader</a>\r\n\r\n<div class=\"container\">\r\n<h1 class=\"component-title\">Sign Up</h1>\r\n  <form class=\"theme\" [formGroup]=\"registrationForm\" (ngSubmit)=\"this.dataService.register(registrationForm.value)\">\r\n\r\n    <div class=\"registration-form-contents\">\r\n    <label>First name:\r\n      <input type=\"text\" formControlName=\"first\" name=\"first\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['first'].valid && registrationForm.controls['first'].touched\">First name is required.</div>\r\n    </label>\r\n\r\n    <label>Last name:\r\n      <input type=\"text\" formControlName=\"last\" name=\"last\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['last'].valid && registrationForm.controls['last'].touched\">Last name is required.</div>\r\n    </label>\r\n\r\n    <label>Username:\r\n      <input type=\"text\" formControlName=\"username\" name=\"username\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['username'].valid && registrationForm.controls['username'].touched\">Username is required.</div>\r\n    </label>\r\n\r\n    <label>City:\r\n      <input type=\"text\" formControlName=\"city\" name=\"city\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['city'].valid && registrationForm.controls['city'].touched\">City is required.</div>\r\n    </label>\r\n\r\n    <label>State:\r\n      <input type=\"text\" formControlName=\"state\" name=\"state\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['state'].valid && registrationForm.controls['state'].touched\">State is required.</div>\r\n    </label>\r\n\r\n    <label>Country:\r\n      <input type=\"text\" formControlName=\"country\" name=\"country\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['country'].valid && registrationForm.controls['country'].touched\">Country is required.</div>\r\n    </label>\r\n\r\n    <label>Email Address:\r\n      <input type=\"email\" formControlName=\"email\" name=\"email\">\r\n      <div class=\"form-alert\" *ngIf=\"!registrationForm.controls['email'].valid && registrationForm.controls['email'].touched\">You must enter a valid email address.</div>\r\n    </label>\r\n\r\n    <label>Re-type Email Address:\r\n      <input type=\"email\" formControlName=\"email2\" name=\"email2\">\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.get('email2').hasError('required') && registrationForm.controls['email2'].touched\">You must re-type your email address.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.email2.errors?.emailMismatch\">The email addresses you entered do not match.</div>\r\n    </label>\r\n\r\n    <label>Password: \r\n      <input type=\"password\" formControlName=\"password\" name=\"password\">\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.required && registrationForm.controls['password'].touched\">Password is required.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.noSpecialChar\">Your password must have at least one of the following special characters: !@#$%^&*</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.allUpperCase\">Your password must have at least one lowercase letter.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.allLowercase\">Your password must have at least one uppercase letter.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.noNumber\">Your password must have at least one number.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password.errors?.minlength\">Your password must be at least 8 characters.</div>\r\n    </label>\r\n\r\n    <label>Re-type Password:\r\n      <input type=\"password\" formControlName=\"password2\" name=\"password2\">\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.get('password2').hasError('required') && registrationForm.controls['password2'].touched\">You must re-type your password.</div>\r\n      <div class=\"form-alert\" *ngIf=\"registrationForm.controls.password2.errors?.passwordMismatch\">The passwords you entered do not match.</div>\r\n    </label>\r\n  </div>\r\n    <input type=\"submit\" value=\"Submit\" [disabled]=\"!registrationForm.valid\">\r\n  <div class=\"form-alert\" *ngIf=\"this.dataService.errorMsg\">{{ this.dataService.errorMsg }}</div>\r\n  </form>\r\n</div>\r\n"

/***/ }),

/***/ "./src/app/register/register.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("./node_modules/@angular/forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__validators_passwordMatch_validator__ = __webpack_require__("./src/app/validators/passwordMatch.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__validators_emailMatch_validator__ = __webpack_require__("./src/app/validators/emailMatch.validator.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__validators_passwordRequirements_validator__ = __webpack_require__("./src/app/validators/passwordRequirements.validator.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var RegisterComponent = /** @class */ (function () {
    function RegisterComponent(formBuilder, dataService) {
        this.formBuilder = formBuilder;
        this.dataService = dataService;
        this.registrationForm = formBuilder.group({
            'first': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'last': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required],
            'username': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                ])],
            'city': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
                ])],
            'state': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
                ])],
            'country': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
                ])],
            'email': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].email
                ])],
            'email2': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
                ])],
            'password': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required,
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].minLength(8)
                ])],
            'password2': [null, __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].compose([
                    __WEBPACK_IMPORTED_MODULE_1__angular_forms__["d" /* Validators */].required
                ])]
        }, { validator: [__WEBPACK_IMPORTED_MODULE_3__validators_passwordMatch_validator__["a" /* passwordMatchValidator */], __WEBPACK_IMPORTED_MODULE_4__validators_emailMatch_validator__["a" /* emailMatchValidator */], __WEBPACK_IMPORTED_MODULE_5__validators_passwordRequirements_validator__["a" /* passwordRequirementsValidator */]] });
    }
    RegisterComponent.prototype.ngOnInit = function () {
    };
    RegisterComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["n" /* Component */])({
            selector: 'app-register',
            template: __webpack_require__("./src/app/register/register.component.html"),
            styles: [__webpack_require__("./src/app/register/register.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_forms__["a" /* FormBuilder */], __WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */]])
    ], RegisterComponent);
    return RegisterComponent;
}());



/***/ }),

/***/ "./src/app/trade.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TradeService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common_http__ = __webpack_require__("./node_modules/@angular/common/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__data_service__ = __webpack_require__("./src/app/data.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TradeService = /** @class */ (function () {
    function TradeService(dataService, http) {
        this.dataService = dataService;
        this.http = http;
        // URL endpoints for requests to server
        this.serverEndpoint = 'https://gametrader.herokuapp.com';
        this.requestTradeEndpoint = this.serverEndpoint + '/user/trade_request';
        this.getTradeDataEndpoint = this.serverEndpoint + '/user/get_trade_data';
        this.cancelTradeRequestEndpoint = this.serverEndpoint + '/user/cancel_trade_request';
        this.denyTradeRequestEndpoint = this.serverEndpoint + '/user/deny_trade_request';
        this.acceptTradeRequestEndpoint = this.serverEndpoint + '/user/accept_trade_request';
        this.markReturnedEndpoint = this.serverEndpoint + '/user/mark_returned';
        // Data storage.  Used in my-trades component
        this.incoming = [];
        this.outgoing = [];
        this.active = [];
        this.history = [];
    }
    // Get the most updated trade data from the server for current user
    TradeService.prototype.getTradeData = function () {
        var _this = this;
        var username = this.dataService.userData.username;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpParams */]().set('username', username);
        this.http.get(this.getTradeDataEndpoint, { params: params }).subscribe(function (res) {
            _this.incoming = res['incoming'];
            _this.outgoing = res['outgoing'];
            _this.active = res['active'];
            _this.history = res['history'];
        });
    };
    // Initiate a trade request with another user
    TradeService.prototype.requestTrade = function (username, game) {
        var _this = this;
        // Prep data for post request
        var tradeData = {
            initiator: username,
            game: game
        };
        // Post request
        this.http.post(this.requestTradeEndpoint, tradeData).subscribe(function (res) {
            _this.getTradeData();
        });
    };
    // Cancel an outgoing trade request
    TradeService.prototype.cancelTradeRequest = function (tradeRequest) {
        var _this = this;
        this.http.post(this.cancelTradeRequestEndpoint, tradeRequest).subscribe(function (res) {
            _this.getTradeData();
        });
    };
    // Accept an incoming trade request
    TradeService.prototype.acceptTradeRequest = function (tradeRequest) {
        var _this = this;
        this.http.post(this.acceptTradeRequestEndpoint, tradeRequest).subscribe(function (res) {
            _this.getTradeData();
        });
    };
    // Deny an incoming trade request
    TradeService.prototype.denyTradeRequest = function (tradeRequest) {
        var _this = this;
        this.http.post(this.denyTradeRequestEndpoint, tradeRequest).subscribe(function (res) {
            _this.getTradeData();
        });
    };
    // Indicate that a game has been returned
    TradeService.prototype.markReturned = function (date, key) {
        var _this = this;
        var username = this.dataService.userData.username;
        var params = new __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["c" /* HttpParams */]().set('username', username);
        // Refresh data before marking this game as returned.
        // This prevents the client from sending outdated data with post request.
        this.http.get(this.getTradeDataEndpoint, { params: params }).subscribe(function (res) {
            _this.incoming = res['incoming'];
            _this.outgoing = res['outgoing'];
            _this.active = res['active'];
            _this.history = res['history'];
            // Find the index of this trade after refreshing trade data
            var index;
            for (var i = 0; i < _this.active.length; i++) {
                console.log(_this.active[i].date);
                console.log(date);
                if (_this.active[i].date === date) {
                    index = i;
                }
            }
            // Prep data for post request
            var data = {
                trade: _this.active[index],
                key: key
            };
            // Post request
            _this.http.post(_this.markReturnedEndpoint, data).subscribe(function (res) {
                _this.getTradeData();
            });
        });
    };
    // Returns true if the game that is passed in exists in current user's incoming or outgoing requests.
    TradeService.prototype.alreadyRequested = function (game) {
        var outgoingArr = this.outgoing;
        for (var i = 0; i < outgoingArr.length; i++) {
            if (JSON.stringify(outgoingArr[i].game) === JSON.stringify(game)) {
                return true;
            }
        }
        //Check incoming requests for game
        var incomingArr = this.incoming;
        for (var i = 0; i < incomingArr.length; i++) {
            if (JSON.stringify(incomingArr[i].game2) === JSON.stringify(game)) {
                return true;
            }
        }
        return false;
    };
    TradeService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["A" /* Injectable */])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_2__data_service__["a" /* DataService */], __WEBPACK_IMPORTED_MODULE_1__angular_common_http__["a" /* HttpClient */]])
    ], TradeService);
    return TradeService;
}());



/***/ }),

/***/ "./src/app/validators/emailMatch.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = emailMatchValidator;
function emailMatchValidator(control) {
    return control.get('email').value === control.get('email2').value ? null : control.get('email2').setErrors({ 'emailMismatch': true });
}


/***/ }),

/***/ "./src/app/validators/passwordMatch.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = passwordMatchValidator;
function passwordMatchValidator(control) {
    return control.get('password').value === control.get('password2').value ? null : control.get('password2').setErrors({ 'passwordMismatch': true });
}


/***/ }),

/***/ "./src/app/validators/passwordRequirements.validator.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = passwordRequirementsValidator;
function passwordRequirementsValidator(control) {
    // Passwords must include:
    //at least 1 letter
    //at least 1 number
    //at least 1 special character: !@#$%^&*
    var specialChars = ['!', '@', '#', '$', '%', '^', '&', '*'];
    var numbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'];
    if (control.get('password').value) {
        var password = control.get('password').value;
        var hasSpecialChar = false;
        for (var i = 0; i < specialChars.length; i++) {
            if (password.includes(specialChars[i])) {
                hasSpecialChar = true;
            }
        }
        var hasNumber = false;
        for (var i = 0; i < numbers.length; i++) {
            if (password.includes(numbers[i])) {
                hasNumber = true;
            }
        }
        if (!hasSpecialChar) {
            control.get('password').setErrors({ 'noSpecialChar': true });
        }
        else if (!hasNumber) {
            control.get('password').setErrors({ 'noNumber': true });
        }
        else if (password === password.toUpperCase()) {
            control.get('password').setErrors({ 'allUpperCase': true });
        }
        else if (password === password.toLowerCase()) {
            control.get('password').setErrors({ 'allLowercase': true });
        }
        else {
            return null;
        }
    }
}


/***/ }),

/***/ "./src/environments/environment.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};


/***/ }),

/***/ "./src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("./node_modules/@angular/core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("./node_modules/@angular/platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("./src/app/app.module.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__("./src/environments/environment.ts");




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_13" /* enableProdMode */])();
}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("./src/main.ts");


/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map