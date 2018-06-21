import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GamesDataService {
  // Client gets search results form IGDB via proxy through the server to avoid cors issue.
  serverEndpoint = 'https://gametrader.herokuapp.com';
  IGDB_API_KEYWORD_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_keyword_search/';
  IDGB_API_GAME_ID_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_game_id_search/';
  getCoverEndpoint = this.serverEndpoint + '/user/get_cover_url';

  // Data storage.  This array is binded to my-games component.
  searchResults = [];

  constructor(private http: HttpClient) { }

  // Make get request to server to perform game title search
  searchGame(searchFormValue) {
    this.searchResults = [];
    let query = searchFormValue.query;

    this.http.get(this.IGDB_API_KEYWORD_SEARCH_ENDPOINT + query).subscribe((res) => {
      //This end point returns a list of game ID's from IGDB pertaining to search query
      let context = this;
      let searchResults = res;

      // Iterate through each game ID and make get request for each game to get game data
      for (var game in searchResults) {
        let gameId = searchResults[game].id
        this.http.get(this.IDGB_API_GAME_ID_SEARCH_ENDPOINT + gameId).subscribe((res) => {

          let title = res[0].name;
          let cover: String;

          if (res[0].cover) {
            cover = '//images.igdb.com/igdb/image/upload/t_cover_big/' + res[0]['cover']['cloudinary_id'];
          } else {
            cover = '/assets/square-placeholder.jpg';
          }

          // Prep data to populate searchResults array
          let game = {
            title: title,
            cover: cover
          }
          this.searchResults.push(game);
        });
      }
    });
  }

  // Helper function:  Returns the cover-url for the game that is passed in.
  getCoverUrl(gameOwner, gameName) {
    this.http.get(this.getCoverEndpoint, {
      params: {
        gameOwner: gameOwner,
        gameName: gameName
      }
    }).subscribe((res) => {
      console.log(res['cover']);
      return res['cover'];
    });
  }
}
