import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { VjsPlayerComponent } from './components/vjs-player/vjs-player.component';

@NgModule({
  declarations: [
    CardComponent,
    HeaderComponent,
    VjsPlayerComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FontAwesomeModule,
  ],
  exports: [
    CardComponent,
    HeaderComponent,
    VjsPlayerComponent
  ]
})
export class SharedModule { }
