import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { GamesDataService } from '../games-data.service';

@Component({
  selector: 'app-my-games',
  templateUrl: './my-games.component.html',
  styleUrls: ['./my-games.component.css']
})

export class MyGamesComponent implements OnInit {

  searchForm: FormGroup;

  constructor(private gamesDataService:GamesDataService, private formBuilder:FormBuilder) {
    this.searchForm = formBuilder.group({
      'query':[null, Validators.required]
    });
  }

  ngOnInit() {
  }


}
