import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private langSubject = new BehaviorSubject<'fr' | 'en' | 'nl'>('fr');
  currentLang$ = this.langSubject.asObservable();

  setLanguage(lang: 'fr' | 'en' | 'nl') {
    this.langSubject.next(lang);
  }

  getCurrentLanguage(): 'fr' | 'en' | 'nl' {
    return this.langSubject.value;
  }
}
