import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { DataService } from '../data.service';
import { passwordMatchValidator } from '../validators/passwordMatch.validator';
import { emailMatchValidator } from '../validators/emailMatch.validator';
import { passwordRequirementsValidator } from '../validators/passwordRequirements.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registrationForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dataService: DataService) {
    this.registrationForm = formBuilder.group({
      'first': [null, Validators.required],
      'last': [null, Validators.required],
      'username': [null, Validators.compose([
        //Will have to check database to see if username is available
        Validators.required,
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
      'email2': [null, Validators.compose([
        Validators.required
      ])],
      'password': [null, Validators.compose([
        Validators.required,
        Validators.minLength(8)
      ])],
      'password2': [null, Validators.compose([
        Validators.required
      ])]
    }, { validator: [passwordMatchValidator, emailMatchValidator, passwordRequirementsValidator] });
  }

  ngOnInit() {

  }
}
