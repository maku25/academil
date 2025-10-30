// Fichier : src/app/directives/count-up.directive.ts

import { Directive, ElementRef, Input, AfterViewInit, OnDestroy, HostBinding } from '@angular/core';

@Directive({
  selector: '[appCountUp]',
  standalone: true, // Rends la directive autonome et facile à importer
})
export class CountUpDirective implements AfterViewInit, OnDestroy {
  // Lie la valeur finale du compteur depuis le HTML (ex: [appCountUp]="100")
  @Input('appCountUp') endValue: number = 0;
  // Durée de l'animation en millisecondes
  @Input() duration: number = 2000;

  private observer: IntersectionObserver | undefined;
  private hasAnimated = false;

  constructor(private el: ElementRef) {}

  ngAfterViewInit() {
    // On observe l'élément pour savoir quand il devient visible à l'écran
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        // Si l'élément est visible et n'a pas encore été animé
        if (entry.isIntersecting && !this.hasAnimated) {
          this.animateValue();
          this.hasAnimated = true; // On s'assure que l'animation ne se joue qu'une fois
          this.observer?.unobserve(this.el.nativeElement); // On arrête d'observer
        }
      });
    }, { threshold: 0.5 }); // L'animation se déclenche quand 50% de l'élément est visible

    this.observer.observe(this.el.nativeElement);
  }

  private animateValue() {
    const startValue = 0;
    const startTime = performance.now();
    const element = this.el.nativeElement;

    const step = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / this.duration, 1);
      const currentValue = Math.floor(progress * (this.endValue - startValue) + startValue);

      // Met à jour le texte, en conservant les '+' ou '%' s'ils existent
      const prefix = element.textContent?.includes('+') ? '+' : '';
      const suffix = element.textContent?.includes('%') ? '%' : '';
      element.textContent = prefix + currentValue + suffix;
      
      // Continue l'animation jusqu'à la fin
      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        // Assure que la valeur finale est exacte
        element.textContent = prefix + this.endValue + suffix;
      }
    };
    
    requestAnimationFrame(step);
  }

  ngOnDestroy() {
    // Nettoyage de l'observateur quand le composant est détruit
    this.observer?.disconnect();
  }
}