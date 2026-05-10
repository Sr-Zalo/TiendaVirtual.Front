import { Component, OnInit, OnDestroy, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule, CommonModule, TranslocoModule],
  templateUrl: './home.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class HomePage implements OnInit, OnDestroy {

  currentSlide = 0;
  private slideInterval: any;

  slides = [
    { name: 'Wingspan', description: 'Construye tu colección de aves', price: 54.99, id: 1 },
    { name: 'Catan', description: 'El clásico juego de estrategia y negociación', price: 49.99, id: 2 },
    { name: 'Gloomhaven', description: 'La aventura cooperativa más épica', price: 149.99, id: 3 }
  ];

  featured = [
    { name: 'Exploding Kittens', price: 24.99, id: 1 },
    { name: 'Dixit', price: 32.99, id: 2 },
    { name: 'Ticket to Ride', price: 44.99, id: 3 },
    { name: 'Pandemic', price: 38.99, id: 4 },
    { name: 'Azul', price: 34.99, id: 6 },
  ];

  newProducts = [
  { name: 'Ark Nova', price: 64.99, id: 10 },
  { name: 'Cascadia', price: 42.99, id: 11 },
  { name: 'Dune Imperium', price: 49.99, id: 12 },
  { name: 'Everdell', price: 54.99, id: 13 },
  { name: 'Root', price: 44.99, id: 14 },
];

  bestsellers = [
    { name: 'Unstable Unicorns', price: 19.99, rank: 1, id: 8 },
    { name: 'Gloomhaven', price: 149.99, rank: 2, id: 9 },
    { name: 'Wingspan', price: 54.99, rank: 3, id: 1 },
    { name: 'Catan', price: 49.99, rank: 4, id: 2 },
    { name: 'Pandemic', price: 38.99, rank: 5, id: 4 },
  ];

  ngOnInit() {
    this.slideInterval = setInterval(() => {
      this.currentSlide = (this.currentSlide + 1) % this.slides.length;
    }, 4000);
  }

  ngOnDestroy() {
    clearInterval(this.slideInterval);
  }

  goToSlide(index: number) {
    this.currentSlide = index;
  }
}