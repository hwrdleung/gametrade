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

  username: String;
  profileData: Object;
  private sub: any;
  serverEndpoint = 'https://gametrader.herokuapp.com';
  reviewForm: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private tradeService: TradeService, 
    private dataService: DataService, 
    private route: ActivatedRoute, 
    private http: HttpClient) {
    this.reviewForm = formBuilder.group({
      'reviewBody': ['', Validators.required]
    });
  }

  ngOnInit() {
    // Get profile data for username in params
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;
      let getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + this.username;
      this.http.get(getProfileDataEndpoint).subscribe((res) => {
        this.profileData = res;
      });
    });
  }

  // Returns true if the game that is passed in is not present in profileData active trades
  isAvailable(game){
    let checkId = game._id;

    for (let i=0; i < this.profileData['active'].length; i++){
      let gameId = this.profileData['active'][i].game._id;
      let game2Id = this.profileData['active'][i].game2._id;

      if(checkId === gameId || checkId === game2Id){
        return false;
      }
    }
    return true;
  }

  postReview(profile, formData) {
    // Prep data for post request
    let token = sessionStorage.getItem('currentUser');
    let data = {
      token: token,
      formData: formData
    }
    data.formData.profile = profile;
    // Post request
    this.http.post(this.serverEndpoint + '/user/post_review', data).subscribe((res) => {
      // Refresh
      this.ngOnInit();
    });
  }
}
