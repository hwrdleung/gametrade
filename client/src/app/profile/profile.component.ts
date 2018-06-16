import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { DataService } from '../data.service'
import { TradeService } from '../trade.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  username: String; //Display profile page for this user
  profileData: Object;
  private sub: any;
  serverEndpoint = 'http://localhost:3000';

  constructor(private tradeService: TradeService, private dataService: DataService, private route: ActivatedRoute, private http:HttpClient) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.username = params.username;

      let getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + this.username;

      this.http.get(getProfileDataEndpoint).subscribe((res)=>{
        this.profileData = res;
      });
    });
  }

}
