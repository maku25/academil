import { Component } from '@angular/core';
import { AnimateOnScrollDirective } from '../../directives/animate-on-scroll.directive';
import { CountUpDirective } from '../../directives/count-up.directive';
import { RouterModule } from '@angular/router';
import { CarouselClients } from '../../carousel-clients/carousel-clients';

@Component({
  selector: 'app-home',
  imports: [
    AnimateOnScrollDirective,
    CountUpDirective,
    RouterModule,
    CarouselClients
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {

}