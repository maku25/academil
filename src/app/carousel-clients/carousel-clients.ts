import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

// On importe notre nouveau composant et son interface
import { ReviewCard, CardType } from '../review-card/review-card'; 
import { AnimateOnScrollDirective } from '../directives/animate-on-scroll.directive';

// On définit une interface pour la structure des données du carrousel
export interface CarouselItem {
  type: CardType;
  imageSrc?: string;
  altText?: string;
  rating?: number;
  text?: string;
  author?: string;
}

@Component({
  selector: 'app-carousel-clients',
  standalone: true,
  imports: [
    CommonModule, 
    ReviewCard, // On importe le composant enfant ici !
    AnimateOnScrollDirective
  ],
  templateUrl: './carousel-clients.html',
  styleUrls: ['./carousel-clients.css']
})
export class CarouselClients implements OnInit {

  // La liste contient maintenant des objets complets pour chaque carte
  public items: CarouselItem[] = [
    { 
      type: 'review', 
      rating: 5, 
      text: "Émile est un coach incroyable, très à l'écoute. J'ai atteint des objectifs que je ne pensais pas possibles !",
      author: 'Marc D.' 
    },
    { 
      type: 'logo', 
      imageSrc: '/img/carousel_trust/LogoDFCO.svg', 
      altText: 'Logo du club de football DFCO' 
    },
    { 
      type: 'review', 
      rating: 5, 
      text: "Un suivi ultra-personnalisé et une motivation sans faille. Les résultats sont là, je recommande à 100%.",
      author: 'Julie L.' 
    },
    { 
      type: 'logo', 
      imageSrc: '/img/carousel_trust/UFC_Logo.svg', 
      altText: 'Logo de l\'UFC' 
    }
  ];

  public doubledItems: CarouselItem[] = [];

  ngOnInit(): void {
    // On duplique la liste complète
    this.doubledItems = [...this.items, ...this.items];
  }
}