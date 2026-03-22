import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [RouterModule],
    templateUrl: './home.page.html'
})
export class HomePage {
    categories = [
        { name: 'Juegos de mesa', icon: '🎲' },
        { name: 'Videojuegos', icon: '🎮' },
        { name: 'Libros', icon: '📚' },
        { name: 'Coleccionables', icon: '⭐' }
    ];
}