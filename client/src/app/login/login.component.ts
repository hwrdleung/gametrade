import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  loginApi = 'http://localhost:3000/user/login';

  constructor(private router: Router, private formBuilder:FormBuilder, private http:HttpClient, private dataService:DataService) {
    this.loginForm = formBuilder.group({
      'username': [null, Validators.required],
      'password': [null, Validators.required]
    });
   }

   login(){
     this.http.post(this.loginApi, this.loginForm.value).subscribe((res)=>{
       console.log(res);
      
       if(!res['success']){
        console.log(res['msg']);
       }else if(res['success']){
         console.log('JWT saved to local storage as "currentUser"');
        this.dataService.currentUser = res['token'];
        localStorage.setItem('currentUser', JSON.stringify({ token: res['token'] }));

        this.router.navigate(['/']);

       }
      
     });
   }


  ngOnInit() {
  }

}
