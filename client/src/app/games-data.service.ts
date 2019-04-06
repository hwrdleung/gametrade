import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class GamesDataService {
  // Client gets search results form IGDB via proxy through the server to avoid cors issue.
  serverEndpoint = 'https://gametrader.herokuapp.com';
  // serverEndpoint = 'http://localhost:3000';
  IGDB_API_KEYWORD_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_keyword_search/';
  IDGB_API_GAME_ID_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_game_id_search/';
  IGDB_API_COVER_SEARCH_ENDPOINT = this.serverEndpoint + '/games/igdb_cover_search/';
  getCoverEndpoint = this.serverEndpoint + '/user/get_cover_url';

  // Data storage.  This array is binded to my-games component.
  searchResults = [];

  constructor(private http: HttpClient) { }

  // Make get request to server to perform game title search
  searchGame(searchFormValue) {
    this.searchResults = [];
    let query = searchFormValue.query;

    this.http.get(this.IGDB_API_KEYWORD_SEARCH_ENDPOINT + query).toPromise().then(res => {
      let searchResults = res;

      for(let game in searchResults){
        let gameId = searchResults[game]['id'];
        let gameName = searchResults[game]['name'];

        this.http.get(this.IGDB_API_COVER_SEARCH_ENDPOINT + gameId).subscribe(res => {
          console.log(res);
          let gameCoverUrl = res[0]['url'].replace('t_thumb', 't_cover_big');

          let game = {
            title: gameName,
            cover: gameCoverUrl,
            id: gameId
          }

          this.searchResults.push(game);
          console.log(game);
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
