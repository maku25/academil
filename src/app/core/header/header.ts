import { Component, Inject, Renderer2, HostListener, ElementRef } from '@angular/core';
import { DOCUMENT, CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShrinkingHeaderDirective } from '../../directives/shrinking-header.directive';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule, 
    RouterModule,
    ShrinkingHeaderDirective
  ],
  templateUrl: './header.html',
  styleUrls: ['./header.css']
})
export class Header {

  public isMenuOpen = false;

  constructor(
    private renderer: Renderer2,
    @Inject(DOCUMENT) private document: Document,
    private el: ElementRef // Injecté pour détecter les clics en dehors du header
  ) {}

  /**
   * Écoute les clics sur l'ensemble du document pour fermer le menu
   * s'il est ouvert et que le clic a lieu à l'extérieur.
   */
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: Event): void {
    const clickedInside = this.el.nativeElement.contains(event.target);
    if (this.isMenuOpen && !clickedInside) {
      this.closeMenu();
    }
  }

  /**
   * Inverse l'état du menu (ouvert/fermé).
   * Principalement utilisé par le bouton hamburger.
   */
  toggleMenu(): void {
    this.isMenuOpen = !this.isMenuOpen;
    this.updateBodyScroll();
  }

  /**
   * Force la fermeture du menu.
   * Utilisé par les liens de navigation et le clic extérieur.
   */
  closeMenu(): void {
    if (this.isMenuOpen) {
      this.isMenuOpen = false;
      this.updateBodyScroll();
    }
  }
  
  /**
   * Méthode privée pour bloquer/débloquer le scroll du body
   * lorsque le menu mobile est ouvert/fermé.
   */
  private updateBodyScroll(): void {
    if (this.isMenuOpen) {
      this.renderer.setStyle(this.document.body, 'overflow', 'hidden');
    } else {
      this.renderer.removeStyle(this.document.body, 'overflow');
    }
  }
}