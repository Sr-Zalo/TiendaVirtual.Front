import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { AuthModalComponent } from './shared/components/auth-modal/auth-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, NavbarComponent, FooterComponent, AuthModalComponent],
  template: `
    <app-navbar />
    <main class="min-h-screen bg-[var(--color-bg)]">
      <router-outlet></router-outlet>
    </main>
    <app-footer />
    <app-auth-modal />
  `
})
export class AppComponent {}