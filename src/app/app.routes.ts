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
    path: 'novedades',
    loadComponent: () =>
      import('./features/novedades/novedades.page').then(m => m.NovedadesPage)
  },
  {
    path: 'proximamente',
    loadComponent: () =>
      import('./features/proximamente/proximamente.page').then(m => m.ProximamentePage)
  },
  {
    path: 'promociones',
    loadComponent: () =>
      import('./features/promociones/promociones.page').then(m => m.PromocionesPage)
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
    path: 'cart',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/cart/cart.page').then(m => m.CartPage)
  },
  {
    path: 'orders',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/orders/order-list.page').then(m => m.OrderListPage)
  },
  {
    path: 'orders/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/orders/order-detail.page').then(m => m.OrderDetailPage)
  },
  {
    path: 'admin/product/new',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/product-form/product-form.page').then(m => m.ProductFormPage)
  },
  {
    path: 'admin/product/:id',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./features/admin/product-form/product-form.page').then(m => m.ProductFormPage)
  },
  {
    path: 'legal',
    loadComponent: () =>
      import('./features/legal/legal.page').then(m => m.LegalPage)
  },
  {
    path: '**',
    redirectTo: ''
  }
];