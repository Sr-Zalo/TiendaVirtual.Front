import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-legal',
  standalone: true,
  imports: [CommonModule, RouterModule, TranslocoModule],
  templateUrl: './legal.page.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class LegalPage {
  sections = [
    { id: 'aviso', label: 'Aviso legal' },
    { id: 'prototipo', label: 'Sobre este prototipo' },
    { id: 'privacidad', label: 'Política de privacidad' },
    { id: 'cookies', label: 'Política de cookies' },
    { id: 'terminos', label: 'Términos y condiciones' },
    { id: 'envios', label: 'Envíos y devoluciones' },
    { id: 'garantia', label: 'Garantía' },
    { id: 'pago', label: 'Métodos de pago' },
    { id: 'nosotros', label: 'Sobre nosotros' },
    { id: 'contacto', label: 'Contacto' },
    { id: 'faq', label: 'Preguntas frecuentes' },
  ];

  scrollTo(id: string) {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}