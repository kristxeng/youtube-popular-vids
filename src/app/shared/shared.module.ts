import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardComponent } from './components/card/card.component';
import { HeaderComponent } from './components/header/header.component';



@NgModule({
  declarations: [CardComponent, HeaderComponent],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [CardComponent, HeaderComponent]
})
export class SharedModule { }
