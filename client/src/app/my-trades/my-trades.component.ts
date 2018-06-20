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

  serverEndpoint = 'https://gametrader.herokuapp.com';

  //UI stuff
  displayIncomingTradeRequests = true;
  displayOutgoingTradeRequests = false;
  displayTradeHistory = false;
  displayActiveTrades = false;
  displaySelectGameWindow = false;
  displayGameSelector = false;

  selectGameWindowGames = [];
  selectGameWindowInitiator = '';
  selectGameWindowTradeRequest;
  tradeRequest; //For selectGameWindow
  initiator = '';
  initiatorGames = [];

  constructor(private gamesDataService: GamesDataService, private dataService: DataService, private http: HttpClient, private tradeService: TradeService) { }

  ngOnInit() {
    this.tradeService.getTradeData();
  }


  selectGameWindow(tradeRequest) {
    this.displaySelectGameWindow = true;
    this.initiator = tradeRequest.initiator;
    this.tradeRequest = tradeRequest;
    let getProfileDataEndpoint = this.serverEndpoint + '/user/profile/' + tradeRequest.initiator;

    this.http.get(getProfileDataEndpoint).subscribe((res) => {
      this.initiatorGames = res['games'];
    });
  }

  selectGame(game) {
    let secureData = {
      token: this.dataService.currentUser,
      game: game,
      tradeRequest: this.selectGameWindowTradeRequest
    }
    //Add game as game2 to this traderequest in gameOwner's incoming array
    let selectGameForTradeEndpoint = this.serverEndpoint + '/user/select_game_for_trade';
    this.http.post(selectGameForTradeEndpoint, secureData).subscribe((res) => {
      this.tradeService.getTradeData();
      this.closeSelectGameWindow();
    });
  }

  openSelectGameWindow(tradeRequest) {
    this.selectGameWindowGames = [];
    this.selectGameWindowInitiator = '';
    this.selectGameWindowTradeRequest = tradeRequest;
    this.displaySelectGameWindow = true;
    let initiator = tradeRequest.initiator;
    let getAllGamesEndpoint = this.serverEndpoint + '/games/get_all/';
    this.http.get(getAllGamesEndpoint).subscribe((res) => {
      for (let game in res) {
        if (res[game]['owner'] === initiator && !this.tradeService.alreadyRequested(res[game]) && res[game].available) {
          this.selectGameWindowGames.push(res[game]);
        }
      }
      this.selectGameWindowInitiator = initiator;
    });
  }

  closeSelectGameWindow() {
    this.displayGameSelector = false;
    this.displayIncomingTradeRequests = true;
  }

  displayContent(tab) {
    this.displayIncomingTradeRequests = false;
    this.displayOutgoingTradeRequests = false;
    this.displayTradeHistory = false;
    this.displayActiveTrades = false;
    this.displayGameSelector = false;

    switch (tab) {
      case 'Incoming Trade Requests': this.displayIncomingTradeRequests = true; break;
      case 'Outgoing Trade Requests': this.displayOutgoingTradeRequests = true; break;
      case 'Trade History': this.displayTradeHistory = true; break;
      case 'Active Trades': this.displayActiveTrades = true; break;
      case 'Game Selector': this.displayGameSelector = true; break;

    }
  }
}
