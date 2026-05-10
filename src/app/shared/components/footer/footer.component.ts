import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TranslocoModule } from '@jsverse/transloco';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [RouterModule, TranslocoModule],
  templateUrl: './footer.component.html',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class FooterComponent {}