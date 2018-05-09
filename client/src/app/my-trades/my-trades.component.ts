import { Component, OnInit } from '@angular/core';
import { TradeService } from '../trade.service';
import { DataService } from '../data.service';
import { GamesDataService } from '../games-data.service';

import { HttpClient, HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-my-trades',
  templateUrl: './my-trades.component.html',
  styleUrls: ['./my-trades.component.css']
})
export class MyTradesComponent implements OnInit {

  //UI stuff
  displayTradeRequests = true;
  displayTradeHistory = false;
  displayActiveTrades = false;

  constructor(private gamesDataService: GamesDataService, private dataService:DataService, private http:HttpClient, private tradeService:TradeService) { }

  ngOnInit() {
    this.tradeService.getTradeData();
  }

test(){
  console.log('test()');
}

  displayContent(tab) {

    this.displayTradeRequests = false;
    this.displayTradeHistory = false;
    this.displayActiveTrades = false;

    switch (tab) {
      case 'Trade Requests': this.displayTradeRequests = true; break;
      case 'Trade History': this.displayTradeHistory = true; break;
      case 'Active Trades': this.displayActiveTrades = true; break;
    }

  }

}
