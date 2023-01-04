import { Component, OnInit } from '@angular/core';
import { SpotifyService } from 'src/app/services/spotify.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  constructor(private readonly services:SpotifyService) {}
  
  ngOnInit(): void {
    this.verificarTokenUrlCallback();
  }

  verificarTokenUrlCallback(){
    const token = this.services.obterTokenUrlCallback();
    if(!!token){
      this.services.definirAcessToken(token)
    }

  }
  abrirPaginaLogin(){
    window.location.href =this.services.obterUrlLogin()
  }
}
