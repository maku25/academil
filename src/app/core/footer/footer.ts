import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    CommonModule, // Pour la liaison de données {{ currentYear }}
    RouterModule  // Pour les routerLink
  ],
  templateUrl: './footer.html',
  styleUrls: ['./footer.css']
})
export class Footer {
  
  public currentYear: number;

  constructor() {
    this.currentYear = new Date().getFullYear();
  }

}