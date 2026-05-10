import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalService } from '../../../core/services/modal.service';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, TranslocoModule],
  templateUrl: './modal.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class ModalComponent {
  modalService = inject(ModalService);
}