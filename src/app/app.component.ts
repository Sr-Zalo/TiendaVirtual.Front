import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen bg-[var(--color-bg)]">
      <router-outlet></router-outlet>
    </main>
  `
})
export class AppComponent {}