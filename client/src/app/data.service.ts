import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable()
export class DataService {
  //This service handles calls pertaining to user account.

  currentUser = sessionStorage.getItem('currentUser');
  userData;

  serverEndpoint = 'http://localhost:3000';
  registerEndpoint = this.serverEndpoint +'/user/register';
  loginEndpoint = this.serverEndpoint + '/user/login';
  changeEmailEndpoint = this.serverEndpoint + '/user/email';
  changeLocationEndpoint = this.serverEndpoint + '/user/location';
  changePasswordEndpoint = this.serverEndpoint + '/user/password';
  addGameEndpoint = this.serverEndpoint + '/user/add_game';
  deleteGameEndpoint = this.serverEndpoint + '/user/delete_game';

  deleteAllEndpoint = this.serverEndpoint + '/user/delete_all';

  constructor(private router: Router, private http: HttpClient) { }

  register(formData) {
    this.http.post(this.registerEndpoint, formData).subscribe((res) => {
      if(res['success']){
        this.router.navigate(['login']);
      }
    });
  }

  login(formData) {
    console.log('login()');
    this.http.post(this.loginEndpoint, formData).subscribe((res) => {

      if (!res['success']) {
      } else if (res['success']) {
        this.currentUser = res['token'];
        
        sessionStorage.setItem('currentUser', res['token']);
        this.userData = JWT(this.currentUser).user;
        this.router.navigate(['/']);

      }
    });
  }

  logout() {
    //Delete JWT from local storage
    //clear currentUser
    this.currentUser = '';
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['/']);
  }

  changeEmail(formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }

    this.http.post(this.changeEmailEndpoint, data).subscribe((res)=>{
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  // DASHBOARD FUNCTIONS

  deleteAccount(formData){
    let token = sessionStorage.getItem('currentUser');

    let data = {
      password: formData.password,
      token: token
    }

    console.log(data);

    this.http.post(this.serverEndpoint + '/user/delete_account', data).subscribe((res)=>{
      if(res['success']){
        this.currentUser = '';
        sessionStorage.removeItem('currentUser');
        this.router.navigate(['/']);
      }
    });
  }

  changePassword(formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }

    this.http.post(this.changePasswordEndpoint, data).subscribe((res)=>{
      let token = res['token'];
      console.log('test token', token);
      sessionStorage.setItem('currentUser', token);
      
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  changeLocation(formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }

    console.log(data);

    this.http.post(this.changeLocationEndpoint, data).subscribe((res)=>{
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  //MY GAMES FUNCTIONS
  addGame(game, platform){

    game.platform = platform;
    let token = this.currentUser;

    let secureData = {
      token: token,
      game: game,
    }

    this.http.post(this.addGameEndpoint, secureData).subscribe((res)=>{
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  deleteGame(game){

    let token = this.currentUser;
    let secureData = {
      token: token,
      game: game
    }

    this.http.post(this.deleteGameEndpoint, secureData).subscribe((res)=>{
      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

}
