import { Injectable } from '@angular/core';
import * as JWT from 'jwt-decode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Injectable()
export class DataService {
  //The main purpose of this service is to communicate with the backend

  currentUser = sessionStorage.getItem('currentUser');
  userData;

  registerEndpoint = 'http://localhost:3000/user/register';
  loginEndpoint = 'http://localhost:3000/user/login';
  //These api's have not been built yet
  changeEmailEndpoint = 'http://localhost:3000/user/email';
  changeLocationEndpoint = 'http://localhost:3000/user/location';
  changePasswordEndpoint = 'http://localhost:3000/user/password';
  addGameEndpoint = 'http://localhost:3000/user/add_game';
  deleteGameEndpoint = 'http://localhost:3000/user/delete_game';

  constructor(private router: Router, private http: HttpClient) { }

  register(formData) {
    this.http.post(this.registerEndpoint, formData).subscribe((res) => {
      console.log(res);
      if(res['success']){
        this.router.navigate(['login']);
      }
    });
  }

  login(formData) {
    console.log('login()');
    this.http.post(this.loginEndpoint, formData).subscribe((res) => {

      if (!res['success']) {
        console.log(res['msg']);
      } else if (res['success']) {
        console.log('JWT saved to session storage as "currentUser"');
        this.currentUser = res['token'];
        
        sessionStorage.setItem('currentUser', res['token']);
        this.userData = JWT(this.currentUser).user;
        console.log('!!!', this.userData);
        this.router.navigate(['dashboard']);

      }
    });
  }

  logout() {
    //Delete JWT from local storage
    //clear currentUser
    this.currentUser = '';
    sessionStorage.removeItem('currentUser');
    this.router.navigate(['login']);
  }

  changeEmail(formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }

    this.http.post(this.changeEmailEndpoint, data).subscribe((res)=>{
      console.log(res);
      let token = res['token'];
      console.log('test token', token);
      sessionStorage.setItem('currentUser', token);
      
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }


  // DASHBOARD FUNCTIONS
  changePassword(formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }

    this.http.post(this.changePasswordEndpoint, data).subscribe((res)=>{
      console.log(res);
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
      console.log(res);
      let token = res['token'];
      console.log('test token', token);
      sessionStorage.setItem('currentUser', token);
      
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
    });
  }

  //MY GAMES FUNCTIONS
  addGame(gameData){
    console.log(gameData);
    // let token = sessionStorage.getItem('currentUser');
    let token = this.currentUser;

    let data = {
      token: token,
      gameData: gameData
    }

    this.http.post(this.addGameEndpoint, data).subscribe((res)=>{
      console.log(res);

      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
      console.log(this.userData);
    });
  }

  deleteGame(gameName){

    console.log('gameName', gameName);
    // let token = sessionStorage.getItem('currentUser');
    let token = this.currentUser;
    console.log(token);
    console.log(JWT(token));
    let data = {
      token: token,
      gameName: gameName
    }

    this.http.post(this.deleteGameEndpoint, data).subscribe((res)=>{
      console.log(res);

      let token = res['token'];
      sessionStorage.setItem('currentUser', token);
      this.currentUser = res['token'];
      this.userData = JWT(sessionStorage.getItem('currentUser')).user;
      console.log(this.userData);
    });
  }

  test() {
    console.log('test() from dataservice');
    console.log(this.currentUser);
    console.log(JWT(this.currentUser));
    console.log('!!!', this.userData);
  }

}
