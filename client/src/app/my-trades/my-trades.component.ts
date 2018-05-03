import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-my-trades',
  templateUrl: './my-trades.component.html',
  styleUrls: ['./my-trades.component.css']
})
export class MyTradesComponent implements OnInit {

  displayTradeRequests = true;
  displayTradeHistory = false;
  displayActiveTrades = false;

  constructor() { }

  ngOnInit() {
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
