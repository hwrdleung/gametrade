import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormsModule } from '@angular/forms';
import { GamesDataService } from '../games-data.service';
import { DataService } from '../data.service';


@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})

export class MyGamesComponent implements OnInit {

  searchForm: FormGroup;
  displayMyGames = true; //Default view on load
  displayAddGames = false;
  selectedOption: String;

  constructor(private dataService:DataService, private gamesDataService:GamesDataService, private formBuilder:FormBuilder) {
    this.searchForm = formBuilder.group({
      'query':[null, Validators.required]
    });
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.gamesDataService.searchResults = [];
  }

  displayContent(tabName){
    switch(tabName){
      case 'My Games': 
        this.displayMyGames = true;
        this.displayAddGames = false;
        break;
      case 'Add Games': 
        this.displayMyGames = false;
        this.displayAddGames = true;
        break;
    }
  }


}
