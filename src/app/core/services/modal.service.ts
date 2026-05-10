import { Injectable, signal } from '@angular/core';

export interface ModalConfig {
  title: string;
  message: string;
  type: 'confirm' | 'alert' | 'success' | 'error';
  confirmText?: string;
  cancelText?: string;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  isOpen = signal(false);
  config = signal<ModalConfig>({
    title: '',
    message: '',
    type: 'alert'
  });

  private resolveCallback: ((value: boolean) => void) | null = null;

  open(config: ModalConfig): Promise<boolean> {
    this.config.set(config);
    this.isOpen.set(true);
    return new Promise(resolve => {
      this.resolveCallback = resolve;
    });
  }

  confirm(title: string, message: string, confirmText = 'Confirmar', cancelText = 'Cancelar'): Promise<boolean> {
    return this.open({ title, message, type: 'confirm', confirmText, cancelText });
  }

  alert(title: string, message: string): Promise<boolean> {
    return this.open({ title, message, type: 'alert', confirmText: 'Aceptar' });
  }

  success(title: string, message: string): Promise<boolean> {
    return this.open({ title, message, type: 'success', confirmText: 'Aceptar' });
  }

  error(title: string, message: string): Promise<boolean> {
    return this.open({ title, message, type: 'error', confirmText: 'Aceptar' });
  }

  resolve(value: boolean) {
    this.isOpen.set(false);
    if (this.resolveCallback) {
      this.resolveCallback(value);
      this.resolveCallback = null;
    }
  }
}