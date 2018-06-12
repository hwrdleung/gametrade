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
  acceptTradeRequestEndpoint = this.serverEndpoint + '/user/accept_trade_request';
  markReturnedEndpoint = this.serverEndpoint + '/user/mark_returned';


  incoming = [];
  outgoing = [];
  active = [];
  history = [];

  constructor(private dataService:DataService, private http:HttpClient) { }

  test(){
    this.getTradeData();
    console.log('Incoming: ', this.incoming);
    console.log('Outgoing: ', this.outgoing);
    console.log('Active: ', this.active);
    console.log('History: ', this.history);
  }

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

  markReturned(date, key){
    let username = this.dataService.userData.username;
    let params = new HttpParams().set('username', username);

    this.http.get(this.getTradeDataEndpoint, {params: params}).subscribe((res)=>{
      console.log(res);

      this.incoming = res['incoming'];
      this.outgoing = res['outgoing'];
      this.active = res['active'];
      this.history = res['history'];

      //Find the index of this trade after refreshing trade data
      let index;
      for(let i=0; i<this.active.length; i++){
        console.log(this.active[i].date);
        console.log(date);
        if(this.active[i].date === date){
          index = i;
        }
      }
      
      let data = {
        trade: this.active[index],
        key: key
      }
  
      this.http.post(this.markReturnedEndpoint, data).subscribe((res)=>{
        console.log(res);
        this.getTradeData();
      });
    });

 
  }

  denyTradeRequest(tradeRequest){
    this.http.post(this.denyTradeRequestEndpoint, tradeRequest).subscribe((res)=>{
      console.log(res);
      this.getTradeData();
    });

  }

  acceptTradeRequest(tradeRequest){
    this.http.post(this.acceptTradeRequestEndpoint, tradeRequest).subscribe((res)=>{
      console.log(res);
      this.getTradeData();
    });
  }

  cancelTradeRequest(tradeRequest){
    //username is currentUser that RECIEVED the trade request from another user
    this.http.post(this.cancelTradeRequestEndpoint, tradeRequest).subscribe((res)=>{
      console.log(res);
      this.getTradeData();
    });
  }

  requestTrade(username, game){

    console.log(username);
    console.log(game);

      let tradeData = {
        initiator: username,
        game: game
      };

      this.http.post(this.requestTradeEndpoint, tradeData).subscribe((res)=>{
        console.log(res);
        this.getTradeData();
      });

  }

  alreadyRequested(game){
    //Check outgoing requests for game
    let outgoingArr = this.outgoing;
    for(let i=0; i<outgoingArr.length; i++){
      if(JSON.stringify(outgoingArr[i].game) === JSON.stringify(game)){
        return true;
      }
    }

    //Check incoming requests for game
    let incomingArr = this.incoming;
    for(let i=0; i<incomingArr.length; i++){
      if(JSON.stringify(incomingArr[i].game2) === JSON.stringify(game)){
        return true;
      }
    }

    return false;


  }
 

}
