import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../data.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  //Custom validator functions
  passwordMatchValidator = function(fg:FormGroup){
    return fg.get('password').value === fg.get('password2').value ? null : { 'mismatch': true};
  }

  emailMatchValidator = function(fg:FormGroup){
    return fg.get('email').value === fg.get('email2').value ? null : { 'mismatch': true};
  }

  constructor(private formBuilder:FormBuilder, private dataService:DataService) { 

    this.registrationForm = formBuilder.group({
      'first': [null, Validators.required],
      'last': [null, Validators.required],
      'username': [null, Validators.compose([
        //Will have to check database to see if username is available
        Validators.required,
        Validators.minLength(4)
      ])],
      'city': [null, Validators.compose([
        Validators.required
      ])],
      'state': [null, Validators.compose([
        Validators.required
      ])],
      'country': [null, Validators.compose([
        Validators.required
      ])],
      'email': [null, Validators.compose([
        Validators.required,
        Validators.email
      ])],
      'email2': [null, Validators.required],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'password2': [null, Validators.compose([
        Validators.required
      ])]
    }, {validator: this.passwordMatchValidator});

  }

  ngOnInit() {
    
  }



}
