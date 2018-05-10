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

  serverEndpoint = 'http://localhost:3000';

  //UI stuff
  displayTradeRequests = true;
  displayTradeHistory = false;
  displayActiveTrades = false;
  displaySelectGameWindow = false;
  tradeRequest; //For selectGameWindow
  initiator = '';
  initiatorGames = [];

  constructor(private gamesDataService: GamesDataService, private dataService:DataService, private http:HttpClient, private tradeService:TradeService) { }

  ngOnInit() {
    this.tradeService.getTradeData();
  }

  selectGame(tradeRequest, game){
    //set selectedGame as game2 for tradeRequest.gameOwner's incoming game which matches this tradeRequest object
    //save to server
    //Refresh UI
    //Do post request with token
    let selectGameEndpoint = this.serverEndpoint + '/user/select_game_for_trade';
    let token = this.dataService.currentUser;
    let secureData = {
      token: token,
      tradeRequest: tradeRequest,
      game: game
    }

    this.http.post(selectGameEndpoint, secureData).subscribe((res)=>{
      console.log(res);
      this.tradeService.getTradeData();
    });
  }

  selectGameWindow(tradeRequest){
    this.displaySelectGameWindow = true;
    this.initiator = tradeRequest.initiator;
    this.tradeRequest = tradeRequest;
    let getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + tradeRequest.initiator;

    this.http.get(getProfileDataEndpoint).subscribe((res)=>{
      console.log(res);
      console.log(res['games']);

      this.initiatorGames = res['games'];
    });

  }

  closeSelectGameWindow(){
    this.displaySelectGameWindow = false;
    //Remember to clear memory
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
