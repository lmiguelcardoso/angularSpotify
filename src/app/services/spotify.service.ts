import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environments';
import Spotify from 'spotify-web-api-js';
import { IUsuario } from '../interfaces/IUsuario';
import { SpotifyUserParaUsuario } from '../common/spotifyHelper';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  spotifyApi!: Spotify.SpotifyWebApiJs;
  usuario!:IUsuario;

  constructor() {
    this.spotifyApi = new Spotify();
  }

  async inicializarUsuario(){
    if(!!this.usuario)
      return true

    const token = localStorage.getItem('token');

    if(!token)
      return false

    try{
      this.definirAcessToken(token);
      await this.obterUsuarioSpotify();
      return !!this.usuario;

    }catch(ex){
      return false;
    } 
  }

  async obterUsuarioSpotify(){
    const userInfo = await this.spotifyApi.getMe()
    this.usuario = SpotifyUserParaUsuario(userInfo)
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
