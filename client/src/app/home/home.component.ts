import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { TradeService } from '../trade.service';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  searchForm: FormGroup
  homeGames;
  serverEndpoint = 'https://gametrader.herokuapp.com';
  getAllEndPoint = this.serverEndpoint + '/games/get_all';

  constructor(private formBuilder:FormBuilder, private http:HttpClient, private dataService:DataService, private tradeService:TradeService) {
      this.searchForm = formBuilder.group({
        query: [null, Validators.required]
      });
   }

  ngOnInit() {
    //I will want to change this to run only after user logs in, using observables
    //But for now I will put it here.

    //To make it scalable and more efficient, I would specify criteria for this get request so 
    //that it doesn't download the entire database every time a user logs in.  Fix this later.
    this.refreshGames();
  }

  refreshGames(){
    console.log('refresh');
    this.http.get(this.getAllEndPoint).subscribe((res)=>{
      this.homeGames = res;
    }); 
  }


}
