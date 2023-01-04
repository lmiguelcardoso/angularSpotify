import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlayerComponent } from './player.component';
import { PlayerRoutes } from './player.routes';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [PlayerComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(PlayerRoutes)

  ]
})
export class PlayerModule { }
