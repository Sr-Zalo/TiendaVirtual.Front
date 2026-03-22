# TiendaVirtual.FrontEnd

Frontend perteneciente a **Tienda Virtual**, una aplicación web de comercio electrónico
orientada a la venta de juegos de mesa y productos de ocio (videojuegos, libros,
coleccionables y puzzles). Proyecto integrado de DAW — curso 2025/2026.

## Descripción

Este repositorio contiene el frontend de la aplicación, desarrollado con **Angular 21**
usando componentes standalone y arquitectura por features. Consume la API REST del backend
y ofrece una interfaz de usuario responsive construida con **Tailwind CSS**.

## Arquitectura

El proyecto sigue una estructura modular dividida en tres bloques principales:

- **core** — lógica transversal de la aplicación: modelos, servicios, interceptores y guards.
- **features** — páginas de la aplicación organizadas por funcionalidad.
- **shared** — componentes reutilizables como el navbar.

## Funcionalidades implementadas

- Navegación pública sin necesidad de iniciar sesión
- Catálogo de productos con tarjetas y navegación al detalle
- Página de detalle de producto
- Registro e inicio de sesión de usuarios
- Autenticación mediante JWT almacenado en localStorage
- Interceptor que añade el token JWT automáticamente a las peticiones
- Interceptor de gestión de errores HTTP
- Guard de protección de rutas privadas

## Páginas disponibles

- `/` — portada con acceso rápido al catálogo
- `/catalog` — listado de todos los productos activos
- `/product/:id` — detalle de un producto concreto
- `/login` — inicio de sesión
- `/register` — registro de nuevo usuario

## Stack tecnológico

- **Angular 21** — framework principal
- **Tailwind CSS** — estilos y maquetación
- **RxJS** — gestión de peticiones asíncronas
- **TypeScript** — lenguaje de desarrollo

## Requisitos

- Node.js 20 o superior
- Angular CLI 21

## Instalación

1. Clona el repositorio
2. Instala las dependencias:
```bash
npm install
```
3. Configura la URL del backend en `src/app/core/environments/environment.ts`:
```typescript
export const environment = {
  production: false,
  apiUrl: 'https://localhost:PUERTO'
};
```
4. Arranca el servidor de desarrollo:
```bash
ng serve -o
```

La aplicación estará disponible en `http://localhost:4200`.

> El backend debe estar corriendo para que la aplicación funcione correctamente.

## Estructura de carpetas
```
src/app/
├── core/
│   ├── environments/     → configuración de entornos
│   ├── guards/           → protección de rutas privadas
│   ├── interceptors/     → JWT y gestión de errores
│   ├── models/           → interfaces TypeScript
│   └── services/         → ApiService, AuthService, ProductService
├── features/
│   ├── home/             → página de portada
│   ├── catalog/          → listado de productos
│   ├── product-detail/   → detalle de producto
│   └── auth/
│       ├── login/        → inicio de sesión
│       └── register/     → registro de usuario
└── shared/
    └── components/
        └── navbar/       → barra de navegación principal
```

## Autor

Gonzalo López Luque — IES SOTERO HERNÁNDEZ — DAW 2025/2026