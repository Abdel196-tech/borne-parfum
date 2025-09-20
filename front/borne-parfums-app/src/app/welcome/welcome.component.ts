// welcome.component.ts
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  lang: 'fr' | 'en' | 'nl' = 'fr';

  constructor(private router: Router) {}

  setLang(l: 'fr'|'en'|'nl') {
    this.lang = l;
    // tu peux ajouter i18n logic ici (ex: translate service)
    // exemple: this.translateService.use(l);
  }

  onStart() {
    // Navigue vers le flow principal ; adapte la route à ton app
    this.router.navigate(['/experience'], { queryParams: { lang: this.lang } });
  }
}
