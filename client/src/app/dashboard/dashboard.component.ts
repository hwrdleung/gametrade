import { Component, OnInit } from '@angular/core';
import * as JWT from 'jwt-decode';
import { DataService } from '../data.service';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userData;

  displayAccount = true; //Show this when the page loads
  displayTradeRequests = false;
  displayTradeHistory = false;
  displayActiveTrades = false;

  changeLocationForm: FormGroup;
  changeEmailForm: FormGroup;
  changePasswordForm: FormGroup;

  displayChangeLocationForm = false;
  displayChangeEmailForm = false;
  displayChangePasswordForm = false;

    //Custom validator functions
    passwordMatchValidator = function(fg:FormGroup){
      return fg.get('newPassword').value === fg.get('newPassword2').value ? null : { 'mismatch': true};
    }
  
    emailMatchValidator = function(fg:FormGroup){
      return fg.get('newEmail').value === fg.get('newEmail2').value ? null : { 'mismatch': true};
    }


  constructor(private dataService: DataService, private formBuilder: FormBuilder) {

    this.changeLocationForm = formBuilder.group({
      'newCity': [null, Validators.required],
      'newState': [null, Validators.required],
      'newCountry': [null, Validators.required]
    });

    this.changeEmailForm = formBuilder.group({
      'newEmail': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'newEmail2': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
    }, {validator: this.emailMatchValidator});

    this.changePasswordForm = formBuilder.group({
      'oldPassword': [null, Validators.required],
      'newPassword': [null, Validators.required],
      'newPassword2': [null, Validators.required]
    }, {validator: this.passwordMatchValidator});

  }

  ngOnInit() {
    this.dataService.userData = JWT(this.dataService.currentUser).user[0];
  }


  test() {
    console.log('test');
  }

  displayContent(tab) {

    this.displayAccount = false;
    this.displayTradeRequests = false;
    this.displayTradeHistory = false;
    this.displayActiveTrades = false;

    switch (tab) {
      case 'Account': this.displayAccount = true; break;
      case 'Trade Requests': this.displayTradeRequests = true; break;
      case 'Trade History': this.displayTradeHistory = true; break;
      case 'Active Trades': this.displayActiveTrades = true; break;
    }

  }

  displayForm(form) {
    switch (form) {
      case 'location':
        this.displayChangeLocationForm = !this.displayChangeLocationForm;
        this.displayChangeEmailForm = false;
        this.displayChangePasswordForm = false;
        break;
      case 'email':
        this.displayChangeEmailForm = !this.displayChangeEmailForm;
        this.displayChangeLocationForm = false;
        this.displayChangePasswordForm = false;
        break;
      case 'password':
        this.displayChangePasswordForm = !this.displayChangePasswordForm;
        this.displayChangeLocationForm = false;
        this.displayChangeEmailForm = false;
        break;
    }
  }

}
