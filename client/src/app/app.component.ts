import { Component, OnInit } from '@angular/core';
import { DataService } from './data.service';
import { GamesDataService } from './games-data.service';
import { TradeService } from './trade.service';
import * as JWT from 'jwt-decode';
import { Router } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private tradeService:TradeService, private dataService:DataService, private gamesDataService:GamesDataService) { }

ngOnInit(){
  this.dataService.userData = JWT(sessionStorage.getItem('currentUser')).user;
}


ngOnDestroy(){
  this.gamesDataService.searchResults = [];
}

  
}
