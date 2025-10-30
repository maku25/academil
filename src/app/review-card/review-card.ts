import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

// On définit le type de carte que l'on peut afficher
export type CardType = 'logo' | 'review';

@Component({
  selector: 'app-review-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './review-card.html',
  styleUrls: ['./review-card.css']
})
export class ReviewCard {

  // Les "entrées" que notre composant accepte
  @Input() type: CardType = 'logo'; // Type de carte : 'logo' ou 'review'
  @Input() imageSrc?: string;        // URL de l'image (logo ou photo de profil)
  @Input() altText?: string;         // Texte alternatif pour l'image
  @Input() rating?: number;          // Note de 1 à 5 pour les étoiles
  @Input() text?: string;            // Texte de l'avis
  @Input() author?: string;          // Auteur de l'avis

  // Petite astuce pour créer un tableau pour la boucle des étoiles
  get stars(): number[] {
    return this.rating ? Array(this.rating).fill(0) : [];
  }
}