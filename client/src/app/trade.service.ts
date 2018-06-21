import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { DataService } from './data.service';

@Injectable()
export class TradeService {

  // URL endpoints for requests to server
  serverEndpoint = 'https://gametrader.herokuapp.com';
  requestTradeEndpoint = this.serverEndpoint + '/user/trade_request';
  getTradeDataEndpoint = this.serverEndpoint + '/user/get_trade_data';
  cancelTradeRequestEndpoint = this.serverEndpoint + '/user/cancel_trade_request';
  denyTradeRequestEndpoint = this.serverEndpoint + '/user/deny_trade_request';
  acceptTradeRequestEndpoint = this.serverEndpoint + '/user/accept_trade_request';
  markReturnedEndpoint = this.serverEndpoint + '/user/mark_returned';

  // Data storage.  Used in my-trades component
  incoming = [];
  outgoing = [];
  active = [];
  history = [];

  constructor(private dataService: DataService, private http: HttpClient) { }

  // Get the most updated trade data from the server for current user
  getTradeData() {
    let username = this.dataService.userData.username;
    let params = new HttpParams().set('username', username);

    this.http.get(this.getTradeDataEndpoint, { params: params }).subscribe((res) => {
      this.incoming = res['incoming'];
      this.outgoing = res['outgoing'];
      this.active = res['active'];
      this.history = res['history'];
    });
  }

  // Initiate a trade request with another user
  requestTrade(username, game) {
    // Prep data for post request
    let tradeData = {
      initiator: username,
      game: game
    };
    // Post request
    this.http.post(this.requestTradeEndpoint, tradeData).subscribe((res) => {
      this.getTradeData();
    });
  }

  // Cancel an outgoing trade request
  cancelTradeRequest(tradeRequest) {
    this.http.post(this.cancelTradeRequestEndpoint, tradeRequest).subscribe((res) => {
      this.getTradeData();
    });
  }

  // Accept an incoming trade request
  acceptTradeRequest(tradeRequest) {
    this.http.post(this.acceptTradeRequestEndpoint, tradeRequest).subscribe((res) => {
      this.getTradeData();
    });
  }

  // Deny an incoming trade request
  denyTradeRequest(tradeRequest) {
    this.http.post(this.denyTradeRequestEndpoint, tradeRequest).subscribe((res) => {
      this.getTradeData();
    });
  }

  // Indicate that a game has been returned
  markReturned(date, key) {
    let username = this.dataService.userData.username;
    let params = new HttpParams().set('username', username);

    // Refresh data before marking this game as returned.
    // This prevents the client from sending outdated data with post request.
    this.http.get(this.getTradeDataEndpoint, { params: params }).subscribe((res) => {
      this.incoming = res['incoming'];
      this.outgoing = res['outgoing'];
      this.active = res['active'];
      this.history = res['history'];

      // Find the index of this trade after refreshing trade data
      let index;
      for (let i = 0; i < this.active.length; i++) {
        console.log(this.active[i].date);
        console.log(date);
        if (this.active[i].date === date) {
          index = i;
        }
      }
      // Prep data for post request
      let data = {
        trade: this.active[index],
        key: key
      }
      // Post request
      this.http.post(this.markReturnedEndpoint, data).subscribe((res) => {
        this.getTradeData();
      });
    });
  }

  // Returns true if the game that is passed in exists in current user's incoming or outgoing requests.
  alreadyRequested(game) {
    let outgoingArr = this.outgoing;
    for (let i = 0; i < outgoingArr.length; i++) {
      if (JSON.stringify(outgoingArr[i].game) === JSON.stringify(game)) {
        return true;
      }
    }
    //Check incoming requests for game
    let incomingArr = this.incoming;
    for (let i = 0; i < incomingArr.length; i++) {
      if (JSON.stringify(incomingArr[i].game2) === JSON.stringify(game)) {
        return true;
      }
    }
    return false;
  }
}
