import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-proximamente',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './proximamente.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ProximamentePage {
  categories = [
    { icon: 'ph-dice-five', name: 'Juegos de mesa' },
    { icon: 'ph-game-controller', name: 'Videojuegos' },
    { icon: 'ph-book-open', name: 'Libros' },
    { icon: 'ph-star', name: 'Coleccionables' },
    { icon: 'ph-puzzle-piece', name: 'Puzzles' }
  ];
}