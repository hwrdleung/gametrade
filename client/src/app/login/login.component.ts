import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.loginForm = formBuilder.group({
      'name': [null, Validators.required],
      'password': [null, Validators.required]
    });
   }



   test(){
     console.log('test()');
   }


  ngOnInit() {
  }

}
