import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class TradeService {
  
  serverEndpoint = 'http://localhost:3000';
  requestTradeEndpoint = this.serverEndpoint + '/user/trade_request';
  getTradeDataEndpoint = this.serverEndpoint + '/user/get_trade_data';
  cancelTradeRequestEndpoint = this.serverEndpoint + '/user/cancel_trade_request';
  denyTradeRequestEndpoint = this.serverEndpoint + '/user/deny_trade_request';

  incoming = [];
  outgoing = [];
  active = [];
  history = [];

  constructor(private dataService:DataService, private http:HttpClient) { }

  getTradeData(){
    let username = this.dataService.userData.username;
    let params = new HttpParams().set('username', username);

    this.http.get(this.getTradeDataEndpoint, {params: params}).subscribe((res)=>{
      console.log(res);

      this.incoming = res['incoming'];
      this.outgoing = res['outgoing'];
      this.active = res['active'];
      this.history = res['history'];
    });
  }

  denyTradeRequest(username, initiator, gameTitle, gamePlatform){

    let data = {
      username: username,
      initiator: initiator,
      gameTitle: gameTitle, 
      gamePlatform: gamePlatform
    }

    this.http.post(this.denyTradeRequestEndpoint, data).subscribe((res)=>{
      console.log(res);
      this.getTradeData();
    });

  }

  cancelTradeRequest(username, gameOwner, gameTitle, gamePlatform){

    let data = {
      username: username,
      gameOwner: gameOwner,
      gameTitle: gameTitle,
      gamePlatform: gamePlatform
    };

    this.http.post(this.cancelTradeRequestEndpoint, data).subscribe((res)=>{
      console.log(res);
      this.getTradeData();
    });
  }

  requestTrade(username, gameOwner, gameTitle, gamePlatform){
    console.log(
      username + ' requests to trade with ' + gameOwner + ' for ' + gameTitle + ' ' + gamePlatform)

      let tradeDetails = {
        initiator: username,
        title: gameTitle,
        platform: gamePlatform,
        owner: gameOwner
      };

      //create document for username's outgoing trade requests
      //create document for gameOwner's incoming trade requests


      this.http.post(this.requestTradeEndpoint, tradeDetails).subscribe((res)=>{
        console.log(res);
      });



    //Create trade request document and save to gameOwner's record
    //Create trade request document and save to username's record
    
    //If gameOwner denies:
      //Notify username that gameOwner has denied the trade request
      //Save record to trade history for both gameOwner and username
      //Delete trade request for both gameOwner and username

    //If gameOwner accepts:
      //Remove game from games collection in DB so that it no longer shows up on home page
      //gameOwner wil be shown a list of all games that username owns.  
      //When gameOwner chooses a game, the trade is complete:
          //Save a record to 'active trades' for both gameOnwer and username
          //Remove trade request for both gameOwner and username

  }
}
