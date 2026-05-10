import { Component, inject, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../core/services/theme.service';
import { TranslocoModule, TranslocoService } from '@jsverse/transloco';

@Component({
    selector: 'app-settings-fab',
    standalone: true,
    imports: [CommonModule, TranslocoModule],
    templateUrl: './settings-fab.component.html',
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class SettingsFabComponent {
    themeService = inject(ThemeService);
    translocoService = inject(TranslocoService);
    isOpen = false;

    constructor() {
        const savedLang = localStorage.getItem('lang');
        if (savedLang) {
            this.translocoService.setActiveLang(savedLang);
        }
    }

    get currentLang() {
        return this.translocoService.getActiveLang();
    }

    toggleLang() {
        const newLang = this.currentLang === 'es' ? 'en' : 'es';
        this.translocoService.setActiveLang(newLang);
        localStorage.setItem('lang', newLang);
    }

    toggle() {
        this.isOpen = !this.isOpen;
    }
}