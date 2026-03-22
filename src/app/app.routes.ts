import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./features/home/home.page').then(m => m.HomePage)
  },
  {
    path: 'catalog',
    loadComponent: () =>
      import('./features/catalog/catalog.page').then(m => m.CatalogPage)
  },
  {
    path: 'product/:id',
    loadComponent: () =>
      import('./features/product-detail/product-detail.page').then(m => m.ProductDetailPage)
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./features/auth/login/login.page').then(m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./features/auth/register/register.page').then(m => m.RegisterPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];