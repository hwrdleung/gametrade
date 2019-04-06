import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class DataService {

  // Data storage for user that is currently signed in
  // This data is Used throughout the app.
  currentUser = sessionStorage.getItem('currentUser');
  userData;

  // URL endpoints for requests to server
  serverEndpoint = 'https://gametrader.herokuapp.com';
  registerEndpoint = this.serverEndpoint + '/user/register';
  loginEndpoint = this.serverEndpoint + '/user/login';
  changeEmailEndpoint = this.serverEndpoint + '/user/email';
  changeLocationEndpoint = this.serverEndpoint + '/user/location';
  changePasswordEndpoint = this.serverEndpoint + '/user/password';
  addGameEndpoint = this.serverEndpoint + '/user/add_game';
  deleteGameEndpoint = this.serverEndpoint + '/user/delete_game';
  deleteAllEndpoint = this.serverEndpoint + '/user/delete_all';

  // Data storage for error messages returned from the server.
  // This is binded to the registration and login forms.
  errorMsg = "";
  errorMsgDuration = 5000; // Error messages disappear after this time has elapsed

  // Stores the paths to all profile pictures that users can choose from for their user profiles
  // This must be in a service because it is used in the profile and dashboard components
  profilePics = [
    "./assets/profile-pics/kitty.jpg",
    "./assets/profile-pics/puppy.jpg",
    "./assets/profile-pics/halo.jpg",
    "./assets/profile-pics/fallout.jpg",
    "./assets/profile-pics/battlefield.jpg",
    "./assets/profile-pics/masseffect.jpg",
  ]

  constructor(private router: Router, private http: HttpClient) { }

  // Post request to register new user
  register(formData) {
    this.http.post(this.registerEndpoint, formData).subscribe((res) => {
      if (!res['success']) {
        console.log(res);
        this.flashErrorMsg(res['msg']);
      } else if (res['success']) {
        this.router.navigate(['login']);
      }
    });
  }

  // Post request for user login
  login(formData) {
    console.log('login()');
    this.http.post(this.loginEndpoint, formData).subscribe((res) => {
      if (!res['success']) {
        console.log(res);
        this.flashErrorMsg(res['msg']);
      } else if (res['success']) {
        this.currentUser = res['token'];
        sessionStorage.setItem('currentUser', res['token']);
        this.userData = JWT(this.currentUser).user;
        this.router.navigate(['/']);
      }
    });
  }

  // End user session
  logout() {
    this.currentUser = '';
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  // Display error messages on form
  flashErrorMsg(error) {
    this.errorMsg = error;
    let context = this;
    setTimeout(function () {
      context.errorMsg = "";
      console.log('3 seconds elapsed');
    }, this.errorMsgDuration);
  }

  // -------------------------------------
  //    DASHBOARD ACCOUNT SETTINGS 
  // -------------------------------------

  changeEmail(formData) {
    // Prep data for post request to server
    let token = sessionStorage.getItem('currentUser');
    let data = {
      token: token,
      formData: formData
    }
    // Post request
    this.http.post(this.changeEmailEndpoint, data).subscribe((res) => {
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  changeLocation(formData) {
    // Prep data for post request
    let token = sessionStorage.getItem('currentUser');
    let data = {
      token: token,
      formData: formData
    }
    // Post request
    this.http.post(this.changeLocationEndpoint, data).subscribe((res) => {
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  changePassword(formData) {
    // Prep data for post request
    let token = sessionStorage.getItem('currentUser');
    let data = {
      token: token,
      formData: formData
    }
    // Post request
    this.http.post(this.changePasswordEndpoint, data).subscribe((res) => {
      let token = res['token'];
      console.log('test token', token);
      sessionStorage.setItem('currentUser', token);
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  deleteAccount(formData) {
    // Prep data for post request
    let token = sessionStorage.getItem('currentUser');
    let data = {
      password: formData.password,
      token: token
    }
    // Post request
    this.http.post(this.serverEndpoint + '/user/delete_account', data).subscribe((res) => {
      if (res['success']) {
        this.currentUser = '';
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
    });
  }

  // -------------------------------------
  //    DASHBOARD EDIT PROFILE 
  // -------------------------------------

  editProfile(formData) {
    // Prep data for post request
    let token = sessionStorage.getItem('currentUser');
    let data = {
      token: token,
      formData: formData
    }
    // Post request
    this.http.post(this.serverEndpoint + '/user/edit_profile', data).subscribe((res) => {
      if (res['success']) {
        let token = res['token'];
        sessionStorage.setItem('currentUser', token);
        this.userData = JWT(sessionStorage.getItem('currentUser')).user;
      }
    });
  }

  // -------------------------------------
  //    MY GAMES FUNCTIONS 
  // -------------------------------------

  addGame(game, platform) {
    console.log('add game')
    // Prep data for post request
    game.platform = platform;
    let token = this.currentUser;
    let secureData = {
      token: token,
      game: game
    }
    // Post request
    this.http.post(this.addGameEndpoint, secureData).subscribe((res) => {
      // TODO: HANDLE ERRORS
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  deleteGame(game) {
    // Prep data for post request
    let token = this.currentUser;
    let secureData = {
      token: token,
      game: game
    }
    // Post request
    this.http.post(this.deleteGameEndpoint, secureData).subscribe((res) => {
      // TODO: HANDLE ERRORS
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }
}
