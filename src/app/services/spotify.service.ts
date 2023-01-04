import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environments';
import Spotify from 'spotify-web-api-js';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi!: Spotify.SpotifyWebApiJs;
  constructor() {
    this.spotifyApi = new Spotify();
   }

  obterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?client_id=`;
    const clientId = `${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scope=${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

  obterTokenUrlCallback(){
    if(!window.location.hash)
    return '';
    
    const params = window.location.hash.substring(1).split('&');
    const bearer = params[0].split('=')[1];
    return bearer;
  }

  definirAcessToken(token:string){
    this.spotifyApi.setAccessToken(token);
    localStorage.setItem('token',token)
  }
}
