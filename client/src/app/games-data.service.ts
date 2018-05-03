import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class GamesDataService {
  //The purpose of this service is to communicate with igdb api
  IGDB_API_KEY = '09f049c49c43481b21812a91f6559298';
  IGDB_API_KEYWORD_SEARCH_ENDPOINT = 'https://api-endpoint.igdb.com/games/?search=';
  IDGB_API_GAME_ID_SEARCH_ENDPOINT = 'https://api-endpoint.igdb.com/games/';
  searchResults = [];

  constructor(private http:HttpClient) { }

  test(){
    console.log(this.searchResults);
  }

  searchGame(searchFormValue){

    this.searchResults = [];

    var query = searchFormValue.query;
    console.log(query);

    let httpOptions = {
      headers: new HttpHeaders({
        'Accept':  'application/json',
        'user-key': this.IGDB_API_KEY
      })
    }

    this.http.get(this.IGDB_API_KEYWORD_SEARCH_ENDPOINT + query, httpOptions).subscribe((res)=>{
      //This gets a list of game ID's from IGDB pertaining to search query
      console.log(res);
      

      let context = this;
      let searchResults = res;

      for(var game in searchResults){
        console.log(searchResults[game].id);
        let gameId = searchResults[game].id
        this.http.get(this.IDGB_API_GAME_ID_SEARCH_ENDPOINT + gameId, httpOptions).subscribe((res)=>{
          console.log(res);
          this.searchResults.push(res[0]);
        });
      }

    });

  }


}
