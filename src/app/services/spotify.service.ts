import { Injectable } from '@angular/core';
import { SpotifyConfiguration } from 'src/environments/environments';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  obterUrlLogin(){
    const authEndpoint = `${SpotifyConfiguration.authEndpoint}?client_id=`;
    const clientId = `${SpotifyConfiguration.clientId}&`;
    const redirectUrl = `redirect_uri=${SpotifyConfiguration.redirectUrl}&`;
    const scopes = `scopes${SpotifyConfiguration.scopes.join('%20')}&`;
    const responseType = `response_type=token&show_dialog=true`;
    return authEndpoint + clientId + redirectUrl + scopes + responseType;
  }

}
