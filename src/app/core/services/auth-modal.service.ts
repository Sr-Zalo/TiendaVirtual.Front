import { Injectable, signal } from '@angular/core';

export type ModalType = 'login' | 'register' | null;

@Injectable({ providedIn: 'root' })
export class AuthModalService {
  modalType = signal<ModalType>(null);

  openLogin() { this.modalType.set('login'); }
  openRegister() { this.modalType.set('register'); }
  close() { this.modalType.set(null); }
}