import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service'
import { TradeService } from '../trade.service'
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String; //Display profile page for this user
  profileData: Object;
  private sub: any;
  serverEndpoint = 'https://gametrader.herokuapp.com';
  reviewForm: FormGroup;

  constructor(private formBuilder:FormBuilder, private tradeService: TradeService, private dataService: DataService, private route: ActivatedRoute, private http:HttpClient) { 
    this.reviewForm = formBuilder.group({
      'reviewBody':['Leave a review', Validators.required]
    });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;

      let getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + this.username;

      this.http.get(getProfileDataEndpoint).subscribe((res)=>{
        this.profileData = res;
        console.log(this.profileData);
      });
    });
  }

  
  postReview(profile, formData){

    let token = sessionStorage.getItem('currentUser');

    let data = {
      token: token,
      formData: formData
    }  

    data.formData.profile = profile;
  
  console.log(data);

  this.http.post(this.serverEndpoint + '/user/post_review', data).subscribe((res)=>{

    console.log(res);
    this.ngOnInit();

  });
  }

}
