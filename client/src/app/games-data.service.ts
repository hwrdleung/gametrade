import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Injectable()
export class GamesDataService {
  //The purpose of this service is to communicate with igdb api
  serverEndpoint = 'https://gametrader.herokuapp.com';
  IGDB_API_KEYWORD_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_keyword_search/';
  IDGB_API_GAME_ID_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_game_id_search/';
  getCoverEndpoint = this.serverEndpoint + '/user/get_cover_url';
  searchResults = [];

  constructor(private http: HttpClient) { }

  test() {
    console.log(this.searchResults);
  }

  getCoverUrl(gameOwner, gameName){
    //Get and return game cover url from gameOwner's record
    this.http.get(this.getCoverEndpoint, {params: {
      gameOwner: gameOwner,
      gameName: gameName
    }}).subscribe((res)=>{
      console.log(res['cover']);
      return res['cover'];
    });
  }

  searchGame(searchFormValue) {

    this.searchResults = [];

    var query = searchFormValue.query;

    this.http.get(this.IGDB_API_KEYWORD_SEARCH_ENDPOINT + query).subscribe((res) => {
      //This gets a list of game ID's from IGDB pertaining to search query
      let context = this;
      let searchResults = res;

      for (var game in searchResults) {
        let gameId = searchResults[game].id
        this.http.get(this.IDGB_API_GAME_ID_SEARCH_ENDPOINT + gameId).subscribe((res) => {

          let title = res[0].name;
          let cover = '';

          if (res[0].cover) {
            cover = '//images.igdb.com/igdb/image/upload/t_cover_big/' + res[0]['cover']['cloudinary_id'];
          } else {
            cover = '/assets/square-placeholder.jpg';
          }

          let game = {
            title: title,
            cover: cover
          }

          this.searchResults.push(game);
        });
      }

    });

  }


}
