import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appShrinkingHeader]',
  standalone: true,
})
export class ShrinkingHeaderDirective {
  private lastScrollPosition = 0;
  private isScrolledDown = false;
  private isAtTop = true;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollPosition = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;

    // Détermine si on est tout en haut de la page
    if (scrollPosition === 0) {
      if (!this.isAtTop) {
        this.renderer.removeClass(this.el.nativeElement, 'scrolled');
        this.renderer.removeClass(this.el.nativeElement, 'scrolled-down');
        this.isAtTop = true;
      }
      return;
    }

    // Ajoute la classe 'scrolled' dès qu'on n'est plus en haut
    if (this.isAtTop) {
      this.renderer.addClass(this.el.nativeElement, 'scrolled');
      this.isAtTop = false;
    }

    // Détermine la direction du scroll
    if (scrollPosition > this.lastScrollPosition && !this.isScrolledDown) {
      // Scroll vers le bas
      this.renderer.addClass(this.el.nativeElement, 'scrolled-down');
      this.isScrolledDown = true;
    } else if (scrollPosition < this.lastScrollPosition && this.isScrolledDown) {
      // Scroll vers le haut
      this.renderer.removeClass(this.el.nativeElement, 'scrolled-down');
      this.isScrolledDown = false;
    }

    this.lastScrollPosition = scrollPosition;
  }
}