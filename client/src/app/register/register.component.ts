import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DataService } from '../data.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;
  registerApi = 'http://localhost:3000/user/register';

  //Custom validator functions
  passwordMatchValidator = function(fg:FormGroup){
    return fg.get('password').value === fg.get('password2').value ? null : { 'mismatch': true};
  }

  emailMatchValidator = function(fg:FormGroup){
    return fg.get('email').value === fg.get('email2').value ? null : { 'mismatch': true};
  }

  constructor(private formBuilder:FormBuilder, private dataService:DataService, private http:HttpClient) { 

    this.registrationForm = formBuilder.group({
      'first': [null, Validators.required],
      'last': [null, Validators.required],
      'username': [null, Validators.compose([
        //will have to check database to see if username is available
        Validators.required,
        Validators.minLength(4)
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

  register(){
    //Registration form is valid
    //Do POST request to server
    // console.log(this.registrationForm.value);
    this.http.post(this.registerApi, this.registrationForm.value).subscribe((res)=>{
      console.log(res);
    });
  }


}
